/**
 * Settings panel
 */
let settingsCloseBtn = document.getElementById('settingsCloseBtn');
let settingsBtn = document.getElementById('settingsBtn');
let settingsPanel = document.getElementById('settings');

/**
 * Socials panel
 */
let socialsCloseBtn = document.getElementById('socialsCloseBtn');
let socialsBtn = document.getElementById('socialsBtn');
let socialsPanel = document.getElementById('socials');

 
 /**
 * Help panel
 */
let helpCloseBtn = document.getElementById('helpCloseBtn');
let helpBtn = document.getElementById('helpBtn');
let helpPanel = document.getElementById('helpPanel');

let diagonalTextBtn = document.getElementById('diagonalBtn');
let spiralTextBtn = document.getElementById('spiralBtn');
let diagonalTextSettingsPanel = document.getElementById('diagonalTextInputs');
let spiralTextSettingsPanel = document.getElementById('spiralTextInputs');

/**
 * Settings panel controls
 */
settingsCloseBtn.addEventListener("click", () => {
    if (settingsPanel.style.display !== 'none') {
        settingsPanel.style.display = "none";
    } else {
        settingsPanel.style.display = "block";
        socialsPanel.style.display = "none";
    }
});

settingsBtn.addEventListener("click", () => {
    if (settingsPanel.style.display !== 'none') {
        settingsPanel.style.display = "none";
    } else {
        settingsPanel.style.display = "block";
        socialsPanel.style.display = "none";
        helpPanel.style.display = "none";
    }
});

/**
 * Socials panel controls
 */
 socialsCloseBtn.addEventListener("click", () => {
    if (socialsPanel.style.display !== 'none') {
        socialsPanel.style.display = "none";
    } else {
        socialsPanel.style.display = "block";
        settingsPanel.style.display = "none";
        helpPanel.style.display = "block";
    }
});

socialsBtn.addEventListener("click", () => {
    if (socialsPanel.style.display !== 'none') {
        socialsPanel.style.display = "none";
    } else {
        socialsPanel.style.display = "block";
        settingsPanel.style.display = "none";
        helpPanel.style.display = "none";
    }
});

/**
 * Help panel controls
 */
 helpCloseBtn.addEventListener("click", () => {
    if (helpPanel.style.display !== 'none') {
        helpPanel.style.display = "none";
    } else {
        helpPanel.style.display = "block";
        settingsPanel.style.display = "none";
        socialsPanel.style.display = "none";
    }
});

helpBtn.addEventListener("click", () => {
    if (helpPanel.style.display !== 'none') {
        helpPanel.style.display = "none";
    } else {
        helpPanel.style.display = "block";
        settingsPanel.style.display = "none";
        socialsPanel.style.display = "none";
    }
});


/**
 * Diagonal / spiral text panel activators
 */
diagonalTextBtn.addEventListener("click", () => {
    spiralTextSettingsPanel.style.display = "none";
    diagonalTextSettingsPanel.style.display = "block";
});

spiralTextBtn.addEventListener("click", () => {
    diagonalTextSettingsPanel.style.display = "none";
    spiralTextSettingsPanel.style.display = "block";
});

