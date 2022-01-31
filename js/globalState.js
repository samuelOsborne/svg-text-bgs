import '../style.css'
import { createSpiral } from './spiral';
import { createDiagonalText } from './diagonalText';
import * as globals from './globals';

export let currentMode = 0;

let board = document.getElementById("text-base");
let container = document.getElementById("container");

let diagonalText = null;
let spiralText = null;

let tmpSpacing;
let tmpRotation;

let PRESETS = [
    {
        word: 'HAMBURGER 🍔 ',
        backgroundColor: '#FF0000',
        fontColor: "#FFFFFF",
        spacing: 200,
        rotation: -45,
        fontSize: 50,
        strokeWidth: 5,
        wordSpacing: 5
    },
    {
        word: 'Delivermoo 🐄 ',
        backgroundColor: '#00ccbc',
        fontColor: "#FFFFFF",
        spacing: 384,
        rotation: 39,
        fontSize: 52,
        strokeWidth: 3,
        wordSpacing: 0
    },
    {
        word: 'Nine guys 🌯 ',
        backgroundColor: '#FF0000',
        fontColor: "#FFFFFF",
        spacing: 384,
        rotation: 39,
        fontSize: 52,
        strokeWidth: 3,
        wordSpacing: 0
    },
    {
        word: 'Howdy 🤠 ',
        backgroundColor: '#BB00FF',
        fontColor: "#FFFFFF",
        spacing: 384,
        rotation: 321,
        fontSize: 52,
        strokeWidth: 3,
        wordSpacing: 0
    },
    {
        word: 'WooHoo! ',
        backgroundColor: '#FFFFFF',
        fontColor: "#D400FF",
        spacing: 181,
        rotation: -50,
        fontSize: 52,
        strokeWidth: 3,
        wordSpacing: 0
    },
    {
        word: 'Take me to your leader! 👽 ',
        backgroundColor: '#000000',
        fontColor: "#CFCFCF",
        spacing: 216,
        rotation: -30,
        fontSize: 36,
        strokeWidth: 3,
        wordSpacing: 0
    },
    {
        word: 'Freddie! 🐈 ',
        backgroundColor: '#FF33A0',
        fontColor: "#FFFFFF",
        spacing: 470,
        rotation: -38,
        fontSize: 36,
        strokeWidth: 3,
        wordSpacing: 0
    },
]

/**
 * HD
*/
export let WIDTH = 1920;
export let HEIGHT = 1080;

/**
 * 8K FUHD
 */
// let WIDTH = 7680;
// let HEIGHT = 4320;

/**
 * 4K UHD
 */
// let WIDTH = 3840;
// let HEIGHT = 2160;

export let FONT_FAMILY = 'JetBrains Mono, Arial, Helvetica, sans-serif';
export let FONT_URL = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap';
export let FONT_SIZE = '50px';
export let STROKE_WIDTH = '5';
export let WORD_SPACING = 5;

export let TEXT_VALUE = "SVGENIUS ";
export let BACKGROUND_COLOR = '#00ffc0';
export let FONT_COLOR = '#ffffff';
export let NB_WORDS = 5;

/**
 * Flags
 */
export let RESET_NB_WORDS = true;

export function setNbWords(nb) {
    NB_WORDS = nb;
    document.getElementById('wordNbInput').value = NB_WORDS;
}

export function setResetNbWords(reset) {
    RESET_NB_WORDS = reset;
}

function widthHandler() {
    WIDTH = parseInt(widthInput.value);
    RESET_NB_WORDS = true;
    if (currentMode === 0) {
        // do diagonal text
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        // createSpiral();
        spiralText.drawSpiral();
    }
    board.setAttribute('w', WIDTH);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function heightHandler() {
    HEIGHT = parseInt(heightInput.value);
    RESET_NB_WORDS = true;
    if (currentMode === 0) {
        // do diagonal text
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        // createSpiral();
        spiralText.drawSpiral();
    }
    board.setAttribute('h', HEIGHT);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function textHandler() {
    TEXT_VALUE = textInput.value;
    if (!textInput.value.length)
        return;
    if (TEXT_VALUE.charAt(TEXT_VALUE.length - 1) !== ' ')
        TEXT_VALUE += " ";
    RESET_NB_WORDS = true;
    if (currentMode === 0) {
        // do diagonal text
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        // createSpiral();
        spiralText.drawSpiral();
    }
}

function wordNbHandler() {
    NB_WORDS = parseInt(wordNbInput.value);

    if (currentMode === 0) {
        // do diagonal text
        diagonalText.redraw();
        board = document.getElementById("text-base");
        // spiralText = document.getElementById("spiraledText");
        container = document.getElementById("container");

        //Call method here
    }
    if (currentMode === 1) {
        // spiralText.createSpiral();
        spiralText.drawSpiral();
    }
}

const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function changeBackgroundColor() {
    board.style.backgroundColor = backgroundColorInput.value;
    BACKGROUND_COLOR = backgroundColorInput.value;
}

let fontSizeSlider = document.getElementById('fontSizeSlider');
let fontSizeInput = document.getElementById('fontSizeInput');
let strokeWidthSlider = document.getElementById('strokeWidthSlider');
let strokeWidthInput = document.getElementById('strokeWidthInput');
let fontFamilyInput = document.getElementById('fontFamilyInput');
let fontFamilyURL = document.getElementById('fontURLInput');
let snapshotBtn = document.getElementById('snapshotBtn');
let wordSpacingSlider = document.getElementById('wordSpacingSlider');
let wordSpacingInput = document.getElementById('wordSpacingInput');
let textInput = document.getElementById('textInput');
let heightInput = document.getElementById('heightInput');
let widthInput = document.getElementById('widthInput');
let wordNbInput = document.getElementById('wordNbInput');
let backgroundColorInput = document.getElementById('backgroundColorInput');
let fontColorInput = document.getElementById('fontColorInput');

/**
 * Mode buttons
 */
let spiralBtn = document.getElementById('spiralBtn');
let diagBtn = document.getElementById('diagonalBtn');

spiralBtn.addEventListener('click', () => {
    changeCurrentMode(1);
});
diagBtn.addEventListener('click', () => {
    changeCurrentMode(0);
});

//add spiral button listeners

const processTextChange = debounce((e) => textHandler(e));
const processWordNbInput = debounce((e) => wordNbHandler(e));
const processHeightChange = debounce((e) => heightHandler(e));
const processWidthChange = debounce((e) => widthHandler(e));


textInput.addEventListener('input', () => { processTextChange() });
heightInput.addEventListener('input', () => { processHeightChange() });
widthInput.addEventListener('input', () => { processWidthChange() });
wordNbInput.addEventListener('input', () => { processWordNbInput() });


backgroundColorInput.addEventListener('input', changeBackgroundColor);

function changeStrokeWidth() {
    if (currentMode === 0) {
        diagonalText.changeStrokeWidth();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
    }
}

function changeFontSize() {
    if (currentMode === 0) {
        diagonalText.changeFontSize();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'font-size', FONT_SIZE);
    }
}

function changeFontColor() {
    if (currentMode === 0) {
        diagonalText.changeFontColor();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'stroke', FONT_COLOR);
        document.querySelector("#spiraledText").setAttributeNS(null, 'fill', FONT_COLOR);
    }
}

fontColorInput.addEventListener('input', () => {
    FONT_COLOR = fontColorInput.value;
    changeFontColor();
});

fontSizeSlider.addEventListener('input', () => {
    fontSizeInput.value = fontSizeSlider.value;
    FONT_SIZE = fontSizeSlider.value.toString() + "px";
    changeFontSize();
})
fontSizeInput.addEventListener('input', () => {
    fontSizeSlider.value = fontSizeInput.value;
    FONT_SIZE = fontSizeInput.value.toString() + "px";
    changeFontSize();
})

strokeWidthSlider.addEventListener('input', () => {
    STROKE_WIDTH = strokeWidthSlider.value.toString();
    strokeWidthInput.value = strokeWidthSlider.value;
    changeStrokeWidth();
});

strokeWidthInput.addEventListener('input', () => {
    STROKE_WIDTH = strokeWidthInput.value.toString();
    strokeWidthSlider.value = strokeWidthInput.value;
    changeStrokeWidth();
});

fontFamilyInput.addEventListener('input', () => {
    FONT_FAMILY = fontFamilyInput.value.toString();
    createSpiral();
});

fontFamilyURL.addEventListener('input', () => {
    FONT_URL = fontFamilyURL.value.toString();
    createSpiral();
});

snapshotBtn.addEventListener('click', () => {
    snapshot(true);
});

wordSpacingSlider.addEventListener('input', () => {
    WORD_SPACING = wordSpacingSlider.value.toString();
    wordSpacingInput.value = wordSpacingSlider.value;
    changeWordSpacing();
});
wordSpacingInput.addEventListener('input', () => {
    WORD_SPACING = wordSpacingInput.value.toString();
    wordSpacingSlider.value = wordSpacingInput.value;
    changeWordSpacing();
});

function changeWordSpacing() {
    if (currentMode === 0) {
        diagonalText.changeWordSpacing();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'word-spacing', WORD_SPACING);
    }
}

/**
 * Triggers download on the page
 */
function triggerDownload(dataUri, filename) {
    const element = document.createElement('a');
    element.href = dataUri;
    element.download = filename;
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
};

/**
 * Grab a snapshot of the created SVG
 */
function snapshot(download = true) {
    let data;

    // Get SVG element and serialize markup
    const serializedSvg = new XMLSerializer().serializeToString(board);
    data = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(serializedSvg);

    // Trigger file download if needed
    if (download) {
        triggerDownload(data, `snapshot.svg`);
    }

    return data;
};

function generateRandomBackground() {
    let index = Math.floor(Math.random() * PRESETS.length);
    // let index = PRESETS.length - 1;
    let preset = PRESETS[index];

    TEXT_VALUE = preset.word;
    BACKGROUND_COLOR = preset.backgroundColor;
    FONT_COLOR = preset.fontColor;
    tmpSpacing = preset.spacing;
    tmpRotation = preset.rotation;
    FONT_SIZE = preset.fontSize;
    STROKE_WIDTH = preset.strokeWidth;
    WORD_SPACING = preset.wordSpacing;

    board.style.backgroundColor = BACKGROUND_COLOR;

    //set slider values
    textInput.value = TEXT_VALUE;
    backgroundColorInput.value = BACKGROUND_COLOR;
    fontColorInput.value = FONT_COLOR;
    // spacingInput.value = SPACING;
    // rotationInput.value = ROTATION;
    fontSizeInput.value = FONT_SIZE;
    strokeWidthInput.value = STROKE_WIDTH;
    wordSpacingInput.value = WORD_SPACING;
}

function changeCurrentMode(mode) {
    // mode 0 is diagonal text
    // mode 1 is diagonal spiral
    console.log(mode);

    currentMode = mode;

    console.log(diagonalText);
    // console.log(spiralText);

    if (mode === 0) {
        if (spiralText)
            spiralText.clearSpiralText();
        if (!diagonalText)
            diagonalText = createDiagonalText(tmpSpacing, tmpRotation);
        else
            diagonalText.drawDiagonalText();

        board = document.getElementById("text-base");
        // spiralText = document.getElementById("spiraledText");
        container = document.getElementById("container");
    } else if (mode === 1) {
        if (diagonalText)
            diagonalText.clearDiagonalText();
        if (!spiralText)
            spiralText = createSpiral();
        else
            spiralText.drawSpiral();

        board = document.getElementById("text-base");
        // spiralText = document.getElementById("spiraledText");
        container = document.getElementById("container");
    }
}

generateRandomBackground();
changeCurrentMode(0);
