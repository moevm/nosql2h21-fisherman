import React from "react";
import {Route, Switch} from "react-router-dom";
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import UserStore from "../store/UserStore"

const Cart = observer((state) => {
    console.log("in",state)
    return (
        <div className="card m-3" style={{width: "18rem"}}>
            <img className="card-img-top" src={state.data.image} alt="Card image cap"/>
            <div className="card-body">
            <h5 className="card-title text-center">{state.data.title}</h5>
                <p className="card-text text-center">{state.data.description}</p>
                <h6 className="card-title text-center">{state.data.price + " руб."}</h6>
                <div class="col text-center">
                    <a href="#" id={state.data._id} className="btn btn-primary "
                    onClick={(e)=>{
                        UserStore.pushCart( {id: e.target.id, count: 1 })
                    }}>Купить</a>
                </div>
                
            </div>
        </div>
    );
});

export default Cart;
