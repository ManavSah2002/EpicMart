score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.wav');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        spaceship = document.querySelector('.spaceship');
        spaceship.classList.add('animateSpaceship');
        setTimeout(() => {
            spaceship.classList.remove('animateSpaceship')
        }, 700);
    }
    if (e.keyCode == 39) {
        spaceship = document.querySelector('.spaceship');
        spaceshipX = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left'));
        spaceship.style.left = spaceshipX + 112 + "px";
    }
    if (e.keyCode == 37) {
        spaceship = document.querySelector('.spaceship');
        spaceshipX = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left'));
        spaceship.style.left = (spaceshipX - 112) + "px";
    }
}
setInterval(() => {
    spaceship = document.querySelector('.spaceship');
    gameOver = document.querySelector('.gameOver');
    asteroid = document.querySelector('.asteroid');
    dx = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(spaceship, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(asteroid, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(asteroid, null).getPropertyValue('top'));
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        asteroid.classList.remove('asteroidAni')
        audiogo.play();
        cross=false;
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }
    else if(offsetX < 50 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(asteroid, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.2;
            asteroid.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 1000);

    }
    
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}