const myGames = [
    { 
        title: "Space Deporters", 
        url: "https://spaceinvaders-pi.vercel.app/",
        about: "Defend Earth from alien waves in this quintessential arcade shooter.",
        tips: "Hide behind bunkers, but remember they take damage. Hit the red UFO for high scores!"
    },
    { 
        title: "Infinitic Eight", 
        url: "https://infinitic-eight.vercel.app/",
        about: "Infinite Tic-Tac-Toe. The board grows as you play.",
        tips: "Focus on long-range diagonal traps beyond the center 3x3 grid."
    },
    { 
        title: "Vortex Race", 
        url: "https://vortexrace.vercel.app/",
        about: "2D Car Avoidance. Navigate traffic in a shifting vortex.",
        tips: "Stay in the middle lanes for maximum reaction time."
    },
    { title: "Neon Grid", url: "https://neongrid.vercel.app/", about: "Rhythmic reflex game in a synthwave world.", tips: "Watch the grid lines ahead to anticipate turns." },
    { title: "The Void", url: "https://thevoid.vercel.app/", about: "Dark survival. Your light is your only defense.", tips: "Sprint only when necessary to conserve energy." },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/", about: "Classic strategy 4-in-a-row.", tips: "Control the center column early to dominate the board." },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/", about: "Geometric flight challenge.", tips: "Consistent, small taps are more reliable than long holds." },
    { title: "Get Riz", url: "https://getriz.vercel.app/", about: "Fast-paced arcade momentum.", tips: "Speed increases your score multiplier—keep moving!" },
    { title: "SizeShift Beta", url: "https://sizeshift-beta.vercel.app/", about: "Puzzle platformer using size shifting.", tips: "Shift to Tiny mid-jump for an extra distance boost." },
    { title: "Snake UI", url: "https://snakeui.vercel.app/", about: "Modern Snake with wall-wrapping.", tips: "Wall-teleport to escape your own tail when the board gets crowded." },
    { title: "Rossy Road", url: "https://rossycroad.vercel.app/", about: "Endless traffic crosser.", tips: "The screen scrolls at a fixed speed; hesitation is fatal." },
    { title: "Ponger", url: "https://ponger.vercel.app/", about: "Physics-based Pong variant.", tips: "Hit the ball with the paddle corner to add curve/spin." },
    { title: "Chopsticks", url: "https://chopsticks-iota.vercel.app/", about: "Strategy hand counting game.", tips: "Force your opponent into high-count splits to limit their moves." },
    { title: "Galaga Evolution", url: "https://galagaevolution.vercel.app/", about: "Upgraded retro space combat.", tips: "Rescue captured ships for double firepower!" },
    { title: "Asteroids", url: "https://asteroids-lilac.vercel.app/", about: "Survival among space debris.", tips: "Momentum is your enemy; tap thrusters to keep control." },
    { title: "Astro Breakout", url: "https://astrobreakout.vercel.app/", about: "Gravity-shifting brick breaker.", tips: "Prepare for ball speed changes when gravity flips." }
];

const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('gameSearch');
const randomBtn = document.getElementById('randomBtn');
const infoBtn = document.getElementById('infoBtn');
const feedbackBtn = document.getElementById('feedbackBtn');
const modal = document.getElementById('infoModal');
const closeBtn = document.querySelector('.close-btn');
const manualContent = document.getElementById('manualContent');

// Feedback Logic
feedbackBtn.onclick = () => {
    window.open("https://game-hub-copy-6881e699.base44.app", "_blank");
};

function showGameInfo(game) {
    manualContent.innerHTML = `
        <h2 class="logo">${game.title.toUpperCase()}</h2>
        <div class="manual-item">
            <h3>ABOUT</h3>
            <p>${game.about}</p>
        </div>
        <div class="manual-item">
            <h3>PRO TIPS</h3>
            <p>💡 ${game.tips}</p>
        </div>
    `;
    modal.style.display = "block";
}

function showFullGuide() {
    manualContent.innerHTML = `<h2 class="logo">LIBRARY<span>GUIDE</span></h2>`;
    myGames.forEach(game => {
        const div = document.createElement('div');
        div.className = 'manual-item';
        div.innerHTML = `<h3>${game.title}</h3><p>${game.about}</p><i>Tip: ${game.tips}</i>`;
        manualContent.appendChild(div);
    });
    modal.style.display = "block";
}

function renderGames(list) {
    grid.innerHTML = ''; 
    list.forEach((game, index) => {
        const container = document.createElement('div');
        container.className = 'game-container';
        const screenshot = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(game.url)}?w=400`;

        container.innerHTML = `
            <a href="${game.url}" target="_blank" class="game-card">
                <img data-src="${screenshot}" alt="${game.title}" class="lazy-img" style="opacity:0; transition: 0.5s; width:100%; height:100%; object-fit:cover;">
            </a>
            <div class="game-label">${game.title}</div>
        `;
        
        container.querySelector('.game-label').onclick = () => showGameInfo(game);
        grid.appendChild(container);

        setTimeout(() => {
            const img = container.querySelector('.lazy-img');
            if(img) {
                img.src = img.getAttribute('data-src');
                img.onload = () => img.style.opacity = '1';
            }
        }, index * 80); 
    });
}

infoBtn.onclick = showFullGuide;
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
randomBtn.onclick = () => window.open(myGames[Math.floor(Math.random() * myGames.length)].url, '_blank');

searchInput.oninput = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = myGames.filter(g => g.title.toLowerCase().includes(query));
    renderGames(filtered);
};

renderGames(myGames);
