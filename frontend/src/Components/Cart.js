import React from "react";
import {Route, Switch} from "react-router-dom";
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Cart = observer((state) => {
    console.log("in",state)
    return (
        <div className="card m-3" style={{width: "18rem"}}>
            <img className="card-img-top" src={state.data.img} alt="Card image cap"/>
            <div className="card-body">
                <p className="card-text text-center">{state.data.name}</p>
                <h6 className="card-title text-center">{state.data.cost + " руб."}</h6>
                <div class="col text-center">
                    <a href="#" id={state.data.id} className="btn btn-primary ">Купить</a>
                </div>
                
            </div>
        </div>
    );
});

export default Cart;