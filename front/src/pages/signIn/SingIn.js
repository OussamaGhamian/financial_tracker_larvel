import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import "./style/style.css"
import { Redirect } from 'react-router-dom';
import axios from "axios";

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            currUser: '',
            redirectToReferrer: false,
            tokena: '',
            userData: []

        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async login(event) {
        // debugger;
        event.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                const tokena = response.data[0].access_token;
                const userData = Object.values(response.data[1]);
                // console.log(userData)
                // console.log(token);
               localStorage.setItem('currUser', tokena)
                localStorage.setItem('userData', userData)
                console.log(localStorage.getItem('userData'));
              console.log(tokena);
                this.setState({ redirectToReferrer: true }, () => {
                    this.props.setLogin(true)
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/incomes'} />)
        }
        return (
            <>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                            <form onSubmit={event => {
                                this.login(event);
                            }}>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                    <MDBInput label="Type your email" name="email" icon="envelope" group type="text"
                                        validate error="wrong"
                                        success="right" onChange={this.onChange} />
                                    <MDBInput label="Type your password" name="password" onChange={this.onChange}
                                        icon="lock" group type="password" validate />
                                </div>
                                <div className="text-center">
                                    <MDBBtn type={'submit'}>Sign In</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </>
        );
    };
}

export default SignIn;