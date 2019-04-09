var letters = [ 'a' , 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]

// value of each section of the wheel
var wheelValues = {
    0: 5000,
    1: 0,
    2: 300,
    3: 500,
    4: 450,
    5: 500,
    6: 800,
    7: 0,
    8: 700,
    9: 1000,
    10: 650,
    11: 0,
    12: 900,
    13: 500,
    14: 350,
    15: 600,
    16: 500,
    17: 400,
    18: 550,
    19: 800,
    20: 300,
    21: 700,
    22: 900,
    23: 500
}
// categoty/answer/clue that is generated in the generateQuestion function
var questions = [
    {
        category: 'Name that movie quote!',
        answer: 'BYE FELICIA',
        clue: 'Hello Felicia'
    },
    {
        category: 'Name that movie quote!',
        answer: "ILL BE BACK",
        clue: 'Arnold'
    },
    {
        category: 'Name that movie quote!',
        answer: "YOURE KILLIN ME SMALLS",
        clue: 'Yeah Yeah'
    },
    {
        category: 'Can you name the song lyrics?',
        answer: "EYE OF THE TIGER",
        clue: 'Rawr'
    },
    {
        category: 'Can you name the song lyrics?',
        answer: "THAT DONT IMPRESS ME MUCH",
        clue: 'Shania'
    },
    {
        category: 'Can you name the song lyrics?',
        answer: "EVERYBODY DIES BUT NOT EVERYBODY LIVES",
        clue: 'Drake'
    },
    {
        category: 'Are you hungry?',
        answer: "HOT FUDGE SUNDAE",
        clue: 'Dessert'
    },
    {
        category: 'Are you hungry?',
        answer: "BAKED LASAGNA",
        clue: 'Dinner'
    },
    {
        category: 'Are you hungry?',
        answer: "BUFFALO WINGS",
        clue: 'Appetizer'
    },
    {
        category: 'Slogans, slogans, slogans',
        answer: "EASY BREEZY BEAUTIFUL COVERGIRL",
        clue: 'Makeup'
    },
    {
        category: 'Slogans, slogans, slogans',
        answer: "TASTE THE RAINBOW",
        clue: 'Candy'
    },
    {
        category: 'Slogans, slogans, slogans?',
        answer: "CAN YOU HEAR ME NOW",
        clue: 'Phone'
    },
    {
        category: 'How well do you know the 90s',
        answer: "THE MACARENA",
        clue: 'Dance'
    },
    {
        category: 'How well do you know the 90s?',
        answer: "SAVED BY THE BELL",
        clue: 'High School'
    },
    {
        category: 'How well do you know the 90s?',
        answer: "BILL NYE THE SCIENCE GUY",
        clue: 'Science'
    },
    {
        category: 'Name that song!',
        answer: "I WANT IT THAT WAY",
        clue: 'Boy Band Era'
    },
    {
        category: 'Name that song!',
        answer: 'YOU GIVE LOVE A BAD NAME',
        clue: '1986'
    },
    {
        category: 'Name that song!',
        answer: "CHATTAHOOCHEE",
        clue: 'Honky Tonk'
    }
]
var lives = 5;
var money = 0;
var question;
var chars;
var grid;
var wheelValue;
var clues;
var guessArray = []
var guess;
var degrees = 0;
var interval

//generate random questions from the questions array
function generateQuestion() {
    resetGame()
    // document.getElementById("chant").play()
    document.getElementById('player-bank').textContent = "Money: $" + money
    document.getElementById('lives').textContent = "Guesses left: " + lives
    question = questions[Math.floor(Math.random() * questions.length)]
    document.querySelector('#category').textContent = question.category
    document.querySelector('#clue > p').textContent = question.clue
    chars = question.answer.split('');
    grid = document.getElementsByClassName('grid-item');
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] !== ' ') {
            console.log(chars[i])
            grid[i].style.background = 'white';
            // add a hidden p tag to each grid item
                //create a p tag
                var p = document.createElement('p')
                // add hidden class to said p tag
                p.classList.add('hidden')
                // set text content of the p tag
                p.textContent = chars[i]
                // append to grid item
                grid[i].appendChild(p)
        }
    }
}

//lives decrease with each guess
function guessLetter(letter) {
    document.getElementById('lives').textContent = "Guesses left: " + lives
    document.getElementById('player-bank').textContent = "Money: $" + money
    if(!checkIfGameOver()) {
        if (chars.indexOf(letter.id) > -1) {
            for (var i = 0; i < chars.length; i++) {
                if(chars[i] === letter.id) {
                    // remove the hidden class from the child node of grid[i]
                    grid[i].childNodes[0].classList.remove('hidden')
                    letter.style.background = 'green'
                }
            }
        } else {
            letter.style.background = 'red'
            // document.getElementById('buzzer').play()
            lives--;
            // player bank increses in value 
        }
    } else {
        // prompt them to guess
        document.getElementById('message-box').textContent = "Take a guess!"
    }

}

// check if the game is over, display if the game is over or go to the next question
function checkIfGameOver() {
    if(lives < 1) {
        return true
    } else {
        return false
    }
}

function initGame() {
    generateQuestion() 
}

//Make wheel rotate
function wheelSpin() {
    var imageDegrees = document.getElementById('wheel')
    var arr = Object.keys(wheelValues)
    var index = Math.floor(Math.random() * arr.length)
    var actualDegrees = Math.round(arr[index] * 15)
    degrees += actualDegrees + 720
    imageDegrees.style.transform = "rotate(" + degrees + "deg)"
    imageDegrees.style.transition = 'all 3s ease-out';
    wheelValue = wheelValues[arr[index]]
    document.getElementById('message-box').textContent = wheelValue
}

function resetGame () {
    lives = 5
    document.getElementById('player-bank').textContent = "Money:" + " "+ "$" + money
    document.getElementById('message-box').textContent = ''
    document.getElementById('guess').value = ''
    var alph = document.getElementsByClassName('alphabet-item');
    for (let i = 0; i < alph.length; i++) {
        alph[i].style.background = "rgba(0,0,0,0.5)"
    }

    document.querySelector('#clue > p').classList.add('hidden')
    var grid = document.getElementsByClassName('grid-item');
    for (let i = 0; i < grid.length; i++) {
        grid[i].style.background = "-webkit-linear-gradient(#4caf50, #66bb6a, #81c784)"
        grid[i].textContent = ''
    }
}

function initEnd(guess, answer) {
    populateAnswer()
    if(guess.toUpperCase() === answer){
        youDontSuck()
    } else {
        youSuck()
    }
}

//TODO populate answer on grid-continer
function populateAnswer() {
    for(var i = 0; i < chars.length; i++) {
        if (chars[i] != ' ') {
            grid[i].childNodes[0].classList.remove('hidden')
        }
    }
}


//TODO write a win function 
function youDontSuck() {
    money += wheelValue
    document.getElementById('player-bank').textContent = "Money: $" + money
    document.getElementById('message-box').textContent = "You're awesome! Go to the next question"
}

//TODO write lose function 
function youSuck() {
    console.log("you're a loser")
    document.getElementById('message-box').textContent = "Game over, try again"
}

document.addEventListener("DOMContentLoaded", function() {
    // this will need to go in your click functions
    document.getElementById("lives").textContent = lives

    var nextQuestion = document.getElementById("next")
    document.querySelectorAll('.alphabet-item').forEach(function(letter) {
        letter.addEventListener('click', function(e) {
            guessLetter(e.target);
            // check if game is over
                // if so, run initEnd
                // else do add money thing, minues lives thing
        })
    }); 
    nextQuestion.addEventListener('click', generateQuestion )

    //add event listener to clue button
    document.getElementById("clue-btn").addEventListener('click', function() {
        //make clue unhidden by removing the 'hidden' class on the child p of #clue
        document.querySelector('#clue > p').classList.remove('hidden')
    })

    wheelValue = document.getElementById("message"); {
        initGame() 
    }
    wheelButton =  document.getElementById("wheelButton") 

    wheelButton.addEventListener('click',function() {
        wheelSpin();
    })
    document.getElementById("submit").addEventListener('click', function(e) {
        e.preventDefault()
        // Going to go in your event listener for your submit btn
        guess = document.getElementById('guess').value
        // call initEnd
        initEnd(guess, question.answer) 
    })
})

