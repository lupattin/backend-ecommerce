declare type minimalAuthUserData = {
  userId: string;
  email: string;
};

declare type tokenData = { userId: string; iat: number; email: string };
