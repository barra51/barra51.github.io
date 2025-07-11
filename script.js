// List the repositories to display by their names
const repositoriesToDisplay = [
    "CUPS-report",
    "CUPS-scripting",
    "TerraformSSO-aws"
];

const username = "barra51";

// Get the repository list container
const repoListContainer = document.getElementById('repo-list');

// Function to fetch and display repositories
async function fetchRepositories() {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();

    // Filter repositories based on the specified list
    const filteredRepos = repos.filter(repo => repositoriesToDisplay.includes(repo.name));

    // If no repositories match
    if (filteredRepos.length === 0) {
        repoListContainer.innerHTML = "<p>No repositories found!</p>";
        return;
    }

    // Clear the loading message
    repoListContainer.innerHTML = "";

    // Loop through filtered repositories and create cards for them
    filteredRepos.forEach(repo => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        
        // Optional: Display a repository image if available
        const repoImage = repo.owner.avatar_url || 'https://via.placeholder.com/600x200';
        
        repoCard.innerHTML = `
            <img src="${repoImage}" alt="${repo.name}">
            <div class="repo-card-content">
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            </div>
        `;

        repoListContainer.appendChild(repoCard);
    });
}

fetchRepositories();
