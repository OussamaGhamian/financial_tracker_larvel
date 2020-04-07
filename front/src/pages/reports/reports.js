import React from 'react';
import './reports.css';
import Chart from "react-google-charts";
import { MDBContainer , MDBCol} from 'mdbreact';
 import { MDBTabPane,MDBRow, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from 'mdbreact'
import { Form, Col } from 'react-bootstrap'
import Side from '../../components/sidebar/sidebar'

const data = [
    ["Element", "Density", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"] // CSS-style declaration
];

const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false
};
class reports extends React.Component {
    state = {
        activeItemJustified: "1"
    }

    toggleJustified = tab => e => {
        if (this.state.activeItemJustified !== tab) {
            this.setState({
                activeItemJustified: tab
            });
        }
    };
    render() {
        return (
            <>
<Side/>
               <div className="icom"> 
                 
                        <MDBContainer  >
                              <MDBRow>
                            <MDBCol md="10"> 
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Date</Form.Label>
                    <Form.Control as="select" value="ChooseCu">
                        <option>Choose</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>

                   <br></br>
                
                    
                    <MDBNav tabs className="nav-justified" color='indigo'>
                        <MDBNavItem>
                            <MDBNavLink to="#" active={this.state.activeItemJustified === "1"} onClick={this.toggleJustified("1")} role="tab" >
                                <span className="txt">Tab panel</span>   
            </MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#" active={this.state.activeItemJustified === "2"} onClick={this.toggleJustified("2")} role="tab" >
                                <span className="txt">Pie Chart</span> 
            </MDBNavLink>
                        </MDBNavItem>
                        
                    </MDBNav>
                    <MDBTabContent
                        className="card"
                        activeItem={this.state.activeItemJustified}
                    >
                        <MDBTabPane tabId="1" role="tabpanel">
                           
                                      <MDBCol md="12">
                                        <Chart
                                            chartType="ColumnChart"
                                            width="100%"
                                            height="400px"
                                            data={data}
                                        />
                                    </MDBCol>
                                
                             
                        </MDBTabPane>
                        <MDBTabPane tabId="2" role="tabpanel">
                                    <MDBCol md="12">
                                        <Chart
                                            chartType="PieChart"
                                            width="100%"
                                            height="400px"
                                            data={data}
                                            options={options}
                                        />
                                    </MDBCol>
                                 
                            
                        </MDBTabPane>
                       
                    </MDBTabContent>
                    </MDBCol  > 
                      </MDBRow>
                            
                </MDBContainer>
                
                      
            </div>
            </>
        );
    }



};




export default reports;
 