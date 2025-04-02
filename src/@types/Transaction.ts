export type TransactionStatus = "pending" | "completed";

export type Transaction = {
  id: number;
  title: string;
  status: TransactionStatus;
  amount: number;
  created_at: Date;
  user_id: number;
};

// Omitindo parametros.
export type TransactionDashboard = Omit<
  Transaction,
  "id" | "title" | "status" | "user_id"
>;

// Tipando objeto.
export type ApiGetTransactions = {
  transactions: {
    itemsReceived: number;
    curPage: number;
    nextPage?: string;
    prevPage?: string;
    offset: number;
    itemsTotal: number;
    pageTotal: number;
    // array de transações.
    items: Transaction[];
  };
};

export type ApiGetTransaction = {
  transaction: Transaction;
};

export type ApiGetDashboard = {
  transactions: TransactionDashboard[];
  peding_transactions: number;
  completed_transactions: number;
};

export type ApiNewTransaction = {
  transaction: Transaction;
};

export type ApiUpdateTransaction = {
  transaction: Transaction;
};

export type ApiDeleteTransaction = {
  success: boolean;
};
