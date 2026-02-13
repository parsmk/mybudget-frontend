export type CreateTransactionRequest = {
  date: string;
  payee: string;
  inflow?: number;
  outflow?: number;
};

export type Transaction = {
  id: string;
  date: string;
  payee: string;
  category?: string;
  inflow?: number;
  outflow?: number;
};
