const canvas = document.querySelector('.canvas');
const placar = document.querySelector('.placar');
const ctx = canvas.getContext('2d');
const audio = new Audio('../assets/audio.mp3');
const score = document.querySelector(".score > span");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const cima = document.querySelector('.cima');
const esquerda = document.querySelector('.esquerda');
const direita = document.querySelector('.direita');
const baixo = document.querySelector('.baixo');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const textPause = document.querySelector('.text_pause');



const avancarTemaS = document.querySelector('.avTmS');
const voltarTemaS = document.querySelector('.voTmS');
const avancarTemaC = document.querySelector('.avTmC');
const voltarTemaC = document.querySelector('.voTmC');

let headColor = "rgb(250,0,0)"; ;
let bodyColor = "rgb(200,0,30)";
let temaCanvas = 1;
let temaSnake = 1;

avancarTemaS.addEventListener('click', ()=> {
    if(temaSnake < 5) {
        temaSnake += 1;
    }
    snakeTema()
    numCobra.textContent = temaSnake;
})
voltarTemaS.addEventListener('click', ()=> {
    if(temaSnake > 1) {
        temaSnake -= 1;
    }
    snakeTema()
    numCobra.textContent = temaSnake;
})
const snakeTema = () => {
    if(temaSnake === 1) {
        headColor = "rgb(250,0,0)";
        bodyColor = "rgb(200,0,30)";
    }
    if(temaSnake === 2) {
        headColor = "rgb(240,240,240)";
        bodyColor = "rgb(120,120,120)";
    }
    if(temaSnake === 3) {
        headColor = "rgb(20,90,150)";
        bodyColor = "rgb(0,30,90)";
    }
    if(temaSnake === 4) {
        headColor = "rgb(80,80,80)";
        bodyColor = "rgb(20,20,20)";
    }
    if(temaSnake === 5) {
        headColor = "rgb(60,200,90)";
        bodyColor = "rgb(10,100,20)";
    }      
}

const numCampo = document.querySelector('.num_campo');
const numCobra = document.querySelector('.num_cobra');
const containerControles = document.querySelector('.container_controles');
avancarTemaC.addEventListener('click', ()=> {
    if(temaCanvas < 5) {
        temaCanvas += 1;
    }
    canvasTema()
    numCampo.textContent = temaCanvas;
})
voltarTemaC.addEventListener('click', ()=> {
    if(temaCanvas > 1) {
        temaCanvas -= 1;
    }
    canvasTema()
    numCampo.textContent = temaCanvas;
})

const canvasTema = () => {
    if(temaCanvas === 1) {
        canvas.style.backgroundColor="rgb(0,80,40)";
        placar.style.backgroundColor="rgb(0,80,40)";
        containerControles.style.backgroundColor="rgb(0,80,40)";
    }
    if(temaCanvas === 2) {
        canvas.style.backgroundColor="rgb(80,80,40)";
        placar.style.backgroundColor="rgb(80,80,40)";
        containerControles.style.backgroundColor="rgb(80,80,40)";
    }
    if(temaCanvas === 3) {
        canvas.style.backgroundColor="rgb(80,80,80)";
        placar.style.backgroundColor="rgb(80,80,80)";
        containerControles.style.backgroundColor="rgb(80,80,80)";
    }
    if(temaCanvas === 4) {
        canvas.style.backgroundColor="rgb(80,40,80)";
        placar.style.backgroundColor="rgb(80,40,80)";
        containerControles.style.backgroundColor="rgb(80,40,80)";
    }
    if(temaCanvas === 5) {
        canvas.style.backgroundColor="rgb(40,80,80)";
        placar.style.backgroundColor="rgb(40,80,80)";
        containerControles.style.backgroundColor="rgb(40,80,80)";
    }      
}




let jogar = true;

const size = 15;

let snake = [{x: 15, y: 0},{x: 30, y: 0}];


const incrementScore = () => {
    score.innerText = +score.innerText + 10;
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 15) * 15;
}

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

let direction, loopId;

const drawFood = () => {
    const {x, y, color } = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.fillRect(food.x, food.y, size, size);
    ctx.shadowBlur = 0;
}



const drawSnake = () => {
    ctx.fillStyle = bodyColor;
    
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = headColor;
            ctx.shadowColor = "yellow";
            ctx.shadowBlur = 2;
        }

    ctx.fillRect(position.x, position.y, size, size);
    })
}

const moveSnake = () => {
    if (!direction) return
    const head = snake[snake.length - 1];
    if  (direction == "up") {
        snake.push ( { x: head.x, y: head.y - size } );
    }  
    if  (direction == "right") {
        snake.push ( { x: head.x + size, y: head.y } );
    }
    if  (direction == "down") {
        snake.push ( {x: head.x, y: head.y + size } );
    } 
    if  (direction == "left") {
        snake.push ( { x: head.x - size, y: head.y } );
    }
    snake.shift();
}



const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0,80,40)";
    ctx.shadowBlur = 0;

    for (let i = 15; i < canvas.width; i += 15 ) {
        
            ctx.beginPath();
            ctx.lineTo(i, 0);
            ctx.lineTo(i, 360);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineTo(0, i);
            ctx.lineTo(360, i);
            ctx.stroke();

    }
}
const chackEat = () => {
    const head = snake[snake.length - 1];

    if (head.x == food.x && head.y == food.y) {
        audio.play();
        incrementScore();
        snake.push(head);

        let x = randomPosition();
        let y = randomPosition();

        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

        const selfCollission = snake.find ((position, index) => {
            return index < neckIndex && position.x == head.x && position.y == head.y;
        });

    if (wallCollision || selfCollission) {
        gameOver();
    }
}
const container = document.querySelector('.container');
const gameOverTxt = document.querySelector('.game-over');
const finalScoreDiv = document.querySelector('.final-score');

const gameOver = () => {
    direction = undefined;
    gameOverTxt.style.display='flex';
    finalScoreDiv.style.display='flex';
    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    container.style.filter = "blur(20px)";
}

const lento = document.querySelector('.lento');
const normal = document.querySelector('.normal');
const rapido = document.querySelector('.rapido');
const ultra = document.querySelector('.ultra');
let vlcd = 350;

lento.addEventListener('click', ()=> {
    lento.classList.add('lv_On');
    normal.classList.remove('lv_On');
    rapido.classList.remove('lv_On');
    ultra.classList.remove('lv_On');
    vlcd = 600;
})
normal.addEventListener('click', ()=> {
    lento.classList.remove('lv_On');
    normal.classList.add('lv_On');
    rapido.classList.remove('lv_On');
    ultra.classList.remove('lv_On');
    vlcd = 400;
})
rapido.addEventListener('click', ()=> {
    lento.classList.remove('lv_On');
    normal.classList.remove('lv_On');
    rapido.classList.add('lv_On');
    ultra.classList.remove('lv_On');
    vlcd = 150;
})
ultra.addEventListener('click', ()=> {
    lento.classList.remove('lv_On');
    normal.classList.remove('lv_On');
    rapido.classList.remove('lv_On');
    ultra.classList.add('lv_On');
    vlcd = 80;
})


const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 360, 360);
    //drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    chackEat();
    checkCollision();

    pause.addEventListener('click',()=>{
        jogar = false
        textPause.style.display='flex';
        pause.style.display='none';
        play.style.display='flex';
        clearInterval(loopId);
    })
    play.addEventListener('click',()=>{
        textPause.style.display='none';
        jogar = true;
        clearInterval(loopId);
        loopId = setTimeout (() => {
            gameLoop();
        }, vlcd);
        play.style.display='none';
        pause.style.display='flex';
    })
    
    loopId = setTimeout (() => {
        gameLoop();
    }, vlcd);
}
gameLoop();

    document.addEventListener("keydown", ({key}) => {
    
        if (jogar == true && key == "ArrowRight" && direction != "left") {
            direction = "right";
        }
        if (jogar == true && key == "ArrowLeft" && direction != "right") {
            direction = "left";
        }
        if (jogar == true && key == "ArrowDown" && direction != "up") {
            direction = "down";
        }
        if (jogar == true && key == "ArrowUp" && direction != "down") {
            direction = "up";
        }
    })
    
    cima.addEventListener('click',()=> {
        if (jogar == true && direction != "down") {
            direction = "up";
        }
    })
    esquerda.addEventListener('click',()=> {
        if (jogar == true && direction != "right") {
            direction = "left";
        }
    })
    direita.addEventListener('click',()=> {
        if (jogar == true && direction != "left") {
            direction = "right";
        }
    })
    baixo.addEventListener('click',()=> {
        if (jogar == true && direction != "up") {
            direction = "down";
        }
    })




buttonPlay.addEventListener("click", () => {
    score.innerText = "00";
    menu.style.display = "none";
    container.style.filter = "none";
    snake = [{x: 15, y: 0},{x: 30, y: 0}];
})