export const nicknameValidation = (value: string) => {
  if (!value.match(/^[^0-9][^@#]+$/g)) {
    return 'Некорректное\u00a0имя!';
  }

  return true;
};
