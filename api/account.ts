import { Category } from "./category";

export enum AccountType {
  CHEQUING = "chequing",
  CREDIT = "credit",
}

export type Account = {
  id: string;
  name: string;
  balance: number;
  type: AccountType;
};

export type CreateAccountRequest = {
  name: string;
  balance: number;
  type: AccountType;
};

export type AccountAnalyticsResponse = {
  category: Category;
  amount: number;
  pct: number;
};
