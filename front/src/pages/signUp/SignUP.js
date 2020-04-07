import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import axios from "axios";
export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      email: '',
      password: '',
      name: '',
      image: "",
      file: '',
      currencies_id: 1,
      redirect: false,
    };
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/api/currencies');
    const result = await response.json();
    let items = []
    this.setState({
      items: [...items, ...result.data],
      error: "none"
    });
  }


  onChange = e => {
    let value = "";
    if (e.target.name === "image") {
      value = e.target.files[0].name;
    }
    else value = e.target.value
    this.setState({ [e.target.name]: value });
  }

  signUp = async (e) => {
    e.preventDefault();
    // console.log(e.target.image.files[0]);
    // const myHeaders1 = new Headers();
    // myHeaders1.append('content-type', 'multipart/form-data');
    // myHeaders1.append("Access-Control-Allow-Origin", "*");
    // const fd = new FormData();
    // fd.append('image', e.target.image.files[0]);
    // try {

    //   await axios.post('http://localhost:8080/core_php.php', fd, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     }
    //   }
    //   )

    // }
    // catch (err) { console.log(err.message) }
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // myHeaders.append("Access-Control-Allow-Origin", "*");
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("email", this.state.email);
    // urlencoded.append("password", this.state.password);
    // urlencoded.append("name", this.state.name);
    // // urlencoded.append("image", this.state.image);
    // urlencoded.append("currencies_id", this.state.currencies_id);
    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: urlencoded,
    //   redirect: 'follow'
    // };
    // try {
    //   console.log(requestOptions.body)
    //   const response = await fetch('http://localhost:8000/register', requestOptions);
    //   const result = await response.json();
    //   console.log(result)
    //   if (result.success) {
    //     alert("user has been created");
    //     this.setState({ redirect: true });
    //   }
    //   else alert("user has not been created");
    // }
    // catch (err) {
    //   alert(err.message);
    // }
    console.log(this.state.email, this.state.name, this.state.password, this.state.image, this.state.currencies_id)
    try {
      const myHeaders = new Headers();
      myHeaders.append('content-type', 'multipart/form-data');
      // myHeaders.append("Access-Control-Allow-Origin", "*");
      // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      const fd = new FormData();
      fd.append('image', e.target.image.files[0]);
      try {
        // console.log(e.target.image.files[0]);
        await axios.post('http://localhost:8000/api/storeimg', fd, )
        console.log("asd");
      }
      catch (err) {
        console.log(err.message)
      }
      //--------------//
      const response = await axios.post('http://localhost:8000/api/register', {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        image: this.state.image,
        currencies_id: this.state.currencies_id,
      })
      if (response.status == 200) {
        alert("user has been created");
        this.setState({ redirect: true });
      }
      else alert("user has not been created");
    }
    catch (err) {
      alert(err.message);
    }
  }
  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/signIn'} />)
    }
    return (
      <>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form onSubmit={this.signUp} action="storeimg" method='POST' encType="multipart/form-data" >
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput label="Your name" name="name" icon="user" group type="text" validate error="wrong"
                    success="right" onChange={this.onChange} />
                  <MDBInput label="Your email" name="email" icon="envelope" group type="email" validate error="wrong"
                    success="right" onChange={this.onChange} />
                  <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate
                    error="wrong" success="right" />
                  <MDBInput label="Your password" name="password" icon="lock" group type="password" validate onChange={this.onChange} />
                  <MDBInput label="Image" name="image" icon="lock" group type="file" validate onChange={this.onChange} />
                  <Form.Control as="select" name="currencies_id" onChange={this.onChange} >
                    {this.state.items.map((item, index) => (
                      <option value={item.id} key={index} >{item.code}</option>
                    ))}
                  </Form.Control>
                  <Form.Label>Currencies</Form.Label>
                </div>
                <div className="text-center">
                  <MDBBtn color="primary" type={'submit'}>Register</MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    );
  };
}
