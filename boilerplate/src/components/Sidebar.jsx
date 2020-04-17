import React, { Component } from "react";

import { Link } from "react-router-dom";


export default class Sidebar extends Component{

     state = { renderedComponent : "Dashboard"};

     // renderLink = event => {
     //      if(event.target.value === "project")this.setState({renderedComponent : Project});
     // }
     // renderLink = url => {
     //      <Link to={url}>jk</Link>
     // }
     changeRender = stateValue => this.setState({renderedComponent : stateValue});

    render(){
         console.log("this.props.history",this.props);
          return (
               <div id="container" >
                 
               <div  className="sideBarContainer">
                    <div className = "row sideBarClass">
                         <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-12 sideBarElement">
                                   {/* <button value="project" onClick={this.renderLink("/dashboard")}>Dashboard</button> */}
                                   <Link to="/signup">Dashboard</Link>
                              </div>
                              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-12 sideBarElement">
                                   {/* <button value="project" onClick={this.renderLink("/project")}>Project</button> */}
                                   <Link to="/signin">Project</Link>
                              </div>
                         </div>
                         {/* <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-10">
                             {<this.state.renderedComponent props={this.props} changeRender={this.changeRender}/>}
                         </div> */}
                         {this.props.chidrenProps}
                    </div>
               </div>
               </div>
          )
     }
}