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
export let TEXT_LENGTH = 0;

export let TEXT_VALUE = "SVGENIUS ";
export let BACKGROUND_COLOR = '#00ffc0';
export let FONT_COLOR = '#ffffff';
export let NB_WORDS = 5;

/**
 * Flags
 */
export let RESET_NB_WORDS = true;

export function setWidth(width) {
    WIDTH = width;
}

export function setHeight(height) {
    HEIGHT = height;
}

export function setFontFamily(ff) {
    FONT_FAMILY = ff;
}

export function setFontUrl(FU) {
    FONT_URL = FU;
}

export function setFontSize(fs) {
    FONT_SIZE = fs;
}

export function setStrokeWidth(sw) {
    STROKE_WIDTH = sw;
}

export function setWordSpacing(ws) {
    WORD_SPACING = ws;
}

export function setTextValue(tv) {
    TEXT_VALUE = tv;
}

export function setBackgroundColor(bg) {
    BACKGROUND_COLOR = bg;
}

export function setFontColor(fc) {
    FONT_COLOR = fc;
}

export function setNbWords(nbWords) {
    NB_WORDS = nbWords;
}

export function setResetNbWords(reset) {
    RESET_NB_WORDS = reset;
}