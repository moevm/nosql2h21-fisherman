import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { toJS } from "mobx";
import CatalogStore from "../store/CatalogStore";
import Cart from "./Cart.js";

const Catalog = observer((state) => {
    return (
        <div >
            {
                 //уменьшается при добавлении className="d-flex"
                toJS(CatalogStore.array).map((obj)=>
                    <Cart key={obj.id} data={obj}></Cart>
                )
            }
        </div>
    );
});

export default Catalog;