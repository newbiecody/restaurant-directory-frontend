const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

type TBody = Record<string, unknown>;
type TRequest =
  | { endpoint: string; method: "GET" | "DELETE"; headers?: HeadersInit }
  | {
      endpoint: string;
      method: "POST" | "PUT";
      headers?: HeadersInit;
      requestBody?: TBody;
    };

async function request<T>(params: TRequest): Promise<T> {
  const { endpoint, method, headers } = params;
  const url = `${BASE_URL}/api${endpoint}`;
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    credentials: "include",
  };

  if (
    (params.method === "POST" || params.method === "PUT") &&
    "requestBody" in params
  ) {
    config.body = JSON.stringify(params.requestBody);
  }

  const response = await fetch(url, config);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}

export const _get = <T>(endpoint: string) =>
  request<T>({
    method: "GET",
    endpoint,
  });

export const _put = <T>(endpoint: string, requestBody?: TBody) =>
  request<T>({
    method: "PUT",
    endpoint,
    requestBody,
  });

export const _post = <T>(endpoint: string, requestBody?: TBody) =>
  request<T>({
    method: "POST",
    endpoint,
    requestBody,
  });

export const _delete = <T>(endpoint: string) =>
  request<T>({
    method: "DELETE",
    endpoint,
  });

const api = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};

export default api;
