
function isWhitespace(str: string): boolean {
  // Regular expression to match strings that contain only whitespace characters
  return /^\s*$/.test(str);
}

export default isWhitespace