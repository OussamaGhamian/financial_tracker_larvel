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
             user: [],
            token:'',
            covid: ''
        }
    }
    async componentDidMount() {
        
        const responseC = await fetch('https://api.covid19api.com/total/country/lebanon/status/confirmed');
        const resultC = await responseC.json();
        this.setState({
            covid: resultC[(resultC).length - 1]
        });

        console.log(this.state.covid.Cases)




        this.setState({ user: (localStorage.getItem('userData')).split(','),
           token: localStorage.getItem('currUser')
     })
        console.log(this.state.user[0])
        console.log(localStorage.getItem('userData'));
        

        console.log(localStorage.getItem('currUser')) ;
        
    }
    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'} />)
        }
        return (
            <>
                <div className='bod'>
                    <nav id="sidebar">
                        <p className='namee'>{this.state.user[2]}</p>
                        <img className='sss' src={`http://localhost:8000/images/${this.state.user[3]}`} alt="Akram" className='imgpro' />
                        <br></br> <br></br>
                        <MDBBtn onClick={async () => {
                            const response = await fetch(`http://localhost:8000/api/logout?token=${localStorage.getItem('currUser')}`);
                            const resultp = await response.json();
                            localStorage.removeItem('currUser')

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
                        <div   >
                            <p className="Co"  >Covid19-Lebanon</p>
                            <p className="Co"  > Cases: {this.state.covid.Cases}</p>
                            <p className="Co"  > Last-Update {this.state.covid.Date}</p>
                        </div>
                    </nav>
                   

                </div>
            </>
        );
    }
};




export default sidebar;
