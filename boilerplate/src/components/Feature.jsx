import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
//import requireAuth from "../components/requireAuth.jsx";


class Feature extends Component {
    
    state = { file : "", responseImage : "", fileName:""};

    onFileChange = e => this.setState({ file: e.target.files[0], fileName : e.target.files[0].name });

    onSubmit = e => {
        debugger;
        e.preventDefault();
        if(this.validateUpload()){
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('name', 'file');
            //One method is to get the image url from config obj.
            //Another way is to get the binary version of the image from express and display it in this format-
            //<img src={`data:image/jpeg;base64,${binary_Data}`} />
            if(this.state.file ){
                this.props.upload(formData, response => {
                    this.setState({responseImage : response, file : ""});
                    //console.log("filename1", response);
                });
            }
        }
    }

    validateUpload = () =>{
        var flag=true;
        let types = ["application/pdf","text/plain","image/jpg","image/png","image/jpeg"];
        //check for size and format
        if(!types.includes(this.state.file.type))
          flag = false;
        if(this.state.file.size > 1000000)   
          flag = false;
        return flag;   
    }

    deleteFile = () => {
        this.props.deleteFile(this.state.responseImage.filename, response => {
            this.setState({responseImage: "", file:""});
        })
    }

    renderImage = () =>{
        debugger
        if(this.state.responseImage.filename.includes("jpg")){
            return <img src={`data:image/jpeg;base64,${this.state.responseImage.image}`} alt="img" />
        }else if(this.state.responseImage.filename.includes("png")){
            return <img src={`data:image/png;base64,${this.state.responseImage.image}`} alt="img" />
        }else if(this.state.responseImage.filename.includes("pdf")){
            return <object  data={`data:application/pdf;base64,${this.state.responseImage.image}`} ></object>
        }else if(this.state.responseImage.filename.includes("txt")){
            return <object  data={`data:text/html;base64,${this.state.responseImage.image}`} ></object>
        } 
    }
    render(){
       
        //console.log("filename", this.state.responseImage);
        return(
            <div className="container">
               <div className="row">
                   <div className="col-xl-6 m-auto">
                       <h1 className="text-center display-4 my-4">Mongo File Uploads</h1>
                       <form onSubmit={this.onSubmit}>
                           <div className="custom-file mb-3">
                               <input type="file" name="file" id="file" onChange={this.onFileChange} 
                               
                               className="custom-file-input" />
                                   <label htmlFor="file" className="custom-file-label">only jpeg,png,pdf and txt files are accepted...</label>
                           </div>
                           <input type="submit"  onClick={this.sendFile}  
                           className="btn btn-primary btn-block" />                           
                       </form>
                       <div>
                            {this.state.responseImage ? this.renderImage() : ""}
                       </div>
                       {this.state.responseImage ? <input type="submit"  value="Delete" onClick={this.deleteFile}  
                           className="btn btn-primary btn-block" /> : ""}
                   </div>
                   
               </div>
            </div>
        );
    }
}

//const mapStateToProps = state => return {}
///export default requireAuth(Feature);

export default connect(null, actions)(Feature);