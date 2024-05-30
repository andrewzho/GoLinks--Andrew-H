// Define the GitHub user repositories API URL
const GITHUB_API_URL = 'https://api.github.com/users';

// Define the username
const username = 'seantomburke'; // Replace with the desired GitHub username

// Function to fetch repositories for a given username
async function fetchUserRepositories(username) {
  const url = `${GITHUB_API_URL}/${encodeURIComponent(username)}/repos`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from GitHub API:', error);
    return [];
  }
}

const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors({

}))

app.get('/', async(req, res) => {
    const response = await fetchUserRepositories(username)
    .then(repositories => {
        const arr = [];
      repositories.forEach(repo => {
        arr.push({
            language: repo.language,
            forks: repo.forks,
            name: repo.name,
            stars: repo.stargazers_count,
            url: repo.html_url
        });
      });
      return arr
    });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})