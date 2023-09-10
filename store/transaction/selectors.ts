import { createSelector } from '@reduxjs/toolkit';
import { TransactionState } from './transactionSlice';

const selectTransactionState = (state: { transaction: TransactionState }) => state.transaction;

export const selectTransactions = createSelector(
  selectTransactionState,
  (transaction) => transaction.transactions
);

export const selectBalance = createSelector(
  selectTransactionState,
  (transaction) => transaction.balance
);