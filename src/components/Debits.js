/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import React from 'react';

const Debits = (props) => {
  // Create the list of Debit items
  const { accountBalance, addDebit, debits } = props;
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date?.slice(0,10);
      return <li key={debit.id}>{debit.amount.toFixed(2)} {debit.description} {date}</li>
    });
  }

  
  const addNewDebit = (debit) => {
    debit.preventDefault();
    const description = debit.target.description.value;
    const amount = parseFloat(debit.target.amount.value);

    if (!isNaN(amount) && description) {
      const newDebit = {
        id: debits.length + 1,
        description,
        amount: parseFloat(amount.toFixed(2)),
        date: new Date().toISOString().slice(0, 10)
      };

      addDebit(newDebit);
    }

  };


  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView((debit) => (
          <li key={debit.id}>
            {debit.amount !== undefined ? debit.amount.toFixed(2) : 'N/A'} - {debit.description ? debit.description : 'N/A'} - {debit.date}
          </li>
        ))}
      <br/>
        <AccountBalance accountBalance={accountBalance}/> 
      <form onSubmit={addNewDebit}>
      
        <label>Description:</label>
        <input type="text" name="description" required/>
      
        <label>Amount:</label>
        <input type="text" name="amount" required/>
        
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;
