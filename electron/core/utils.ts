export const findInList = (list: any[], name: string): any => {
  return list.find(item => item.name === name);
};

export const isInList = (list: any[], name: string): boolean => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === name) {
      return true;
    }
  }
  return false;
};
