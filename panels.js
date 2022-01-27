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
    }
});

socialsBtn.addEventListener("click", () => {
    if (socialsPanel.style.display !== 'none') {
        socialsPanel.style.display = "none";
    } else {
        socialsPanel.style.display = "block";
        settingsPanel.style.display = "none";
    }
});
