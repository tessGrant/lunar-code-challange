import 
  React 
from 'react';
import { useTransactionQuery } from './get_transaction_datails.container';
import styled from 'styled-components';
import { fallBackImage } from '../transaction/Transaction.component';

export const TransactionDetails = (props: any) => {
	const  { data }  = useTransactionQuery({
    variables: {
      transactionId: props.match.params.transactionId,
    },
  });
	return (
		<StyledTransactions>
        <StyledTable>
          <StyledTableHeader>
            <tr>
              <th>Transaction Details</th>
              <th>
                <img
                  src={data?.transaction.iconURL}
                  onError={(e) =>
                  (e.target as HTMLImageElement).src = fallBackImage
                  }
                />
              </th>
            </tr>
          </StyledTableHeader>
          <tbody>
            <StyledDetails>
              <td>Transaction ID: </td>
              <td>{data?.transaction.id}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Transaction type:</td>
              <td>{data?.transaction.type}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Transaction title</td>
              <td>{data?.transaction.localizableTitle}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Category</td>
              <td>{data?.transaction.categoryID}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Status of transaction</td>
              <td>{data?.transaction.status}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Time</td>
              <td>{data?.transaction.time}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Transaction amount</td>
              <td>{data?.transaction.billingAmount.amount}</td>
            </StyledDetails>
            <StyledDetails>
              <td>Transaction currency</td>
              <td>{data?.transaction.billingAmount.currency}</td>
            </StyledDetails>
          </tbody>
        </StyledTable>
      </StyledTransactions>
	);
}

const StyledTransactions = styled.div`
  overflow: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  position: relative;
  text-align: left;
  td,
  th {
    border: none;
    padding: 8px;
  }

  th {
    border: none;
  }
`;

const StyledTableHeader = styled.thead`
  color: ${({ theme }) => theme.secondaryText};

  th {
    text-align: left;
    padding: 20px 0 20px 10px;
  }
  img {
    display: flex;
    height: 30px;
    width: 30px;
    border-radius: 15px;
  }
`;

const StyledDetails = styled.tr`
padding: 10px 0;
`;
