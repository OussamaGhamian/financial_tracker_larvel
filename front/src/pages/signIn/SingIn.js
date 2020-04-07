import React from "react";
import {MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import "./style/style.css"
import { Redirect} from 'react-router-dom';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false

        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async login(event) {
        debugger;
        event.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        const urlencoded = new URLSearchParams();
        urlencoded.append("email", this.state.email);
        urlencoded.append("password", this.state.password);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        try {
            const response = await fetch(`http://localhost:8080/api/auth/login.php`, requestOptions);
            const result = await response.json();
            if (result.success) {
                localStorage.setItem('email', result.data.email)
                localStorage.setItem('password', result.data.password)
                this.setState({redirectToReferrer: true}, () => {
                    this.props.setLogin(true)
                });

            } else {
                alert(result.message);
            }
        } catch (e) {
            alert(e.message)
        }
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/incomes'}/>)
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
                                              success="right" onChange={this.onChange}/>
                                    <MDBInput label="Type your password" name="password" onChange={this.onChange}
                                              icon="lock" group type="password" validate/>
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