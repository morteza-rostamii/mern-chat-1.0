
export function generateRandomColor() {
  // Generate a random number between 0 and 16777215 (2^24 - 1)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  // Pad the random number with zeros to always get a 6-digit hex color
  return `#${randomColor.padStart(6, '0')}`;
}
