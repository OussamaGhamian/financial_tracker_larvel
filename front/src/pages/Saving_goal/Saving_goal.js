
import React from 'react';
import './Saving_goal.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBProgress } from 'mdbreact';
import { Form, Col, Container, Row } from 'react-bootstrap'
import Modal from 'react-awesome-modal';
import Side from '../../components/sidebar/sidebar'
import axios from 'axios';

class Saving_goal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
             visible: false,
            currencies: [],
            categories: [],
            transactions: [],
            title: '',
            description: '',
            categories_id: '',
            startDate: '',
            endDate: '',
            user_id: '',
            intervalo: '',
            type: '',
            currencies_id: '',
            savings: [],
            itemsAmount: '',
            itemsexpenses: '',
            rand:''

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
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    async componentDidMount() {
        try {
            const token = localStorage.getItem('currUser');
            //transactionsIncomes
            const responset = await fetch('http://localhost:8000/api/transIncomes', {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            });
            const resultt = await responset.json();

            var totalincomes = (resultt.data).reduce(function (tot, arr) {
                return tot + arr.amount;
            }, 0);

            this.setState({

                itemsAmount: totalincomes
            });
            localStorage.setItem('totalIncomes', totalincomes)
            console.log(this.state.itemsAmount)

            //transactionseXPENSES
            const responsett = await fetch('http://localhost:8000/api/transExpenses', {
                headers: {
                    Authorization: `Bearer ${token} `
                }
            });
            const resultE = await responsett.json();
            var totalexpenses = (resultE.data).reduce(function (tot, arr) {
                return tot + arr.amount;
            }, 0);

            this.setState({
                itemsexpenses: totalexpenses
            });
            localStorage.setItem('totalExpenses', totalexpenses)
            console.log(this.state.itemsexpenses)
            console.log((10000 / (this.state.itemsAmount - this.state.itemsexpenses) | 0 + 1))
            console.log((10000 / (this.state.itemsAmount - this.state.itemsexpenses) / 12).toFixed(1))
            //  
            //currencies
            const response = await fetch('http://localhost:8000/api/currencies');
            const result = await response.json();
            this.setState({
                currencies: result.data
            });
            //categories
        } catch (err) {

        }
        const response1 = await fetch('http://localhost:8000/api/categories', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('currUser')} `
            }
        });
        const result2 = await response1.json();
        this.setState({
            categories: result2.data
        });
        try {
            //  
            //currencies
            const response3 = await fetch('http://localhost:8000/api/transactions', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('currUser')} `
                }
            });
            const result3 = await response3.json();
            this.setState({
                transactions: result3.data
            });
        } catch (err) {

        }
        this.setState({
            savings: [...this.state.transactions.filter(item => { if (item.type == 'saving') return item })]
        })
    }
    addSaving = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/transactions', {
                title: this.state.title,
                description: this.state.description,
                amount: this.state.amount,
                categories_id: this.state.categories_id,
                start_date: this.state.startDate,
                end_date: this.state.endDate,
                user_id: ((localStorage.getItem('userData')).split(','))[0],
                intervalo: 'Saving',
                type: "saving",
                currencies_id: this.state.currencies_id
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('currUser')} `,
                    }
                })

            console.log(response)
            if (response.status == '200') {
                alert('Saving has been created')
                this.closeModal();
            }
            this.setState({
                savings: [...this.state.savings, response.data.data]
            })

            if (response.status == 200) {
                alert("Savin Goal has been created");
                console.log(response)
                this.setState({transactions: [...this.state.transactions, response.data.data] })

            }
            else { alert("Savin Goal has not been created") };

        }
        catch (err) {

        }
    }
    del = async (e, id) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('currUser')} `,
                }
            })
            this.setState({
                savings: this.state.savings.filter(item => item.id != id)
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
                                        <Form onSubmit={(e) => this.addSaving(e)} >
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Title</Form.Label>
                                                    <MDBInput icon="envelope" name="title" onChange={this.onChange} group type="text" validate error="wrong"
                                                        success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Label>Categories</Form.Label>

                                                    <Form.Control as="select" name="categories_id" onChange={this.onChange}>
                                                        <option></option>
                                                        {this.state.categories.map((item, index) => (
                                                            <option value={item.id} key={index} >{item.name}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group  >
                                                    <Form.Label>Description</Form.Label>
                                                    <MDBInput icon="envelope" group name="description" onChange={this.onChange} type="text" validate error="wrong" success="right" />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Amount</Form.Label>
                                                    <MDBInput icon="envelope" name="amount" onChange={this.onChange} group type="number" validate error="wrong" success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} >
                                                    <Form.Label>Currencies</Form.Label>
                                                    <Form.Control as="select" name="currencies_id" onChange={this.onChange}>
                                                        <option></option>
                                                        {this.state.currencies.map((item, index) => (
                                                            <option value={item.id} key={index} >{item.code}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}  >
                                                    <Form.Label>Start date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="startDate" onChange={this.onChange} validate error="wrong" success="right" />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridEDate">
                                                    <Form.Label>End Date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="endDate" onChange={this.onChange} validate error="wrong" success="right" />
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Group controlId="formGridPassword">
                                            </Form.Group>
                                            <div className="text-center">
                                                <MDBBtn className='topBotomBordersOut' type="submit">Add Saving Goal</MDBBtn>
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
                                <MDBBtn className='topBotomBordersOut' style={{ width: "150px" , background : 'transparent' , border : 'none' , color : "black" , "font-weight ": 'larger' }}onClick={() => this.openModal()} type="button" >Saving goal</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    {
                        this.state.savings.map(item => {
                            return (
                                <form>
                                    <MDBContainer>
                                        <MDBRow>
                                            <MDBCol md="10">
                                                <Container className="container article float-shadow">
                                                    <Row >
                                                        <Col sm={8}>
                                                            <p><span>Title:</span> {item.title}</p>
                                                            <p><span>Amount:</span> {item.amount} {item.categories_id == 1 ? "USD" : "L.L"}  </p>
                                                            <p><span>Date:</span> 25/2/2001 </p>
                                                            <p><span>you need:</span> {(`${item.amount}` / (this.state.itemsAmount - this.state.itemsexpenses) | 0 + 1)} Month </p>

                                                         </Col>
                                                        {/* <Col className="col" sm={2}>
                                                            <svg class="icons" viewBox="0 0 24 24">
                                                                <path class="cls-1" d="M19,14.94v4a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2v-12a2,2,0,0,1,2-2H9" />
                                                                <polygon class="trash-lid1" points="18.12 8.72 12.46 14.38 8.93 15.09 9.64 11.55 15.29 5.89 18.12 8.72" />
                                                                <rect class="trash-lid1" x="16.12" y="3.89" width="4" height="4" transform="translate(1.14 14.54) rotate(-45)" />
                                                            </svg>
                                                        </Col> */}
                                                        <button onClick={(e) => this.del(e, item.id)} style={{ "background": "transparent", "border": "none", "outline": 'none' }}>
                                                            <Col className="col" sm={2}>
                                                                <svg className="icon-trash1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                                                                    <path className="trash-lid1" fill-rule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                                                                    <path className="trash-can1" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                                                                </svg>
                                                            </Col>
                                                        </button>
                                                    </Row>
                                                    <br></br>
                                                    <MDBProgress material value={Math.floor((Math.random() * 100) + 1)} animated > </MDBProgress>
                                                </Container>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </form>
                            )
                        })
                    }
                </div>
            </>
        );
    }
};
export default Saving_goal;
