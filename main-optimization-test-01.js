import './style.css'
import {height} from "tailwindcss/lib/plugins";

let board = document.getElementById("text-base");
let container = document.getElementById("container");

/**
 * INPUTS TO LATER BE MODIFIED BY USERS
 */

/**
 * HD
 */
let WIDTH = 390;
let HEIGHT = 275;

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

let SPACING = 200;
let SPACING_MIN = 100;
let SPACING_MAX = 500;

let ROTATION = '-45'
let FONT_SIZE = '50px';
let FONT_FAMILY = 'JetBrains Mono, Arial, Helvetica, sans-serif';
let FONT_COLOR = '#94a3b8';
let STROKE_WIDTH = '5';
let FILL_COLOR = '#94a3b8';
let OFFSET = 3;
let TEXT_VALUE = "SVGENIUS ";

let TEXT_ANCHOR = 'middle';
let TEXT_LENGTH = '0';
let NB_LINES = 0;
let NB_WORDS = 0;

let canvas = document.createElement('canvas')
let context = canvas.getContext('2d');

let words = [];

const BrowserText = (function () {
    /**
     * Measures the rendered width of arbitrary text given the font size and font face
     * @param {string} text The text to measure
     * @param {number} fontSize The font size in pixels
     * @param {string} fontFace The font face ("Arial", "Helvetica", etc.)
     * @returns {number} The width of the text
     **/
    function getWidth(text, fontSize, fontFace) {
        context.font = fontSize + 'px ' + fontFace;
        return context.measureText(text).width;
    }

    return {
        getWidth: getWidth
    };
})();

function draw() {
    let x =  -WIDTH / 4;
    if (NB_WORDS === 0) {
        NB_WORDS = Math.round(Math.sqrt( (WIDTH * WIDTH)  + (HEIGHT * HEIGHT)) / BrowserText.getWidth(TEXT_VALUE, 50));
        document.getElementById('wordNbInput').value = NB_WORDS;
    }

    //NB_LINES =

    for (let i = -WIDTH / 4; i <= WIDTH + (WIDTH / 4); i += SPACING) {
        let txt = "";
        let txtLength = 0;

        /**
         * Offset the words from the top
         */
        // i % 2 === 0 ? NB_WORDS += OFFSET : NB_WORDS -= OFFSET;

        for (let j = 0; j < NB_WORDS; j++) {
            txt += TEXT_VALUE;
        }

        if (TEXT_LENGTH === '0')
            txtLength = BrowserText.getWidth(txt, 50).toString();

        let y = Math.round(HEIGHT / 2);
        let word = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        let rotTransform = "rotate(" + ROTATION + ',' + x.toString() + ',' + y.toString() + ')';

        word.setAttributeNS(null, 'x', x.toString());
        word.setAttributeNS(null, 'y', y.toString());
        word.setAttributeNS(null, 'text-anchor', TEXT_ANCHOR);
        word.setAttributeNS(null, 'font-size', FONT_SIZE);
        word.setAttributeNS(null, 'transform', rotTransform.toString());
        word.setAttributeNS(null, 'textLength', TEXT_LENGTH);
        word.setAttributeNS(null, 'font-family', FONT_FAMILY);
        word.setAttributeNS(null, 'stroke', FONT_COLOR);
        word.setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
        word.setAttributeNS(null, 'fill', FILL_COLOR);


        let wordObj = {
            x,
            y,
            word
        }
        words.push(wordObj);

        let fullTxt = document.createTextNode(txt);
        word.appendChild(fullTxt);

        board.appendChild(word);

        x += SPACING;
        //helloWorld.setAttributeNS(null, 'transform', 'rotate(-45, 960, 540)');
        //helloWorld.setAttributeNS(null, 'transform', 'rotate(ROTATION, posX, posY)');
    }
    console.log("Words length : " + words.length);
}

function clear() {
    board.remove();
    words = [];

    let elem = `<svg viewBox="0 0 1920 1080" id="text-base" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    </style>

    <style>
      .small { font: italic 13px sans-serif; }
      .heavy { font: bold 30px sans-serif; }
    </style>

    <!-- Guidelines -->
    <line x1="960" y1="0" x2="960" y2="1080" stroke="#000000" stroke-width="1"/>
    <line x1="0" y1="540" x2="1920" y2="540" stroke="#000000" stroke-width="1"/>
  </svg>`;

    container.innerHTML = elem;
    board = document.getElementById("text-base");
    // board.setAttribute('width', WIDTH);
    // board.setAttribute('height', HEIGHT);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
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

const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

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

function changeStrokeWidth() {
    for (let i = 0; i < words.length; i++) {
        words[i].word.setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
    }
}

function changeFontSize() {
    for (let i = 0; i < words.length; i++) {
        words[i].word.setAttributeNS(null, 'font-size', FONT_SIZE);
    }
}

function changeFontColor() {
    for (let i = 0; i < words.length; i++) {
        words[i].word.setAttributeNS(null, 'stroke', FONT_COLOR);
        words[i].word.setAttributeNS(null, 'fill', FONT_COLOR);
    }
}

function changeWordSpacing() {
    for (let i = 0; i < words.length; i++) {
        words[i].word.setAttributeNS(null, 'word-spacing', SPACING);
    }
}

function changeRotation() {
    for (let i = 0; i < words.length; i++) {
        let rotTransform = "rotate(" + ROTATION + ',' + words[i].x.toString() + ',' + words[i].y.toString() + ')';

        words[i].word.setAttributeNS(null, 'transform', rotTransform.toString());
    }
}

const processTextChange = debounce((e) => textHandler(e));
const processWidthChange = debounce((e) => widthHandler(e));
const processWordNbInput = debounce((e) => wordNbHandler(e));
const processHeightChange = debounce((e) => heightHandler(e));

let textInput = document.getElementById('textInput');
textInput.addEventListener('input', () => { processTextChange() });

let heightInput = document.getElementById('heightInput');
heightInput.addEventListener('input', () => { processHeightChange() });

let widthInput = document.getElementById('widthInput');
widthInput.addEventListener('input', () => { processWidthChange() });

let wordNbInput = document.getElementById('wordNbInput');
wordNbInput.addEventListener('input', () => { processWordNbInput() });

let backgroundColorInput = document.getElementById('backgroundColorInput');
backgroundColorInput.addEventListener('input', () => {
    board.style.backgroundColor = backgroundColorInput.value;
});

let fontColorInput = document.getElementById('fontColorInput');
fontColorInput.addEventListener('input', () => {
    FONT_COLOR = fontColorInput.value;
    FILL_COLOR = fontColorInput.value;
    changeFontColor();
});

function textHandler() {
    TEXT_VALUE = textInput.value;
    if (!textInput.value.length)
        return;
    if (TEXT_VALUE.charAt(TEXT_VALUE.length - 1) !== ' ')
        TEXT_VALUE += " ";
    clear();
    draw();
}

function widthHandler() {
    WIDTH = parseInt(widthInput.value);
    clear();
    draw();
    board.setAttribute('w', WIDTH);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function heightHandler() {
    HEIGHT = parseInt(heightInput.value);
    clear();
    draw();
    board.setAttribute('h', HEIGHT);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function wordNbHandler() {
    NB_WORDS = parseInt(wordNbInput.value);

    clear();
    draw();
}

let spacingSlider = document.getElementById('spacingSlider');
let spacingInput = document.getElementById('spacingInput');
spacingSlider.addEventListener('input', () => {
    SPACING = parseInt(spacingSlider.value);
    spacingInput.value = SPACING;
    clear();
    draw();
});
spacingInput.addEventListener('input', () => {
    if (spacingInput.value >= SPACING_MIN && spacingInput.value <= SPACING_MAX) {
        SPACING = parseInt(spacingInput.value);
        spacingSlider.value = SPACING;
        clear();
        draw();
    }
});

let rotationSlider = document.getElementById('rotationSlider');
let rotationInput = document.getElementById('rotationInput');

rotationSlider.addEventListener('input', () => {
    ROTATION = rotationSlider.value.toString();
    rotationInput.value = ROTATION;
    changeRotation();
})
rotationInput.addEventListener('input', () => {
    ROTATION = rotationInput.value.toString();
    rotationSlider.value = ROTATION;
    changeRotation();
})

let fontSizeSlider = document.getElementById('fontSizeSlider');
let fontSizeInput = document.getElementById('fontSizeInput');

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

let strokeWidthSlider = document.getElementById('strokeWidthSlider');
let strokeWidthInput = document.getElementById('strokeWidthInput');
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

let snapshotBtn = document.getElementById('snapshotBtn');
snapshotBtn.addEventListener('click', () => {
    snapshot(true);
});

let wordSpacingSlider = document.getElementById('wordSpacingSlider');
let wordSpacingInput = document.getElementById('wordSpacingInput');
wordSpacingSlider.addEventListener('input', () => {
    SPACING = wordSpacingSlider.value.toString();
    wordSpacingInput.value = wordSpacingSlider.value;
    changeWordSpacing();
});
wordSpacingInput.addEventListener('input', () => {
    SPACING = wordSpacingInput.value.toString();
    wordSpacingSlider.value = wordSpacingInput.value;
    changeWordSpacing();
});


/**
 * Settings panel
 */
let settingsCloseBtn = document.getElementById('settingsCloseBtn');
let settingsBtn = document.getElementById('settingsBtn');
let settingsPanel = document.getElementById('settings');

settingsCloseBtn.addEventListener("click", () => {
    if (settingsPanel.style.display !== 'none')
        settingsPanel.style.display = "none";
    else
        settingsPanel.style.display = "block";
});

settingsBtn.addEventListener("click", () => {
    if (settingsPanel.style.display !== 'none')
        settingsPanel.style.display = "none";
    else
        settingsPanel.style.display = "block";
});



draw();
