// Main JavaScript for Math Practice App

// DOM Elements
const selectionSection = document.getElementById('selection-section');
const questionsSection = document.getElementById('questions-section');
const topicOptions = document.querySelectorAll('.topic-option');
const difficultyOptions = document.querySelectorAll('.difficulty-option');
const startPracticeBtn = document.getElementById('start-practice');
const practiceTopicSpan = document.querySelector('#practice-topic span');
const practiceDifficultySpan = document.querySelector('#practice-difficulty span');
const questionsList = document.getElementById('questions-list');
const checkAnswersBtn = document.getElementById('check-answers');
const tryAgainBtn = document.getElementById('try-again');
const backToSelectionBtn = document.getElementById('back-to-selection');
const celebrationModal = document.getElementById('celebration-modal');
const continuePracticeBtn = document.getElementById('continue-practice');
const tryAgainModal = document.getElementById('try-again-modal');
const correctCountSpan = document.getElementById('correct-count');
const totalCountSpan = document.getElementById('total-count');
const continueTryAgainBtn = document.getElementById('continue-try-again');

// State variables
let selectedTopic = '';
let selectedDifficulty = '';
let questions = [];
let currentQuestions = [];
let userAnswers = {};

// Event Listeners
topicOptions.forEach(option => {
    option.addEventListener('click', () => selectTopic(option));
});

difficultyOptions.forEach(option => {
    option.addEventListener('click', () => selectDifficulty(option));
});

startPracticeBtn.addEventListener('click', startPractice);
checkAnswersBtn.addEventListener('click', checkAnswers);
tryAgainBtn.addEventListener('click', tryAgain);
backToSelectionBtn.addEventListener('click', backToSelection);
continuePracticeBtn.addEventListener('click', () => {
    celebrationModal.classList.add('hidden');
    backToSelection();
});
continueTryAgainBtn.addEventListener('click', () => {
    tryAgainModal.classList.add('hidden');
    tryAgain();
});

// Functions
async function loadQuestions() {
    try {
        // In a real application, you would load the CSV file here
        // For this demonstration, we'll use the hardcoded questions from the CSV
        questions = [
            { question_id: 1, question_text: "What is 3 + 4?", option_a: "5", option_b: "6", option_c: "7", option_d: "8", correct_answer: "7", difficulty: "low", topic: "addition" },
            { question_id: 2, question_text: "What is 6 + 2?", option_a: "6", option_b: "7", option_c: "8", option_d: "9", correct_answer: "8", difficulty: "low", topic: "addition" },
            { question_id: 3, question_text: "What is 5 + 3?", option_a: "6", option_b: "7", option_c: "8", option_d: "9", correct_answer: "8", difficulty: "low", topic: "addition" },
            { question_id: 4, question_text: "What is 2 + 7?", option_a: "8", option_b: "9", option_c: "10", option_d: "11", correct_answer: "9", difficulty: "low", topic: "addition" },
            { question_id: 5, question_text: "What is 8 + 1?", option_a: "7", option_b: "8", option_c: "9", option_d: "10", correct_answer: "9", difficulty: "low", topic: "addition" },
            { question_id: 6, question_text: "What is 15 + 6?", option_a: "19", option_b: "20", option_c: "21", option_d: "22", correct_answer: "21", difficulty: "medium", topic: "addition" },
            { question_id: 7, question_text: "What is 23 + 5?", option_a: "26", option_b: "27", option_c: "28", option_d: "29", correct_answer: "28", difficulty: "medium", topic: "addition" },
            { question_id: 8, question_text: "What is 18 + 10?", option_a: "26", option_b: "27", option_c: "28", option_d: "29", correct_answer: "28", difficulty: "medium", topic: "addition" },
            { question_id: 9, question_text: "What is 7 + 15?", option_a: "20", option_b: "21", option_c: "22", option_d: "23", correct_answer: "22", difficulty: "medium", topic: "addition" },
            { question_id: 10, question_text: "What is 12 + 9?", option_a: "20", option_b: "21", option_c: "22", option_d: "23", correct_answer: "21", difficulty: "medium", topic: "addition" },
            { question_id: 11, question_text: "What is 5 + 3 + 6?", option_a: "12", option_b: "13", option_c: "14", option_d: "15", correct_answer: "14", difficulty: "high", topic: "addition" },
            { question_id: 12, question_text: "What is 8 + 4 + 2?", option_a: "12", option_b: "13", option_c: "14", option_d: "15", correct_answer: "14", difficulty: "high", topic: "addition" },
            { question_id: 13, question_text: "What is 7 + 9 + 5?", option_a: "19", option_b: "20", option_c: "21", option_d: "22", correct_answer: "21", difficulty: "high", topic: "addition" },
            { question_id: 14, question_text: "What is 6 + 8 + 3?", option_a: "15", option_b: "16", option_c: "17", option_d: "18", correct_answer: "17", difficulty: "high", topic: "addition" },
            { question_id: 15, question_text: "What is 4 + 5 + 7?", option_a: "15", option_b: "16", option_c: "17", option_d: "18", correct_answer: "16", difficulty: "high", topic: "addition" },
            { question_id: 16, question_text: "What is 9 - 3?", option_a: "5", option_b: "6", option_c: "7", option_d: "8", correct_answer: "6", difficulty: "low", topic: "subtraction" },
            { question_id: 17, question_text: "What is 7 - 2?", option_a: "3", option_b: "4", option_c: "5", option_d: "6", correct_answer: "5", difficulty: "low", topic: "subtraction" },
            { question_id: 18, question_text: "What is 8 - 5?", option_a: "2", option_b: "3", option_c: "4", option_d: "5", correct_answer: "3", difficulty: "low", topic: "subtraction" },
            { question_id: 19, question_text: "What is 6 - 1?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "5", difficulty: "low", topic: "subtraction" },
            { question_id: 20, question_text: "What is 5 - 3?", option_a: "1", option_b: "2", option_c: "3", option_d: "4", correct_answer: "2", difficulty: "low", topic: "subtraction" },
            { question_id: 21, question_text: "What is 25 - 10?", option_a: "12", option_b: "13", option_c: "14", option_d: "15", correct_answer: "15", difficulty: "medium", topic: "subtraction" },
            { question_id: 22, question_text: "What is 30 - 7?", option_a: "21", option_b: "22", option_c: "23", option_d: "24", correct_answer: "23", difficulty: "medium", topic: "subtraction" },
            { question_id: 23, question_text: "What is 14 - 4?", option_a: "8", option_b: "9", option_c: "10", option_d: "11", correct_answer: "10", difficulty: "medium", topic: "subtraction" },
            { question_id: 24, question_text: "What is 19 - 5?", option_a: "12", option_b: "13", option_c: "14", option_d: "15", correct_answer: "14", difficulty: "medium", topic: "subtraction" },
            { question_id: 25, question_text: "What is 28 - 13?", option_a: "14", option_b: "15", option_c: "16", option_d: "17", correct_answer: "15", difficulty: "medium", topic: "subtraction" },
            { question_id: 26, question_text: "What is 20 - 5 - 3?", option_a: "10", option_b: "11", option_c: "12", option_d: "13", correct_answer: "12", difficulty: "high", topic: "subtraction" },
            { question_id: 27, question_text: "What is 18 - 4 - 2?", option_a: "10", option_b: "11", option_c: "12", option_d: "13", correct_answer: "12", difficulty: "high", topic: "subtraction" },
            { question_id: 28, question_text: "What is 15 - 6 - 3?", option_a: "5", option_b: "6", option_c: "7", option_d: "8", correct_answer: "6", difficulty: "high", topic: "subtraction" },
            { question_id: 29, question_text: "What is 14 - 5 - 4?", option_a: "3", option_b: "4", option_c: "5", option_d: "6", correct_answer: "5", difficulty: "high", topic: "subtraction" },
            { question_id: 30, question_text: "What is 12 - 3 - 2?", option_a: "5", option_b: "6", option_c: "7", option_d: "8", correct_answer: "7", difficulty: "high", topic: "subtraction" },
            { question_id: 31, question_text: "What is 2 x 3?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "low", topic: "multiplication" },
            { question_id: 32, question_text: "What is 4 x 2?", option_a: "6", option_b: "7", option_c: "8", option_d: "9", correct_answer: "8", difficulty: "low", topic: "multiplication" },
            { question_id: 33, question_text: "What is 3 x 3?", option_a: "6", option_b: "8", option_c: "9", option_d: "12", correct_answer: "9", difficulty: "low", topic: "multiplication" },
            { question_id: 34, question_text: "What is 5 x 1?", option_a: "3", option_b: "4", option_c: "5", option_d: "6", correct_answer: "5", difficulty: "low", topic: "multiplication" },
            { question_id: 35, question_text: "What is 6 x 1?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "low", topic: "multiplication" },
            { question_id: 36, question_text: "What is 10 x 2?", option_a: "18", option_b: "19", option_c: "20", option_d: "21", correct_answer: "20", difficulty: "medium", topic: "multiplication" },
            { question_id: 37, question_text: "What is 7 x 3?", option_a: "18", option_b: "19", option_c: "20", option_d: "21", correct_answer: "21", difficulty: "medium", topic: "multiplication" },
            { question_id: 38, question_text: "What is 6 x 5?", option_a: "28", option_b: "29", option_c: "30", option_d: "31", correct_answer: "30", difficulty: "medium", topic: "multiplication" },
            { question_id: 39, question_text: "What is 4 x 9?", option_a: "34", option_b: "35", option_c: "36", option_d: "37", correct_answer: "36", difficulty: "medium", topic: "multiplication" },
            { question_id: 40, question_text: "What is 8 x 4?", option_a: "30", option_b: "31", option_c: "32", option_d: "33", correct_answer: "32", difficulty: "medium", topic: "multiplication" },
            { question_id: 41, question_text: "What is 2 x 3 x 4?", option_a: "20", option_b: "22", option_c: "24", option_d: "26", correct_answer: "24", difficulty: "high", topic: "multiplication" },
            { question_id: 42, question_text: "What is 3 x 3 x 3?", option_a: "24", option_b: "25", option_c: "26", option_d: "27", correct_answer: "27", difficulty: "high", topic: "multiplication" },
            { question_id: 43, question_text: "What is 2 x 5 x 3?", option_a: "28", option_b: "29", option_c: "30", option_d: "31", correct_answer: "30", difficulty: "high", topic: "multiplication" },
            { question_id: 44, question_text: "What is 4 x 2 x 3?", option_a: "22", option_b: "23", option_c: "24", option_d: "25", correct_answer: "24", difficulty: "high", topic: "multiplication" },
            { question_id: 45, question_text: "What is 1 x 6 x 5?", option_a: "28", option_b: "29", option_c: "30", option_d: "31", correct_answer: "30", difficulty: "high", topic: "multiplication" },
            { question_id: 46, question_text: "What is 8 ÷ 2?", option_a: "2", option_b: "3", option_c: "4", option_d: "5", correct_answer: "4", difficulty: "low", topic: "division" },
            { question_id: 47, question_text: "What is 6 ÷ 3?", option_a: "1", option_b: "2", option_c: "3", option_d: "4", correct_answer: "2", difficulty: "low", topic: "division" },
            { question_id: 48, question_text: "What is 9 ÷ 3?", option_a: "1", option_b: "2", option_c: "3", option_d: "4", correct_answer: "3", difficulty: "low", topic: "division" },
            { question_id: 49, question_text: "What is 4 ÷ 2?", option_a: "1", option_b: "2", option_c: "3", option_d: "4", correct_answer: "2", difficulty: "low", topic: "division" },
            { question_id: 50, question_text: "What is 12 ÷ 4?", option_a: "2", option_b: "3", option_c: "4", option_d: "5", correct_answer: "3", difficulty: "low", topic: "division" },
            { question_id: 51, question_text: "What is 20 ÷ 5?", option_a: "3", option_b: "4", option_c: "5", option_d: "6", correct_answer: "4", difficulty: "medium", topic: "division" },
            { question_id: 52, question_text: "What is 18 ÷ 2?", option_a: "6", option_b: "7", option_c: "8", option_d: "9", correct_answer: "9", difficulty: "medium", topic: "division" },
            { question_id: 53, question_text: "What is 28 ÷ 4?", option_a: "6", option_b: "7", option_c: "8", option_d: "9", correct_answer: "7", difficulty: "medium", topic: "division" },
            { question_id: 54, question_text: "What is 24 ÷ 6?", option_a: "3", option_b: "4", option_c: "5", option_d: "6", correct_answer: "4", difficulty: "medium", topic: "division" },
            { question_id: 55, question_text: "What is 15 ÷ 3?", option_a: "2", option_b: "3", option_c: "4", option_d: "5", correct_answer: "5", difficulty: "medium", topic: "division" },
            { question_id: 56, question_text: "What is 36 ÷ 3 ÷ 2?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "high", topic: "division" },
            { question_id: 57, question_text: "What is 48 ÷ 4 ÷ 2?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "high", topic: "division" },
            { question_id: 58, question_text: "What is 30 ÷ 5 ÷ 1?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "high", topic: "division" },
            { question_id: 59, question_text: "What is 18 ÷ 3 ÷ 1?", option_a: "4", option_b: "5", option_c: "6", option_d: "7", correct_answer: "6", difficulty: "high", topic: "division" },
            { question_id: 60, question_text: "What is 27 ÷ 3 ÷ 3?", option_a: "1", option_b: "2", option_c: "3", option_d: "4", correct_answer: "3", difficulty: "high", topic: "division" }
        ];
    } catch (error) {
        console.error('Error loading questions:', error);
    }
}

function selectTopic(option) {
    topicOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedTopic = option.getAttribute('data-topic');
    checkSelections();
}

function selectDifficulty(option) {
    difficultyOptions.forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedDifficulty = option.getAttribute('data-difficulty');
    checkSelections();
}

function checkSelections() {
    if (selectedTopic && selectedDifficulty) {
        startPracticeBtn.disabled = false;
    } else {
        startPracticeBtn.disabled = true;
    }
}

function startPractice() {
    // Filter questions based on selected topic and difficulty
    currentQuestions = questions.filter(q => 
        q.topic === selectedTopic && q.difficulty === selectedDifficulty
    );
    
    // Reset user answers
    userAnswers = {};
    
    // Show topic and difficulty in the questions section
    practiceTopicSpan.textContent = capitalizeFirstLetter(selectedTopic);
    practiceDifficultySpan.textContent = capitalizeFirstLetter(selectedDifficulty);
    
    // Generate question elements
    renderQuestions();
    
    // Show questions section and hide selection section
    selectionSection.classList.add('hidden');
    questionsSection.classList.remove('hidden');
    
    // Reset UI
    checkAnswersBtn.classList.remove('hidden');
    tryAgainBtn.classList.add('hidden');
}

function renderQuestions() {
    questionsList.innerHTML = '';
    
    currentQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');
        questionDiv.setAttribute('data-question-id', question.question_id);
        
        const questionText = document.createElement('div');
        questionText.classList.add('question-text');
        questionText.textContent = `${index + 1}. ${question.question_text}`;
        
        const optionsList = document.createElement('ul');
        optionsList.classList.add('options-list');
        
        const options = [
            { letter: 'A', value: question.option_a },
            { letter: 'B', value: question.option_b },
            { letter: 'C', value: question.option_c },
            { letter: 'D', value: question.option_d }
        ];
        
        options.forEach(option => {
            const optionItem = document.createElement('li');
            optionItem.classList.add('option-item');
            optionItem.setAttribute('data-value', option.value);
            
            optionItem.innerHTML = `
                <span class="option-letter">${option.letter}.</span>
                <span class="option-text">${option.value}</span>
                <span class="result-icon"></span>
            `;
            
            // Add event listener to select this option
            optionItem.addEventListener('click', () => selectAnswer(question.question_id, option.value, optionItem));
            
            optionsList.appendChild(optionItem);
        });
        
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(optionsList);
        questionsList.appendChild(questionDiv);
    });
}

function selectAnswer(questionId, value, optionElement) {
    // Remove selection from other options in the same question
    const questionContainer = optionElement.closest('.question-item');
    const allOptions = questionContainer.querySelectorAll('.option-item');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Mark this option as selected
    optionElement.classList.add('selected');
    
    // Save the user's answer
    userAnswers[questionId] = value;
}

function checkAnswers() {
    let correctCount = 0;
    let allAnswered = true;
    
    // Check each question
    currentQuestions.forEach(question => {
        const questionContainer = document.querySelector(`.question-item[data-question-id="${question.question_id}"]`);
        const selectedOption = questionContainer.querySelector('.option-item.selected');
        
        if (!selectedOption) {
            allAnswered = false;
            return;
        }
        
        const userAnswer = selectedOption.getAttribute('data-value');
        const isCorrect = userAnswer === question.correct_answer;
        
        if (isCorrect) correctCount++;
        
        // Mark the option as correct or wrong
        selectedOption.classList.add(isCorrect ? 'correct' : 'wrong');
        
        // Add check/cross icon
        const resultIcon = selectedOption.querySelector('.result-icon');
        resultIcon.classList.add(isCorrect ? 'correct' : 'wrong');
        resultIcon.innerHTML = isCorrect ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-times-circle"></i>';
    });
    
    if (!allAnswered) {
        alert('Please answer all questions before checking!');
        return;
    }
    
    // Show appropriate buttons based on results
    checkAnswersBtn.classList.add('hidden');
    
    const totalQuestions = currentQuestions.length;
    
    if (correctCount === totalQuestions) {
        // Show celebration modal if all correct
        celebrationModal.classList.remove('hidden');
    } else {
        // Show try again modal with count of correct answers
        correctCountSpan.textContent = correctCount;
        totalCountSpan.textContent = totalQuestions;
        tryAgainModal.classList.remove('hidden');
        
        // Also show try again button in the questions section
        tryAgainBtn.classList.remove('hidden');
    }
}

function tryAgain() {
    // Reset UI without reloading questions
    const allSelectedOptions = document.querySelectorAll('.option-item.selected');
    allSelectedOptions.forEach(option => {
        option.classList.remove('selected', 'correct', 'wrong');
        const resultIcon = option.querySelector('.result-icon');
        resultIcon.classList.remove('correct', 'wrong');
        resultIcon.innerHTML = '';
    });
    
    // Reset user answers
    userAnswers = {};
    
    // Show check answers button again
    checkAnswersBtn.classList.remove('hidden');
    tryAgainBtn.classList.add('hidden');
}

function backToSelection() {
    // Reset UI
    selectionSection.classList.remove('hidden');
    questionsSection.classList.add('hidden');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize the app
async function init() {
    await loadQuestions();
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 