export const updateLives = (lives) => {
    const lifeElement = document.querySelector('.lives .amount');
    lifeElement.innerText = lives;
}

export const updateScore = (score) => {
    const scoreElement = document.querySelector('.score .amount');
    scoreElement.innerText = score;
};

export const updateHP = (hp) => {
    const hpElement = document.querySelector('.hp .amount');
    hpElement.innerText = hp;
}
