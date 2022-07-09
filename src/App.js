import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './App.module.css';
import Navigation from './components/Navigation';
import Paths from './components/Paths';
import { authActions } from './Store/Auth';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51LGlgSSB5olwzdqLZtYp0a3UxoKB4N6IuAgGpILEq5ocTscdyOGlHhUpMIWQwYyvlRiRrJdyImyOZZLcZivhLSyM00R15wso2E")
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
  const token =   localStorage.getItem("token")
  dispatch(authActions.login({token : token})) ;
  },[])
  return (
    <Elements stripe={stripePromise} >
    <div className={classes.App}>
      <Navigation />
      <Paths/>
      
    </div>
    </Elements>
  );
}

export default App;
