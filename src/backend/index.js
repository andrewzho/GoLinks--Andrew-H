
// GitHub user repositories API URL
const GITHUB_API_URL = 'https://api.github.com/users';

// username
const username = 'seantomburke'; 

// fetch repositories for a given username with pagination
async function fetchUserRepositories(username, page = 1, perPage = 100) {
// construct  URL with pagination parameters
  const url = `${GITHUB_API_URL}/${encodeURIComponent(username)}/repos?page=${page}&per_page=${perPage}`;
  
  try {
    // Fetch data from API
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    // check to see if response is valid
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // if valid parse data and return 
    const data = await response.json();
    return data;
  } 
  // in case of an error send error log back and return empty array
    catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    return [];
  }
}

// Function to fetch all repositories
async function fetchAllRepositories(username) {
  let allRepos = []; // collection of repositories
  let page = 1; // start with first page
  let fetchedRepos;

  do {
    // fetch all pages for the page
    fetchedRepos = await fetchUserRepositories(username, page);
    // add repos to all repositories
    allRepos = allRepos.concat(fetchedRepos);
    page++;
  } while (fetchedRepos.length > 0);

  return allRepos;
}

// Call the function and log the results
let forks = 0;
let repos = 0;
let languageCount = {};

fetchAllRepositories(username)
  .then(repositories => {
    repositories.forEach(repo => {
      console.log(`Language: ${repo.language}`);
      console.log(`Forks: ${repo.forks}`);
      forks += repo.forks;
      repos += 1;

      // Track language usage
      if (repo.language) {
        // initialize if new language
        if (!languageCount[repo.language]) {
          languageCount[repo.language] = 0; 
        }
        // increment language count by 1
        languageCount[repo.language]++;
      }

      console.log(`Name: ${repo.name}`);
      console.log(`Stars: ${repo.stargazers_count}`);
      console.log(`URL: ${repo.html_url}`);
      console.log('----------------------------');
    });

    console.log(`Total Repos: ${repos}`);
    console.log(`Total Forks: ${forks}`);
    console.log('Language Usage:');

    // Sort languages by count in descending order
    const sortedLanguages = Object.entries(languageCount).sort((a, b) => b[1] - a[1]);
    sortedLanguages.forEach(([language, count]) => {
      console.log(`${language}: ${count}`);
    });
  });
