const BIGGEST_NUM_OF_SCORE = 100;

export const initiateLifes = (lifes) => {
    const lifeElement = document.querySelector('.lifes .amount');
    lifeElement.innerText = lifes;
}

export const resetScore = () => {
    const scoreElement = document.querySelector('.score .amount');
    scoreElement.innerText = 0;
}

export const updateLifes = (lifes) => {
    const lifeElement = document.querySelector('.lifes .amount');
    const lifeScore = Number(lifeElement.innerText);

    lifeElement.innerText = lifeScore + lifes;
};

export const updateScore = (score) => {
    const scoreElement = document.querySelector('.score .amount');
    const currentScore = Number(scoreElement.innerText);
    const newScore = currentScore + score;

    if (newScore >= BIGGEST_NUM_OF_SCORE) {
        updateLifes(1);
        scoreElement.innerText = newScore - 100;
    } else {
        scoreElement.innerText = newScore;
    }
};
