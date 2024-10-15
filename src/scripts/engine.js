const state = {
    view:{
squares: document.querySelectorAll(".square"),
enemy: document.querySelector(".enemy"),
timeleft: document.querySelector("#time-left"),
score: document.querySelector("#score"),
    },

    values:{
    timerId: null,
    countdowntimerid: setInterval(contagem, 1000),
    velocidadedoralph: 450,
    hitposition: 0,
    result: 0,
    tempocorrido: 50,
    },
};

function contagem(){
    state.values.tempocorrido --;
    state.view.timeleft.textContent = state.values.tempocorrido;
    if(state.values.tempocorrido <= 0){
        clearInterval(state.values.countdowntimerid);
        clearInterval(state.values.timerId);
        alert("GAME OVER!! O SEU RESULTADO FOI "+ state.values.result);
        resetGame();   
    }
}
function resetGame() {
    state.values.result = 0;
    state.values.tempocorrido = 50;
    state.view.score.textContent = state.values.result;
    state.view.timeleft.textContent = state.values.tempocorrido;

    state.view.squares.forEach(square => {
        square.classList.remove("enemy");
    });

    state.values.countdowntimerid = setInterval(contagem, 1000);
    moveEnemy();
}
function playSoud(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.play();
    audio.volume = 0.2;
}
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
}
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.velocidadedoralph);
}
function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () =>{
            if(square.id == state.values.hitposition){
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitposition = null;
            playSoud();
            }
        })
    })

    }

function ini() {
    moveEnemy();
    addListenerHitBox();
}

ini();
