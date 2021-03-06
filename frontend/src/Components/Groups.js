import React from "react";
import {Route, Switch} from "react-router-dom";
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import { toJS } from "mobx";
import GroupsStore from "../store/GroupsStore";


const Groups = observer((state) => {
    
    return (
        <>
        {
            toJS(GroupsStore.array).map((group)=>
                <div key={group.id} id={group.id} className="mt-1"
                onClick={(e)=>{
                    state.onChange(e.target.id)
                }}
                >{group.name}</div>
            )
        }
        </> 
    );
});

export default Groups;
