/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.88,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }
  calculateCredits = () => this.state.creditList.reduce((total, credit) => total + credit.amount, 0);
  calculateDebits = () => this.state.debitList.reduce((total, debit) => total + debit.amount, 0);

  calculateAccountBalance() {
    const totalCredits = this.calculateCredits();
    const totalDebits = this.calculateDebits();
    return totalCredits - totalDebits;
  }

  updateBalance = (newBalance) => {
    this.setState({ accountBalance: newBalance });
  };
  addCredit = (newCredit) => {
    const updatedCredits = [...this.state.creditList, newCredit];
    const newAccountBalance = this.state.accountBalance + newCredit.amount;
  
    
    this.setState({
      creditList: updatedCredits,
      accountBalance: newAccountBalance, 
    });
  };

  addDebit = (newDebit) => {
    const updatedDebits = [...this.state.debitList, newDebit];
    const newAccountBalance = this.state.accountBalance - newDebit.amount;
  
    this.setState({
      debitList: updatedDebits,
      accountBalance: newAccountBalance,
    });
  };
  componentDidMount() {
    
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ creditList: data });
        
        const accountBalance = this.calculateAccountBalance();
        this.setState({ accountBalance });
      })
  
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ debitList: data });
      
        const accountBalance = this.calculateAccountBalance();
        this.setState({ accountBalance });
      })
     
     
  }


  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} />)
    const DebitsComponent = () => (<Debits debits={this.state.debitList} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment3-bankreact">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route
          exact
          path="/debits"
          render={(props) => (
          <Debits
          debits={this.state.debitList}
          accountBalance={this.state.accountBalance}
          addDebit={this.addDebit}
          />
         )}
         />
         <Route
         exact
         path="/credits"
         render={(props) => (
         <Credits
         credits={this.state.creditList}
         accountBalance={this.state.accountBalance}
         addCredit={this.addCredit}
        />
      )}
    />
  </div>
      </Router>
    );
  }
}

export default App;
