// I need to now deconstruct how this works and be able to make it myself...

//So this first section puts all of our big sections that need to be dynamic, into variables
// 1. all of the boxes are put into an array. 
// 2. the player display (where we see the text of which player is playing) is put into a variable.
// 3. the reset button is put in a variable.
// 4. announcer is the place where the text of the result of the game is put into a variable. 

const boxes = Array.from(document.querySelectorAll('.box'));
const playerDisplay = document.querySelector('.display-player');
const resetButton = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

/*  We then made a variable called board: this containes the empty board in the form of a variable. index 0 - 8 (9 total elements)
    Then we have a variable for current player and we assigned it X.
    And a variable for if the game is active set to true. So is it won already or tied? no, then keep going. 
*/

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

/* Three const variables with a string of either x winning, o winning, or tie
*/

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

/* a const variable containing an array which contains arrays of all the different winning conditions if a mark was made on a specific box. 
*/


const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];

/*Here we access the boxes array and add an event listener to each element.

    This is the function that starts off the chain!

  We access the boxes array, and take the element and index (box, index)
  We then have a click event that runs the anonymous arrowfunction with the userAction function and passes the boxes parameters (box, index) into the userAction function -- go up to userAction()  */

  boxes.forEach( (box, index) => {
    box.addEventListener('click', () => userAction(box, index));
});




/*This is run during the userAction function.
  1. We declare a variable called roundWon and make it equal false.
  2. Then we do a for loop.
    -- start at 0 and loop up to and equal to 7, and increment up by one.
    (inside code block)
    3. Declare a variable called winConditions = winningConditions[i] -- so we access the winning conditions array and choose the index that we get.
    4. declare a variable called a: this makes the board array (empty one at the start of the game) = board[winConditions[0]] ( [0,1,2] )
    5. declare variable b: board[winConditions[1]] ( [3,4,5] );
    6. declare variable c: board[winConditions[2]] ( [6,7,8] );
    -- we then nest a conditional --
        7. if (a === '' || b === '' || c === '') is true then we continue (using the 'continue' keyword).
    -- we add another conditional --
        8. if (a === b && b === c) is true- then we make roundWon = true; and break conditional.
    9. (still in the function but outside of the nested conditionals)
        if (roundWon) -- is true
        10. Then we run announce( and pass in if currentPlayer === 'X' is true then return PLAYERX_WON, or if not return PLAYERO_WON.) 
        11. We reassign isGameActive to false then return to break essentially.
    12.  (still in the function but outside of the nested conditionals)
         if( board does NOT include ''  ( an empty string )) is true.
         13. Run announce( pass in the TIE variable which contains the string 'Tie' ) announce function is down below.

 */

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 7; i++){
        const winConditions = winningConditions[i];
        const a = board[winConditions[0]];
        const b = board[winConditions[1]];
        const c = board[winConditions[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

    if(!board.includes(''))
        announce(TIE);
}


/* This function is run during the handleResultValidation function!
    Either (currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON) OR TIE is passed as an argument as the parameter -- (type) -- .
    We then use a Switch statment to execute certain code blocks depending on what the argument passed is.
    1. if it is PLAYERO_WON then we access announcer and add innerHTML of 'Player <span class="playerO">O</span> Won'
        then break.
    2.  if it is PLAYERX_WON then we access announcer and add innerHTML of 'Player <span class="playerX">X</span> Won'
        then break.
    3.  if it is TIE then we access announcer and add innerHTML of 'Tie'
    Outside of the switch code block but within the function --
    4. we access anouncer-- go to the class and remove .hide. 
 */

const announce = (type) => {
    switch(type) {
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case TIE:
            announcer.innerHTML = 'Tie';
    }    
    announcer.classList.remove('hide');   
}

/* isValidAction is run during the userAction function, it checks if the move is okay!
   if box( coming from the boxes.forEach(box, index) down below.) === 'X' or 'O' then return false. or else return true.
      -- I don't really get this one yet? --
 */
const isValidAction = (box) => {
    if(box.innerText === 'X' || box.innerText === 'O'){
        return false;
    }
    return true;
};

/* This updates the board by passing in the argument of index.
   We then make board[index] = currentPlayer;
 */

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

/* The changePlayer() is a helper function that allows us to change to the other player after one has made a move.
    
    NOTE: Up at the top, in our first few variables that we created; we made a currentPlayer variable that was = to 'X'.

   1. First we access playerDisplay, go to the classList and remove the class `player${currentPlayer}`.
   2. We then make the variable currentPlayer = either X or O. If currentPlayer currently = X then make it O, If O then make it X.
   3. Then, go to playerDisplay's innerText and make it currentPlayer after we updated it. 
   4. Finally got to playerDisplay's class and add `player${currentPlayer}` from what we updated it to. 
*/
const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}

/* The userAction function is called after a box is clicked. Executed from the click event listener set up at the bottom of the code.

    The arguments for (box, index) are passed in as the element and index of the boxes array.
    1. Then we check if( We pass in the element (box) into the isValidAction function  && isGameActive = true) ^^
    2. Then we can change the innerText of the box element to what is currentPlayer.
    3. We also change the class of the box element to (`player${currentPlayer}`) after we've updated it. 
    4. Run the updateBoard() function and pass in index. ^^
    5. Run handleResultValidation(). ^^
    6. Run ChangePlayer(). ^^
 */

const userAction = (box, index) => {
    if(isValidAction(box) && isGameActive) {
        box.innerText = currentPlayer;
        box.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    };
};

/* resetBoard is run onClick of the reset button.
   It is an arrow function that sets board to the opening array of 9 empty string elements.
   It sets isGameActive to true and makes announcer have a class of .hide.

   The function then checks if the currentPlayer Variable === 'O' if so, we enact the changePlayer function  ^^.

   It then accesses the boxes Array that we made at the top.
   For each element, it makes the innerText = '', removes the class of 'playerX' and also removes the class of 'playerO'.

*/

const resetBoard = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    boxes.forEach(box => {
        box.innerText = '';
        box.classList.remove('playerX');
        box.classList.remove('playerO')
    });
};




// On the reset button there is an event listener that runs resetBoard -- go up to resetBoard().

resetButton.addEventListener('click', resetBoard);







