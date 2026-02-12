export type CreateTransaction = {
  date: string;
  payee: string;
  inflow?: number;
  outflow?: number;
};
