export interface PasswordReset {
  token: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
}
