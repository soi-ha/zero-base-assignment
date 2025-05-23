const TIME_LIMIT = 5;

const quotesArray = [
	'he realized what was happening and told the others.',
	'And in the end it turned out that the creature was her grandfather',
	'when the old man saw his granddaughter',
];

const timerText = document.querySelector('.curr_time');
const accuracyText = document.querySelector('.curr_accuracy');
const errorText = document.querySelector('.curr_errors');
const cpmText = document.querySelector('.curr_cpm');
const wpmText = document.querySelector('.curr_wpm');
const quoteText = document.querySelector('.quote');
const inputArea = document.querySelector('.input_area');
const restartBtn = document.querySelector('.restart_btn');
const cpmGroup = document.querySelector('.cpm');
const wpmGroup = document.querySelector('.wpm');
const errorGroup = document.querySelector('.errors');
const accuracyGroup = document.querySelector('.accuracy');

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let totalErrors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let currentQuote = '';
let quoteNo = 0;
let timer = null;

function startGame() {
	resetValues();
	updateQuote();

	clearInterval(timer);
	timer = setInterval(updateTimer, 1000);
}

function resetValues() {
	timeLeft = TIME_LIMIT;
	timeElapsed = 0;
	errors = 0;
	totalErrors = 0;
	accuracy = 0;
	characterTyped = 0;
	quoteNo = 0;
	inputArea.disabled = false;

	inputArea.value = '';

	quoteText.textContent = '아래를 클릭해서 게임을 시작하세요.';
	accuracyText.textContent = 100;
	timerText.textContent = timeLeft + 's';
	errorText.textContent = 0;
	restartBtn.style.display = 'none';
	cpmGroup.style.display = 'none';
	wpmGroup.style.display = 'none';
}

function processCurrentText() {
	let currInput = inputArea.value;
	let currInputArray = currInput.split('');

	characterTyped++;

	errors = 0;

	let quoteSpanArray = quoteText.querySelectorAll('span');
	quoteSpanArray.forEach((char, index) => {
		let typedChar = currInputArray[index];
		console.log(typedChar);
		if (!typedChar) {
			char.classList.remove('correct_char');
			char.classList.remove('incorrect_char');
		} else if (typedChar === char.innerText) {
			char.classList.add('correct_char');
			char.classList.remove('incorrect_char');
		} else {
			char.classList.add('incorrect_char');
			char.classList.remove('correct_char');

			errors++;
		}
	});

	errorText.textContent = totalErrors + errors;

	let correctCharacters = characterTyped - (totalErrors + errors);
	let accuracyVal = (correctCharacters / characterTyped) * 100;
	accuracyText.textContent = Math.round(accuracyVal);

	if (currInput.length == currentQuote.length) {
		updateQuote();

		totalErrors += errors;

		inputArea.value = '';
	}
}

function updateQuote() {
	quoteText.textContent = null;
	currentQuote = quotesArray[quoteNo];

	currentQuote.split('').forEach((char) => {
		const charSpan = document.createElement('span');
		charSpan.innerText = char;

		quoteText.appendChild(charSpan);
	});

	if (quoteNo < quotesArray.length - 1) {
		quoteNo++;
	} else {
		quoteNo = 0;
	}
}

function updateTimer() {
	if (timeLeft > 0) {
		timeLeft--;

		timeElapsed++;

		timerText.textContent = timeLeft + 's';
	} else {
		finishGame();
	}
}

function finishGame() {
	clearInterval(timer);

	inputArea.disabled = true;

	quoteText.textContent = '새 게임을 시작하려면 다시 시작을 클릭하세요.';

	restartBtn.style.display = 'block';

	cpm = Math.round((characterTyped / timeElapsed) * 60);
	wpm = Math.round((characterTyped / 5 / timeElapsed) * 60);

	cpmText.textContent = cpm;
	wpmText.textContent = wpm;

	cpmGroup.style.display = 'block';
	wpmGroup.style.display = 'block';
}
