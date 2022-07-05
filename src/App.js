import classes from './App.module.css';
import Navigation from './components/Navigation';
import Paths from './components/Paths';

function App() {
  return (
    <div className={classes.App}>
      <Navigation />
      <Paths/>
      
    </div>
  );
}

export default App;
