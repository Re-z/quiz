document.addEventListener('DOMContentLoaded', () => {
    let questionCounter = getItemFromLS('questionCounter'),
    totalCorrectAnswers = getItemFromLS('totalCorrectAnswers'),
    totalIncorrectAnswers = getItemFromLS('totalIncorrectAnswers'),
    totalCorrectBlock = document.querySelector('.total__correct'),
    totalIncorrectBlock = document.querySelector('.total__incorrect'),
    tptalQuestionsAmmount = 10;


    totalCorrectBlock.innerHTML = totalCorrectAnswers;
    totalIncorrectBlock.innerHTML = totalIncorrectAnswers;

function getItemFromLS(name) {
    let data = localStorage.getItem(name);
    if (data) return data;
    return 0

}


// alert(totalCorrectBlock)
async function getQuestion() {
    let query = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy'),
        answer = await query.json();
        // console.log(queryJson)
        return {
            answer
        }


}
// getQuestion();


function printQuestion() {
    let quest = getQuestion();
    quest.then(data => {
        return data.answer.results;
    }).then(dataNext => {
        // console.log(dataNext)
        result.innerHTML = ''; //clear previous result 
            let htmlTemplate = `
                <h2>${dataNext[0].question}</h2>
                <p>${dataNext[0].category}</p>
            `
            result.innerHTML += htmlTemplate;
            
            let answers = dataNext[0].incorrect_answers,
                correctAnswer = dataNext[0].correct_answer;
            answers.push(correctAnswer); ;// create all questions array
            answers.sort(() => Math.random() - 0.5);
            // console.log(answers)
            answers.forEach(el => {
               
                let htmlTemplate = `<button class="btn btn-info col-5 col-md-5 mt-1">${el}</button>`;
                result.innerHTML += htmlTemplate;
            })
            
            
            markAnswer();
            checkAnswer(correctAnswer);


    })
}
if(questionCounter >= tptalQuestionsAmmount) {
    showGameOver();
} else {
    printQuestion();
}

function markAnswer() {
    let answerBtn = document.querySelectorAll('.btn-info');
    answerBtn.forEach(el => {
        el.addEventListener('click', (ev) => {
            let answerBtn = document.querySelectorAll('.btn-info');
            answerBtn.forEach(el => {
                if(el.classList.contains('btn-warning')) {
                    el.classList.remove('btn-warning')
                }
            })
            ev.target.classList.add('btn-warning');
        })
    })
}

function checkAnswer(correctAnswer, funcRemoveEventListener) {
    // result.removeEventListener('click', funcRemoveEventListener);

    check.addEventListener('click', () =>  {
        let chosenAnswerBtn = document.querySelector('.btn-warning');
        if(chosenAnswerBtn) {
            let chosenAnswer = chosenAnswerBtn.textContent;
            if(chosenAnswer === correctAnswer) {
                console.log('Correct');
                totalCorrectAnswers++;
                totalCorrectBlock.innerHTML = totalCorrectAnswers;
    
            } else {
                console.log('Bad answer');
                totalIncorrectAnswers++;
                totalIncorrectBlock.innerHTML = totalIncorrectAnswers;
    
            }
            questionCounter++;
            localStorage.setItem('totalCorrectAnswers', totalCorrectAnswers);
            localStorage.setItem('totalIncorrectAnswers', totalIncorrectAnswers);
            localStorage.setItem('questionCounter', questionCounter);
    
            if(questionCounter >= tptalQuestionsAmmount) {
                showGameOver()
            } else {
                printQuestion();
            }
        } else {
            alert('1111')
        }
        

    },{once: true}) // detach event from being repeated 
}

function resetStats() {
    localStorage.clear();
    totalCorrectBlock.innerHTML = 0;
    totalIncorrectBlock.innerHTML = 0;
    location.reload()
}
resetBtn.addEventListener('click', resetStats);

function showGameOver() {
    let htmlTemplate = `<div class="bg-info col-md-12">
        <h2>The game is end</h2>
        <p>Total correct answers - ${totalCorrectAnswers}</p>
        <p>Total incorrect answers -  ${totalIncorrectAnswers}</p>

    
    </div>`
    check.classList.add('disabled')
    result.innerHTML = htmlTemplate
}

});