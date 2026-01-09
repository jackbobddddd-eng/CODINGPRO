// 1. YOUR GAME DATABASE
// Add new games to this list in the future
const myGames = [
    { title: "Neon Grid", url: "https://neongrid.vercel.app/" },
    { title: "The Void", url: "https://thevoid.vercel.app/" },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/" },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/" },
    { title: "Get Riz", url: "https://getriz.vercel.app/" },
    { title: "SizeShift Beta", url: "https://sizeshift-beta.vercel.app/" }
];

// 2. DOM ELEMENTS
const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('gameSearch');
const randomBtn = document.getElementById('randomBtn');

/**
 * 3. RENDER FUNCTION
 * Builds the HTML for each game card and handles the API screenshots
 */
function renderGames(list) {
    grid.innerHTML = ''; // Clear the grid first
    
    list.forEach(game => {
        const container = document.createElement('a');
        container.className = 'game-container';
        container.href = game.url;
        container.target = "_blank";
        
        // WordPress mShots API: Reliable, fast, and bypasses most Vercel blocks
        const screenshot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(game.url)}?w=400`;

        container.innerHTML = `
            <div class="game-card" style="background: #351d5d;">
                <img src="${screenshot}" 
                     alt="${game.title}" 
                     onload="this.style.opacity='1'"
                     onerror="this.src='https://placehold.co/400x400/1a0b2e/ccff00?text=SHADY+GAMES'"
                     style="opacity:0; transition: opacity 0.8s; width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="game-label">${game.title}</div>
        `;
        grid.appendChild(container);
    });
}

/**
 * 4. RANDOM GAME LOGIC
 * Picks one game from the array and opens it in a new tab
 */
randomBtn.addEventListener('click', () => {
    const randomGame = myGames[Math.floor(Math.random() * myGames.length)];
    window.open(randomGame.url, '_blank');
});

/**
 * 5. SEARCH LOGIC
 * Filters the game list in real-time as you type
 */
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = myGames.filter(g => 
        g.title.toLowerCase().includes(query)
    );
    renderGames(filtered);
});

// 6. INITIAL LOAD
// Display all games when the page first opens
renderGames(myGames);
