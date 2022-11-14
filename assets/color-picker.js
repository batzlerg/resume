// this was initially a prototyping tool that I used to trial new accent colors
// during development. turns out it's kind of fun and I left it in after a little cleanup.

// init(): bootstrap the --color-accent color picker
function init() {
  const colorPickerWrapperEl = document.getElementById('color-picker');
  const colorPickerInputEl = colorPickerWrapperEl.querySelector('input:first-of-type')
  const cssVarName = colorPickerInputEl.getAttribute('data-var-name');
  const cssVarLocation = document.querySelector(':root');
  const themeMetaEl = document.querySelector("meta[name='theme-color']");
  
  // any time the picker value changes, we want to update:
  // - the --color-accent var
  // - the theme meta tag (so that browsers who use it for custom chrome stay consistent)
  // - the picker tooltip (we don't really *need* to display it there but I like it for discoverability)
  colorPickerInputEl.addEventListener('input', e => {
    console.log(`setting color to ${e.target.value}`);
    cssVarLocation.style.setProperty(cssVarName, e.target.value);
    themeMetaEl.content = e.target.value;
    colorPickerWrapperEl.dataset.tooltip = colorPickerWrapperEl.dataset.tooltip.replace(/#[\da-fA-F]{6}/i, `${e.target.value}`)
  });

  // this is wrapped in setTimeout because Firefox claims it doesn't know about our --color CSS var
  // until some tick after the script self-executes onload -or- after DOMContentLoaded.
  // it appears to be resolvable by inlining the contents of main.css...
  // but since this project doesn't involve a build step I'd rather keep it separate for DX reasons
  setTimeout(() => {
    const propertyValue = getComputedStyle(cssVarLocation).getPropertyValue(cssVarName);
    const newHex = propertyValue.trim();
    console.log(`setting color to ${newHex}`);
    // blend set input to current default color
    colorPickerInputEl.value = newHex;
  }, 0);

  // this triggers an inbound animation; it's on a delay so that visitors have a moment
  // to process the page load before being introduced to dynamic elements
  setTimeout(() => colorPickerWrapperEl.classList.add('visible'), 1500);
}