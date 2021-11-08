import './style.css'

let board = document.getElementById("text-base");
let container = document.getElementById("container");

/**
 * INPUTS TO LATER BE MODIFIED BY USERS
 */
let WIDTH = 1920;
let HEIGHT = 1080;
let SPACING = 200;
let ROTATION = '90'
let FONT_SIZE = '50px';
let FONT_FAMILY = 'JetBrains Mono, Arial, Helvetica, sans-serif';
let FONT_COLOR = '#00CD8CFF';
let STROKE_WIDTH = '5';
let FILL_COLOR = '#00CD8CFF';
let OFFSET = 3;

let TEXT_ANCHOR = 'middle';
let TEXT_LENGTH = '0';
let NB_LINES = 10;
let NB_WORDS = 20;

let canvas = document.createElement('canvas'),
    context = canvas.getContext('2d');

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
// let x = 0;
    let x =  -WIDTH / 4;
// for (let i = 0; i < NB_LINES; i++) {

    const Y = 540;

    for (let i = 0; i < WIDTH + (WIDTH / 4); i++) {
        let txt = "";
        let txtLength = 0;

        /**
         * Offset the words from the top
         */
        i % 2 === 0 ? NB_WORDS += OFFSET : NB_WORDS -= OFFSET;

        for (let j = 0; j < NB_WORDS; j++) {
            // txt += i.toString();
            txt += "SVGENIUS ";
        }

        if (TEXT_LENGTH === '0')
            txtLength = BrowserText.getWidth(txt, 50).toString();
        console.log("[ Text length : " + txtLength + "]");

        // let y = i % 2 === 0 ? Y + txtLength : Y - txtLength;
        // y /= NB_WORDS;
        let y = 0;

        // console.log(txtLength / NB_WORDS);


        let word = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        // let rotTransform = "rotate(" + ROTATION + ',' + x.toString() + ',' + '0' + ')';
        let rotTransform = "rotate(" + ROTATION + ',' + x.toString() + ',' + y.toString() + ')';

        word.setAttributeNS(null, 'x', x.toString());

        //let y = Y +
        //console.log("Y : " + i % 2);

        word.setAttributeNS(null, 'y', y.toString());
        word.setAttributeNS(null, 'text-anchor', TEXT_ANCHOR);
        word.setAttributeNS(null, 'font-size', FONT_SIZE);
        word.setAttributeNS(null, 'transform', rotTransform.toString());
        word.setAttributeNS(null, 'textLength', TEXT_LENGTH);
        // word.setAttributeNS(null, 'textLength', TEXT_LENGTH);
        word.setAttributeNS(null, 'font-family', FONT_FAMILY);
        word.setAttributeNS(null, 'stroke', FONT_COLOR);
        word.setAttributeNS(null, 'stroke-width', STROKE_WIDTH);
        word.setAttributeNS(null, 'fill', FILL_COLOR);



        let fullTxt = document.createTextNode(txt);
        word.appendChild(fullTxt);

        board.appendChild(word);

        x += SPACING;
        //helloWorld.setAttributeNS(null, 'transform', 'rotate(-45, 960, 540)');
        //helloWorld.setAttributeNS(null, 'transform', 'rotate(ROTATION, posX, posY)');
    }
    // snapshot(true);
}

function clear() {
    board.remove();
    let elem = `<svg w="1080" h="1920" viewBox="0 0 1920 1080" id="text-base" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
    </style>

    <style>
      .small { font: italic 13px sans-serif; }
      .heavy { font: bold 30px sans-serif; }

      /* Note that the color of the text is set with the    *
       * fill property, the color property is for HTML only */
      /*.Rrrrr { font: italic 40px serif; fill: #efeeef; }*/
      .Rrrrr { font: italic 40px serif; fill: #00cd8c; }
    </style>

    <!-- Guidelines -->
    <line x1="960" y1="0" x2="960" y2="1080" stroke="#000000" stroke-width="1"/>
    <line x1="0" y1="540" x2="1920" y2="540" stroke="#000000" stroke-width="1"/>
  </svg>`;

    container.innerHTML = elem;
    board = document.getElementById("text-base");
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

draw();

let widthSlider = document.getElementById('widthSlider');
widthSlider.addEventListener('input', () => {
    console.log("lol");
    console.log(widthSlider.value);
})


// export function onWidthChange(event) {
// }


let heightSlider = document.getElementById('heightSlider');
let spacingSlider = document.getElementById('spacingSlider');
let rotationSlider = document.getElementById('rotationSlider');
let fontSizeSlider = document.getElementById('fontSizeSlider');
fontSizeSlider.addEventListener('input', () => {
    FONT_SIZE = fontSizeSlider.value.toString() + "px";
    console.log(FONT_SIZE);
    clear();
    draw();
})


let strokeWidthSlider = document.getElementById('strokeWidthSlider');
let offsetSlider = document.getElementById('offsetSlider');
