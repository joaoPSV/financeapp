export const generateRandomPassword = (size: number): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < size; i++) {
    const indiceAleatorio = Math.floor(Math.random() * chars.length);
    password += chars.charAt(indiceAleatorio);
  }

  return password;
};
