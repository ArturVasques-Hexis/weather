import classes from './App.module.css';

function App() {
  return (
    <div 
      className={classes.backgroundImage} 
      style={{ backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL + '/images/storm.jpg'})` }}
    >
    </div>
  );
}

export default App;
