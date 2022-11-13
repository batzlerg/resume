// color-picker.js todo list:
// - effect, sine wave gradient through the color space? soft pulse?

function init() {
  const colorPickerWrapperEl = document.getElementById('color-picker');
  const colorPickerInputEl = colorPickerWrapperEl.querySelector('input:first-of-type')
  const cssVarName = colorPickerInputEl.getAttribute('data-var-name');
  const cssVarLocation = document.querySelector(':root');
  
  colorPickerInputEl.addEventListener('input', e => {
    cssVarLocation.style.setProperty(cssVarName, e.target.value);
    const themeMetaEl = document.querySelector("meta[name='theme-color']");
    console.log(`setting color to ${e.target.value}`);
    themeMetaEl.content = e.target.value; // otherwise Safari keeps the old color in the browser chrome
    colorPickerWrapperEl.dataset.tooltip = colorPickerWrapperEl.dataset.tooltip.replace(/#[\da-fA-F]{6}/i, `${e.target.value}`)
  });

  // this is wrapped in rAF because Firefox claims it doesn't know about our --color CSS var
  // until some tick after the script self-executes onload -or- after DOMContentLoaded.
  // it appears to be resolvable by inlining the contents of main.css...
  // but since this project doesn't involve a build step I'd rather keep it separate for DX reasons
  requestAnimationFrame(() => {
    const propertyValue = getComputedStyle(cssVarLocation).getPropertyValue(cssVarName);
    const newHex = propertyValue.trim();
    console.log(`setting color to ${newHex}`);
    // blend set input to current default color
    colorPickerInputEl.value = newHex;
  });

  // make the color picker visible
  setTimeout(() => colorPickerWrapperEl.classList.add('visible'), 1000);
}