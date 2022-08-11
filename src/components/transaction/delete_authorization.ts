import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { Transaction } from '../transactionsList/get_transactions_list.container';

const DeleteAuthorizationMutation = gql`
  mutation deleteAuthorization($transactionId: ID!) {
    result: deleteAuthorization(input: { transactionId: $transactionId }) {
      error
      transaction {
        id
        deleted
      }
    }
  }
`;

interface deleteAuthorizationMutationData {
  result: {
    transaction: Transaction | null;
    error: string | null;
  };
}

interface deleteAuthorizationMutationVariables {
  transactionId: string;
}

export const useDeleteAuthorizationMutation = (
  options?: MutationHookOptions<
    deleteAuthorizationMutationData,
    deleteAuthorizationMutationVariables
  >
) => {
  return useMutation<
    deleteAuthorizationMutationData,
    deleteAuthorizationMutationVariables
  >(DeleteAuthorizationMutation, options);
};
