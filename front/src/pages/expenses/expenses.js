import React from 'react';
import axios from "axios"
import './expenses.css';
import { Form, Col, Container, Row } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Modal from 'react-awesome-modal';
import Side from '../../components/sidebar/sidebar'

class expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currencies: [],
            categories: [],
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8000/api/currencies');
            const result = await response.json();
            if (result.success) {
                this.setState({
                    currencies: result.data,
                });
            }
        }
        catch (err) {
            console.log(err.message + ' : ' + err.message)
        }
        try {
            const response = await fetch('http://localhost:8000/api/categories', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('currUser')}`
                }
            });
            const result = await response.json();
            console.log(result.data)
            if (result.success) {
                this.setState({
                    categories: result.data,
                });
            }
        }
        catch (err) {
            console.log(err.message + ' : ' + err.message)
        }
    }
    addExpense = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    render() {
        return (
            <>
                <Side />
                <section >
                    <Modal visible={this.state.visible} width="100%" height="100%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="mod" >
                            <MDBContainer  >
                                <MDBRow   >
                                    <MDBCol md="12" >
                                        <Form onSubmit={this.addExpense}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Title</Form.Label>
                                                    <MDBInput icon="envelope" group type="text" validate error="wrong"
                                                        success="right" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Categories</Form.Label>

                                                    <Form.Control as="select" >
                                                        {this.state.categories.map((item, index) => {
                                                            return <option value={item.id} key={index} >{item.name}</option>
                                                        })}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label>Add</Form.Label><br></br>
                                                    <Form.Control type="Button" placeholder="Add" value="Add Categories" />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Group controlId="formGridAddress1">
                                                <Form.Label>Description</Form.Label>
                                                <MDBInput icon="envelope" group type="text" validate error="wrong" success="right" />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridPassword">
                                                    <Form.Label>Amount</Form.Label>
                                                    <MDBInput icon="envelope" group type="number" validate error="wrong" success="right" />

                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Currencies</Form.Label>
                                                    <Form.Control as="select">
                                                        {this.state.currencies.map((item, index) => (
                                                            <option value={item.id} key={index} >{item.code}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridsDate">
                                                    <Form.Label>Start date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" validate error="wrong" success="right" />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridEDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" validate error="wrong" success="right" />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formGridPassword">
                                            </Form.Group>
                                            <div className="text-center">
                                                <MDBBtn className='topBotomBordersOut' type="submit">Add expenses</MDBBtn>
                                                <MDBBtn style={{ marginLeft: "10px" }} className='topBotomBordersOut' href="javascript:void(0);" onClick={() => this.closeModal()} type="submit">Close</MDBBtn>

                                            </div>
                                        </Form>

                                    </MDBCol >
                                </MDBRow>

                            </MDBContainer>

                        </div>


                        {/* //add button starts */}
                    </Modal>
                </section>
                <div className="icom">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="2">

                                <MDBBtn className='topBotomBordersOut' style={{ width: "150px" }} onClick={() => this.openModal()} type="button" >Add expenses</MDBBtn>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    {/* //add button ends

                    //expenses component starts */}
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="10">
                                <Container className="container article float-shadow">
                                    <Row >
                                        <Col sm={5}>

                                            <p><span>Title:</span> cas</p>
                                            <p><span>Description:</span> asca</p>
                                            <p><span>Start Date:</span> 25/2/2001 </p>
                                        </Col>
                                        <Col className="col" sm={5}>
                                            <p><span>Categories:</span> cas</p>
                                            <p><span>Amount:</span> 25 $</p>
                                            <p><span>End Date:</span> 24/2/2001 </p>

                                        </Col>
                                        <Col className="col" sm={2}>

                                            <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                                <path className="trash-lid" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                                <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                            </svg>

                                        </Col>
                                    </Row>
                                </Container>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    {/* //expenses component ends */}
                </div>
            </>
        );
    }



};




export default expenses;
