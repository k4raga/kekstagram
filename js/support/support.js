const show = (sel) => {
  sel.classList.remove("hidden");
};

const close = (sel) => {
  sel.classList.add("hidden");
};

export { show, close };
