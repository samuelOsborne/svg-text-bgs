import * as globals from './globals';

//Todo:
//Spiral: spiral needs to be kept at a minimum size
//backgrounds + text not showing in figma

export class Spiral {
    _center = { x: globals.WIDTH / 2, y: globals.HEIGHT / 2 };
    _startRadius = 0;
    _spacePerLoop = 115;
    _startTheta = 0;
    _endTheta = 5;
    _thetaStep = 30;
    _spacingSlider = document.getElementById("spiralSpacingSlider");
    _spacingInput = document.getElementById("spiralSpacingInput");
    _spiralCountSlider = document.getElementById("spiralCountSlider");
    _spiralCountInput = document.getElementById("spiralCountInput");
    _stepSlider = document.getElementById("stepSlider");
    _stepInput = document.getElementById("stepInput");
    _showPathCheckbox = document.getElementById("showSpiralPath");

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

        this._showPathCheckbox.addEventListener('change', (e) => {
            let spiralPath = document.getElementById("spiral");

            if (this._showPathCheckbox.checked) {
                spiralPath.setAttribute("stroke", "black");
            } else {
                spiralPath.setAttribute("stroke", "none");
            }
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

        spiralText.setAttributeNS(null, 'font-size', globals.FONT_SIZE);
        spiralText.setAttributeNS(null, 'font-family', globals.FONT_FAMILY);
        spiralText.setAttributeNS(null, 'stroke', globals.FONT_COLOR);
        spiralText.setAttributeNS(null, 'stroke-width', globals.STROKE_WIDTH);
        spiralText.setAttributeNS(null, 'fill', globals.FONT_COLOR);
    }

    drawSpiralText() {
        for (let i = 0; i < globals.NB_WORDS; i++) {
            document.querySelector("#spiraledText").textContent += globals.TEXT_VALUE;
        }
        this.setSpiralTextProperties();
    }

    clearSpiralText() {
        let board = document.getElementById("text-base");
        let container = document.getElementById("container");

        board.remove();

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
                <rect id="rect" width="100%" height="100%" fill="none"/>
                <clipPath id="clip">
                    <use xlink:href="#rect"/>
                </clipPath>
            </defs>

            <g clip-path="url(#clip)">
                <path id="spiral" d="" fill="none" stroke="none" stroke-width="3" />
                <text id="text">
                    <textPath id="spiraledText" xlink:href="#spiral"></textPath>
                </text>
            </g>
      </svg>`;


        container.innerHTML = elem;
        board = document.getElementById("text-base");
        board.firstElementChild.style.fill = globals.BACKGROUND_COLOR;
        board.setAttribute('width', globals.WIDTH);
        board.setAttribute('height', globals.HEIGHT);
        let vb = "0 0 " + globals.WIDTH.toString() + " " + globals.HEIGHT.toString();
        board.setAttribute('viewBox', vb);    
        let spiralPath = document.getElementById("spiral");
        if (this._showPathCheckbox.checked)
            spiralPath.setAttribute("stroke", "black");
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