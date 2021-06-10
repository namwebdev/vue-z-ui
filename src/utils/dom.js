export const on = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

export const off = (element, event, handler, useCapture = false) => {
  if (element && event && handler) {
    element.removeListener(event, handler, useCapture);
  }
};
