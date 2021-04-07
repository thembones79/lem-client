// helper function to use in Array.sort() function to sort array of objects via key
// usage:  arrayOfObjects.sort(by("keyName"))  OR  arrayOfObjects.sort(by("keyName", "desc"))

export const by = <T extends object, K extends keyof T>(
  key: K,
  order = "asc"
) => {
  return function innerSort(a: T, b: T) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }
    // @ts-ignore
    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    // @ts-ignore
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};
