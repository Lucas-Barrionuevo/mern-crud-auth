import bcrypt from 'bcryptjs';

export async function encrypt(text) {
  const hashedText = await bcrypt.hash(text, 10);
  return hashedText;
}

export async function decrypt(text, hashedText) {
  const isMatch = await bcrypt.compare(text, hashedText);
  return isMatch;
}
