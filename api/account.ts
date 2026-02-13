export type CreateTransactionRequest = {
  date: string;
  payee: string;
  inflow?: number;
  outflow?: number;
};

export type Transaction = {
  date: string;
  payee: string;
  category?: string;
  inflow?: number;
  outflow?: number;
};
