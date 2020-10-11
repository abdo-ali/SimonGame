var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var start = false;

$(".play").on("click",function(){
  startOver();
  if(!start){
    $("h1").text("level" + level);
    nextSequence();
    start = true;
  }
});



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level" + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  $("h1").text("level " + level);


}

$(".ownBtn").on("click",function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass('pressed');

    }, 100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function(){
        nextSequence()
      }, 1000);
    }

  }else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");

    }, 200);
    $("h1").text("Game Over, Press a play button to Restart");
    startOver();
  }
}


function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
