document.addEventListener('DOMContentLoaded', () => {
    
async function getQuestion() {
    let query = await fetch('https://opentdb.com/api.php?amount=1&difficulty=easy'),
        answer = await query.json();
        // console.log(queryJson)
        return {
            answer
        }

}
getQuestion();
let questionCounter = 0;
function printQuestion() {
    let quest = getQuestion();
    quest.then(data => {
        return data.answer.results;
    }).then(dataNext => {
        console.log(dataNext)
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
            console.log(answers)
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
printQuestion()

function markAnswer() {
    result.addEventListener('click', (ev) => {
        let target = ev.target;
        if(target.classList.contains('btn-info')) {
            let siblings = document.querySelectorAll('.btn-info');
            siblings.forEach(el => {
                if(el.classList.contains('btn-warning')) {
                    el.classList.remove('btn-warning')
                }
            })
            target.classList.add('btn-warning');
        }
    })
}

function checkAnswer(correctAnswer) {
    let totalCorrect = document.querySelector('.total__correct'),
        totalIncorrect = document.querySelector('.total__incorrect');
    check.addEventListener('click', () => {
        let chosenAnswer = document.querySelector('.btn-warning').textContent;
        if(chosenAnswer === correctAnswer) {
            alert('yes')
        } else {
            alert('ni')
        }
        // printQuestion();
    })
}

});