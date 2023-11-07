const myCanvasover = document.getElementById("myCanvasover");
const context = myCanvasover.getContext("2d");
const gameover = document.getElementById("gameover");
const TryAgian = document.getElementById("TryAgian");
const aside = document.getElementsByTagName("aside")[0];

let highestScore = localStorage.getItem("highestScore") || 0;
let highestScoreEasy = localStorage.getItem("highestScoreEasy") || 0;
// note
// localStorage is a web storage feature provided by modern web browsers to store
//  key-value pairs in a client's web browser. It allows you to store data on the 
//  client side (in the user's browser) that persists even when the user closes the
//   browser or navigates away from your website. It's a simple and easy way to store 
//   small amounts of data locally.

// to check for heighest score
const Hscore = (count,hard) => {
    if (hard){
        if (highestScore < count ){
            highestScore = count; // Update the highest score
            localStorage.setItem("highestScore", highestScore); // Updating it in localStorage
            alert("New Heighest Score => "+highestScore);
        }else{
            alert("Heighest Score = "+ highestScore)
        }

    }
    
    if (!hard){
        if (highestScoreEasy < count ) {
            highestScoreEasy = count; // Update the highest score
            localStorage.setItem("highestScoreEasy", highestScoreEasy); // Updating it in localStorage
            alert("New heighest Score for easy => "+ highestScoreEasy);
            
        } else {
            alert("Heighest Score Easy = "+ highestScoreEasy)   
        }
    };

}


// fail song
const fail = document.getElementById("fail");
const playfail = ()=>{
    fail.currentTime = 0 ; // Reset the fail song to start from beginning.
    fail.play();
}


//  to make the emoji show
const gameoverfunc = (hard)=>{
    stoptheme();
    playfail();
    aside.id ='show';
    alert("Your final score => "+count);
    Hscore(count,hard);
}

TryAgian.addEventListener('click',()=>{
    location.reload();
});


const normal_position = () =>{
    // begin drawing sad face
    context.fillStyle = "#183a23";
    context.beginPath();
    context.arc(520,240,200,0,2 * Math.PI);
    context.fill();
    // context.stroke();
    context.closePath();

    // eyes
        //right eye
    context.fillStyle = "black";
    context.beginPath();
    context.arc(450,175,30,0,2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();
        //left eye
    context.beginPath();
    context.arc(590,175,30,0,2 * Math.PI);
    context.fill();
    context.stroke();
    context.closePath();

    // Mouth
    context.strokeStyle = 'black';
    context.lineWidth = 10;
    context.beginPath();
    context.arc(520,440,150,180,-2.3*Math.PI);
    context.stroke();
    context.closePath();

    // Text

    context.font= '50px Arial Black';
    context.fillStyle= "red"
    context.fillText("Game Over!", 350 ,500)
}
normal_position();

