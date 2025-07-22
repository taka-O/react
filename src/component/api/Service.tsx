function getHeaders(token: string | null): HeadersInit {
  const headers = new Headers();

  headers.set('Content-Type', 'application/json');
  if (token !== null) {
    headers.set('Authorization', 'Bearer ' + token);
  }

  return headers;
}

export async function get(
  endpoint: string,
  params?: Record<string, any>,
  token: string | null = null,
): Promise<Response> {
  let query = new URLSearchParams();

  if (params !== undefined) {
    Object.keys(params).forEach(key => {
      if (params[key] !== null) {
        query.set(key, params[key]);
      }
    });
  }

  return await fetch(`${endpoint}?${query}`, {
    method: 'GET',
    headers: getHeaders(token),
  });
};

export async function post(
  endpoint: string,
  params?: Record<string, unknown>,
  token: string | null = null,
): Promise<Response> {
  return await fetch(`${endpoint}`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(params),
  });
}

