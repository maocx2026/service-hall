export function formScrollIntoError(el) {
  let flag = 0;
  el.fields.forEach((fieldComp) => {
    if (flag === 0) {
      if (fieldComp.validateState === 'error') {
        flag += 1;
        fieldComp.$el.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  });
}
