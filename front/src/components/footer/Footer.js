import React, { Component } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Spring } from 'react-spring/renderprops'

import './style/styel.css'
export default class Footer extends Component {
  render() {
    return (<Spring
      from={{ opacity: 0, marginRight: -2000 }}
      to={{ opacity: 1, marginRight: 0 }}
      config={{ delay: 700, duration: 1500 }}
    >
      {
        props =>
          <div style={props}><MDBFooter color="elegant-color-dark" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3">
              <MDBContainer fluid>
                {new Date().getFullYear()} &copy; Copyright reserved for Codi &hearts;
              </MDBContainer>
            </div>
          </MDBFooter>
          </div>}
    </Spring>)
  }
}
