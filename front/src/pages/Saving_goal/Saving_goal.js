 
import React from 'react';
import './Saving_goal.css';
 import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBProgress} from 'mdbreact';
import { Form, Col, Container, Row } from 'react-bootstrap'
 import Modal from 'react-awesome-modal';
import Side from '../../components/sidebar/sidebar'


class Saving_goal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
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

    render() {
        return (
           <>
           <Side/>
                <section >
                     <Modal visible={this.state.visible} width="100%" height="100%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="mod" >
                            <MDBContainer  >
                                <MDBRow   >
                                    <MDBCol md="12" >
                                        <Form >
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Title</Form.Label>
                                                    <MDBInput icon="envelope" group type="text" validate error="wrong"
                                                        success="right" />
                                                </Form.Group>
                                                <Form.Group controlId="formGridAddress1">
                                                    <Form.Label>Amount</Form.Label>
                                                    <MDBInput icon="envelope" group type="number" validate error="wrong" success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>Currencies</Form.Label>
                                                    <Form.Control as="select" value="ChooseCu">
                                                        <option>Choose</option>
                                                        <option>...</option>
                                                    </Form.Control>
                                                </Form.Group>

                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridEmail">
                                                    <Form.Label>File</Form.Label>
                                                    <MDBInput icon="envelope" group type="text" validate error="wrong"
                                                        success="right" />
                                                </Form.Group>


                                                <Form.Group as={Col} controlId="formGridState">
                                                    <Form.Label> Add File</Form.Label><br></br>
                                                    <Form.Control type="Button" placeholder="Add" value="Click" />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridsDate">
                                                    <Form.Label>Date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" validate error="wrong" success="right" />
                                                </Form.Group>


                                            </Form.Row>




                                            <Form.Group controlId="formGridPassword">

                                            </Form.Group>
                                            <div className="text-center">
                                                <MDBBtn className='topBotomBordersOut' type="submit">Saving goal</MDBBtn>
                                                <MDBBtn style={{ marginLeft: "10px" }} className='topBotomBordersOut' href="javascript:void(0);" onClick={() => this.closeModal()} type="submit">Close</MDBBtn>

                                            </div>
                                      </Form>

                                    </MDBCol >
                                </MDBRow>

                            </MDBContainer>

                        </div>



                    </Modal>
                    
                </section>
                <div className="icom">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="2">

                                <MDBBtn className='topBotomBordersOut' style={{ width: "150px" }} onClick={() => this.openModal()} type="button" >Saving goal</MDBBtn>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                 <MDBContainer>
                    <MDBRow>
                        <MDBCol md="10">
                            <Container className="container article float-shadow">
                                <Row >
                                    <Col sm={8}>

                                        <p><span>Title:</span> cas</p>
                                        <p><span>Amount:</span> 25$</p>
                                        <p><span>Date:</span> 25/2/2001 </p>
                                    </Col>
                                     
                                    <Col className="col" sm={2}>
                                        <svg class="icons" viewBox="0 0 24 24">

                                            <path class="cls-1" d="M19,14.94v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-12a2,2,0,0,1,2-2H9" />
                                            <polygon class="trash-lid1" points="18.12 8.72 12.46 14.38 8.93 15.09 9.64 11.55 15.29 5.89 18.12 8.72" />
                                            <rect class="trash-lid1" x="16.12" y="3.89" width="4" height="4" transform="translate(1.14 14.54) rotate(-45)" />
                                        </svg>

                                    </Col>

                                    <Col className="col" sm={2}>

                                        <svg className="icon-trash1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                            <path className="trash-lid1" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                            <path className="trash-can1" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                        </svg>

                                    </Col>
                                   
                                </Row>
                                <br></br>
                                <MDBProgress material value={50} animated >50%</MDBProgress>
                            </Container>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

             <MDBContainer>
                    <MDBRow>
                        <MDBCol md="10">
                            <Container className="container article float-shadow">
                                <Row >
                                    <Col sm={8}>

                                        <p><span>Title:</span> cas</p>
                                        <p><span>Amount:</span> 25$</p>
                                        <p><span>Date:</span> 25/2/2001 </p>
                                    </Col>
                                     
                                    <Col className="col" sm={2}>
                                        <svg class="icons" viewBox="0 0 24 24">

                                            <path class="cls-1" d="M19,14.94v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-12a2,2,0,0,1,2-2H9" />
                                            <polygon class="trash-lid1" points="18.12 8.72 12.46 14.38 8.93 15.09 9.64 11.55 15.29 5.89 18.12 8.72" />
                                            <rect class="trash-lid1" x="16.12" y="3.89" width="4" height="4" transform="translate(1.14 14.54) rotate(-45)" />
                                        </svg>

                                    </Col>

                                    <Col className="col" sm={2}>

                                        <svg className="icon-trash1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                            <path className="trash-lid1" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                            <path className="trash-can1" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                        </svg>

                                    </Col>
                                   
                                </Row>
                                <br></br>
                                <MDBProgress material value={50} animated >50%</MDBProgress>
                            </Container>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

 <MDBContainer>
                    <MDBRow>
                        <MDBCol md="10">
                            <Container className="container article float-shadow">
                                <Row >
                                    <Col sm={8}>

                                        <p><span>Title:</span> cas</p>
                                        <p><span>Amount:</span> 25$</p>
                                        <p><span>Date:</span> 25/2/2001 </p>
                                    </Col>
                                     
                                    <Col className="col" sm={2}>
                                        <svg class="icons" viewBox="0 0 24 24">

                                            <path class="cls-1" d="M19,14.94v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-12a2,2,0,0,1,2-2H9" />
                                            <polygon class="trash-lid1" points="18.12 8.72 12.46 14.38 8.93 15.09 9.64 11.55 15.29 5.89 18.12 8.72" />
                                            <rect class="trash-lid1" x="16.12" y="3.89" width="4" height="4" transform="translate(1.14 14.54) rotate(-45)" />
                                        </svg>

                                    </Col>

                                    <Col className="col" sm={2}>

                                        <svg className="icon-trash1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                            <path className="trash-lid1" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                            <path className="trash-can1" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                        </svg>

                                    </Col>
                                   
                                </Row>
                                <br></br>
                                <MDBProgress material value={50} animated >50%</MDBProgress>
                            </Container>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>







            </div>
            </>
        );
    }



};




export default Saving_goal;
