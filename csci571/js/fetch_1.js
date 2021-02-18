/* 
Use fetch to call an API and get a list of my git repos 
Source here https://www.freecodecamp.org/news/how-to-use-fetch-api/

*/
const fetch = require('node-fetch');
const myurl = 'https://api.github.com/users/EricaXia/repos';

function getRepos(url) {
    fetch(url)
        .then(response => response.json())
        .then(repos => {
            const reposList = repos.map(repo => repo.name);
            console.log(reposList);
        })
    .catch(err => console.log(err))
}

getRepos(myurl);