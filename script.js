const myGames = [
    { title: "Neon Grid", url: "https://neongrid.vercel.app/" },
    { title: "The Void", url: "https://thevoid.vercel.app/" },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/" },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/" },
    { title: "Get Riz", url: "https://getriz.vercel.app/" }
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
        
        // WordPress mShots API - Reliable and handles Vercel well
        const screenshot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(game.url)}?w=400`;

        container.innerHTML = `
            <div class="game-card" style="background: #351d5d;">
                <img src="${screenshot}" 
                     alt="${game.title}" 
                     onload="this.style.opacity='1'"
                     onerror="this.parentElement.style.background='#4e3481'"
                     style="opacity:0; transition: opacity 0.8s; width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="game-label">${game.title}</div>
        `;
        grid.appendChild(container);
    });
}

// Randomizer logic
randomBtn.addEventListener('click', () => {
    const randomGame = myGames[Math.floor(Math.random() * myGames.length)];
    window.open(randomGame.url, '_blank');
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = myGames.filter(g => g.title.toLowerCase().includes(query));
    renderGames(filtered);
});

// Initial render
renderGames(myGames);
