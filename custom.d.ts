declare type minimalAuthUserData = {
  userId: string;
  email: string;
};

declare type tokenData = { userId: number; iat: number; email: string };
