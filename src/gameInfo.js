const BIGGEST_NUM_OF_SCORE = 100;

export const initiateLives = (lives) => {
    const lifeElement = document.querySelector('.lives .amount');
    lifeElement.innerText = lives;
}

export const resetScore = () => {
    const scoreElement = document.querySelector('.score .amount');
    scoreElement.innerText = 0;
}

export const updateLives = (lives) => {
    const lifeElement = document.querySelector('.lives .amount');
    const lifeScore = Number(lifeElement.innerText);

    lifeElement.innerText = lifeScore + lives;
};

export const updateScore = (score) => {
    const scoreElement = document.querySelector('.score .amount');
    const currentScore = Number(scoreElement.innerText);
    const newScore = currentScore + score;

    if (newScore >= BIGGEST_NUM_OF_SCORE) {
        updateLives(1);
        scoreElement.innerText = newScore - 100;
    } else {
        scoreElement.innerText = newScore;
    }
};
