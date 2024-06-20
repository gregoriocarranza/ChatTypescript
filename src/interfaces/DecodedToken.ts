export interface DecodedToken {
  sub: string;
  iat: number; // Issued at time
  exp: number; // Expiration time
  username?: string;
  email?: string;
}
