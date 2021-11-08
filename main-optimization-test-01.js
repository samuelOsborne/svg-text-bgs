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
let WIDTH = 1920;
let HEIGHT = 1080;

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
let FONT_COLOR = '#ff0085';
let STROKE_WIDTH = '5';
let FILL_COLOR = '#FF0085FF';
let OFFSET = 3;
let TEXT_VALUE = "SVGENIUS ";

let TEXT_ANCHOR = 'middle';
let TEXT_LENGTH = '0';
let NB_LINES = 10;
let NB_WORDS = 20;

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
    NB_WORDS = Math.round(Math.sqrt( (WIDTH * WIDTH)  + (HEIGHT * HEIGHT)) / BrowserText.getWidth(TEXT_VALUE, 50));

    let test = WIDTH - SPACING;
    console.log("[ Nb words calculated : " + NB_WORDS + " ]");
    console.log("[ WIDTH - SPACING : " + test + " ]");

    for (let i = -WIDTH / 4; i <= WIDTH + (WIDTH / 4); i += SPACING) {
        let txt = "";
        let txtLength = 0;
        console.log(i);

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

function changeRotation() {
    for (let i = 0; i < words.length; i++) {
        let rotTransform = "rotate(" + ROTATION + ',' + words[i].x.toString() + ',' + words[i].y.toString() + ')';

        words[i].word.setAttributeNS(null, 'transform', rotTransform.toString());
    }
}

const processWidthChange = debounce((e) => widthHandler(e));
const processHeightChange = debounce((e) => heightHandler(e));

let heightSlider = document.getElementById('heightSlider');
heightSlider.addEventListener('input', () => { processHeightChange() });

let widthSlider = document.getElementById('widthSlider');
widthSlider.addEventListener('input', () => { processWidthChange() });

function widthHandler() {
    WIDTH = parseInt(widthSlider.value);
    clear();
    draw();
    console.log("width : " + WIDTH);
    board.setAttribute('w', WIDTH);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

function heightHandler() {
    HEIGHT = parseInt(heightSlider.value);
    clear();
    draw();
    console.log("height : " + HEIGHT);
    board.setAttribute('h', HEIGHT);
    let vb = "0 0 " + WIDTH.toString() + " " + HEIGHT.toString();
    board.setAttribute('viewBox', vb);
}

let spacingSlider = document.getElementById('spacingSlider');
let spacingInput = document.getElementById('spacingInput');
spacingSlider.addEventListener('input', () => {
    console.log(SPACING);
    SPACING = parseInt(spacingSlider.value);
    spacingInput.value = SPACING;
    clear();
    draw();
});
spacingInput.addEventListener('input', () => {
    console.log(SPACING);
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
    console.log(ROTATION);
    changeRotation();
})
rotationInput.addEventListener('input', () => {
    ROTATION = rotationInput.value.toString();
    rotationSlider.value = ROTATION;
    console.log(ROTATION);
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
})
strokeWidthInput.addEventListener('input', () => {
    STROKE_WIDTH = strokeWidthInput.value.toString();
    strokeWidthSlider.value = strokeWidthInput.value;
    changeStrokeWidth();
})

let snapshotBtn = document.getElementById('snapshotBtn');
snapshotBtn.addEventListener('click', () => {
    snapshot(true);
})


let offsetSlider = document.getElementById('offsetSlider');

draw();
