export const getValue = (key) => {
  return localStorage.getItem(key);
};

export const setValue = (key, value) => {
  if (!key || !value) return;

  localStorage.setItem(key, value);
};

export const removeValue = (key) => {
  localStorage.removeItem(key);
};
