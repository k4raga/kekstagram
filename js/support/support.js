const show = (sel) => {
  sel.classList.remove("hidden");
};

const close = (sel) => {
  sel.classList.add("hidden");
};

const isEscapeKey = (evt) => {
  return evt.key === "Escape";
};

export { show, close, isEscapeKey };
