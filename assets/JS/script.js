// Wait for the DOM to finish loading before running the game.
// Get the button elements and add event listeners to them.

document.addEventListener("DOMContentLoaded", function() {
   let buttons = document.getElementsByTagName("button");
   
   for (let button of buttons){
       button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
       }) 
   }

   document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
   })

    runGame("addition");
    runGame("multiply");
    runGame("subtract");
    runGame("division");
})

/** 
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
*/
function runGame(gameType) {

    document.getElementById("answer-box").value = " ";
    document.getElementById("answer-box").focus();


    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
       displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2); 
    } else if (gameType === "subtract") {
        displaySubtractionQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert (`Unknown game type: ${gameType}`);
        throw  `Unknown game type: ${gameType}, Aborting!`;
    }

}


/**
 * Checks the answer against the first element in 
 * the returned calculateCOrrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }
    runGame(calculatedAnswer[1]);
}


/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {

    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [(operand1 / operand2), "division"];                                   
    } else {
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}.Aborting!`;
    }

}


/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
     document.getElementById('operand1').textContent = operand1 > operand2 ? Math.round(random / operand1)*operand1 : Math.round(random / operand2)*operand2;
     document.getElementById('operand2').textContent = operand1 > operand2 ? Math.round(random / operand2)*operand2 : Math.round(random / operand1)*operand1;
     document.getElementById('operator').textContent = "/";

}

    //let divisor1 = document.getElementById('operand1').textContent;
    //let divisor2 = document.getElementById('operand2').textContent;
    //let even1 = divisor1           //%2==0;
    //let even2 = divisor2            //%2==0;

    

    //if (divisor1 > divisor2  & divisor1 % divisor2 ==0) {
     //   return divisor1;
    //} else if (divisor1 > divisor2 & divisor2 % divisor1 ==0) {
     //   return divisor2;
    //}



 //const specialRandom = (num = 1, limit = 1000000) =>
 // rounding it off to be divisible by num
 //const res = Math.round( random / num ) * num;
 //return res;