const emailReg = /^[^\s@]+@[^\s@]+\.(com|org|ca)$/i;
export const isValidEmail = (candidate: string) => {
  return emailReg.test(candidate);
};

const passLetterReg = /[A-Za-z]/;
const passNumReg = /[0-9]/;
const passSpecialReg = /[^A-Za-z0-9\s]/;
const passNoSpaceReg = /^\S+$/;
export const validatePassword = (candidate: string) => {
  const errs: string[] = [];
  const errStringBase = "Must contain at least";

  if (!passLetterReg.test(candidate)) errs.push(`${errStringBase} 1 letter`);
  if (!passNumReg.test(candidate)) errs.push(`${errStringBase} 1 number`);
  if (!passSpecialReg.test(candidate))
    errs.push(`${errStringBase} 1 special character`);
  if (!passNoSpaceReg.test(candidate))
    errs.push(`Password cannot contain any spaces`);

  return errs;
};
