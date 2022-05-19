const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let start = true;

$(document).keydown(function(){
  if(start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start=false;
  }
})

$('.btn').click(function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        // userClickedPattern.length=0;  //this works fine as well
        nextSequence();
      },'1000')
    }
  }else{
    // console.log("failure");
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart")
      playSound("wrong")
    },'200')
    startOver();
  }
}

function nextSequence(){
  userClickedPattern=[];
  //for each time nextSequence is called we increase the game level
  level++;
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },'100')
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0
  start = true;
}
