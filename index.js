const campo = document.querySelector('.campo');
const ctx = campo.getContext('2d');
const audio = new Audio('./assets/audio.mp3');
const textPause = document.querySelector('.text-pause');
const menuContainer = document.querySelector('.menu-container');
const textFim = document.querySelector('.text-fim');
const pontuacao1 = document.querySelector('.pontuacao-1');
const pontuacao2 = document.querySelector('.pontuacao-2');
const controleContainer = document.querySelector('.controle-container');
const pontuacaoValor1 = document.querySelector('.pontuacao-valor-1');
const pontuacaoValor2 = document.querySelector('.pontuacao-valor-2');
const botaoJogar = document.querySelector('.botao-jogar')
const botaoPlay = document.querySelector('.botao-play');
const botaoPause= document.querySelector('.botao-pause');
const botaoLento = document.querySelector('.botao-lento');
const botaoNormal = document.querySelector('.botao-normal');
const botaoRapido = document.querySelector('.botao-rapido');
const botaoUltra = document.querySelector('.botao-ultra');
const botaoCima = document.querySelector('.botao-p-cima');
const botaoBaixo = document.querySelector('.botao-p-baixo');
const botaoDireita = document.querySelector('.botao-p-direita');
const botaoEsquerda = document.querySelector('.botao-p-esquerda');
const avancarCobra = document.querySelector('.av-cobra');
const voltarCobra = document.querySelector('.vo-cobra');
const avancarCampo = document.querySelector('.av-campo');
const voltarCampo = document.querySelector('.vo-campo');
const tCampo = document.querySelector('.t-campo');
const tCabeca = document.querySelector('.t-cabeca');
const tCorpo = document.querySelector('.t-corpo');

let corDaCabeca = "rgb(250,0,0)"; ;
let corDoCorpo = "rgb(180,10,20)";
let temaCampo = 1;
let temaCobra = 1;

avancarCobra.addEventListener('click', ()=> {
    if(temaCobra < 5) {
        temaCobra += 1;
    }
    cobraTema();
})
voltarCobra.addEventListener('click', ()=> {
    if(temaCobra > 1) {
        temaCobra -= 1;
    }
    cobraTema();
})
const cobraTema = () => {
    if(temaCobra === 1) {
        corDaCabeca = "rgb(250,0,0)";
        corDoCorpo = "rgb(180,10,20)";
    }
    if(temaCobra=== 2) {
        corDaCabeca = "rgb(60,200,90)";
        corDoCorpo = "rgb(10,100,20)";
    }
    if(temaCobra === 3) {
        corDaCabeca = "rgb(0,0,170)";
        corDoCorpo = "rgb(0,0,70)";
    }
    if(temaCobra === 4) {
        corDaCabeca = "rgb(200,200,90)";
        corDoCorpo = "rgb(110,110,0)";
    }
    if(temaCobra === 5) {
        corDaCabeca = "rgb(200,200,200)";
        corDoCorpo = "rgb(100,100,100)";
    }      
    tCabeca.style.backgroundColor = corDaCabeca;
    tCorpo.style.backgroundColor = corDoCorpo;
}


avancarCampo.addEventListener('click', ()=> {
    if(temaCampo < 5) {
        temaCampo += 1;
    }
    campoTema();
})
voltarCampo.addEventListener('click', ()=> {
    if(temaCampo > 1) {
        temaCampo -= 1;
    }
    campoTema();
})

const campoTema = () => {
    if(temaCampo === 1) {
        tCampo.style.backgroundColor="rgb(0,80,40)";
        campo.style.backgroundColor="rgb(0,80,40)";
        pontuacao1.style.backgroundColor="rgb(0,80,40)";
        controleContainer.style.backgroundColor="rgb(80,80,80)";
    }
    if(temaCampo === 2) {
        tCampo.style.backgroundColor="rgb(80,80,40)";
        campo.style.backgroundColor="rgb(80,80,40)";
        pontuacao1.style.backgroundColor="rgb(80,80,40)";
        controleContainer.style.backgroundColor="rgb(80,80,80)";
    }
    if(temaCampo === 3) {
        tCampo.style.backgroundColor="rgb(100,30,50)";
        campo.style.backgroundColor="rgb(100,30,50)";
        pontuacao1.style.backgroundColor="rgb(100,30,50)";
        controleContainer.style.backgroundColor="rgb(100,30,50)";
    }
    if(temaCampo === 4) {
        tCampo.style.backgroundColor="rgb(200,200,200)";
        campo.style.backgroundColor="rgb(200,200,200)";
        pontuacao1.style.backgroundColor="rgb(200,200,200)";
        containerControles.style.backgroundColor="rgb(200,200,200)";
    }
    if(temaCampo === 5) {
        tCampo.style.backgroundColor="rgb(40,40,40)";
        campo.style.backgroundColor="rgb(40,40,40)";
        pontuacao1.style.backgroundColor="rgb(40,40,40)";
        controleContainer.style.backgroundColor="rgb(40,40,40)";
    }      
}




let jogar = true;

const size = 15;

let snake = [{x: 15, y: 0},{x: 30, y: 0}];

const incrementScore = () => {
    pontuacaoValor1.innerText = +pontuacaoValor1.innerText + 10;
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, campo.width - size);
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
    ctx.fillStyle = corDoCorpo;
    
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = corDaCabeca;
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
    
    for (let i = 15; i < campo.width; i += 15 ) {
        
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
    const campoLimit = campo.width - size;
    const neckIndex = snake.length - 2;
    
    const wallCollision =
    head.x < 0 || head.x > campoLimit || head.y < 0 || head.y > campoLimit;
    
    const selfCollission = snake.find ((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    });
    
    if (wallCollision || selfCollission) {
        gameOver();
    }
}

const gameOver = () => {
    direction = undefined;
    textFim.style.display='flex';
    pontuacao2.style.display='flex';
    menuContainer.style.display = "flex";
    pontuacaoValor2.innerText = pontuacaoValor1.innerText;
}

let vlcd = 350;

botaoLento.addEventListener('click', ()=> {
    botaoLento.classList.add('niv-On');
    botaoNormal.classList.remove('niv-On');
    botaoRapido.classList.remove('niv-On');
    botaoUltra.classList.remove('niv-On');
    vlcd = 600;
})
botaoNormal.addEventListener('click', ()=> {
    botaoLento.classList.remove('niv-On');
    botaoNormal.classList.add('niv-On');
    botaoRapido.classList.remove('niv-On');
    botaoUltra.classList.remove('niv-On');
    vlcd = 400;
})
botaoRapido.addEventListener('click', ()=> {
    botaoLento.classList.remove('niv-On');
    botaoNormal.classList.remove('niv-On');
    botaoRapido.classList.add('niv-On');
    botaoUltra.classList.remove('niv-On');
    vlcd = 150;
})
botaoUltra.addEventListener('click', ()=> {
    botaoLento.classList.remove('niv-On');
    botaoNormal.classList.remove('niv-On');
    botaoRapido.classList.remove('niv-On');
    botaoUltra.classList.add('niv-On');
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
    
    botaoPause.addEventListener('click',()=>{
        jogar = false
        textPause.style.display='flex';
        botaoPause.style.display='none';
        botaoPlay.style.display='flex';
        clearInterval(loopId);
    })
    botaoPlay.addEventListener('click',()=>{
        textPause.style.display='none';
        jogar = true;
        clearInterval(loopId);
        loopId = setTimeout (() => {
            gameLoop();
        }, vlcd);
        botaoPlay.style.display='none';
        botaoPause.style.display='flex';
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

botaoCima.addEventListener('click',()=> {
    if (jogar == true && direction != "down") {
        direction = "up";
    }
})
botaoEsquerda.addEventListener('click',()=> {
    if (jogar == true && direction != "right") {
        direction = "left";
    }
})
botaoDireita.addEventListener('click',()=> {
    if (jogar == true && direction != "left") {
        direction = "right";
    }
})
botaoBaixo.addEventListener('click',()=> {
    if (jogar == true && direction != "up") {
        direction = "down";
    }
})



botaoJogar.addEventListener("click", () => {
    pontuacaoValor1.innerText = "00";
    menuContainer.style.display = "none";
    snake = [{x: 15, y: 0},{x: 30, y: 0}];
})