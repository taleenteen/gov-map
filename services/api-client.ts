const isServer = typeof window === "undefined";

const BASE_URL = isServer
  ? "http://app:3000"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, ...init } = options;

    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const headers = {
      "Content-Type": "application/json",
      ...init.headers,
    };

    const response = await fetch(url, {
      ...init,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw new Error(
        error.message || `Request failed with status ${response.status}`
      );
    }

    return response.json();
  }

  static get<T>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>(endpoint, { method: "GET", params });
  }

  static post<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  static patch<T>(endpoint: string, body: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  static delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}
