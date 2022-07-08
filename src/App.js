import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classes from './App.module.css';
import Navigation from './components/Navigation';
import Paths from './components/Paths';
import { authActions } from './Store/Auth';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
  const token =   localStorage.getItem("token")
  dispatch(authActions.login({token : token})) ;
  },[])
  return (
    <div className={classes.App}>
      <Navigation />
      <Paths/>
      
    </div>
  );
}

export default App;
