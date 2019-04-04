var letters = [ 'a' , 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
// Value of each alphabet letter that will be decreased/added from/to your playerbank with each guess
var alphabetValue = {
    a: 90, 
    b: 80, 
    c: 95, 
    d: 50, 
    e: 90, 
    f: 70,
    g: 60,
    h: 60,
    i: 90,
    j: 70,
    k: 70,
    l: 85,
    m: 90,
    n: 70,
    o: 90,
    p: 60,
    q: 65,
    r: 70,
    s: 70,
    t: 50,
    u: 80,
    v: 95,
    w: 65,
    x: 90,
    y: 90,
    z: 70,
}
// value of each section of the wheel
var wheelValues = {
    0 : 500, 
    1: 900, 
    2: 700, 
    3: 300, 
    4: 800, 
    5: 550, 
    6: 400, 
    7: 500, 
    8: 600, 
    9: 350, 
    10: 500, 
    11: 900, 
    12: 0, 
    13: 650, 
    14: 1000, 
    15: 700, 
    16: 0, 
    17: 800,
    18: 500, 
    19: 450, 
    20: 500, 
    21: 300, 
    22: 0, 
    23: 5000
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
        answer: "CAN YOU HEAR ME NOW?",
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
var money = 1000;
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
    document.getElementById('player-bank').textContent = "$" + money
    question = questions[Math.floor(Math.random() * questions.length)]
    document.querySelector('#category').textContent = question.category
    document.querySelector('#clue > p').textContent = question.clue
    chars = question.answer.split('');
    grid = document.getElementsByClassName('grid-item');
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] !== ' ') {
            grid[i].style.background = 'white';
        }
    }
}

//lives decrease with each guess
function guessLetter(letter) {
    if(!checkIfGameOver()) {
        document.getElementById('lives').textContent = lives
        document.getElementById('player-bank').textContent = "$" + money
        lives--;
        money -= alphabetValue[letter.id.toLowerCase()]
        if (chars.indexOf(letter.id) > -1) {
            for (var i = 0; i < chars.length; i++) {
                if(chars[i] === letter.id) {
                    grid[i].textContent=letter.id;
                }
            }
        } else {
            letter.style.background = 'red'
            // player bank increses in value 
        }
        //money - alphabetValue.getElementById('player-bank')
        //money + alphabetValue.getElementById('player-bank')
    } else {
        // prompt them to guess
        document.getElementById('message-box').textContent = "No more lives, take a guess!"
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

function getMoney () {
    //playerBank decreases in alphabet value with each guess
    //playerBank increases in value if you win
}

//Make wheel rotate
function wheelSpin() {
    var imageDegrees = document.getElementById('wheel')
    var arr = Object.keys(wheelValues)
    var index = Math.floor(Math.random() * arr.length)
    var actualDegrees = Math.round(arr[index] * 15)
    degrees += actualDegrees + 1080
    imageDegrees.style.transform = "rotate(" + degrees + "deg)"
    imageDegrees.style.transition = 'all 0.5s ease-out';
    
    document.getElementById('message-box').textContent = wheelValues[arr[index]]
}

function resetGame () {
    lives = 5
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
    if(guess.toUpperCase() === answer){
        populateAnswer()
    } else{
        youSuck()
    }
}

//TODO populate answer on grid-continer
function populateAnswer() {
}

//TODO write lose function 
function youSuck() {

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

    document.getElementById('next').addEventListener('click', function() {
        resetGame()
    })
})
