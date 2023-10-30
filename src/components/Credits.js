import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const { accountBalance, addCredit, credits } = props;

  let creditsView = () => {
    const { credits } = props;
    return credits.map((credit) => {
      let date = credit.date?.slice(0, 10);
      return (<li key={credit.id}>{credit.amount.toFixed(2)} {credit.description} {date}</li>
      );
    });
  }
  const addNewCredit = (credit) => {
    credit.preventDefault();
    const description = credit.target.description.value;
    const amount = parseFloat(credit.target.amount.value);

    if (!isNaN(amount) && description) {
      const newCredit = {
        id: credits.length + 1,
        description,
        amount:parseFloat(amount.toFixed(2)),
        date: new Date().toISOString().slice(0, 10)
      };

      addCredit(newCredit);
    }

    
  };

  
  return (
    <div>
      <h1>Credits</h1>
      {creditsView((credit) => (
          <li key={credit.id}>
            {credit.amount !== undefined ? credit.amount.toFixed(2) : 'N/A'} - {credit.description ? credit.description : 'N/A'} - {credit.date}
          </li>
        ))}
      
      <AccountBalance accountBalance={accountBalance} />

      <form onSubmit={addNewCredit}>
        <label>Description:</label>
        <input type="text" name="description" required />
        
        <label>Amount:</label>
        <input type="text" name="amount" required />
        
        <button type="submit">Add Credit</button>
      </form>

      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
