const colorPickers = document.querySelectorAll('input.input-color-picker');
const styleRootEl = document.querySelector(':root');

const updateColor = (cssVars) => {
  Object.keys(cssVars).forEach(key => {
    styleRootEl.style.setProperty(key, cssVars[key]);
  });
};

colorPickers.forEach((el) => {
  const cssVarKey = `--color-${el.getAttribute('data-id')}`;
  
  // listen for input to update color
  el.addEventListener('input', e => updateColor({ [cssVarKey]: e.target.value }));
  
  const propertyValue = getComputedStyle(document.documentElement).getPropertyValue(cssVarKey);
  const newHex = propertyValue.trim();
  console.log(`setting input color to ${newHex}`);
  // blend the input with the current color
  el.value = newHex;

  // make the input visible
  setTimeout(() => el.classList.add('visible'), 1000);
});