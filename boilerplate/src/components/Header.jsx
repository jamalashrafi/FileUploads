import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "redux-form/lib/actions";
import "./HeaderStyle.css";

class Header extends Component {

    renderLinks(){
        if(this.props.authenticated){
            return(
                <div>
                    <Link to="/signout">Sign Out</Link>
                    <Link to="/feature">Features</Link>
                </div>
            )

        }else{
            return(
                <div>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/signin">Sign In</Link>
                </div>
            )
        }
    }
    render(){
        console.log("---------",this.props.chidrenProps);
        return(
            <div className="header">
                <Link to="/signin">Redux Auth</Link>
                 {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state){
   return  {authenticated : state.auth.authenticated}
}

export default connect(mapStateToProps, actions)(Header);