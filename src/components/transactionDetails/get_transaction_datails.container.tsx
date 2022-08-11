import { gql, QueryHookOptions, useQuery } from '@apollo/client';

const TransactionQuery = gql`
  query GetTransaction($transactionId: ID!) {
    transaction: transaction(input: { transactionId: $transactionId }) {
      id
      type
      iconURL
      localizableTitle
      categoryIconUrl
      deleted
      status
      time
      categoryID
      transactionAmount {
        amount
        currency
      }
      billingAmount {
        amount
        currency
      }
    }
  }
`;

enum TransactionType {
  Account = 'account',
  Card = 'card',
}

enum TransactionStatus {
  Future = 'future',
  Financial = 'financial',
  Authorization = 'authorization',
}

enum TransactionCategory {
  Other = 'other',
  Groceries = 'groceries',
  GoingOut = 'goingOut',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  iconURL: string;
  localizableTitle: string;
  categoryIconUrl?: string;
  deleted?: string;
  status: TransactionStatus;
  time: string;
  categoryID?: TransactionCategory;
  transactionAmount?: Amount;
  billingAmount: Amount;
}

export interface TransactionQueryData {
  transaction: Transaction;
}

export interface TransactionQueryVariables {
  transactionId: string;
}

interface Amount {
  amount: number;
  currency: string;
}

  export const useTransactionQuery = (
    options: QueryHookOptions<TransactionQueryData, TransactionQueryVariables>
  ) =>
    useQuery<TransactionQueryData, TransactionQueryVariables>(
      TransactionQuery,
      options
    );