const keyboard = document.createElement('div');
const textarea = document.createElement('textarea');
const info = document.createElement('p');
const keyboardBody = document.querySelector('body');
let isCaps = false;
let isShift = false;
let languageSelection = sessionStorage.getItem('lang') || 'en';


info.innerHTML = 'Для перевода на Английскую расскладку используйте следующее сочетание клавиш на Вашей клавиатуре - ' +
  'ControlLeft + ShiftLeft';

document.body.append(textarea);
document.body.append(keyboard);
document.body.append(info);

keyboard.classList.add('keyboard');
textarea.classList.add('textarea');
info.classList.add('info');
textarea.setAttribute('readonly', 'readonly');

const keyboardButtonsCode = [
  {code: 'Backquote', en: '`', ru: 'ё', printable: true},
  {code: 'Digit1', en: '1', ru: '1', printable: true},
  {code: 'Digit2', en: '2', ru: '2', printable: true},
  {code: 'Digit3', en: '3', ru: '3', printable: true},
  {code: 'Digit4', en: '4', ru: '4', printable: true},
  {code: 'Digit5', en: '5', ru: '5', printable: true},
  {code: 'Digit6', en: '6', ru: '6', printable: true},
  {code: 'Digit7', en: '7', ru: '7', printable: true},
  {code: 'Digit8', en: '8', ru: '8', printable: true},
  {code: 'Digit9', en: '9', ru: '9', printable: true},
  {code: 'Digit0', en: '0', ru: '0', printable: true},
  {code: 'Minus', en: '-', ru: '-', printable: true},
  {code: 'Equal', en: '=', ru: '=', printable: true},
  {code: 'Backspace', en: 'Backspace', ru: 'Backspace', printable: false},
  {code: 'Tab', en: 'Tab', ru: 'Tab', printable: false},
  {code: 'KeyQ', en: 'q', ru: 'й', printable: true},
  {code: 'KeyW', en: 'w', ru: 'ц', printable: true},
  {code: 'KeyE', en: 'e', ru: 'у', printable: true},
  {code: 'KeyR', en: 'r', ru: 'к', printable: true},
  {code: 'KeyT', en: 't', ru: 'е', printable: true},
  {code: 'KeyY', en: 'y', ru: 'н', printable: true},
  {code: 'KeyU', en: 'u', ru: 'г', printable: true},
  {code: 'KeyI', en: 'i', ru: 'ш', printable: true},
  {code: 'KeyO', en: 'o', ru: 'щ', printable: true},
  {code: 'KeyP', en: 'p', ru: 'з', printable: true},
  {code: 'BracketLeft', en: '[', ru: 'х', printable: true},
  {code: 'BracketRight', en: ']', ru: 'ъ', printable: true},
  {code: 'Backslash', en: '\\', ru: '\\', printable: true},
  {code: 'Delete', en: 'DEL', ru: 'DEL', printable: false},
  {code: 'CapsLock', en: 'Caps Lock', ru: 'Caps Lock', printable: false},
  {code: 'KeyA', en: 'a', ru: 'ф', printable: true},
  {code: 'KeyS', en: 's', ru: 'ы', printable: true},
  {code: 'KeyD', en: 'd', ru: 'в', printable: true},
  {code: 'KeyF', en: 'f', ru: 'а', printable: true},
  {code: 'KeyG', en: 'g', ru: 'п', printable: true},
  {code: 'KeyH', en: 'h', ru: 'р', printable: true},
  {code: 'KeyJ', en: 'j', ru: 'о', printable: true},
  {code: 'KeyK', en: 'k', ru: 'л', printable: true},
  {code: 'KeyL', en: 'l', ru: 'д', printable: true},
  {code: 'Semicolon', en: ';', ru: 'ж', printable: true},
  {code: 'Quote', en: '\'', ru: 'э', printable: true},
  {code: 'Enter', en: 'Enter', ru: 'Enter', printable: false},
  {code: 'ShiftLeft', en: 'Shift', ru: 'Shift', printable: false},
  {code: 'IntlBackslash', en: '\\', ru: '\\', printable: true},
  {code: 'KeyZ', en: 'z', ru: 'я', printable: true},
  {code: 'KeyX', en: 'x', ru: 'ч', printable: true},
  {code: 'KeyC', en: 'c', ru: 'с', printable: true},
  {code: 'KeyV', en: 'v', ru: 'м', printable: true},
  {code: 'KeyB', en: 'b', ru: 'и', printable: true},
  {code: 'KeyN', en: 'n', ru: 'т', printable: true},
  {code: 'KeyM', en: 'm', ru: 'ь', printable: true},
  {code: 'Comma', en: ',', ru: 'б', printable: true},
  {code: 'Period', en: '.', ru: 'ю', printable: true},
  {code: 'Slash', en: '/', ru: '.', printable: true},
  {code: 'ArrowUp', en: '▲', ru: '▲', printable: false},
  {code: 'ShiftRight', en: 'Shift', ru: 'Shift', printable: false},
  {code: 'ControlLeft', en: 'Ctrl', ru: 'Ctrl', printable: false},
  {code: 'MetaLeft', en: 'Win', ru: 'Win', printable: false},
  {code: 'AltLeft', en: 'Alt', ru: 'Alt', printable: false},
  {code: 'Space', en: ' ', ru: ' ', printable: true},
  {code: 'AltRight', en: 'Alt', ru: 'Alt', printable: false},
  {code: 'ArrowLeft', en: '◄', ru: '◄', printable: false},
  {code: 'ArrowDown', en: '▼', ru: '▼', printable: false},
  {code: 'ArrowRight', en: '►', ru: '►', printable: false},
  {code: 'ControlRight', en: 'Ctrl', ru: 'Ctrl', printable: false}
];

function init() {
  for (let i = 0; i < keyboardButtonsCode.length; i++) {
    const keyboardButton = document.createElement('div');
    keyboard.append(keyboardButton);
    keyboardButton.classList.add('keyboard-button');
    keyboardButton.dataset.code = keyboardButtonsCode[i].code;
    keyboardButton.dataset.en = keyboardButtonsCode[i].en;
    keyboardButton.dataset.ru = keyboardButtonsCode[i].ru;
    keyboardButton.dataset.printable = keyboardButtonsCode[i].printable;
    keyboardButton.innerHTML = keyboardButtonsCode[i][languageSelection];
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

keyboard.addEventListener('click', event => {
  if (event.target["classList"].contains('keyboard-button')) {
    buttonDraw(event.target);
  }
});

function buttonDraw(curBtn) {
  if (curBtn.dataset.printable === 'false') {
    if (curBtn.dataset.code === 'Backspace') {
      return textarea.innerHTML = textarea.innerHTML.slice(0, -1);
    }
    if (curBtn.dataset.code === 'Space') {
      return textarea.innerHTML += ' ';
    }
    if (curBtn.dataset.code === 'ArrowRight') {
      return textarea.innerHTML += '►';
    }
    if (curBtn.dataset.code === 'ArrowLeft') {
      return textarea.innerHTML += '◄';
    }
    if (curBtn.dataset.code === 'ArrowDown') {
      return textarea.innerHTML += '▼';
    }
    if (curBtn.dataset.code === 'ArrowUp') {
      return textarea.innerHTML += '▲';
    }
    if (curBtn.dataset.code === 'Delete') {
      return textarea.innerHTML = '';
    }
    if (curBtn.dataset.code === 'Tab') {
      return textarea.innerHTML += '      ';
    }
    if (curBtn.dataset.code === 'Enter') {
      return textarea.innerHTML += '\n';
    }
    return;
  }
  let buttonValue = curBtn.innerHTML;

  return textarea.textContent += buttonValue;
}

document.addEventListener('keydown', event => {
  if (event.code === 'ShiftLeft' && (event.ctrlKey || event.metaKey) && languageSelection === 'en') {
    languageSelection = 'ru';
    sessionStorage.setItem('lang', languageSelection);
    keyboard.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  } else if (event.code === 'ShiftLeft' && (event.ctrlKey || event.metaKey) && languageSelection === 'ru') {
    languageSelection = 'en';
    sessionStorage.setItem('lang', languageSelection);
    keyboard.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  }
});

document.addEventListener('keydown', event => {
  if (event.code === 'CapsLock' && isCaps === false) {
    const currentButtonCapsOn = document.querySelector(`[data-code='CapsLock']`);
    currentButtonCapsOn.classList.add('caps');
    isCaps = true;
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
    });
  } else if (event.code === 'CapsLock' && isCaps === true) {
    const currentButtonCapsOff = document.querySelector(`[data-code='CapsLock']`);
    currentButtonCapsOff.classList.remove('caps');
    isCaps = false;
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toLowerCase();
      }
    })
  }
});

keyboardBody.addEventListener('click', event => {
  if (event.target["dataset"].code === 'CapsLock' && isCaps === false) {
    isCaps = true;
    let currentButton = document.querySelector(`[data-code='CapsLock']`);
    currentButton.classList.add('active');
    let allButtons = document.querySelectorAll('.keyboard-button');
    allButtons.forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
    });
  } else if (event.target["dataset"].code === 'CapsLock' && isCaps === true) {
    isCaps = false;
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
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isShift === false) {
    isShift = true;
    keyboard.querySelectorAll('.keyboard-button').forEach(el => {
      if (el.dataset.printable === 'true') {
        el.innerHTML = el.innerHTML.toUpperCase();
      }
      if (el.dataset.code === 'Digit1') {
        el.innerHTML = '!';
      }
      if (el.dataset.code === 'Digit2' && languageSelection === 'en') {
        el.innerHTML = '@';
      } else if (el.dataset.code === 'Digit2' && languageSelection === 'ru') {
        el.innerHTML = '"';
      }
      if (el.dataset.code === 'Digit3' && languageSelection === 'en') {
        el.innerHTML = '#';
      } else if (el.dataset.code === 'Digit3' && languageSelection === 'ru') {
        el.innerHTML = '№';
      }
      if (el.dataset.code === 'Digit4' && languageSelection === 'en') {
        el.innerHTML = '$';
      } else if (el.dataset.code === 'Digit4' && languageSelection === 'ru') {
        el.innerHTML = ';';
      }
      if (el.dataset.code === 'Digit5' && languageSelection === 'en') {
        el.innerHTML = '%';
      } else if (el.dataset.code === 'Digit5' && languageSelection === 'ru') {
        el.innerHTML = '%';
      }
      if (el.dataset.code === 'Digit6' && languageSelection === 'en') {
        el.innerHTML = '^';
      } else if (el.dataset.code === 'Digit6' && languageSelection === 'ru') {
        el.innerHTML = ':';
      }
      if (el.dataset.code === 'Digit7' && languageSelection === 'en') {
        el.innerHTML = '&';
      } else if (el.dataset.code === 'Digit7' && languageSelection === 'ru') {
        el.innerHTML = '?';
      }
      if (el.dataset.code === 'Digit8' && languageSelection === 'en') {
        el.innerHTML = '*';
      } else if (el.dataset.code === 'Digit8' && languageSelection === 'ru') {
        el.innerHTML = '*';
      }
      if (el.dataset.code === 'Digit9' && languageSelection === 'en') {
        el.innerHTML = '(';
      } else if (el.dataset.code === 'Digit9' && languageSelection === 'ru') {
        el.innerHTML = '(';
      }
      if (el.dataset.code === 'Digit0' && languageSelection === 'en') {
        el.innerHTML = ')';
      } else if (el.dataset.code === 'Digit0' && languageSelection === 'ru') {
        el.innerHTML = ')';
      }
      if (el.dataset.code === 'Minus' && languageSelection === 'en') {
        el.innerHTML = '_';
      } else if (el.dataset.code === 'Minus' && languageSelection === 'ru') {
        el.innerHTML = '_';
      }
      if (el.dataset.code === 'Equal' && languageSelection === 'en') {
        el.innerHTML = '+';
      } else if (el.dataset.code === 'Equal' && languageSelection === 'ru') {
        el.innerHTML = '+';
      }
      if (el.dataset.code === 'Backslash' && languageSelection === 'en') {
        el.innerHTML = '|';
      } else if (el.dataset.code === 'Backslash' && languageSelection === 'ru') {
        el.innerHTML = '/';
      }
      if (el.dataset.code === 'BracketLeft' && languageSelection === 'en') {
        el.innerHTML = '{';
      }
      if (el.dataset.code === 'Semicolon' && languageSelection === 'en') {
        el.innerHTML = ':';
      }
      if (el.dataset.code === 'Quote' && languageSelection === 'en') {
        el.innerHTML = '"';
      }
      if (el.dataset.code === 'BracketRight' && languageSelection === 'en') {
        el.innerHTML = '}';
      }
      if (el.dataset.code === 'Comma' && languageSelection === 'en') {
        el.innerHTML = '<';
      }
      if (el.dataset.code === 'Period' && languageSelection === 'en') {
        el.innerHTML = '>';
      }
    })
  }
});

keyboardBody.addEventListener('keyup', event => {
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && isShift === true) {
    isShift = false;
    keyboard.querySelectorAll('.keyboard-button').forEach(el => el.remove());
    init();
  }
});
