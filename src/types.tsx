export type User = {
  id: number,
  pid: string,
  name: string,
  email: string,
  role: string;
};

export type LoginResponse = {
  token: string,
  user: User,
}

export type ErrorResponse = {
  status: string,
  message: string,
  errors: Map<string, Array<string>>
}
