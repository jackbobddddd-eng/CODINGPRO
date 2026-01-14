// 1. GAME DATABASE
const myGames = [
    { title: "Neon Grid", url: "https://neongrid.vercel.app/" },
    { title: "The Void", url: "https://thevoid.vercel.app/" },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/" },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/" },
    { title: "Get Riz", url: "https://getriz.vercel.app/" },
    { title: "SizeShift Beta", url: "https://sizeshift-beta.vercel.app/" },
    { title: "Infinitic Eight", url: "https://infinitic-eight.vercel.app/" },
    { title: "Snake UI", url: "https://snakeui.vercel.app/" },
    { title: "Vortex Race", url: "https://vortexrace.vercel.app/" },
    { title: "Rossy Croad", url: "https://rossycroad.vercel.app/" }
];

const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('gameSearch');
const randomBtn = document.getElementById('randomBtn');

/**
 * 2. RENDER FUNCTION (Optimized for 10+ Games)
 */
function renderGames(list) {
    grid.innerHTML = ''; 
    
    list.forEach((game, index) => {
        const container = document.createElement('a');
        container.className = 'game-container';
        container.href = game.url;
        container.target = "_blank";
        
        // WordPress mShots API for live screenshots
        const screenshot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(game.url)}?w=400`;

        container.innerHTML = `
            <div class="game-card" style="background: #351d5d;">
                <img data-src="${screenshot}" 
                     alt="${game.title}" 
                     class="lazy-game-img"
                     onload="this.style.opacity='1'"
                     onerror="this.src='https://placehold.co/400x400/1a0b2e/ccff00?text=SHADY+GAMES'"
                     style="opacity:0; transition: opacity 0.5s; width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="game-label">${game.title}</div>
        `;
        grid.appendChild(container);

        // STAGGERED LOADING: Prevents browser lock-up by loading one every 100ms
        setTimeout(() => {
            const img = container.querySelector('.lazy-game-img');
            if(img) img.src = img.getAttribute('data-src');
        }, index * 100); 
    });
}

/**
 * 3. RANDOMIZER
 */
randomBtn.addEventListener('click', () => {
    const randomGame = myGames[Math.floor(Math.random() * myGames.length)];
    window.open(randomGame.url, '_blank');
});

/**
 * 4. SEARCH (Debounced)
 */
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        const filtered = myGames.filter(g => g.title.toLowerCase().includes(query));
        renderGames(filtered);
    }, 300);
});

// 5. INITIAL LOAD
renderGames(myGames);
