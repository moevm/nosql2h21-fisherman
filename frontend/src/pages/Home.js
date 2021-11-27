import React, { useEffect } from "react";
import { useState } from 'react';
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Groups from "../Components/Groups.js";
import Catalog from "../Components/Catalog.js";
import Authorization from "../Components/Authorization.jsx";
import CatalogStore from "../store/CatalogStore";
import UserStore from "../store/UserStore"
import OrdersStore from "../store/OrdersStore"
import { toJS } from "mobx";

const Home = observer(() => {

    
    //для авторизации\регистрации
    const [fio, fioSetValue] = useState(null);
    const [login, loginSetValue] = useState(null);
    const [password, passwordSetValue] = useState(null);
    const [phone, phoneSetValue] = useState(null);
    const [password2, password2SetValue] = useState(null);

    //добавление продукта
    const [imageAdd, imageAddSetValue] = useState(null);
    const [vendorCodeAdd, vendorCodeAddSetValue] = useState(null);
    const [titleAdd, titleAddSetValue] = useState(null);
    const [descriptionAdd, descriptionAddSetValue] = useState(null);
    const [priceAdd, priceAddSetValue] = useState(null); 
    const [countAdd, countAddSetValue] = useState(null);

    //добавление заказа
    const [fioAddOrder, fioAddOrderSetValue] = useState(null);
    const [phoneAddOrder, phoneAddOrderSetValue] = useState(null);
    const [addressAddOrder, addressAddOrderSetValue] = useState(null);
    const [commentAddOrder, commentAddOrderSetValue] = useState(null);

    //сортировка   
    const [searchVal, searchValSetValue] = useState(null);
    const [sortType, sortTypeSetValue] = useState(1);
    const [sortGroup, sortGroupSetValue] = useState(null);

    //отображение заказов либо продуктов у админа
    const [isOrders, isOrdersSetValue] = useState(true);

    //модальное окно добавления продукта
    const [isModalAdd, setModalAdd] = React.useState(false)
    const onCloseAdd = () => {
        setModalAdd(false)
        console.log("onClose")
    }
    const AddProduct = () => {
        console.log("onAuth")
        setModalAdd(false)
        imageAddSetValue(null)
        vendorCodeAddSetValue(null)
        titleAddSetValue(null)
        descriptionAddSetValue(null)
        priceAddSetValue(null)
        countAddSetValue(null)
        CatalogStore.add(imageAdd, vendorCodeAdd, titleAdd, descriptionAdd, priceAdd, countAdd)
    }
     //модальное окно просмотра корзины
     const [isModalCart, setModalCart] = React.useState(false)
     const onCloseCart = () => {
         setModalCart(false)
     }
     const ArrangeOrder = async() => {
        let number = await OrdersStore.add({
            "products": UserStore.cart,
            "fio": fioAddOrder,
            "phone": phoneAddOrder,
            "address": addressAddOrder,
            "comment": commentAddOrder,
            "people_id": UserStore.user._id
        })
        console.log(number)
        setModalOrderNumber(number ? number : '')
        onCloseCart()
        UserStore.cart = []
        setModalThankYou(true)
     }
    //модальное окно благодарство
    const [OrderNumber, setModalOrderNumber] = React.useState(false)
      const [isModalThankYou, setModalThankYou] = React.useState(false)
      const onCloseThankYou = () => {
          setModalThankYou(false)
      }
    //модальное окно изменения статуса заказа
    const [isModalStatus, setModalStatus] = React.useState(false)
    const onCloseStatus = () => {
        setModalStatus(false)
    }
    const [SelectedStatus, setSelectedStatus] = React.useState(false)
    const [SelectedIdEditOrderStatus, setSelectedIdEditOrderStatus] = React.useState(false)
    const EditOrderStatus = () => {
        OrdersStore.editStatus(SelectedStatus, SelectedIdEditOrderStatus)
    }

    //модальное окно авторизации
    const [isModal, setModal] = React.useState(false)
    const onClose = () => {
        setModal(false)
        console.log("onClose")
    }
    const onAuth = () => {
        console.log("onAuth")
        UserStore.login(login, password)
        CatalogStore.get()
        OrdersStore.get()
    }

    //модальное окно регистрации
    const [isModalReg, setModalReg] = React.useState(false)
    const onCloseReg = () => {
        setModalReg(false)
    }
    const onOpenAuth = () => {
        setModalReg(false)
        setModal(true)
        console.log("onOpenAuth")
    }
    const onReg = () => {
        console.log("onReg")
    } 
    const onChange=(id)=>{
        sortGroupSetValue(id)
        // менять CatalogStore.array для фильтрации запросом
    }

    ///////////////////////////////////////////////


    const contentDefault = (  
    <Container fluid="md">
        <Row className={'mt-2'}>
            <Col className="d-flex col-3"> 
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
                </Button>
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle mx-2">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                </Button>
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                </Button>
                <p className="mx-3 mt-1">+7 (999) 999 99 99</p> 
            </Col>
            <Col className={'col-7'}>
                <h4 className="text-center"> РыбачкОфф </h4>
            </Col>
            <Col>
                 {UserStore.user.login === null ?
                 <>
                <Button 
                    className={'mx-2 btn btn-warning'} 
                    onClick={() => setModal(true)}>
                    Вход
                </Button>
                <Authorization
                    visible={isModal}
                    title="Авторизация"
                    content={
                    <>
                        <input type="text" class="form-control" value={login} placeholder="Логин" onChange={(e)=>loginSetValue(e.target.value)} />
                        <input type="password" class="form-control mt-2" value={password} onChange={(e)=>passwordSetValue(e.target.value)} placeholder="Пароль" />
                    </>
                    }
                    footer={<button className="btn btn-warning" onClick={()=>onAuth()}>Войти</button>}
                    onClose={onClose}
                />
                <Button 
                    className={'btn btn-warning'}
                    onClick={() => setModalReg(true)}>
                    Регистрация
                </Button>
                <Authorization
                    visible={isModalReg}
                    title="Регистрация"
                    content={
                    <>
                        <input type="text" class="form-control" value={fio} placeholder="ФИО"  onChange={(e)=>fioSetValue(e.target.value)} />
                        <input type="text" class="form-control mt-2" value={login}   placeholder="Логин"  onChange={(e)=>loginSetValue(e.target.value)} />
                        <input type="text" class="form-control mt-2" value={phone} placeholder="Номер телефона"  onChange={(e)=>phoneSetValue(e.target.value)}/>
                        <input type="password" class="form-control mt-2" value={password} placeholder="Пароль" onChange={(e)=>passwordSetValue(e.target.value)}/>
                        <input type="password" class="form-control mt-2" value={password2} placeholder="Пароль еще раз"  onChange={(e)=>password2SetValue(e.target.value)}/>
                    </>
                    }
                    footer={
                        <Container>
                            <Row className=" d-flex">
                                <Col className={'mx-2 col-9'}>Уже есть аккаунт? </Col>
                                <Col className={''}>
                                <button className="btn btn-outline-warning" onClick={()=>onOpenAuth()}>Войти</button>
                                </Col>
                            </Row>
                            <Row>
                                <button className="btn btn-warning mt-3" onClick={()=>onReg()}>Регистрация</button>
                            </Row>
                        </Container>
                    }
                    onClose={onCloseReg}
                />
                </>
                :
                <>
                    <p className={'pt-2'} >{UserStore.user.login}</p>
                    <Button 
                        className={'mx-1 btn btn-warning'} 
                        onClick={() => {UserStore.exit()}}>
                        Выйти
                    </Button>
                </>
                }   
            </Col>
        </Row>
        <Row className={'p-2'}>
            <FormControl
                placeholder="Поиск" value={searchVal} 
                onChange={(e)=>{
                    searchValSetValue(e.target.value)
                    // менять CatalogStore.array для фильтрации запросом
                }}
            />
        </Row>
        <Row className={'p-3'}>
            <Col className={'col-3 '}>
            <h6>КАТАЛОГ</h6>
            </Col>
            <Col className={'col-8 d-flex'}>
                <div className={'mx-4 mt-1'}>Сортировать по:</div> 
                <Button  
                className={' btn-sm' }
                onClick={()=>{
                    sortTypeSetValue(1)
                    // менять CatalogStore.array для фильтрации запросом
                }}
                >Возрастание цены</Button>
                <Button  
                className={' mx-2 btn-sm' }
                onClick={()=>{
                    sortTypeSetValue(2)
                    // менять CatalogStore.array для фильтрации запросом
                }}
                >Убывание цены</Button>
                <Button 
                className={' btn-sm'}
                onClick={()=>{
                    sortTypeSetValue(3)
                    // менять CatalogStore.array для фильтрации запросом
                }}
                >От А до Я</Button>
            </Col> 
  
            <Col >
                <button type="button" style={{height:"40px", outline: "none", border: "none", backgroundColor: "white"}} 
                    onClick={()=>{
                        setModalCart(true)
                    }}>

                    <div style={{ marginLeft: "40px", width: "24px", background: "red", borderRadius: "50%", textAlign: "center"}}>{UserStore.cart.length}</div>
                    <svg style={{marginTop: "-32px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-basket2-fill" viewBox="0 0 16 16">
                    <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z"/>
                    </svg>
                </button>

                <Authorization
                    visible={isModalCart}
                    title="Корзина"
                    content={
                    <>
                        <table class="table table-sm" >
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col">Цена</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col">Всего</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {UserStore.cart.map((o)=> (
                                <tr>
                                    <td><img style={{height: "80px", width: "80px"}}  src={CatalogStore.getProduct(o.id).image} /></td>
                                    <td>{CatalogStore.getProduct(o.id).title}</td>
                                    <td>{CatalogStore.getProduct(o.id).price}</td>
                                    <td>
                                        <button id={o.id} type="button" class="btn btn-outline-secondary mx-1" style={{width: "29px", height: "30px", outline: "none", border: "none" }} 
                                                onClick={(e)=>{
                                                    UserStore.plusCountCart(e.target.id)
                                                }}>
                                                <svg style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-12px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </button>
                                        {o.count}
                                        <button id={o.id} type="button" class="btn btn-outline-secondary mx-1" style={{width: "29px", height: "30px", outline: "none", border: "none" }} 
                                                onClick={(e)=>{
                                                    UserStore.minusCountCart(e.target.id)
                                                }}>
                                               <svg style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-12px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                        </button>
                                    </td>
                                    <td>{CatalogStore.getProduct(o.id).price * o.count}</td>
                                    <td>
                                        <div className="mx-2">
                                            <button id={o._id} type="button" class="btn btn-outline-secondary" style={{width: "29px", height: "30px", outline: "none", border: "none" }} 
                                                onClick={(e)=>{
                                                    UserStore.deleteCart(e.target.id)
                                                }}>
                                                <svg  style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-12px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
                                                <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/>
                                                </svg>
                                                
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td><td></td><td></td>
                                <td> Всего </td>
                                <td>{UserStore.sumCart()}</td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        
                        <input type="text" class="form-control mt-5" value={fioAddOrder} placeholder="ФИО получателя" onChange={(e)=>fioAddOrderSetValue(e.target.value)} />
                        <input type="text" class="form-control mt-2" value={phoneAddOrder} onChange={(e)=>phoneAddOrderSetValue(e.target.value)} placeholder="Телефон получателя" />
                        <input type="text" class="form-control mt-2" value={addressAddOrder} placeholder="Адрес" onChange={(e)=>addressAddOrderSetValue(e.target.value)} />
                        <input type="text" class="form-control mt-2" value={commentAddOrder} onChange={(e)=>commentAddOrderSetValue(e.target.value)} placeholder="Введите комментарий к заказу" />
                    </>
                    }
                    footer={<button className="btn btn-warning" onClick={()=>ArrangeOrder()}>Оформить заказ</button>}
                    onClose={onCloseCart}
                />
                <Authorization
                    visible={isModalThankYou}
                    title="Заказ оформлен!"
                    content={
                    <>
                        <div>Спасибо!</div>
                        <div>Номер Вашего заказа: {OrderNumber}</div>
                    </>
                    }
                    footer={<button className="btn btn-warning" onClick={()=>onCloseThankYou()}>Ок</button>}
                    onClose={onCloseThankYou}
                />
            </Col>
        </Row>
        <Row className={'p-3'}>
            <Col>
                <Groups onChange={onChange}></Groups>
            </Col>
            <Col className="col-lg-9" >
                <Catalog sort = {sortType} group = {sortGroup}></Catalog>
            </Col> 
        </Row>
    </Container> )


    const contentAdm = (  <Container fluid="md">
        
        <Row className={'mt-2'}>
            <Col className="d-flex col-3"> 
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
                </Button>
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle mx-2">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                </Button>
                <Button type="button" style={{height:"32px"}} className="btn btn-warning btn-sm rounded-circle">
                <svg style={{marginTop:"-4px", marginLeft:"2px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
                </Button>
                <p className="mx-3 mt-1">+7 (999) 999 99 99</p> 
            </Col>
            <Col className={'col-7'}>
                <h4 className="text-center"> РыбачкОфф </h4>
            </Col>
            <Col className="d-flex">
                <p className={'pt-2'} >Администратор </p>
                <Button 
                    className={'mx-1 btn btn-warning'} 
                    onClick={() => {UserStore.exit()}}>
                    Выйти
                </Button>
            </Col>
        </Row>
        <Row className={'p-2 d-flex'}>
            <Col className={'col-5'}>
            <Button type="button" className="btn btn-warning  " onClick={()=>isOrdersSetValue(true)}>
               Заказы
            </Button>
            <Button type="button"  className="btn btn-warning mx-2" onClick={()=>isOrdersSetValue(false)}>
                Каталог
            </Button>
            </Col>
            
        </Row>
        {isOrders === true ? 
        <>
        <Row className={'p-2'}>
            <Col className="d-flex col-3">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Заказы</span>
                    </div>
                    <div class="input-group-prepend" style={{background: "white"}}>
                        <span class="input-group-text " style={{background: "white"}} id="basic-addon1"> 0 </span>
                    </div>
                </div>
                <div class="input-group mb-3 mx-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Продажи</span>
                    </div>
                    <div class="input-group-prepend" style={{background: "white"}} >
                        <span class="input-group-text" style={{background: "white"}} id="basic-addon1"> 0 </span>
                    </div>
                </div>
            </Col> 
            <Col className="d-flex col-4"> </Col>     
            <Col className=" col-4">
                <div class="input-group">
                    <div class="input-group-prepend w-25">
                        <span class="input-group-text ">Период</span>
                    </div>
                    <input type="date" aria-label="First name" class="form-control"/>
                    <input type="date" aria-label="Last name" class="form-control"/>
                </div>
                <div class="input-group">
                    <div class="input-group-prepend w-25">
                        <span class="input-group-text">Категория</span>
                    </div>
                    <input type="text" aria-label="First name" class="form-control"/>
                </div>
            </Col>   
        </Row>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">Статус</th>
                    <th scope="col">Номер</th>
                    <th scope="col">Покупатель</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Адрес</th>
                </tr>
            </thead>
            <tbody>
                {
                    OrdersStore.array.map(item=>
                        <tr>
                            <td><button id={item._id} type="button" class={"btn-sm "+ OrdersStore.color(item.status)}
                            onClick={(e)=>{
                                setModalStatus(true)
                                setSelectedIdEditOrderStatus(e.target.id)
                            }}>{item.status ? item.status : "Выбрать"}</button></td>
                            <td>{item._id}</td>
                            <td>{item.user}</td>
                            <td>{item.date}</td>
                            <td>{item.price}</td>
                            <td>{item.address}</td>
                        </tr>
                    )
                }
          
            </tbody>
        </table>
        <Authorization
            visible={isModalStatus}
            title="Изменение статуса"
            content={
            <>
                <button type="button" class={"btn-sm btn-success"} 
                onClick={()=>{
                    setSelectedStatus("Завершен")
                    EditOrderStatus()
                    onCloseStatus()
                }}>Завершен</button>
                <button type="button" class={"btn-sm btn-primary"} 
                onClick={()=>{
                    setSelectedStatus("Обработан")
                    EditOrderStatus()
                    onCloseStatus()
                }}>Обработан</button>
                <button type="button" class={"btn-sm btn-info"} 
                onClick={()=>{
                    setSelectedStatus("Принят покупателем")
                    EditOrderStatus()
                    onCloseStatus()
                }}>Принят покупателем</button>
                <button type="button" class={"btn-sm btn-warning"} 
                onClick={()=>{
                    setSelectedStatus("Готов к выдаче")
                    EditOrderStatus()
                    onCloseStatus()
                }}>Готов к выдаче</button>
                <button type="button" class={"btn-sm btn-danger"} 
                onClick={()=>{
                    setSelectedStatus("Отменен")
                    EditOrderStatus()
                    onCloseStatus()
                }}>Отменен</button>
            </>
            }
            footer={<></>}
            onClose={onCloseStatus}
        />
        </>

        :

        <Row className={'p-2'}>
            <Col style={{heigth: "500px", maxHeight: "500px", overflow: "auto"}}>  
                
                <table class="table table-sm" >
                    <thead>
                        <tr>
                            <th scope="col">Изображение</th>
                            <th scope="col">Артикул</th>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Количество</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>

                    {toJS(CatalogStore.array).map((item)=>(
                        <tr>
                            <td><img style={{height: "80px", width: "80px"}} className="card-img-top" src={item.image} alt="Card image cap"/></td>
                            <td>
                                {/* <input 
                                    id = {item.id}
                                    onChange={(e) => {
                                        CatalogStore.onChange(e)
                                    }}
                                    value= {  item.title }
                                /> */}
                            {  item.vendorCode }</td>
                            <td>{  item.title }</td>
                            <td>{  item.description }</td>
                            <td>{  item.price }</td>
                            <td>{  item.count }</td>
                            <td className="d-flex">
                                <div >
                                    <button id={item._id} type="button" className="btn btn-outline-secondary" style={{width: "29px", height: "30px", marginTop: "65px" }} /*onClick={}*/>
                                        <svg id={item._id} style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-12px"}}  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path id={item._id} d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </button>
                                </div>
                                
                                <div className="mx-2">
        
                                    <button id={item._id} type="button" className="btn btn-outline-secondary" style={{width: "29px", height: "30px", marginTop: "65px" }} 
                                    onClick={(event)=>{
                                        console.log(event.target)
                                        CatalogStore.delete(event.target.id)
                                    }}>
                                        <svg id={item._id} style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-12px"}}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                                        <path id={item._id} d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        
                        </tr>
                    ))
                    }
                   
                    </tbody>
                </table>
            </Col>

            <div className="mt-2">
             <button type="button" class="btn btn-outline-warning" style={{ height: "30px" }} 
             onClick={()=>
                setModalAdd(true)
             }>
                <svg  style={{width: "20px", height: "20px", marginLeft: "-9px", marginTop: "-8px", padding: "3px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
                Добавить новый товар
             </button> 
             <Authorization
                    visible={isModalAdd}
                    title="Добавление товара"
                    content={
                    <>
                        <input type="text" class="form-control mt-2" value={vendorCodeAdd} onChange={(e)=>vendorCodeAddSetValue(e.target.value)} placeholder="Артикул" />
                        <input type="text" class="form-control mt-2" value={titleAdd} placeholder="Название" onChange={(e)=>titleAddSetValue(e.target.value)} />
                        <textarea   class="form-control mt-2" value={descriptionAdd} onChange={(e)=>descriptionAddSetValue(e.target.value)} placeholder="Описание" />
                        <input type="text" class="form-control mt-2" value={priceAdd} placeholder="Стоимость" onChange={(e)=>priceAddSetValue(e.target.value)} />
                        <input type="text" class="form-control mt-2" value={countAdd} onChange={(e)=>countAddSetValue(e.target.value)} placeholder="Количество" />
                        <input type="text" class="form-control mt-2" value={imageAdd} placeholder="Ссылка на изображение" onChange={(e)=>imageAddSetValue(e.target.value)} />
                        <img className="card-img-top" style={{width: "80px", height: "80px"}} src={imageAdd}/>
                    </>
                    }
                    footer={<button className="btn btn-warning mt-2" onClick={()=>AddProduct()}>Создать</button>}
                    onClose={onCloseAdd}
                />
            </div>

        </Row>

        }

        </Container> )

    return   UserStore.user.login === "admin" ? contentAdm : contentDefault 
   
});

export default Home;
