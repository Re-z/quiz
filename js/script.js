document.addEventListener('DOMContentLoaded', () => {
    
async function getQuestion() {
    let query = await fetch('https://opentdb.com/api.php?amount=20&difficulty=easy'),
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
                <h2>${dataNext[questionCounter].question}</h2>
                <p>${dataNext[questionCounter].category}</p>
            `
            result.innerHTML += htmlTemplate;
            let answers = dataNext[questionCounter].incorrect_answers,
                correctAnswer = dataNext[questionCounter].correct_answer;   
            answers.push(correctAnswer);
            answers.sort(() => Math.random() - 0.5);

                // console.log(answers)

    })
}
printQuestion()
});