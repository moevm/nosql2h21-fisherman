import logo from './logo.svg';
import React, {Component} from "react";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap";
import HelloWorld from "./store/helloWorldStore.js"
import ReactDOM from "react-dom";
import Routes from "./Components/Routes";

const App = observer(() => {
        return (
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        );
    }
)

export default App;


