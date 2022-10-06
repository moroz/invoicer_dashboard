// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
export const omit = (obj: any, props: string[]) => {
  obj = { ...obj };
  props.forEach((prop) => delete obj[prop]);
  return obj;
};
