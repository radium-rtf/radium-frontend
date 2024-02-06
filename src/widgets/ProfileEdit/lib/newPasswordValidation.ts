export const newPasswordValidation = (value: string): boolean | string => {
  if (value === '') return true;
  if (!value.match(/[a-zA-z]/g)) {
    return 'В\u00a0пароле\u00a0нет\u00a0букв!';
  }
  if (!value.match(/\d/g)) {
    return 'В\u00a0пароле\u00a0нет\u00a0цифр!';
  }
  if (value.length < 6) {
    return 'Слишком\u00a0короткий\u00a0пароль!';
  }
  if (value.length > 32) {
    return 'Слишком\u00a0длинный\u00a0пароль!';
  }
  return true;
};
