import * as globals from './globalState';

/**
 * Presets
 */
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

export class Spiral {
    _center = { x: globals.WIDTH / 2, y: globals.HEIGHT / 2 };
    _startRadius = 0;
    _spacePerLoop = 30;
    _startTheta = 0;
    _endTheta = 100;
    _thetaStep = 30;
    _spacingSlider = document.getElementById("spiralSpacingSlider");
    _spacingInput = document.getElementById("spiralSpacingInput");
    _spiralCountSlider = document.getElementById("spiralCountSlider");
    _spiralCountInput = document.getElementById("spiralCountInput");
    _stepSlider = document.getElementById("stepSlider");
    _stepInput = document.getElementById("stepInput");

    constructor() {
        this._spacingSlider.addEventListener("input", (e) => {
            this._spacePerLoop = e.target.value;
            this._spacingInput.value = this._spacePerLoop;
            this.drawSpiral();
        });
        this._spacingInput.addEventListener("input", (e) => {
            this._spacePerLoop = e.target.value;
            this._spacingSlider.value = this._spacePerLoop;
            this.drawSpiral();
        });

        this._spiralCountSlider.addEventListener("input", (e) => {
            this._endTheta = e.target.value;
            this._spiralCountInput.value = this._endTheta;
            this.drawSpiral();
        });
        this._spiralCountInput.addEventListener("input", (e) => {
            this._endTheta = e.target.value;
            this._spiralCountSlider.value = this._endTheta;
            this.drawSpiral();
        });

        this._stepSlider.addEventListener("input", (e) => {
            this._thetaStep = e.target.value;
            this._stepInput.value = this._thetaStep;
            this.drawSpiral();
        });
        this._stepInput.addEventListener("input", (e) => {
            this._thetaStep = e.target.value;
            this._stepSlider.value = this._thetaStep;
            this.drawSpiral();
        });
    }

    lineIntersection(m1, b1, m2, b2) {
        if (m1 === m2) {
            throw new Error("parallel slopes");
        }
        const x = (b2 - b1) / (m1 - m2);
        return { x: x, y: m1 * x + b1 };
    }

    pStr(point) {
        return `${point.x},${point.y} `;
    }

    getPath(center, startRadius, spacePerLoop, startTheta, endTheta, thetaStep) {
        // Rename spiral parameters for the formula r = a + bθ
        const a = startRadius;  // start distance from center
        const b = spacePerLoop / Math.PI / 2; // space between each loop

        // convert angles to radians
        let newTheta = startTheta;
        let oldTheta = newTheta = startTheta * Math.PI / 180;
        endTheta = endTheta * Math.PI / 180;
        thetaStep = thetaStep * Math.PI / 180;

        // radii
        let oldR,
            newR = a + b * newTheta;

        // start and end points
        const oldPoint = { x: 0, y: 0 };
        const newPoint = {
            x: center.x + newR * Math.cos(newTheta),
            y: center.y + newR * Math.sin(newTheta)
        };

        // slopes of tangents
        let oldslope,
            newSlope = (b * Math.sin(oldTheta) + (a + b * newTheta) * Math.cos(oldTheta)) /
                (b * Math.cos(oldTheta) - (a + b * newTheta) * Math.sin(oldTheta));

        let path = "M " + this.pStr(newPoint);

        while (oldTheta < endTheta - thetaStep) {
            oldTheta = newTheta;
            newTheta += thetaStep;

            oldR = newR;
            newR = a + b * newTheta;

            oldPoint.x = newPoint.x;
            oldPoint.y = newPoint.y;
            newPoint.x = center.x + newR * Math.cos(newTheta);
            newPoint.y = center.y + newR * Math.sin(newTheta);

            // Slope calculation with the formula:
            // (b * sinΘ + (a + bΘ) * cosΘ) / (b * cosΘ - (a + bΘ) * sinΘ)
            const aPlusBTheta = a + b * newTheta;

            let oldSlope = newSlope;
            newSlope = (b * Math.sin(newTheta) + aPlusBTheta * Math.cos(newTheta)) /
                (b * Math.cos(newTheta) - aPlusBTheta * Math.sin(newTheta));

            const oldIntercept = -(oldSlope * oldR * Math.cos(oldTheta) - oldR * Math.sin(oldTheta));
            const newIntercept = -(newSlope * newR * Math.cos(newTheta) - newR * Math.sin(newTheta));

            const controlPoint = this.lineIntersection(oldSlope, oldIntercept, newSlope, newIntercept);

            // Offset the control point by the center offset.
            controlPoint.x += center.x;
            controlPoint.y += center.y;

            path += "Q " + this.pStr(controlPoint) + this.pStr(newPoint);
        }

        return path;
    }

    drawSpiralPath() {
        //X = half width
        // Y = half height
        // 3*360 = nb of spirals
        const path = this.getPath({ x: globals.WIDTH / 2, y: globals.HEIGHT / 2 }, 
            this._startRadius,
             this._spacePerLoop,
              0,
               this._endTheta * 360,
                this._thetaStep);

        const spiral = document.querySelector('#spiral');
        spiral.setAttribute("d", path);
    }

    setSpiralTextProperties() {
        let spiralText = document.getElementById("spiraledText");

        spiralText.setAttributeNS(null, 'font-family', globals.FONT_FAMILY);
        spiralText.setAttributeNS(null, 'stroke', globals.FONT_COLOR);
        spiralText.setAttributeNS(null, 'stroke-width', globals.STROKE_WIDTH);
        spiralText.setAttributeNS(null, 'fill', globals.FONT_COLOR);
    }

    drawSpiralText() {
        this.setSpiralTextProperties();

        for (let i = 0; i < globals.NB_WORDS; i++) {
            document.querySelector("#spiraledText").textContent += globals.TEXT_VALUE;
        }
    }

    clearSpiralText() {
        let board = document.getElementById("text-base");
        let container = document.getElementById("container");

        board.remove();

        let elem = `    
        <svg id="text-base" xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"
            viewBox="0 0 1920 1080" style="background-color:#00ffc0;">
            <style type="text/css">
                @import url('${globals.FONT_URL}');
            </style> -->
    
            <path id="spiral" d="" fill="none" stroke="none" stroke-width="3" />
            <text>
            <textPath id="spiraledText" xlink:href="#spiral"></textPath>
            </text>            
        </svg>
        `

        container.innerHTML = elem;
        board.style.backgroundColor = globals.BACKGROUND_COLOR;
        board.setAttribute('width', globals.WIDTH);
        board.setAttribute('height', globals.HEIGHT);
        let vb = "0 0 " + globals.WIDTH.toString() + " " + globals.HEIGHT.toString();
        board.setAttribute('viewBox', vb);
        // this.setSpiralTextProperties();
    }

    drawSpiral() {
        this.clearSpiralText();
        this.drawSpiralPath();
        this.drawSpiralText();    
    }

}

export function createSpiral() {
    let spiral = new Spiral();

    spiral.drawSpiral();
    return spiral;
}