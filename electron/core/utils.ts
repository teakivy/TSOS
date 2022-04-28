/**
 * Find and object by its name
 * @param list The list of objects to search
 * @param name The name of the object to search for
 * @returns Found object or undefined
 */
export const findInList = (list: any[], name: string): any => {
  return list.find(item => item.name === name);
};

/**
 * Check an object is in a list
 * @param list The list of objects to search
 * @param name The name of the object to search for
 * @returns true if the object is found, false otherwise
 */
export const isInList = (list: any[], name: string): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      return true;
    }
  }
  return false;
};
