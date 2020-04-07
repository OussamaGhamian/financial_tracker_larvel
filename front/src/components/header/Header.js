import React, { Component } from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops'
import './style/style.css'
export default class Header extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0, marginRight: -2000 }}
        to={{ opacity: 1, marginRight: 0 }}
        config={{ delay: 700, duration: 1500 }}
      >
        {
          props =>
            <div style={props}>
              <ReactBootstrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <ReactBootstrap.Navbar.Brand ><Link to={'/'} className="nav-link">$avor</Link></ReactBootstrap.Navbar.Brand>
                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                  <ReactBootstrap.Nav className="mr-auto">
                    <ReactBootstrap.Nav.Link className=" topBotomBordersOut"><Link to={'/signUp'} className="nav-link">Sign Up</Link></ReactBootstrap.Nav.Link>
                    <ReactBootstrap.Nav.Link className=" topBotomBordersOut"><Link to={'/signIn'} className="nav-link">Log In</Link> </ReactBootstrap.Nav.Link>
                  </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>
              </ReactBootstrap.Navbar>
            </div>
        }
      </Spring>
    )
  }
}