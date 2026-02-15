import { Category } from "./category";

export type CreateTransactionRequest = {
  date: string;
  payee: string;
  categoryID?: string;
  inflow?: number;
  outflow?: number;
};

export type EditTransactionRequest = {
  id: string;
  date?: string;
  payee?: string;
  categoryID?: string;
  inflow?: number;
  outflow?: number;
};

export type Transaction = {
  id: string;
  date: string;
  payee: string;
  category?: Category;
  inflow?: number;
  outflow?: number;
};
