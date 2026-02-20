import { Category } from "./category";

export type CreateTransactionRequest = {
  date: string;
  payee: string;
  categoryID?: string;
  accountID: string;
  inflow?: number;
  outflow?: number;
};

export type CreateTransactionResponse = {
  errors: { count: number; reasons: string[] };
  success: { count: number; uploaded: Transaction[] };
};

export type EditTransactionRequest = {
  id: string;
  date?: string;
  payee?: string;
  categoryID?: string | null;
  accountID?: string;
  inflow?: number | null;
  outflow?: number | null;
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
