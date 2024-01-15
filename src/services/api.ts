type RequestMethod = "GET" | "POST | PUT" | "DELETE";
type RequestFormat = keyof Omit<Body, "body" | "bodyUsed">;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}
interface HttpInitParams {
  baseUrl: string;
  headers: {
    "content-type": ContentType;
    token?: string;
  };
}
interface RequestParams extends Partial<HttpInitParams> {
  path: string;
  method: RequestMethod;
  body?: unknown;
  secure?: boolean;
  format?: RequestFormat;
}

interface HttpResonse<D, E> extends Response {
  data: D;
  error: E;
}

interface ErrorModel {
  errors: {
    body: string[];
  };
}

class HttpClient {
  private baseUrl = "";

  constructor(config: HttpInitParams) {
    Object.assign(this, config);
  }

  protected request = async <D, E = ErrorModel>(
    params: RequestParams
  ): Promise<HttpResonse<D, E>> => {
    const fullRequestUrl = this.baseUrl;
    const format: RequestFormat = params.format || "json";

    const res = await fetch(fullRequestUrl);
    const jsonRes = await res[format]();
    return jsonRes;
  };
}

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
}

export class Api extends HttpClient {
  auth = {
    set: (token: string) => {
      try {
        localStorage.setItem("token", token);
      } catch (e) {
        console.error("Cannot set token!");
        console.error(e);
      }
    },
    remove: () => {
      try {
        localStorage.removeItem("token");
      } catch (e) {
        console.error("Cannot remove token!");
        console.error(e);
      }
    },
  };
  articles = {
    getArticlesFeed: (query?: { offset?: number; limit?: number }) =>
      this.request<{
        articles: Article[];
        articlesCount: number;
      }>({
        path: "/articles",
        method: "GET",
      }),
  };
}
