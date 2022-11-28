export const checkPasswordValidity = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'Mật khẩu không chứa khoảng trắng';
  }
  const isValidLength = /^.{8,30}$/;
  if (!isValidLength.test(value)) {
    return 'Mật khẩu phải từ 8 kí tự!';
  }
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'Mật khẩu phải có một kí tự viết hoa!';
  }
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'Mật khẩu có ít nhất một chữ số!';
  }
  return null;
};