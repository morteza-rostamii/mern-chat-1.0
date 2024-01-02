function validateEmail(email: string): boolean {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  console.log('--', emailRegex.test(email))
  return emailRegex.test(email);
}

export default validateEmail