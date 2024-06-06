import { useEffect } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout.tsx'
import AccountService from "./Services/AccountService"

function App() {

  useEffect(() => {
    AccountService.getAllAccounts();
  }, [])

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
