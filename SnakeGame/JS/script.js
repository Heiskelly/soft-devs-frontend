const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const rightBtn = document.getElementById('rightBtn');
const leftBtn = document.getElementById('leftBtn');
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
let playersize = 40
let playerX = 0;
let playerY = canvasHeight - playersize;

// setting the snake size
let playerXArr = [playerX, playerX - playersize, playerX - (playersize * 2)]
let playerYArr = [];
playerYArr[0] = playerY;
playerYArr[1] = playerYArr[0];
playerYArr[2] = playerYArr[1];

// setting the color of the and varaibles for food
let foodX;
let foodY;
let foodColor = "red";

let keyBeingPassed;
let currentkey = 'd';
let score =document.getElementById('score');
let count =0;
let creationPoint=[];
const speed = 700;

// this determines the wether the game is easy or hard
// cus i'm using the border to determine of the game is hard or easy
        
let hard = localStorage.getItem('mode');
console.log(hard);

// Converting the string to a boolean
hard = hard.toLowerCase() === "true"; // This will be true if str is "true"

console.log(hard); // true


// Sounds
// theme song
const theme = document.getElementById("gamesound");
const playtheme = ()=>{
    theme.currentTime = 0 ; // Reset the theme song to start from beginning.
    theme.play();
}

window.onload = ()=> {
    playtheme();
}

const stoptheme = ()=>{ 
    // theme.currentTime = 0 ; // Reset the theme song to start from beginning.
    theme.pause();
}

// eat song
const eat = document.getElementById("eat");
const playeat = ()=>{
    eat.currentTime = 0 ; // Reset the eat song to start from beginning.
    eat.play();
}

const snake = ()=>{
    // drawing the snake
    for (let i = 0; i < playerXArr.length; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(playerXArr[i], playerYArr[i], playersize,playersize);
        ctx.strokeStyle = "lightgreen";
        ctx.lineWidth = 5;
        ctx.strokeRect(playerXArr[i], playerYArr[i], playersize, playersize);
    }
}
// food creation and position
// floor reurn to whole whole and discard the decimal without roundinng up
const check = () =>{
    for (let position_index = 0; position_index < playerXArr.length; position_index++) {
        if (playerXArr[position_index] == creationPoint[0] || playerYArr[position_index] == creationPoint[1]) {
            foodCreation()};
    }
};

const foodCreation = () =>{
    creationPoint = [Math.floor(Math.random()*(canvasWidth/playersize))*playersize , Math.floor(Math.random()*(canvasHeight/playersize))*playersize];
    check();
    return creationPoint;
};

foodCreation();

const clearCanvas =()=>{
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
}



// this is check if the snake touch the border
const checkBorderHard = ()=>{
    if (playerXArr[0] < 0 || playerXArr[0] > (canvasWidth-playersize) || playerYArr[0] < 0 || playerYArr[0] > (canvasHeight-playersize)){
        console.log("Game over");
        gameoverfunc(hard);
    }
};

// for easy mood
const borderControlEasy = (playerYArr,playerXArr)=>{
    if (playerXArr[0] < 0) {
        playerXArr[0]= canvasWidth - playersize// this is to make it come out from the other end
    } else if(playerXArr[0] > (canvasWidth - playersize)){
         playerXArr[0]=0 // this is to make it come out from the other end
    }else if(playerYArr[0] < 0){
        playerYArr[0] = canvasHeight - playersize // this is to make it come out from the other end
    }else if(playerYArr[0] > canvasHeight - playersize){
        playerYArr[0] = 0 // this is to make it come out from the other end
    } else{console.log("nill")}
};

const borderControlHard = (playerYArr,playerXArr)=>{
    checkBorderHard();
}

// to stop the snake from entering it self
const changeDirection = (keyBeingPassed)=>{
    if (keyBeingPassed == 's' || keyBeingPassed == 'a' || keyBeingPassed == 'w' || keyBeingPassed == 's'|| keyBeingPassed == 'd'){
        if(currentkey == 's' && keyBeingPassed != 'w'){
            // console.log("current key  change to "+currentkey)
            currentkey = keyBeingPassed;
        }else if(currentkey == 'a' && keyBeingPassed != 'd'){
            // console.log("current key  change to "+currentkey)
            currentkey = keyBeingPassed;
        }else if(currentkey == 'w' && keyBeingPassed != 's'){
            // console.log("current key  change to "+currentkey)
            currentkey = keyBeingPassed;
        }else if(currentkey == 'd' && keyBeingPassed != 'a'){
            // console.log("current key  change to "+currentkey)
            currentkey = keyBeingPassed;
        }else{
            console.log("current key did not change "+currentkey);
            console.log("the passed key is "+keyBeingPassed);
        }
    }
    return (currentkey);
 };

// adding event listener to spefic keys in the keybored as stated above
document.addEventListener("keydown",(whatkey)=>{

    keyBeingPassed = whatkey.key.toLowerCase();
    
    currentkey = changeDirection(keyBeingPassed);

    if ( keyBeingPassed=='w') {   
        gameUpdate('w',currentkey); 
    }
    else if ( keyBeingPassed=='s') {
        gameUpdate('s',currentkey);
    }
    else if ( keyBeingPassed=='a') {
        gameUpdate('a',currentkey);
    }
    else if ( keyBeingPassed=='d') {
        gameUpdate('d',currentkey);
    }
    else{
        console.log("Invalid key");
    }
});



// adding event listerner to button
rightBtn.addEventListener('click',()=>{
    keyBeingPassed = 'd';    
    currentkey = changeDirection(keyBeingPassed);
    gameUpdate('d',currentkey);
});

leftBtn.addEventListener('click',()=>{
    keyBeingPassed = 'a';    
    currentkey = changeDirection(keyBeingPassed);
    gameUpdate('a',currentkey);
});

upBtn.addEventListener('click',()=>{
    keyBeingPassed = 'w';    
    currentkey = changeDirection(keyBeingPassed);
    gameUpdate('w',currentkey);
});

downBtn.addEventListener('click',()=>{
    keyBeingPassed = 's';    
    currentkey = changeDirection(keyBeingPassed);
    gameUpdate('s',currentkey);
});

// function to start the game
const gameUpdate = (keyBeingPassed,currentkey)=>{
    clearCanvas();
    // Drawing food position
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, playersize,playersize);

    let keycheck = currentkey;
    switch(keycheck) {
        case 'w':
            if (keycheck == 'w' ) {
                for (let i = playerYArr.length - 1; i > 0; i--) {
                    playerXArr[i] = playerXArr[i - 1];
                    playerYArr[i] = playerYArr[i - 1];
                }
                playerYArr[0] -= playersize;
            }
            break;
            
        case 'd':
            if (keycheck == 'd') {
                for (let i = playerXArr.length - 1; i > 0; i--) {
                    playerXArr[i] = playerXArr[i - 1];
                    playerYArr[i] = playerYArr[i - 1];
                }
                playerXArr[0] += playersize;
            }
            break;
        case "s":
            if (keycheck == 's') {
                for (let i = playerYArr.length - 1; i > 0; i--) {
                    playerXArr[i] = playerXArr[i - 1];
                    playerYArr[i] = playerYArr[i - 1];
                }
                playerYArr[0] += playersize;
            }
            break; 
        case "a":
            if (keycheck == 'a') {
                for (let i = playerXArr.length - 1; i > 0; i--) {
                    playerXArr[i] = playerXArr[i - 1];
                    playerYArr[i] = playerYArr[i - 1];
                }
                playerXArr[0] -= playersize;
            }
            break;
    }

    if (hard) {
        borderControlHard(keyBeingPassed, playerYArr,playerXArr);
        
    } else {
        borderControlEasy( playerYArr,playerXArr);        
    }
    
    // drawing the snake
    snake();

    // collision detection
    if (playerYArr[0] == creationPoint[1] && playerXArr[0] == creationPoint[0]) {
        playeat();
        console.log("Collision detected");
        count++;
        score.innerHTML = count;
        ctx.clearRect(creationPoint[0], creationPoint[1], playersize,playersize);
        // addding to the snake array by using push function 
        playerXArr.push(playerXArr[playerXArr.length-1]);
        playerYArr.push(playerYArr[playerYArr.length-1]);
            // Drawing new food position
        foodCreation();
        foodX = creationPoint[0];
        foodY = creationPoint[1];
    }else{
        foodX = creationPoint[0];
        foodY = creationPoint[1];
        
    }

    // this loop is to check if the head of the snake touch any part of the body
    for (let i = playerYArr.length - 1; i > 0; i--) {
        if (playerXArr[0] == playerXArr[i] && playerYArr[0] == playerYArr[i]) {
            console.log("Game Over");
            playfail();
            gameoverfunc(hard);
        }
    }
    
};
gameUpdate(keyBeingPassed,currentkey);