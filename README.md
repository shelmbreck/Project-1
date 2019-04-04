# project-1

## Instructions
  The name of the game is Wheel of Fortune!
  You get 5 lives and $1000. 
  Press the "Show me the money" button 
  The wheel will give you an amount, if you win that amount will be added to your money
  You get 5 guesses, if you guess incorrectly your money decreases in letter value 
  After your 5 guess you will have the opportunity to submit your answer
  If you get it correctly you can go to the next question.
  If you lose then it's game over!

## Planning:

I wanted to create a game that could be a fun thinking game. I didn't want to do something as simple as hangman, I wanted something a little more complex so I thought Wheel of Fortune would be fun. I initially did a wireframe of what I wanted it to look like. The header includes three divs: player-bank, the title, and lives. Next I created the grid-container, which contains 52 divs for the wheel of fortune board that displays the letters as you guess them. My next step was to get an image for the actual wheel, at this point I didn't know if I wanted to have the wheel spin or just return a random number. I created a wheel button that you press to get a wheel-value from the wheel, a message-box to display the wheel-value from the wheel, and a next button to go to the next question. I created my last section which contained my clue button, with a div that would display a clue to help you. A submit input so you could type your guess, and a submit button to submit your answer.

## Layout: 

I wanted to get my layout done first so I started with my html and css done first. This was the easiest part for me but I still ran into some difficulties with my css with trying to get my layout down correctly. I used flexbox, for everything that wasn't a grid. I also decided against using any frameworks. The grids were a little tricky to do, especially the grid-container but once I figured out how to add in a space it worked out perfectly. Once I got my inital layout done I was ready to move onto the JavaScript. I decided to go ahead and make my game for a desktop first and once I achieved my goal I wanted to adjust it for mobile.

## Logic:

The first thing I needed to do was make sure I had all of the info for the game so the functions could work. I hard coded all of the alphahbet values, each category, clue, and answer.
Functions: 
  - generateQuestion
  - guessLetter
  - checkIfGameOver
  - initGame
  - getMoney(didn't implement this one yet)
  - wheelSpin
  - resetGame
  - populateAnswer (didn't implement this one yet)
  
  ## Technologies Used :
    -HTML:
      - Grid
      - Form
    - CSS:
      - Flexbox
    - JavaScript


## Bugs: 

- Getting the wheel image to stop bouncing.(Fixed: the wheel image and the div we're not the same size.)
- Correct amount of degrees of the wheel to turn, so it lands at the same spot everytime.
- Getting the money amount to display at the start of the game 
- No break point on grid-container (one word on multiple lines)
- Getting everything to center correctly

## Things I didn't complete:

- Getting the board to autofill when you submit the correct guess
- adding the amount you win to the playerbank when you win

## Things I would do if I had more time

- Getting the board to autofill when you submit the correct guess
- adding the amount you win to the playerbank when you win
- update the css, so everything is centered and aligns up correctly
- sound effects
