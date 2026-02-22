import {
  Account,
  AccountAnalyticsResponse,
  CreateAccountRequest,
} from "./account";
import { Category, CreateCategoryRequest } from "./category";
import {
  CreateTransactionRequest,
  EditTransactionRequest,
  Transaction,
  TransactionFilters,
} from "./transaction";
import { CreateObjectResponse, ErrorResponse } from "./responses";
import { LoginRequest, SignupRequest } from "./user";

export class APIClientError extends Error {
  public readonly status: number;
  public readonly response: ErrorResponse;

  constructor(message: string, status: number, response: ErrorResponse) {
    super(message);
    this.name = "APIClientError";
    this.status = status;
    this.response = response;
  }
}

export class APIClient {
  private readonly baseURL = process.env.NEXT_PUBLIC_API_URL;

  // AUTH
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
  // ENDOF AUTH

  // CATEGORIES
  public async createAccount(data: CreateAccountRequest) {
    return this.request<CreateObjectResponse<Account>>("account/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async getAccounts() {
    return this.request<Account[]>("account/", { method: "GET" });
  }

  public async getAccount(id: string) {
    return this.request<Account>(`account/${id}`, { method: "GET" });
  }

  public async getAccountTransactions(id: string, params?: TransactionFilters) {
    const _params = params ? new URLSearchParams(params) : "";
    return this.request<Transaction[]>(
      `account/${id}/transactions?${_params}`,
      {
        method: "GET",
      },
    );
  }

  public async getAccountAnalytics(id: string) {
    return this.request<AccountAnalyticsResponse[]>(`account/${id}/analytics`, {
      method: "GET",
    });
  }

  public async editAccount(data: Account) {
    return this.request<Account>(`account/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async deleteAccount(id: string) {
    return this.request<Account>(`account/${id}`, { method: "DELETE" });
  }
  //ENDOF CATEGORIES

  // TRANSACTIONS
  public async createTransactions(data: CreateTransactionRequest[]) {
    return this.request<CreateObjectResponse<Transaction>>("transaction/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async getTransactions(params?: TransactionFilters) {
    const _params = params ? new URLSearchParams(params) : "";
    return this.request<Transaction[]>(`transaction?${_params}`, {
      method: "GET",
    });
  }

  public async editTransaction(data: EditTransactionRequest) {
    return this.request<Transaction>(`transaction/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async deleteTransaction(id: string) {
    return this.request<Transaction>(`transaction/${id}`, { method: "DELETE" });
  }

  public async deleteTransactions(ids: string[]) {
    return this.request<Transaction[]>(`transaction/`, {
      method: "DELETE",
      body: JSON.stringify(ids),
    });
  }
  // ENDOF TRANSACTIONS

  // CATEGORIES
  public async createCategory(data: CreateCategoryRequest) {
    return this.request<CreateObjectResponse<Category>>("category/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async getCategories() {
    return this.request<Category[]>("category/", { method: "GET" });
  }

  public async editCategory(data: Category) {
    return this.request<Category>(`category/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  public async deleteCategory(id: string) {
    return this.request<Category>(`category/${id}`, { method: "DELETE" });
  }
  // ENDOF CATEGORIES

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
      throw new Error(
        error instanceof Error ? error.message : "Network request failed",
      );
    }

    if (response.status === 401 && refresh) {
      await this.refreshAccessToken();
      return this.request(path, init, false);
    }

    if (!response.ok) {
      throw new APIClientError(
        response.statusText || "Request failed",
        response.status,
        (await response.json()) as ErrorResponse,
      );
    }

    if (
      response.status === 204 ||
      response.status === 205 ||
      !response.headers.get("content-type")?.includes("application/json")
    ) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}
