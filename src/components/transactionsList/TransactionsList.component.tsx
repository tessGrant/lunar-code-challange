import { IconButton } from '@material-ui/core';
import 
  React
, { 
  useEffect,
useState }
from 'react';
import styled from 'styled-components';
import { TransactionComponent } from '../transaction/Transaction.component';
import { useTransactionsQuery } from './get_transactions_list.container';

interface TransactionsProps {
  userId: string;
}

export const TransactionsList = ({ userId }: TransactionsProps) => {
  const { data, loading, error } = useTransactionsQuery({
    variables: {
      userId,
    },
  });

  const [filteredTransactions, setFilteredTransactions] = useState(data?.transactions);
  const [searchTitle, setSearchByTitle] = useState("");
  const [searchStatus, setSearchByStatus] = useState("");

  const handleChangeByTitle = (event: any) => {
    setSearchByTitle(event.target.value);
  };

  const handleChangeByStatus = (event: any) => {
    setSearchByStatus(event.target.value);
  };

  useEffect(() => {
    if(
      loading === false && data 
      && searchTitle.length <= 0 && searchStatus.length <= 0) {
      setFilteredTransactions(data?.transactions);
    }
    if(searchTitle.length > 0){
      const results = data?.transactions.filter(transaction => 
        transaction.localizableTitle.toLowerCase().includes(searchTitle));
        setFilteredTransactions(results);
    }
    if(searchStatus.length > 0){
      const results = data?.transactions.filter(transaction => 
        transaction.status.toLowerCase().includes(searchStatus.toLowerCase()));
        setFilteredTransactions(results);
    }
  }, [loading, data, searchTitle, searchStatus]);
  
  
  const sortByTimeAsc = () => {
    const newFiltered = filteredTransactions?.slice().sort((a: any, b: any) => 
    // @ts-ignore
    new Date(a.time) - new Date(b.time));
    setFilteredTransactions(newFiltered);
  }

  const sortByTimeDesc = () => {
    const newFiltered = filteredTransactions?.slice().sort((a: any, b: any) => 
    // @ts-ignore
    new Date(b.time) - new Date(a.time));
    setFilteredTransactions(newFiltered);
  }


  if (loading) return <div>Loading...</div>;
  if (error) {
    return <div>An error occured 😭</div>;
  }

  return (
    <StyledTransactions>
        <div>
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={handleChangeByTitle}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by Status"
            value={searchStatus}
            onChange={handleChangeByStatus}
          />
        </div>
        <StyledTable>
          <StyledTableHeader>
            <tr>
              <th>Icon</th>
              <th>Type</th>
              <th>Title</th>
              <th>Amount</th>
              <th>
              <IconButton aria-label="delete" onClick = {() => sortByTimeAsc()}>
                <span className="material-icons md-18">south</span>
              </IconButton>
              Time
              <IconButton aria-label="delete" onClick = {() => sortByTimeDesc()}>
                <span className="material-icons md-18">north</span>
              </IconButton>
              </th>
              <th>Status</th>
              <th>Category</th>
            </tr>
          </StyledTableHeader>
            {filteredTransactions?.map((transaction) =>
                (transaction.deleted === null) ?
                  <TransactionComponent transaction = {transaction} key = {transaction.id}></TransactionComponent>
                : null
                )}
        </StyledTable>
      </StyledTransactions>
  );
};

const StyledTransactions = styled.div`
  overflow: scroll;
`;

const StyledTable = styled.table`
  width: 100%;
  position: relative;
  text-align: center;
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
    text-align: center;
  }
`;
