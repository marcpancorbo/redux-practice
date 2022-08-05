export interface User {
  accountType: string;
  email: string;
  name: string;
  languageCode: string;
  impersonator_user_name?: string;
  preferred_username: string;
  role: string[];
  exp: number;
  tempKey: string;
  shopCode: string;
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
