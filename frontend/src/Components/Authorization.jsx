import React, { ReactElement } from 'react'
import ReactDOM from 'react-dom'
import "./modal.css"

const Authorization = (props) => {

    if (!props.visible) return null;

    // или возвращаем верстку модального окна
    return (
        <div className="modal">
            <div className="modal-dialog">
                <div className="modal-header">
                    <h3 className="modal-title">{props.title}</h3>
                    <span className="modal-close" onClick={()=>props.onClose()}> &times; </span>
                </div>
                <div className="modal-body">
                    <div className="modal-content">{props.content}</div>
                </div>
                {props.footer && <div className="modal-footer">{props.footer}</div>}
            </div>
        </div>
    )
}

export default Authorization;