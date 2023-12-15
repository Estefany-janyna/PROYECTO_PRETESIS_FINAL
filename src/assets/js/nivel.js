const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
};

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};

const shuffle = (array) => {
    const clonedArray = [...array];

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];

        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
};

const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);

        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
};

const generateGame = () => {
    const dimensions = selectors.board.getAttribute('data-dimension');

    if (dimensions % 2 !== 0) {
        throw new Error('The dimension of the board must be an even number.');
    }

    const imagePaths = [
        'https://i.pinimg.com/564x/02/16/2e/02162e90198b452b5c85a69e92c33a37.jpg',
        'https://i.pinimg.com/564x/47/32/52/473252d3a15db980045a625551c61f62.jpg',
        'https://i.pinimg.com/564x/28/59/97/285997d12c01c026a123bb9480388ac2.jpg',
        'https://i.pinimg.com/564x/e0/81/dc/e081dc98ced43b6586df577d401cca3a.jpg',
        'https://i.pinimg.com/564x/4f/cb/f5/4fcbf5353d902d41336fc32569c6864e.jpg',
        'https://i.pinimg.com/564x/3b/7b/c3/3b7bc346907acc3b26b1742337f2656b.jpg',
        'https://i.pinimg.com/564x/2b/cd/41/2bcd411cb8df3bfaca89271ee11fd5af.jpg',
        'https://i.pinimg.com/564x/bb/c9/03/bbc903655bb5d83d024afaf0421cd975.jpg',
       

    ];
    const picks = pickRandom(imagePaths, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(
                (item) => `
                    <div class="card">
                        <div class="card-front"></div>
                        <div class="card-back">
                            <img src="${item}" alt="Card Image">
                        </div>
                    </div>
                `
            ).join('')}
        </div>
    `;

    const parser = new DOMParser().parseFromString(cards, 'text/html');

    selectors.board.replaceWith(parser.querySelector('.board'));
};

const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;

        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `Time: ${state.totalTime} sec`;
    }, 1000);
};

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach((card) => {
        card.classList.remove('flipped');
    });

    state.flippedCards = 0;
};

const flipCard = (card) => {
    state.flippedCards++;
    state.totalFlips++;

    if (!state.gameStarted) {
        startGame();
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');

        if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;

            clearInterval(state.loop);
        }, 1000);
    }
};

const attachEventListeners = () => {
    document.addEventListener('click', (event) => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (
            eventTarget.className.includes('card') &&
            !eventParent.className.includes('flipped')
        ) {
            flipCard(eventParent);
        } else if (
            eventTarget.nodeName === 'BUTTON' &&
            !eventTarget.className.includes('disabled')
        ) {
            startGame();
        }
    });
};

generateGame();
attachEventListeners();