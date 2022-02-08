import '../style.css'
import { createSpiral } from './spiral';
import { createDiagonalText, DiagonalText } from './diagonalText';
import * as globals from './globals';

export let currentMode = 0;
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
        fontColor: "#00FF11",
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

function widthHandler() {
    let board = document.getElementById("text-base");

    globals.setWidth(parseInt(widthInput.value));
    globals.setResetNbWords(true);
    if (currentMode === 0) {
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        spiralText.drawSpiral();
    }
    board.setAttribute('w', globals.WIDTH);
    let vb = "0 0 " + globals.WIDTH.toString() + " " + globals.HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function heightHandler() {
    let board = document.getElementById("text-base");

    globals.setHeight(parseInt(heightInput.value));
    globals.setResetNbWords(true);
    if (currentMode === 0) {
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        spiralText.drawSpiral();
    }
    board.setAttribute('h', globals.HEIGHT);
    let vb = "0 0 " + globals.WIDTH.toString() + " " + globals.HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function textHandler() {
    globals.setTextValue(textInput.value);
    if (!textInput.value.length)
        return;
    if (globals.TEXT_VALUE.charAt(globals.TEXT_VALUE.length - 1) !== ' ') {
        let tmp = globals.TEXT_VALUE + " "
        globals.setTextValue(tmp);
    }
    globals.setResetNbWords(true);
    if (currentMode === 0) {
        diagonalText.redraw();
    }
    if (currentMode === 1) {
        spiralText.drawSpiral();
    }
}

function wordNbHandler() {
    let board = document.getElementById("text-base");

    globals.setNbWords(wordNbInput.value);
    if (currentMode === 0) {
        diagonalText.redraw();
        board = document.getElementById("text-base");
        container = document.getElementById("container");
    }
    if (currentMode === 1) {
        spiralText.drawSpiral();
        board = document.getElementById("text-base");
        container = document.getElementById("container");
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
    let board = document.getElementById("textBg");

    globals.setBackgroundColor(backgroundColorInput.value);
    textBg.style.fill = globals.BACKGROUND_COLOR;
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
diagBtn.checked = true;

spiralBtn.addEventListener('click', () => {
    changeCurrentMode(1);
    diagBtn.checked = false;
});
diagBtn.addEventListener('click', () => {
    changeCurrentMode(0);
    spiralBtn.checked = false;
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
        document.querySelector("#spiraledText").setAttributeNS(null, 'stroke-width', globals.STROKE_WIDTH);
    }
}

function changeFontSize() {
    if (currentMode === 0) {
        diagonalText.changeFontSize();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'font-size', globals.FONT_SIZE);
    }
}

function changeFontColor() {
    if (currentMode === 0) {
        diagonalText.changeFontColor();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'stroke', globals.FONT_COLOR);
        document.querySelector("#spiraledText").setAttributeNS(null, 'fill', globals.FONT_COLOR);
    }
}

fontColorInput.addEventListener('input', (e) => {
    globals.setFontColor(e.target.value)
    changeFontColor();
});

fontSizeSlider.addEventListener('input', (e) => {
    fontSizeInput.value = e.target.value;
    globals.setFontSize(e.target.value.toString() + "px");
    changeFontSize();
})
fontSizeInput.addEventListener('input', (e) => {
    fontSizeSlider.value = e.target.value;
    globals.setFontSize(e.target.value.toString() + "px");
    changeFontSize();
})

strokeWidthSlider.addEventListener('input', (e) => {
    globals.setStrokeWidth(e.target.value.toString());
    strokeWidthInput.value = e.target.value;
    changeStrokeWidth();
});

strokeWidthInput.addEventListener('input', (e) => {
    strokeWidthSlider.value = e.target.value;
    globals.setStrokeWidth(e.target.value.toString());
    changeStrokeWidth();
});

fontFamilyInput.addEventListener('input', (e) => {
    globals.setFontFamily(e.target.value.toString());
    console.log(e.target.value.toString());
    if (currentMode === 0) {
        diagonalText.redraw();
        console.log("redrawing");
    } else if (currentMode === 1) {
        spiralText.drawSpiral();
    }
});

fontFamilyURL.addEventListener('input', (e) => {
    globals.setFontUrl(e.target.value.toString());
    console.log(e.target.value.toString());

    if (currentMode === 0) {
        console.log("redrawing");
        diagonalText.redraw();
    } else if (currentMode === 1) {
        spiralText.drawSpiral();
    }
});

snapshotBtn.addEventListener('click', () => {
    snapshot(true);
});

wordSpacingSlider.addEventListener('input', (e) => {
    globals.setWordSpacing(e.target.value.toString());
    wordSpacingInput.value = wordSpacingSlider.value;
    changeWordSpacing();
});
wordSpacingInput.addEventListener('input', (e) => {
    globals.setWordSpacing(e.target.value.toString());
    wordSpacingSlider.value = wordSpacingInput.value;
    changeWordSpacing();
});

function changeWordSpacing() {
    if (currentMode === 0) {
        diagonalText.changeWordSpacing();
    }
    if (currentMode === 1) {
        document.querySelector("#spiraledText").setAttributeNS(null, 'word-spacing', globals.WORD_SPACING);
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
    let board = document.getElementById("text-base");

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
    let board = document.getElementById("text-base");
    let index = Math.floor(Math.random() * PRESETS.length);
    let preset = PRESETS[index];

    globals.setTextValue(preset.word);
    globals.setBackgroundColor(preset.backgroundColor);
    globals.setFontColor(preset.fontColor);
    globals.setFontSize(preset.fontSize);
    globals.setStrokeWidth(preset.strokeWidth);
    globals.setWordSpacing(preset.wordSpacing);

    tmpSpacing = preset.spacing;
    tmpRotation = preset.rotation;

    board.style.backgroundColor = globals.BACKGROUND_COLOR;

    //set slider values
    textInput.value = globals.TEXT_VALUE;
    backgroundColorInput.value = globals.BACKGROUND_COLOR;
    fontColorInput.value = globals.FONT_COLOR;
    fontSizeInput.value = globals.FONT_SIZE;
    strokeWidthInput.value = globals.STROKE_WIDTH;
    wordSpacingInput.value = globals.WORD_SPACING;

    if (preset.word.includes("Freddie")) {
        plausible('FREDDIE');
    }
}

function changeCurrentMode(mode) {
    // mode 0 is diagonal text
    // mode 1 is diagonal spiral
    currentMode = mode;
    let board = document.getElementById("text-base");

    if (mode === 0) {
        if (!diagonalText)
            diagonalText = createDiagonalText(tmpSpacing, tmpRotation);
        else {
            diagonalText.clearDiagonalText();
            diagonalText.drawDiagonalText();
        }

        board = document.getElementById("text-base");
        container = document.getElementById("container");
    } else if (mode === 1) {
        if (!spiralText)
            spiralText = createSpiral();
        else {
            spiralText.clearSpiralText
            spiralText.drawSpiral();
        }

        board = document.getElementById("text-base");
        container = document.getElementById("container");
    }
}

generateRandomBackground();
changeCurrentMode(0);
