const numbers = [
    { number: 0, audio: "0.mp3" },
    { number: 1, audio: "1.mp3" },
    { number: 2, audio: "2.mp3" },
    { number: 3, audio: "3.mp3" },
    { number: 4, audio: "4.mp3" },
    { number: 5, audio: "5.mp3" },
    { number: 6, audio: "6.mp3" },
    { number: 7, audio: "7.mp3" },
    { number: 8, audio: "8.mp3" },
    { number: 9, audio: "9.mp3" },
    { number: 10, audio: "10.mp3" }
];

let currentNumber;
let currentAudioSrc;
let options = [];

function getRandomOptions(correctAnswer) {
    const randomNumbers = new Set();
    randomNumbers.add(correctAnswer);
    
    while (randomNumbers.size < 4) {
        const randomNum = Math.floor(Math.random() * 11); // del 0 al 10
        randomNumbers.add(randomNum);
    }
    
    return Array.from(randomNumbers).sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    currentNumber = numbers[randomIndex].number;
    currentAudioSrc = numbers[randomIndex].audio;

    document.getElementById('number-display').innerText = currentNumber;
    options = getRandomOptions(currentNumber);
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(option => {
        const optionButton = document.createElement('div');
        optionButton.className = 'option';
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(optionButton);
    });

    playAudio(currentAudioSrc);
    document.getElementById('next-button').style.display = "none"; // Ocultar botón "Siguiente"
}

function playAudio(src) {
    const audio = document.getElementById('number-audio');
    audio.src = src;
    audio.play();
}

function playCurrentAudio() {
    playAudio(currentAudioSrc);
}

function checkAnswer(selected) {
    if (selected === currentNumber) {
        document.getElementById('feedback').innerText = "¡Correcto!";
        document.getElementById('correct-sound').play();
        document.getElementById('next-button').style.display = "block"; // Mostrar botón "Siguiente"
    } else {
        document.getElementById('feedback').innerText = `Incorrecto. La respuesta correcta es ${currentNumber}.`;
        document.getElementById('wrong-sound').play();
        playAudio(numbers.find(num => num.number === currentNumber).audio);
    }
}

function nextQuestion() {
    document.getElementById('feedback').innerText = '';
    loadQuestion();
}

window.onload = loadQuestion;
