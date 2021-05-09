

export const encodeID = (id: number | string): string => {
  const padding = '000000';
  const studentIdLength = id.toString().length;
  return 'STUD-' + (padding.substr(studentIdLength) + id);
};

export const decodeID = (encodedID: string): number => {
  const splitted = encodedID.split('-');
  return parseInt(splitted[1]);
};
