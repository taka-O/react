export type LoginResponse = {
  token: string,
  user: User,
}

export type ErrorResponse = {
  status: string,
  message: string,
  errors: Map<string, Array<string>>
}

export type Course = {
  id: number,
  name: string,
  description: string,
  startAt: string,
  endAt: string;
};

export type User = {
  id: number,
  pid: string,
  name: string,
  email: string,
  role: string;
};
