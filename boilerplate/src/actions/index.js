import axios from "axios";
import { AUTH_TYPE, AUTH_ERROR } from "./types.js";

// export const signup = ({ email, password }) => {
//     return function(dispatch){
//        // dispatch( { email} );
//     }
// }

// export const signup = ({ email, password}) => {
//     return (dispatch) => {

//     }
// } The result is same as the first function definition , the modification is purely es6 syntax.
//{email, password } written as formProps as there are passed to form
export const signup = (formProps, callback) =>async dispatch => {

    try{
        const response = await  axios.post("http://localhost:4111/signup", formProps);
        console.log("Inside err response", response);
        dispatch({ type : AUTH_TYPE, payload : response.data.token });
        localStorage.setItem("token", response.data.token);
        callback();
    } catch(err){
        console.log("Inside err");
        dispatch({ type : AUTH_ERROR, payload : " Email already in use "});
    }

};

export const signout = () =>{
    localStorage.removeItem("token");
    return {
        type: AUTH_TYPE,
        payload : ""
    }
}

export const signin = (formProps, callback) =>async dispatch => {

    try{
        const response = await  axios.post("http://localhost:4111/signin", formProps);
        console.log("Inside err response", response);
        dispatch({ type : AUTH_TYPE, payload : response.data.token });
        localStorage.setItem("token", response.data.token);
        callback();
    } catch(err){
        console.log("Inside err");
        dispatch({ type : AUTH_ERROR, payload : " Invalid credentials "});
    }

};

export const upload = (formData, callback) => async dispatch => {
    debugger;
    const response = await axios.post("http://localhost:4111/uploads", formData);
    //console.log("response",response.data);
     const readStream = await axios.get(`http://localhost:4111/image/${response.data.file.filename}`);
    callback(readStream.data);
}
export const getFile = (formData, callback) => async dispatch => {
    debugger;
    const response = await axios.get(`http://localhost:4111/image/${formData}`);
    //console.log("response",response.data);
    callback(response);
}

export const deleteFile = (filename, callback) => async dispatch => {
    debugger
    const response = await axios.post(`http://localhost:4111/files/${filename}`);
    callback(response);
}
