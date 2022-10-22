

const listOfWordsToGame = ['javascript', 'xarxatec', 'activa', 'programa', 'juego', 'editor', 'selector', 'clase'];
const buttonPlayStarGame = document.querySelector('#startGameButton');   
const imageHangManGame = document.querySelector('#hangManGameImage');
const buttonLettersBoard = document.querySelectorAll("#letterBoard button");

let hiddenWord;
let numberOfErrors = 0; //variable para guardar las veces que no acierto la letra *************
let numberOfHits = 0; //Variable para guardar las veces que acierto la letra *************
/*--------------------------------------------------------------------------------------------------------*/


// Función 1 para generar una palabra aleatoria del array listOfWordsToPlay *************

function getRandomWord(){
  const MAX_NUMBER = 7;
  const MIN_NUMBER = 0;
  
  const randomWordToGame = Math.floor (Math.random() * (MAX_NUMBER - MIN_NUMBER + 1 ) + MIN_NUMBER );
  return randomWordToGame;
}
/*--------------------------------------------------------------------------------------------------------*/


//Función 2 para iniciar el juego/Evento click para iniciar el juego *************

function startGame(){
    imageHangManGame.src = 'public/img/img0.svg';
    buttonPlayStarGame.disabled = true;
    numberOfErrors = 0;
    numberOfHits = 0; 
    document.querySelector('#textGameResult').innerHTML = '';

    const paragraphWordHiddenToGuess = document.querySelector('#hiddenWordToGuess');
    paragraphWordHiddenToGuess.innerHTML = ''; 

    const numberOfWords = listOfWordsToGame.length;
    const randomWordToGame = getRandomWord(0, numberOfWords);

    hiddenWord = listOfWordsToGame[randomWordToGame];
    console.log(hiddenWord);
    const numberOfLetters = hiddenWord.length;

    for( let i = 0; i < buttonLettersBoard.length; i++){
      buttonLettersBoard[i].disabled = false;
    }

    for( let i = 0; i < numberOfLetters; i++){
        const span = document.createElement('span');
        paragraphWordHiddenToGuess.appendChild(span);
    }

}
buttonPlayStarGame.addEventListener('click', startGame);
/*--------------------------------------------------------------------------------------------------------*/


// Función 3 para adivinar las letras/Evento click pinchar en las buttonLettersBoard *************

for( let i = 0; i < buttonLettersBoard.length; i++) {
  buttonLettersBoard[i].addEventListener('click', clickOnLetters);
}

function clickOnLetters(e){
    const spans = document.querySelectorAll('#hiddenWordToGuess span');
    const buttonPlayStarGame = e.target; //cuál de todas las letras, llamó a la función.
    buttonPlayStarGame.disabled = true;

    const selectedLetterOfTheBoard = buttonPlayStarGame.innerHTML.toLowerCase();
    const hiddenWordOnGame = hiddenWord.toLowerCase(); //.toUpperCase()

    let playerWins = false;
    for( let i = 0; i < hiddenWordOnGame.length; i++) {
        if( selectedLetterOfTheBoard === hiddenWordOnGame[i]) {
            //la variable i es la posición de la letra en la palabra.
            //que coincide con el span al que tenemos que mostrarle esta letra...
            spans[i].innerHTML = selectedLetterOfTheBoard;
            numberOfHits++;
            playerWins = true;
        }
    }

    if( playerWins === false) {
        numberOfErrors++;
        const source = `public/img/img${numberOfErrors}.svg`;
        imageHangManGame.src = source;
    }

    if(numberOfErrors === 7){
        document.querySelector('#textGameResult').innerHTML = `¡Has perdido!...Palabra oculta: ${hiddenWord}`;
        game_over();
    }else if(numberOfHits === hiddenWord.length){
        document.querySelector('#textGameResult').innerHTML = `¡Has Ganado!...ENHORABUENA`;
        game_over();
    }
    console.log(`las letras ${selectedLetterOfTheBoard}en la palabra ${singleWord} ¿existe?: ${playerHit}`);
}
  
/*--------------------------------------------------------------------------------------------------------*/


// función 4 para finalizar el juego *************

function game_over() {
    for( let i = 0; i < buttonLettersBoard.length; i++){
      buttonLettersBoard[i].disabled = true;
    }

    buttonPlayStarGame.disabled = false;
}

game_over();