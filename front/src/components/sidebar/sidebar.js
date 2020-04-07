import React, { useState } from 'react';
import './sidebar.css';
import { SocialMediaIconsReact } from 'social-media-icons-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { MDBBtn } from 'mdbreact';

class sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            users: [],
            currUser: []
        }
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8080/api/users/index.php');
            const res = await response.json();
            // console.log(res.data);
            this.setState({ users: res.data });
            this.state.users.map(
                user => {
                    if (user['email'] === localStorage.getItem('email')) {
                        this.setState({ currUser: user })
                        console.log(this.state.currUser.image)
                    }
                })
        } catch (err) { }
    }
    render() {
        const initialLoggedIn = localStorage.getItem('email')
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'} />)
        }
        return (
            <>
                <div className='bod'>
                    <nav id="sidebar">
                        <p className='namee'>{this.state.currUser['name']}</p>
                        <img className='sss' src={`http://localhost:8080/uploads/${this.state.currUser.image}`} alt="Akram" className='imgpro' />
                        <br></br> <br></br>
                        <MDBBtn onClick={() => {
                            localStorage.removeItem('email')
                            this.setState({ redirectToReferrer: true }, () => {
                                window.location.reload();
                            });
                        }
                        } color="dark">LogOut
                        </MDBBtn>
                        <div className="brand"></div>
                        <ul>
                            <Link exact to="/incomes" className='sss'>  <li ><a    >Incoems</a></li></Link>
                            <Link to="/expenses" className='sss' >    <li ><a  >Expenses</a></li></Link>
                            <Link to="/saving_goal" className='sss' >   <li ><a  > Saving goal</a></li></Link>
                            <Link to="/reports" className='sss' >   <li ><a  > Reports</a></li></Link>
                        </ul>
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="facebook" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(46,74,212,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="50" />
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="twitter" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(28,186,223,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="50" />
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="phone" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(50,183,76,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="50" />
                        <SocialMediaIconsReact borderColor="rgba(0,0,0,0.25)" borderWidth="5" borderStyle="solid" icon="youtube" iconColor="rgba(255,255,255,1)" backgroundColor="rgba(249,2,2,1)" iconSize="5" roundness="50%" url="https://some-website.com/my-social-media-url" size="50" />
                    </nav>
                </div>
            </>
        );
    }
};




export default sidebar;
