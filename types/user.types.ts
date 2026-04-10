export default interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  picture: string;
  googleId?: string;
  bio?: string;
}
