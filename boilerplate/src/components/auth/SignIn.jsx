import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SignIn extends Component {
    onSubmit = formprops => {
        console.log(this.props);
        this.props.signin(formprops,() => {
            this.props.history.push("/feature");
        });

    }

    render(){

        const { handleSubmit } = this.props;
        return(
            <div>
               <form onSubmit={ handleSubmit(this.onSubmit)}>
                   <fieldset>
                       <label>Email</label>
                       <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                       />
                   </fieldset>
                   <fieldset>
                       <label>Password</label>
                       <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                       />
                   </fieldset>
                   <div>
                       { this.props.errorMessage}
                   </div>
                   <button>Sign In!</button>
               </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { errorMessage : state.auth.errorMessage };
}

//Inside compose we can pass as many higher component as we want.
//export default reduxForm({ form : "signup" })(SignUp);//Added for redux-form

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form : "signup"})
    )(SignIn);
