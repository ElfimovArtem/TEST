import {
  infoText,
  sessionStorageKey,
  englishLanguage,
  russianLanguage,
  keyboardClassName,
  textareaClassName,
  infoClassName,
  keyboardButtonClassName
} from './constants.js';
import { keyboardButtonsCode } from './keyboardKeys.js'

const keyboardElement = document.createElement('div');
const textarea = document.createElement('textarea');
const info = document.createElement('p');
const keyboardBody = document.querySelector('body');
const keyboardButtonsCodeLength = keyboardButtonsCode.length;
let isCapsClicked = false;
let isShiftClicked = false;
let languageSelection = sessionStorage.getItem(sessionStorageKey) || englishLanguage;


info.innerHTML = infoText;

document.body.append(textarea);
document.body.append(keyboardElement);
document.body.append(info);

keyboardElement.classList.add(keyboardClassName);
textarea.classList.add(textareaClassName);
info.classList.add(infoClassName);
textarea.setAttribute('readonly', 'readonly');

function init() {
  for (let buttonIndex = 0; buttonIndex < keyboardButtonsCodeLength; buttonIndex++) {
    const keyboardButton = document.createElement('div');
    keyboardElement.append(keyboardButton);
    keyboardButton.classList.add(keyboardButtonClassName);
    keyboardButton.dataset.code = keyboardButtonsCode[buttonIndex].code;
    keyboardButton.dataset.en = keyboardButtonsCode[buttonIndex].en;
    keyboardButton.dataset.ru = keyboardButtonsCode[buttonIndex].ru;
    keyboardButton.dataset.printable = keyboardButtonsCode[buttonIndex].printable;
    keyboardButton.innerHTML = keyboardButtonsCode[buttonIndex][languageSelection];
  }
}

init();

keyboardBody.addEventListener('keydown', event => {
  let currentButton = document.querySelector(`[data-code='${event.code}']`);
  currentButton.classList.add('active');
  buttonDraw(currentButton);
});

keyboardBody.addEventListener('keyup', event => {
  document.querySelector(`[data-code='${event.code}']`).classList.remove('active');
});

keyboardElement.addEventListener('click', event => {
  if (event.target['classList'].contains(keyboardButtonClassName)) {
    buttonDraw(event.target);
  }
});

function buttonDraw(currentButton) {
  if (currentButton.dataset.printable === 'false') {
    if (currentButton.dataset.code === 'Backspace') {
      return textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    }
    if (currentButton.dataset.code === 'Space') {
      return textarea.innerHTML += ' ';
    }
    if (currentButton.dataset.code === 'ArrowRight') {
      return textarea.innerHTML += '►';
    }
    if (currentButton.dataset.code === 'ArrowLeft') {
      return textarea.innerHTML += '◄';
    }
    if (currentButton.dataset.code === 'ArrowDown') {
      return textarea.innerHTML += '▼';
    }
    if (currentButton.dataset.code === 'ArrowUp') {
      return textarea.innerHTML += '▲';
    }
    if (currentButton.dataset.code === 'Delete') {
      return textarea.innerHTML = '';
    }
    if (currentButton.dataset.code === 'Tab') {
      return textarea.innerHTML += '      ';
    }
    if (currentButton.dataset.code === 'Enter') {
      return textarea.innerHTML += '\n';
    }
    return;
  }
  let buttonValue = currentButton.innerHTML;

  return textarea.textContent += buttonValue;
}

document.addEventListener('keydown', event => {
  if (event.code === 'ShiftLeft' && (event.ctrlKey || event.metaKey) && languageSelection === englishLanguage) {
    languageSelection = russianLanguage;
    sessionStorage.setItem(sessionStorageKey, languageSelection);
    keyboardElement.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  } else if (event.code === 'ShiftLeft' && (event.ctrlKey || event.metaKey) && languageSelection === russianLanguage) {
    languageSelection = englishLanguage;
    sessionStorage.setItem(sessionStorageKey, languageSelection);
    keyboardElement.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  }
});

document.addEventListener('keydown', event => {
  if (event.code === 'CapsLock' && isCapsClicked === false) {
    const currentButtonCapsOn = document.querySelector(`[data-code='CapsLock']`);
    currentButtonCapsOn.classList.add('caps');
    isCapsClicked = true;
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
    });
  } else if (event.code === 'CapsLock' && isCapsClicked === true) {
    const currentButtonCapsOff = document.querySelector(`[data-code='CapsLock']`);
    currentButtonCapsOff.classList.remove('caps');
    isCapsClicked = false;
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toLowerCase();
      }
    });
  }
});

keyboardBody.addEventListener('click', event => {
  if (event.target['dataset'].code === 'CapsLock' && isCapsClicked === false) {
    isCapsClicked = true;
    let currentButton = document.querySelector(`[data-code='CapsLock']`);
    currentButton.classList.add('active');
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
    });
  } else if (event.target['dataset'].code === 'CapsLock' && isCapsClicked === true) {
    isCapsClicked = false;
    let currentButton = document.querySelector(`[data-code='CapsLock']`);
    currentButton.classList.remove('active');
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toLowerCase();
      }
    });
  }
});

keyboardBody.addEventListener('keydown', event => {
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isShiftClicked === false) {
    isShiftClicked = true;
    keyboardElement.querySelectorAll('.keyboard-button').forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
      if (el.dataset.code === 'Digit1') {
        el.innerHTML = '!';
      }
      if (el.dataset.code === 'Digit2' && languageSelection === englishLanguage) {
        el.innerHTML = '@';
      } else if (el.dataset.code === 'Digit2' && languageSelection === russianLanguage) {
        el.innerHTML = '"';
      }
      if (el.dataset.code === 'Digit3' && languageSelection === englishLanguage) {
        el.innerHTML = '#';
      } else if (el.dataset.code === 'Digit3' && languageSelection === russianLanguage) {
        el.innerHTML = '№';
      }
      if (el.dataset.code === 'Digit4' && languageSelection === englishLanguage) {
        el.innerHTML = '$';
      } else if (el.dataset.code === 'Digit4' && languageSelection === russianLanguage) {
        el.innerHTML = ';';
      }
      if (el.dataset.code === 'Digit5' && languageSelection === englishLanguage) {
        el.innerHTML = '%';
      } else if (el.dataset.code === 'Digit5' && languageSelection === russianLanguage) {
        el.innerHTML = '%';
      }
      if (el.dataset.code === 'Digit6' && languageSelection === englishLanguage) {
        el.innerHTML = '^';
      } else if (el.dataset.code === 'Digit6' && languageSelection === russianLanguage) {
        el.innerHTML = ':';
      }
      if (el.dataset.code === 'Digit7' && languageSelection === englishLanguage) {
        el.innerHTML = '&';
      } else if (el.dataset.code === 'Digit7' && languageSelection === russianLanguage) {
        el.innerHTML = '?';
      }
      if (el.dataset.code === 'Digit8' && languageSelection === englishLanguage) {
        el.innerHTML = '*';
      } else if (el.dataset.code === 'Digit8' && languageSelection === russianLanguage) {
        el.innerHTML = '*';
      }
      if (el.dataset.code === 'Digit9' && languageSelection === englishLanguage) {
        el.innerHTML = '(';
      } else if (el.dataset.code === 'Digit9' && languageSelection === russianLanguage) {
        el.innerHTML = '(';
      }
      if (el.dataset.code === 'Digit0' && languageSelection === englishLanguage) {
        el.innerHTML = ')';
      } else if (el.dataset.code === 'Digit0' && languageSelection === russianLanguage) {
        el.innerHTML = ')';
      }
      if (el.dataset.code === 'Minus' && languageSelection === englishLanguage) {
        el.innerHTML = '_';
      } else if (el.dataset.code === 'Minus' && languageSelection === russianLanguage) {
        el.innerHTML = '_';
      }
      if (el.dataset.code === 'Equal' && languageSelection === englishLanguage) {
        el.innerHTML = '+';
      } else if (el.dataset.code === 'Equal' && languageSelection === russianLanguage) {
        el.innerHTML = '+';
      }
      if (el.dataset.code === 'Backslash' && languageSelection === englishLanguage) {
        el.innerHTML = '|';
      } else if (el.dataset.code === 'Backslash' && languageSelection === russianLanguage) {
        el.innerHTML = '/';
      }
      if (el.dataset.code === 'BracketLeft' && languageSelection === englishLanguage) {
        el.innerHTML = '{';
      }
      if (el.dataset.code === 'Semicolon' && languageSelection === englishLanguage) {
        el.innerHTML = ':';
      }
      if (el.dataset.code === 'Quote' && languageSelection === englishLanguage) {
        el.innerHTML = '"';
      }
      if (el.dataset.code === 'BracketRight' && languageSelection === englishLanguage) {
        el.innerHTML = '}';
      }
      if (el.dataset.code === 'Comma' && languageSelection === englishLanguage) {
        el.innerHTML = '<';
      }
      if (el.dataset.code === 'Period' && languageSelection === englishLanguage) {
        el.innerHTML = '>';
      }
    });
  }
});

keyboardBody.addEventListener('keyup', event => {
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isShiftClicked === true) {
    isShiftClicked = false;
    keyboardElement.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  }
});
