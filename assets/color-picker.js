// color-picker todo list:
// - effect, sine wave gradient through the color space? soft pulse?

const colorPickers = document.querySelectorAll('.color-picker-input');
const styleRootEl = document.querySelector(':root');
const themeMetaEl = document.querySelector("meta[name='theme-color']");

const updateCssVarColor = (cssVars) => {
  Object.keys(cssVars).forEach(key => {
    styleRootEl.style.setProperty(key, cssVars[key]);
  });
};

colorPickers.forEach((el) => {
  const cssVarKey = `--color-${el.getAttribute('data-id')}`;
  
  // listen for input to update color
  el.addEventListener('input', e => {
    updateCssVarColor({ [cssVarKey]: e.target.value });
    themeMetaEl.content = newHex; // otherwise Safari keeps the old color in the browser chrome
  });
  
  const propertyValue = getComputedStyle(document.documentElement).getPropertyValue(cssVarKey);
  const newHex = propertyValue.trim();
  console.log(`setting color to ${newHex}`);

  // blend the input with the current color
  el.value = newHex;

  // make the color picker visible
  // todo: wrapper element access isn't ideal, grab the wrapper at the top and get its child input
  setTimeout(() => el.parentElement.classList.add('visible'), 1000);
});