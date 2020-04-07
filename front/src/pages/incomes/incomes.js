import React from 'react';
import './incomes.css';
import { Form, Col, Container, Row } from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Modal from 'react-awesome-modal';
import Side from '../../components/sidebar/sidebar'

export default class incomes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            titlee:'',
            title:'',
            descriptionn:'',
            currencies_idd:'',
            startDatee:'',
            endDatee:'',
            categories_idd:'',
            amountt:'',
            description: '',
            currencies_id: '',
            start_date: '',
            end_date: '',
            categories_id: '',
            amount: '',
            itemsCurr: [],
            itemsCato: [],
            currUser: [],
             itemsIncomes:[],
            name: ''

        }
        this.addincomes = this.addincomes.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8080/api/currencies');

            const result = await response.json();
            const response1 = await fetch('http://localhost:8080/api/categories');
            const result1 = await response1.json();
             
            let itemsCurr = []
            let itemsCato = []
             this.setState({
                itemsCurr: [...itemsCurr, ...result.data],
                itemsCato: [...itemsCato, ...result1.data],
              
                error: "none"
            });
            const responseu = await fetch('http://localhost:8080/api/users/index.php');
            const res = await responseu.json();
            // console.log(res.data);
            this.setState({ users: res.data });
            this.state.users.map(
                user => {
                    if (user['email'] === localStorage.getItem('email')) {
                        this.setState({ currUser: user })
                        console.log(this.state.currUser.id)
                    }
                })
             
                 const resIn = await fetch(`http://localhost:8080/api/transactions/getById_type.php?id=${this.state.currUser.id}&type=incomes`);
                 const rest = await resIn.json();
                console.log(rest.data)
                 this.setState({
                         itemsIncomes: rest.data,
                             error: "none"
                 });
                }
                
       
          catch (err) {
              return ("cdsc")
           }
    }

    async addincomes(event) {
        event.preventDefault();
        const responseu = await fetch(`http://localhost:8080/api/transactions/create.php?title=${this.state.titlee}&description=${this.state.descriptionn}&amount=${this.state.amountt}&categories_id=${this.state.categories_idd}&start_date=${this.state.startDatee}&end_date=${this.state.endDatee}&users_id=${this.state.currUser.id}&intervalo=fexit&type=incomes&currencies_id=${this.state.currencies_idd}`);
        const res = await responseu.json();
        window.location.reload();

console.log(res.data.amount)
        
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
                   
                    <Modal   visible={this.state.visible} width="100%" height="100%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
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
                                                        {this.state.itemsCurr.map((item, index) => (
                                                            <option value={item.id} key={index} >{item.code}</option>
                                                        ))}
                                        </Form.Control>
                                    </Form.Group>


                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}  >
                                        <Form.Label>Start date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="startDatee" onChange={this.onChange}  validate error="wrong" success="right" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEDate">
                                        <Form.Label>End Date</Form.Label>
                                                    <MDBInput icon="envelope" group type="date" name="endDatee" onChange={this.onChange} validate error="wrong" success="right" />
                                    </Form.Group>
                                </Form.Row>




                                <Form.Group controlId="formGridPassword">

                                </Form.Group>
                                            <div className="text-center">
                                                <MDBBtn className='topBotomBordersOut' type="submit">Add incomes</MDBBtn>
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
                                
     <MDBBtn className='topBotomBordersOut' style={{ width: "150px" }} onClick={() => this.openModal()} type="button" >Add incomes</MDBBtn>
                               
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>                
                        <MDBContainer>
                     
                  {this.state.itemsIncomes.map((itemI) => (
                       


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
                                            <p><span>Categories:</span>  {itemI.categories_id}</p>

                                          <p><span>Amount:</span>  {itemI.amount}  
                                          
                                          </p>
                                            <p><span>End Date:</span>  {itemI.end_date} </p>

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
                       
                    ))}
                        }   
                    </MDBContainer>
         
            </div>
            </>
        );
    }



};




 
