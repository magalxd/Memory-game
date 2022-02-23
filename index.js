var buttonColours = ['red', 'blue', 'green', 'yellow']

var gamePattern = []

var userPattern = []

var started = false

var level = 0

$(document).keypress(() => {
  if (!started) {
    $('#level-title').text('level ' + level)
    nextSequence()
    started = true
  }
})
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColour).removeClass('pressed')
  }, 100)
}

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id')

  userPattern.push(userChosenColour)
  animatePress(userChosenColour)
  playSound(userChosenColour)
  checkAnswer(userPattern.length - 1)
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log('success')

    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    console.log('wrong')
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(function () {
      $('body').removeClass('game-over')
    }, 200)
    $('#level-title').text('Game Over, Press Any Key to Restart')
    startOver()
  }
}

function nextSequence() {
  userPattern = []
  level++

  $('#level-title').text('Level ' + level)
  var rng = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[rng]
  gamePattern.push(randomChosenColour)
  $('#' + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColour)
}

$('.btn').on('keyDown', () => {
  nextSequence()
})
function startOver() {
  level = 0
  started = false
  gamePattern = []
  userPattern = []
}
