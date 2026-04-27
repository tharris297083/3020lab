// Spider-Man Quiz Application

const quizData = [
    {
        question: "Who created Spider-Man?",
        options: ["Stan Lee and Steve Ditko", "Jack Kirby and Joe Simon", "Bob Kane and Bill Finger", "Roy Thomas and Sal Buscema"],
        correct: 0,
        explanation: "Stan Lee and Steve Ditko created Spider-Man in 1962, revolutionizing comic book storytelling with a relatable teenage hero."
    },
    {
        question: "What is Peter Parker's relationship to Aunt May?",
        options: ["His biological aunt", "His adoptive mother", "His mother's sister", "Both B and C are correct"],
        correct: 3,
        explanation: "Aunt May is Peter's adoptive mother and his biological aunt (his uncle Ben's wife). She raised him after his parents died."
    },
    {
        question: "Which Spider-Man has the ability to use venom strikes?",
        options: ["Peter Parker", "Miles Morales", "Miguel O'Hara", "Ben Reilly"],
        correct: 1,
        explanation: "Miles Morales has the unique venom strike ability, which allows him to deliver a powerful electric-like attack."
    },
    {
        question: "What is the name of Peter Parker's first love?",
        options: ["Mary Jane Watson", "Gwen Stacy", "Betty Brant", "Liz Allan"],
        correct: 1,
        explanation: "Gwen Stacy was Peter Parker's first true love in the comics, making her an iconic and tragic figure in Spider-Man lore."
    },
    {
        question: "How many tons can Spider-Man lift?",
        options: ["10 tons", "15 tons", "25 tons", "50 tons"],
        correct: 2,
        explanation: "Spider-Man can lift approximately 25 tons, though his strength has varied depending on the storyline."
    },
    {
        question: "Who invented Spider-Man's web-shooters?",
        options: ["The spider bite gave him webs naturally", "Peter Parker invented them", "Tony Stark created them", "Oscorp invented them"],
        correct: 1,
        explanation: "Peter Parker invented the web-shooters himself as a technological solution, not a natural spider ability."
    },
    {
        question: "What is the Spider-Verse?",
        options: ["A single universe with one Spider-Man", "Multiple universes with different Spider-People", "A video game", "A comic book series only"],
        correct: 1,
        explanation: "The Spider-Verse is a concept featuring multiple universes, each with its own version of Spider-Man and other spider-themed heroes."
    },
    {
        question: "Which villain temporarily became a better Spider-Man than Peter?",
        options: ["Green Goblin", "Venom", "Doctor Octopus", "Carnage"],
        correct: 2,
        explanation: "Doctor Octopus (Otto Octavius) took over Peter's body and briefly became 'Superior Spider-Man,' proving to be a more ruthless hero."
    },
    {
        question: "What is Venom's symbiote weakness?",
        options: ["Heat and fire", "Water", "Sound/vibrations", "Electricity"],
        correct: 2,
        explanation: "Venom has a significant weakness to loud noises and sonic vibrations, which can harm or disorient the symbiote."
    },
    {
        question: "In the MCU, who first gave Spider-Man a suit?",
        options: ["Peter Parker made it himself", "Iron Man / Tony Stark", "Nick Fury", "Captain America"],
        correct: 1,
        explanation: "Tony Stark created Spider-Man's first MCU suit and became his mentor in the Marvel Cinematic Universe."
    }
];

let currentQuestion = 0;
let userAnswers = [];
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');

function displayQuestion() {
    const question = quizData[currentQuestion];
    
    let html = `
        <div class="quiz-card">
            <h3>Question ${currentQuestion + 1} of ${quizData.length}</h3>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${((currentQuestion + 1) / quizData.length) * 100}%"></div>
            </div>
            <h4>${question.question}</h4>
            <div class="options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="option-btn" data-index="${index}">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
    
    // Add event listeners to option buttons
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', selectAnswer);
    });
}

function selectAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    
    // Disable all buttons after selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
    });
    
    // Store the answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Highlight the selected answer
    e.target.classList.add('selected');
    
    // Highlight correct answer and show feedback
    const question = quizData[currentQuestion];
    if (selectedIndex === question.correct) {
        e.target.classList.add('correct');
        score++;
    } else {
        e.target.classList.add('incorrect');
        // Highlight the correct answer too
        document.querySelectorAll('.option-btn')[question.correct].classList.add('correct');
    }
    
    // Show explanation
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.innerHTML = `<p><strong>Explanation:</strong> ${question.explanation}</p>`;
    e.target.closest('.options').appendChild(explanation);
    
    // Add next button
    setTimeout(() => {
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = currentQuestion < quizData.length - 1 ? 'Next Question' : 'See Results';
        nextBtn.addEventListener('click', nextQuestion);
        quizContainer.appendChild(nextBtn);
    }, 500);
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Amazing! Perfect score! You\'re a true Spider-Man expert! 🎉';
    } else if (percentage >= 80) {
        message = 'Excellent! You know your Spider-Man! 🕷️';
    } else if (percentage >= 60) {
        message = 'Good job! You\'re a solid Spider-Man fan! 👍';
    } else if (percentage >= 40) {
        message = 'Not bad! Time to brush up on your Spider-Man knowledge!';
    } else {
        message = 'Don\'t worry! Check out the other pages to learn more about Spider-Man!';
    }
    
    let html = `
        <div class="results-card">
            <h3>Quiz Complete!</h3>
            <div class="score-display">
                <p class="score-message">${message}</p>
                <p class="final-score">You scored <strong>${score} out of ${quizData.length}</strong> (${Math.round(percentage)}%)</p>
            </div>
            
            <h4>Review Your Answers:</h4>
            <div class="review-section">
    `;
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        
        html += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Q${index + 1}: ${question.question}</strong></p>
                <p>Your answer: ${question.options[userAnswer]}</p>
        `;
        
        if (!isCorrect) {
            html += `<p>Correct answer: ${question.options[question.correct]}</p>`;
        }
        
        html += `</div>`;
    });
    
    html += `
            </div>
            <button class="retake-btn" onclick="location.reload()">Retake Quiz</button>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
}

// Initialize quiz on page load
document.addEventListener('DOMContentLoaded', displayQuestion);
