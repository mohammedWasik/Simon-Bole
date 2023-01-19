let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
//
$(".start").click(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$("html").keypress(function () {
  if (!started) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  //   console.log(level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
