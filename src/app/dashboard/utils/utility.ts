/* export const convertArrayToKeyObject = (array: any, key: string) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, {});
}; */

export const compareArrays = <T>(arr1: T[], arr2: T[]) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((obj, idx) => objectsEqual(obj, arr2[idx]))
  );
};

export const objectsEqual = <T>(o1: T, o2: T) =>
  Object.keys(o1).length === Object.keys(o2).length &&
  Object.keys(o1).every(p => o1[p] === o2[p]);
