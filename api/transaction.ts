import { Category } from "./category";

export type CreateTransactionRequest = {
  date: string;
  payee: string;
  categoryID?: string;
  accountID: string;
  inflow?: number;
  outflow?: number;
};

export type EditTransactionRequest = {
  id: string;
  date?: string;
  payee?: string;
  categoryID?: string;
  accountID?: string;
  inflow?: number;
  outflow?: number;
};

export type Transaction = {
  id: string;
  date: string;
  payee: string;
  category?: Category;
  accountID: string;
  inflow?: number;
  outflow?: number;
};
