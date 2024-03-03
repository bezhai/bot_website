export const validateUsername = (username: string): boolean => {
  return /^[A-Za-z0-9]{3,50}$/.test(username);
};

export const validatePassword = (password: string): boolean => {
  return /^[A-Za-z0-9!@#$%^&*()_+]{8,30}$/.test(password);
};
