import { IconButton, Tooltip } from '@material-ui/core';
import
    React
from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteAuthorizationMutation } from './delete_authorization';

export const fallBackImage = 'https://s3-eu-west-1.amazonaws.com/lunarway-dev-cdn/pfm/category_other.png';


export const TransactionComponent = ({ transaction }: any) => {
   const [ deleteAuthorization ] = useDeleteAuthorizationMutation({
    variables: {
      transactionId: transaction.id
    }
  });
    // Why the hell this formatter doesn't call itself while page rendering ???.

    const getAmountWithCurrency = (billingAmount: any) => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: `${billingAmount.currency}`
      });
       return formatter.format(billingAmount.amount);
    }

    return (
      <tbody>
        <StyledTransaction>
          <td>
            <Link to={`/${transaction.id}`}>
              <Tooltip title="Details" arrow>
                <img
                  src={transaction.iconURL}
                  onError={(e) =>
                  (e.target as HTMLImageElement).src = fallBackImage
                  }
                />
              </Tooltip>
            </Link>
          </td>
          <td>{transaction.type}</td>
          <td>{transaction.localizableTitle}</td>
          <td>{getAmountWithCurrency(transaction.billingAmount)}</td>
          {/* <td>{
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: `${transaction.billingAmount.currency}`
              }).format(transaction.billingAmount.amount)
          }</td> */}
          <td>{transaction.time}</td>
          <td>{transaction.status}</td>
          <td>
              <img src={transaction.categoryIconUrl} />
          </td>
          <td>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick = {() => deleteAuthorization()}>
                <span className="material-icons md-18">delete</span>
              </IconButton>
            </Tooltip>
          </td>
        </StyledTransaction>
      </tbody>
    );
};


const StyledTransaction = styled.tr`
  img {
    display: flex;
    height: 30px;
    width: 30px;
    border-radius: 15px;
      margin: 0 auto;
  }
`;
