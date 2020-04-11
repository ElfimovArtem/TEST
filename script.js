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
    keyboardButton.dataset.isShiftEn = keyboardButtonsCode[buttonIndex].isShiftEn;
    keyboardButton.dataset.isShiftRu = keyboardButtonsCode[buttonIndex].isShiftRu;
    keyboardButton.dataset.nonPrintableValues = keyboardButtonsCode[buttonIndex].nonPrintableValues;
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
  if (currentButton.dataset.printable === 'false' && currentButton.dataset.code === 'Backspace') {
    return textarea.innerHTML = textarea.innerHTML.slice(0, -1);
  } else if (currentButton.dataset.printable === 'false' && currentButton.dataset.code === 'Delete') {
    return textarea.innerHTML = '';
  } else if (currentButton.dataset.printable === 'false' && currentButton.dataset.nonPrintableValues) {
    return textarea.innerHTML += currentButton.dataset.nonPrintableValues;
  } else if (currentButton.dataset.printable === 'true') {
    let buttonValue = currentButton.innerHTML;
    return textarea.textContent += buttonValue;
  }
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
      if (el.dataset.printable === 'true' && el.dataset.isShiftEn && languageSelection === englishLanguage) {
        el.innerHTML = el.dataset.isShiftEn;
      } else if (el.dataset.printable === 'true' && el.dataset.isShiftRu && languageSelection === russianLanguage) {
        el.innerHTML = el.dataset.isShiftRu;
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
