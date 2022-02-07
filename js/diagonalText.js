import * as globals from './globals';

let canvas = document.createElement('canvas')
let context = canvas.getContext('2d');

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

export class DiagonalText {
    _words = [];
    spacingSlider = document.getElementById('spacingSlider');
    spacingInput = document.getElementById('spacingInput');
    rotationSlider = document.getElementById('rotationSlider');
    rotationInput = document.getElementById('rotationInput');

    TEXT_ANCHOR = 'middle';
    SPACING = 200;
    SPACING_MIN = 100;
    SPACING_MAX = 500;
    ROTATION = '-45'

    constructor(spacing, rotation) {
        this.spacingSlider.addEventListener('input', () => {
            this.SPACING = parseInt(this.spacingSlider.value);
            this.spacingInput.value = this.SPACING;
            this.clearDiagonalText();
            this.drawDiagonalText();
        });
        this.spacingInput.addEventListener('input', () => {
            if (this.spacingInput.value >= this.SPACING_MIN && this.spacingInput.value <= this.SPACING_MAX) {
                this.SPACING = parseInt(this.spacingInput.value);
                this.spacingSlider.value = this.SPACING;
                this.clearDiagonalText();
                this.drawDiagonalText();
            }
        });

        this.rotationSlider.addEventListener('input', () => {
            this.ROTATION = parseInt(this.rotationSlider.value.toString());
            this.rotationInput.value = parseInt(this.ROTATION);
            this.changeRotation();
        })
        this.rotationInput.addEventListener('input', () => {
            this.ROTATION = parseInt(this.rotationInput.value.toString());
            if (isNaN(this.ROTATION))
                this.ROTATION = -45;
            this.rotationSlider.value = parseInt(this.ROTATION);
            this.changeRotation();
        })

        if (spacing) {
            this.SPACING = spacing;
            this.spacingSlider.value = this.SPACING;
            this.spacingInput.value = this.SPACING;
        }
        if (rotation) {
            this.ROTATION = rotation;
            this.rotationSlider.value = this.ROTATION;
            this.rotationInput.value = this.ROTATION;
        }
    }

    drawDiagonalText() {
        let x = -globals.WIDTH / 4;
        let clipPath = document.getElementById("clip-path");

        if (globals.RESET_NB_WORDS) {
            globals.setNbWords(
                Math.round(Math.sqrt((globals.WIDTH * globals.WIDTH)
             + (globals.HEIGHT * globals.HEIGHT)) / BrowserText.getWidth(globals.TEXT_VALUE, 50))
            );
            document.getElementById('wordNbInput').value = globals.NB_WORDS;
            globals.setResetNbWords(false);
        }

        if (this.SPACING === 0)
            this.SPACING = 100;
        for (let i = -globals.WIDTH / 4; i <= globals.WIDTH + (globals.WIDTH / 4); i += this.SPACING) {
            let txt = "";
            let txtLength = 0;

            for (let j = 0; j < globals.NB_WORDS; j++) {
                txt += globals.TEXT_VALUE;
            }

            if (globals.TEXT_LENGTH === '0')
                txtLength = BrowserText.getWidth(txt, 50).toString();

            let y = Math.round(globals.HEIGHT / 2);
            let word = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            let rotTransform = "rotate(" + this.ROTATION + ',' + x.toString() + ',' + y.toString() + ')';

            word.setAttributeNS(null, 'x', x.toString());
            word.setAttributeNS(null, 'y', y.toString());
            word.setAttributeNS(null, 'text-anchor', this.TEXT_ANCHOR);
            word.setAttributeNS(null, 'font-size', globals.FONT_SIZE);
            word.setAttributeNS(null, 'transform', rotTransform.toString());
            word.setAttributeNS(null, 'font-family', globals.FONT_FAMILY);
            word.setAttributeNS(null, 'stroke', globals.FONT_COLOR);
            word.setAttributeNS(null, 'stroke-width', globals.STROKE_WIDTH);
            word.setAttributeNS(null, 'fill', globals.FONT_COLOR);
            word.setAttributeNS(null, 'word-spacing', globals.WORD_SPACING);


            let wordObj = {
                x,
                y,
                word
            }
            this._words.push(wordObj);

            let fullTxt = document.createTextNode(txt);
            word.appendChild(fullTxt);

            clipPath.appendChild(word);

            x += this.SPACING;
        }
    }

    clearDiagonalText() {
        let board = document.getElementById("text-base");
        let container = document.getElementById("container");

        board.remove();
        this._words = [];

        let elem = `
        <svg viewBox="0 0 1920 1080" id="text-base" xmlns="http://www.w3.org/2000/svg" style="background-color:#ffffff;">
            <rect width="100%" height="100%" id="textBg"/>
            <style type="text/css">
            @import url('${globals.FONT_URL}');
            </style>
        
            <style>
            .small { font: italic 13px sans-serif; }
            .heavy { font: bold 30px sans-serif; }
            </style>

            <defs>
                <rect id="rect" width="100%" height="100%" />
                <clipPath id="clip">
                    <use xlink:href="#rect"/>
                </clipPath>
            </defs>

            <g clip-path="url(#clip)" id="clip-path">
            </g>
    
        </svg>`;

        container.innerHTML = elem;
        board = document.getElementById("text-base");
        board.firstElementChild.style.fill = globals.BACKGROUND_COLOR;

        
        board.setAttribute('width', globals.WIDTH);
        board.setAttribute('height', globals.HEIGHT);
        let vb = "0 0 " + globals.WIDTH.toString() + " " + globals.HEIGHT.toString();
        board.setAttribute('viewBox', vb);
    }

    redraw() {   
        this.clearDiagonalText();
        this.drawDiagonalText();
    }

    changeStrokeWidth() {
        for (let i = 0; i < this._words.length; i++) {
            this._words[i].word.setAttributeNS(null, 'stroke-width', globals.STROKE_WIDTH);
        }
    }

    changeFontSize() {
        for (let i = 0; i < this._words.length; i++) {
            this._words[i].word.setAttributeNS(null, 'font-size', globals.FONT_SIZE);
        }
    }

    changeFontColor() {
        for (let i = 0; i < this._words.length; i++) {
            this._words[i].word.setAttributeNS(null, 'stroke', globals.FONT_COLOR);
            this._words[i].word.setAttributeNS(null, 'fill', globals.FONT_COLOR);
        }
    }

    changeWordSpacing() {
        for (let i = 0; i < this._words.length; i++) {
            this._words[i].word.setAttributeNS(null, 'word-spacing', globals.WORD_SPACING);
        }
    }

    changeRotation() {
        for (let i = 0; i < this._words.length; i++) {
            let rotTransform = "rotate(" + this.ROTATION + ',' + this._words[i].x.toString() + ',' + this._words[i].y.toString() + ')';

            this._words[i].word.setAttributeNS(null, 'transform', rotTransform.toString());
        }
    }
}

export function createDiagonalText() {
    let diagonalText = new DiagonalText();

    diagonalText.clearDiagonalText();
    diagonalText.drawDiagonalText();
    return diagonalText;
}