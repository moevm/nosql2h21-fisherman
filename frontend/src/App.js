import logo from './logo.svg';
import './App.css';
import {Button} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button>Hello World</Button>
      </header>
    </div>
  );
}

export default App;
