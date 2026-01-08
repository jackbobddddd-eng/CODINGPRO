const myGames = [
    { title: "Neon Grid", url: "https://neongrid.vercel.app/" },
    { title: "The Void", url: "https://thevoid.vercel.app/" },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/" },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/" }
];

const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('gameSearch');
const randomBtn = document.getElementById('randomBtn');

function renderGames(list) {
    grid.innerHTML = ''; 
    
    list.forEach(game => {
        const container = document.createElement('a');
        container.className = 'game-container';
        container.href = game.url;
        container.target = "_blank";
        
        // We added &wait=2 and &cache=false to give Vercel time to load 
        // before the API takes the "photo"
        const screenshot = `https://api.microlink.io/?url=${encodeURIComponent(game.url)}&screenshot=true&meta=false&embed=screenshot.url&wait=2`;

        container.innerHTML = `
            <div class="game-card">
                <img src="${screenshot}" 
                     alt="${game.title}" 
                     onload="this.style.opacity='1'"
                     style="opacity:0; transition: opacity 0.5s;"
                     onerror="this.src='https://via.placeholder.com/300/351d5d/ccff00?text=Reloading...'">
            </div>
            <div class="game-label">${game.title}</div>
        `;
        grid.appendChild(container);
    });
}

// Random Game Logic
randomBtn.addEventListener('click', () => {
    const randomGame = myGames[Math.floor(Math.random() * myGames.length)];
    window.open(randomGame.url, '_blank');
});

// Search Logic
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = myGames.filter(g => g.title.toLowerCase().includes(query));
    renderGames(filtered);
});

// Initial load
renderGames(myGames);
