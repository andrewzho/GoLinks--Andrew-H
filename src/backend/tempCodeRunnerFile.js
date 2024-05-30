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
        if (!languageCount[repo.language]) {
          languageCount[repo.language] = 0;
        }
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
    for (const [language, count] of Object.entries(languageCount)) {
      console.log(`${language}: ${count}`);
    }
  });