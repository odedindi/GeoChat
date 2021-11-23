export const normalizePort = (val: any) => {
  const PORT = parseInt(val, 10);
  if (Number.isNaN(PORT)) return val;
  if (PORT >= 0) return PORT;
  return false;
};
