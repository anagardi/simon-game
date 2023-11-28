
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 1;

$(".container").hide();

$(document).keypress(function () {

    if (!started) {
        $("body").removeClass("game-over");
        $(".description").hide();
        $(".container").show();
        $("#level-title").text("Level " + level);
        setTimeout(function () {
            nextSequence();
            started = true;
        }, 1000)
    }
});

$(".btn").click(function () {
    if (started) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html('<p class="game-over-title">Game Over!</p><p> Press Any Key to Restart</p>');
        level = 1;
        started = false;
        gamePattern = [];
    }

}

function nextSequence() {

    userClickedPattern = [];

    $("#level-title").text("Level " + level++);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}
