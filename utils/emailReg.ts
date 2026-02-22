const reg = /^[^\s@]+@[^\s@]+\.(com|org|ca)$/i;

export const testEmailString = (candidate: string) => {
  return reg.test(candidate);
};
