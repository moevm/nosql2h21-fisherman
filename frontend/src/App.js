import logo from './logo.svg';
import React, {Component} from "react";
import { observer } from "mobx-react-lite";
import './App.css';
import {Button} from "react-bootstrap";
import HelloWorld from "./store/helloWorldStore.js"
import ReactDOM from "react-dom";

const App = observer(() => {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Button onClick={()=>{HelloWorld.get()}}>Hello World</Button>
                <p>{HelloWorld.data}</p>
            </header>
        </div>
    );
    
}
)

export default App;


