var question;
var lives = 5;
var money = 1000;
var letters = [ 'a' , 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
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
var playerBank;
var showAnswer;
var chars;
var grid;
var livesLeft;
var gameOver;
var wheelValue;
var wheelNumber;
var wheelSpin;
var clues;
var guessArray = []
var guess;
var degrees = 0;
var interval

//generate random questions from the questions array
function generateQuestion() {
    question = questions[Math.floor(Math.random() * questions.length)]
    document.querySelector('#category').textContent = question.category
    document.querySelector('#clue').textContent = question.clue
    chars = question.answer.split('');
    grid = document.getElementsByClassName('grid-item');
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] !== ' ') {
            grid[i].style.background = 'white';
        }
    }

}

function guessLetter(letter) {
    if(gameOver === false) {
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
        } 
    }
    checkIfGameOver()

}

function checkIfGameOver() {
    if(money < 50 || lives < 1) {
        gameOver = true;
        document.querySelector('alphabet-grid').removeEventListener('click', function(e) {
            document.getElementById('#message-box').textContent = "Game Over, Try Again!"; 
            resetGame()
        })
    } else {
        if(money > 50 || lives > 1) {
            gameOver = false;
            document.getElementById('#message-box').textContent = "Good job! Go to the next question!"; 
            winner();
        }
    }
}

function initGame() {
    gameOver = false
    generateQuestion() 
}

function winner() {
    var guessedGrid = document.querySelectorAll('.grid-item'); 
    var guessArray = [] 

    guessedGrid.forEach( function(space) {  
        guessArray.push(space.textContent); 
    })                                      

    var guess = guessArray.join('') 
    if (guess === question.answer.replace(/\s/g,'') ) { 
        generateQuestion()
        document.getElementById('#message-box').textContent = wheelValues;
    }
}

    //Make wheel rotate
function wheelSpin() {
    var imageDegrees = document.getElementById('wheel')
    var arr = Object.keys(wheelValues)
    var index = Math.floor(Math.random() * arr.length)
    var actualDegrees = Math.round(arr[index] * 15)
    console.log(actualDegrees)
    degrees += actualDegrees + 1080
    console.log(degrees)
    imageDegrees.style.transform = "rotate(" + degrees + "deg)"
    imageDegrees.style.transition = 'all 0.5s ease-out';
    
    document.getElementById('message-box').textContent = wheelValues[arr[index]]
}

function resetGame () {
    gameOver = true
    grid = document.getElementsByClassName('grid-item');
    for (let i = 0; i < chars.length; i++) {
        if (chars[i] !== ' ') {
            grid[i].style.background = 'white';
        }
    }
    checkIfGameOver()
}

document.addEventListener("DOMContentLoaded", function() {
    livesLeft = document.getElementById("lives")
    var nextQuestion = document.getElementById("next")
        document.querySelectorAll('.alphabet-item').forEach(function(letter) {
            letter.addEventListener('click', function(e) {
                guessLetter(e.target);
            })
        }); 
    nextQuestion.addEventListener('click', generateQuestion )
    document.getElementById("clue").addEventListener('click', function() {
        document.getElementById("clue").style.visibility= "hidden";
        generateQuestion()
    })
    wheelValue = document.getElementById("message"); {
        initGame() 
    }
    wheelButton =  document.getElementById("wheelButton") 
    wheelButton.addEventListener('click',function() {
        wheelSpin();
    })
    if (gameOver !== false) {
        winner();
    }
    checkIfGameOver()
})