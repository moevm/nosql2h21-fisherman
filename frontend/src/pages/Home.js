import React from "react";
import {Button, Col, Container, FormControl, Jumbotron, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Home = observer(() => {
    return (
            <Container fluid="md">
                <Row className={'p-3'}>
                    <Col>+7 (999) 999 99 99</Col>
                    <Col className={'col-6'}>РыбачкОфф</Col>
                    <Col>
                        <Button className={'mx-2'}>Вход</Button>
                        <Button>Регистрация</Button>
                    </Col>
                </Row>
                <Row className={'p-2'}>
                    <FormControl
                        placeholder="Поиск"
                    />
                </Row>
            </Container>
    );
});

export default Home;