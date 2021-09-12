import logo from './logo.svg';
import React, {Component} from "react";
import './App.css';
import {Button} from "react-bootstrap";


class App extends Component {
    state = {
        data: "READY"
    };

    handler = () => {
        fetch("http://localhost:8080/test")
            .then(res => res.json())
            .then(json => {
                if (json) {
                    this.setState({data: "DONE"});
                }
            })
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Button onClick={this.handler}>Hello World</Button>
                    <p>{this.state.data}</p>
                </header>
            </div>
        );
    }
}

export default App;
