import {
  GraphQLClient,
  liveProvider as graphqlLiveProvider,
} from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetch-wrapper";
import { createClient } from "graphql-ws";
import graphqlDataProvider from "./data-provider";

export const API_BASEAURL = "http://localhost:5000/graphql";
export const API_URL = `${API_BASEAURL}`;
export const WS_URL = "ws://localhost:5000/graphql";

export const client = new GraphQLClient(API_URL, {
  fetch: (uri: string, options: RequestInit) => {
    try {
      return fetchWrapper(uri, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

export const wsClient =
  typeof window !== "undefined"
    ? createClient({
        url: WS_URL,
        connectionParams: () => {
          const accessToken = localStorage.getItem("access_token");
          return {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
        },
      })
    : undefined;

export const dataProvider = graphqlDataProvider(client);
export const liveProvider = wsClient
  ? graphqlLiveProvider(wsClient)
  : undefined;
