var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

//Starting the game with a keyboard press.
//once a key is pressed the level will be displayed as 1.
//The game is to be started by generating a new sequence.
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextSequence();
        started=true;
    }
});


//user has to click the specified button to continu with the game.
//the clicked answer is checked with the checkanswer function.
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


//This function generates the next colour to be pressed.
function nextSequence(){
    userClickedPattern=[];
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    $("#level-title").text("level " + level);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
} 


//This function is used to check whether the pressed button is correct or wrong.
//if wrong, the restarts.    
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){nextSequence();},1000);
        }
    }
    else{
        playSound("wrong");
        $("h1").text("Game Over! Press any key to restart.");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

//If game's over, it restarts again.
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}
