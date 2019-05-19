document.addEventListener('DOMContentLoaded', () => {
    let questionCounter = 0,
    totalCorrectAnswers = 0,
    totalIncorrectAnswers = 0,
    totalCorrect = document.querySelector('.total__correct'),
    totalIncorrect = document.querySelector('.total__incorrect');

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
               
                let htmlTemplate = `<button class="btn btn-info">${el}</button>`;
                result.innerHTML += htmlTemplate;
            })
            
            
            markAnswer();
            checkAnswer(correctAnswer);
            // alert(chosenAnswer)

                // console.log(answers)

    })
}
printQuestion();

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
    result.removeEventListener('click', funcRemoveEventListener);

    check.addEventListener('click', () => {
        
        let chosenAnswer = document.querySelector('.btn-warning').textContent;
        if(chosenAnswer === correctAnswer) {
            console.log('Correct');
            totalCorrectAnswers++;
            totalCorrect.innerHTML = totalCorrectAnswers;
            sessionStorage.setItem('correctAnswers', totalCorrectAnswers);

        } else {
            // alert('ni')
            console.log('Bad answer');
            totalIncorrectAnswers++;
            totalIncorrect.innerHTML = totalIncorrectAnswers;
            sessionStorage.setItem('incorrectAnswers', totalIncorrectAnswers);

        }
        printQuestion();
    },{once: true}) // detach event from being repeated 
}

});