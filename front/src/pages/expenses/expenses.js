import React from 'react';
 
import { Form, Col, Container, Row } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Modal from 'react-awesome-modal';
import Side from '../../components/sidebar/sidebar'
import axios from "axios";

export default class expenses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            curren: [],
            itemsCato: [],
            titlee: '',
            descriptionn: '',
            startDatee: '',
            endDatee: '',
            amountt: '',
            currencies_idd: '',
            categories_idd: '',
            itemstrans: [],
            itemsCatob: [],
        }
        this.addincomes = this.addincomes.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        try {
            const token = localStorage.getItem('currUser');
            //currencies
            const response = await fetch('http://localhost:8000/api/currencies');
            const result = await response.json();
            this.setState({
                curren: result.data
            });
            //categories
            const responseG = await fetch('http://localhost:8000/api/categories', {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            });
            const resultG = await responseG.json();
            console.log(resultG.data)
            this.setState({
                itemsCato: resultG.data
            });
            //transactions
            const responset = await fetch('http://localhost:8000/api/transExpenses', {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            });
            const resultt = await responset.json();
            console.log(resultt.data[0].id)
            this.setState({
                itemstrans: resultt.data
            });
            console.log(this.state.itemstrans)
        
        }
        catch (err) {
            return (err)
        }
    }

    async addincomes(e) {
        e.preventDefault();
        const userDa = (localStorage.getItem('userData').split(',')[0]);
        const token = localStorage.getItem('currUser');
        const responset = await axios.post('http://localhost:8000/api/transactions', {
            title: this.state.titlee,
            description: this.state.descriptionn,
            amount: this.state.amountt,
            categories_id: this.state.categories_idd ? this.state.categories_idd : 0,
            start_date: this.state.startDatee,
            end_date: this.state.endDatee,
            user_id: userDa,
            intervalo: "fixxed",
            type: "expenses",
            currencies_id: this.state.currencies_idd
        }, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token} `,
            }
        }
        );
        if (responset.status == 200) {
            alert("expenses has been created");
            console.log(responset)
            this.setState({ itemstrans: [...this.state.itemstrans, responset.data.data] })

        }
        else { alert("expenses has not been created") };
        //    window.location.reload();

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
    delete = async (e, id) => {
        e.preventDefault();
        debugger;
        try {
            const response = await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('currUser')} `,
                }
            })
            debugger;
            console.log([...this.state.itemstrans]);

            this.setState({
                itemstrans: this.state.itemstrans.filter(item => item.id != id)
            })

        }
        catch (err) {
            return (err)
        }

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
                                        <Form onSubmit={this.addincomes} >
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Title</Form.Label>
                                                    <MDBInput icon="envelope" name="titlee" onChange={this.onChange} group type="text" validate error="wrong"
                                                        success="right" />
                                                </Form.Group>

                                                <Form.Group as={Col} >
                                                    <Form.Label>Categories</Form.Label>

                                                    <Form.Control as="select" name="categories_idd" onChange={this.onChange}>
                                                        <option></option>
                                                        {this.state.itemsCato.map((itemc, index) => (
                                                            <option value={itemc.id} key={index} >{itemc.name}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Add</Form.Label><br></br>
                                                    <Form.Control type="Button" placeholder="Add" value="Add Categories" />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group  >
                                                <Form.Label>Description</Form.Label>
                                                <MDBInput icon="envelope" group name="descriptionn" onChange={this.onChange} type="text" validate error="wrong" success="right" />
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Amount</Form.Label>
                                                    <MDBInput icon="envelope" name="amountt" onChange={this.onChange} group type="number" validate error="wrong" success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Label>Currencies</Form.Label>
                                                    <Form.Control as="select" name="currencies_idd" onChange={this.onChange}>
                                                        <option></option>
                                                        {this.state.curren.map((item, index) => (
                                                            <option value={item.id} key={index} >{item.code}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Start date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="startDatee" onChange={this.onChange} validate error="wrong" success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="endDatee" onChange={this.onChange} validate error="wrong" success="right" />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formGridPassword">
                                            </Form.Group>
                                            <div className="text-center">
                                                <MDBBtn className='topBotomBordersOut' type="submit">Add Expenses</MDBBtn>
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
                                <MDBBtn className='topBotomBordersOut' style={{ width: "150px" }} onClick={() => this.openModal()} type="button" >Add expenses</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                    <MDBContainer>
                        {/* {JSON.stringify(this.state.itemstrans)} */}
                        {this.state.itemstrans.map((itemI, index) => (
                            < form onSubmit={(e) => this.delete(e, itemI.id)} id={itemI.id} key={itemI.id} >
                                <MDBRow>
                                    <MDBCol md="10">
                                        <Container className="container article float-shadow">
                                            <Row >
                                                <Col sm={5}>
                                                    <p><span>Title:</span> {itemI.title}</p>
                                                    <p><span>Description:</span>  {itemI.description}</p>
                                                    <p><span>Start Date:</span>  {itemI.start_date} </p>
                                                </Col>
                                                <Col className="col" sm={5}>
                                                    <p>
                                                        <span>Categories:</span>
                                                        {this.state.itemsCato.map(item => {
                                                            if (item.id == itemI.categories_id)
                                                                return item.name
                                                        })}
                                                    </p>

                                                    <p><span>Amount:</span>  {itemI.amount}  {itemI.categories_id == 1 ? "L.L" : "USD"}  </p>
                                                    <p><span>End Date:</span>  {itemI.end_date} </p>
                                                </Col>
                                                <Col className="col" sm={2}>
                                                    <button type="submit">
                                                        <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                                            <path className="trash-lid" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                                            <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                                        </svg>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        ))}
                    </MDBContainer>
                </div>
            </>
        );
    }

};





