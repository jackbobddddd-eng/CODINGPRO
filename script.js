const myGames = [
    { 
        title: "Infinitic Eight", 
        url: "https://infinitic-eight.vercel.app/",
        about: "Infinite Tic-Tac-Toe. The board grows as you play, requiring endless strategy.",
        tips: "Don't just look at the 3x3 center; focus on building long-range diagonal traps."
    },
    { 
        title: "Vortex Race", 
        url: "https://vortexrace.vercel.app/",
        about: "2D Car Avoidance Racer. Dodge traffic within a shifting high-speed vortex.",
        tips: "Stay in the middle lanes—it gives you the most room to swerve left or right instantly."
    },
    { title: "Neon Grid", url: "https://neongrid.vercel.app/", about: "Rhythmic reflex game in a pulsing synthwave world.", tips: "Watch the grid lines ahead of you to anticipate where the next turn will trigger." },
    { title: "The Void", url: "https://thevoid.vercel.app/", about: "Dark exploration survival. Light is your only defense.", tips: "Conserve your energy. Only sprint when you see eyes in the distance." },
    { title: "Connect Four", url: "https://connectfour-new-update.vercel.app/", about: "Classic 4-in-a-row strategy game.", tips: "The first player to control the center column usually has the win advantage." },
    { title: "Geometry Flap", url: "https://geometryflap.vercel.app/", about: "Geometric side-scrolling flight challenge.", tips: "Rhythm is key. Practice small, consistent taps rather than holding down." },
    { title: "Get Riz", url: "https://getriz.vercel.app/", about: "Fast-paced momentum-based arcade challenge.", tips: "Speed builds your score multiplier. Never stop moving!" },
    { title: "SizeShift Beta", url: "https://sizeshift-beta.vercel.app/", about: "Puzzle platforming where your size dictates interaction.", tips: "Shift to 'Tiny' mid-jump to get a small boost in height and distance." },
    { title: "Snake UI", url: "https://snakeui.vercel.app/", about: "Modern Snake with wrapping screen borders.", tips: "Use the wall-wrap to teleport across the screen and escape your own tail." },
    { title: "Rossy Road", url: "https://rossycroad.vercel.app/", about: "Endless crosser through dangerous traffic.", tips: "The screen scrolls at a fixed rate—don't hesitate too long!" },
    { title: "Ponger", url: "https://ponger.vercel.app/", about: "Physics-based Pong variant.", tips: "Strike the ball with the corner of your paddle to add curve." },
    { title: "Chopsticks", url: "https://chopsticks-iota.vercel.app/", about: "Strategy hand game digital version.", tips: "Keep counts low and force your opponent into awkward splits." },
    { title: "Galaga Evolution", url: "https://galagaevolution.vercel.app/", about: "Upgraded space combat with new waves.", tips: "Rescue your captured ships for double firepower!" },
    { title: "Asteroids", url: "https://asteroids-lilac.vercel.app/", about: "Survival among the stars. Shoot rocks, avoid collisions.", tips: "Tap thrusters for control; momentum is hard to stop." },
    { title: "Astro Breakout", url: "https://astrobreakout.vercel.app/", about: "Gravity-shifting brick breaker.", tips: "Gravity flips when hitting walls—prepare for speed changes." }
];

const grid = document.getElementById('gameGrid');
const searchInput = document.getElementById('gameSearch');
const randomBtn = document.getElementById('randomBtn');
const infoBtn = document.getElementById('infoBtn');
const modal = document.getElementById('infoModal');
const closeBtn = document.querySelector('.close-btn');
const manualContent = document.getElementById('manualContent');

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
