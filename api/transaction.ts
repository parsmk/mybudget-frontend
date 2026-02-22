import { Category } from "./category";

export type CreateTransactionRequest = {
  date: string;
  payee: string;
  category_id?: string;
  account_id: string;
  inflow?: number;
  outflow?: number;
};

export type EditTransactionRequest = {
  id: string;
  date?: string;
  payee?: string;
  category_id?: string | null;
  account_id?: string;
  inflow?: number | null;
  outflow?: number | null;
};

export type Transaction = {
  id: string;
  date: string;
  payee: string;
  category?: Category;
  account_id: string;
  inflow?: number;
  outflow?: number;
};

export type TransactionFilters = {
  from?: string;
  to?: string;
};
