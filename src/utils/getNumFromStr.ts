export const getNumFromStr = (str: string) => {
  const regex = /[^0-9]/g;
  const result = str.replace(regex, "");
  const num = parseInt(result);
  return num;
};
