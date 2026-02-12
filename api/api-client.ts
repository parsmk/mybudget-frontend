import { LoginRequest, SignupRequest } from "./user";

export class APIClientError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "APIClientError";
    this.status = status;
  }
}

export class APIClient {
  private readonly baseURL = process.env.NEXT_PUBLIC_API_URL;

  public async signup(data: SignupRequest) {
    return this.request<void>(
      "signup",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      false,
    );
  }

  public async login(data: LoginRequest) {
    return this.request<void>(
      "login",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      false,
    );
  }

  public async logout() {
    return this.request<void>("logout", { method: "POST" }, false);
  }

  private async refreshAccessToken() {
    return this.request<void>("refresh", { method: "POST" }, false);
  }

  private async request<T>(
    path: string,
    init: RequestInit = {},
    refresh = true,
  ): Promise<T> {
    const url = `${this.baseURL}/${path}`;
    const headers = new Headers(init.headers ?? {});
    init.credentials = "include";

    const isJsonPayload =
      init.body &&
      !(init.body instanceof FormData) &&
      !(init.body instanceof Blob) &&
      !headers.has("Content-Type");

    headers.set("Accept", "application/json");
    if (isJsonPayload) headers.set("Content-Type", "application/json");

    let response: Response;
    try {
      response = await fetch(url, {
        ...init,
        headers,
      });
    } catch (error) {
      throw new APIClientError(
        error instanceof Error ? error.message : "Network request failed",
        0,
      );
    }

    if (response.status === 401 && refresh) {
      await this.refreshAccessToken();
      return this.request(path, init, false);
    }

    if (!response.ok) {
      const text = await response.text();
      throw new APIClientError(
        text || response.statusText || "Request failed",
        response.status,
      );
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}
