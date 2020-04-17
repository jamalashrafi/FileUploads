// import React, { useCallback, Component }from "react";
// import Dropzone, { useDropZone } from "react-dropzone";
// import { connect } from "react-redux";
// import axios from "axios";
// import * as actions from "../actions";
// import requireAuth from "../components/requireAuth.jsx";


// class FeatureWithDropzone extends Component {
    
//     state = { image : "", responseImage : "", test:"", files: []};

//     onFileChange = e => {
//         this.setState({ image: e.target.files[0] })
//     }
//     onDrop = files => {
//         alert(1)
//         this.setState({files})
//     };
    

//     onSubmit = e => {
//         var m= "pic_trulli.jpg"
//         this.setState({test : `https://www.w3schools.com/html/${m}`});
//         debugger;
//         e.preventDefault()
//         const formData = new FormData();
//         formData.append('file', this.state.image);
//         formData.append('name', 'file');
//         //One method is to get the image url from config obj.
//         //Another way is to get the binary version of the image from express and display it in this format-
//         //<img src={`data:image/jpeg;base64,${binary_Data}`} />
//         this.props.getFile("b282357f09c02fbd9af890e3fdb17c85.jpg", response => {
//             //this.setState({responseImage : response.config.url});
//             console.log("filename1", response);
//         });
//     }
//     render(){
//         const files = this.state.files.map(file => (
//             <li key={file.name}>
//               {file.name} - {file.size} bytes
//             </li>
//         ));
        
//         return(
//             <div className="container">
//                <div className="row">
//                    <div className="col-xl-6 m-auto">
//                        <h1 className="text-center display-4 my-4">Mongo File Uploads</h1>
//                        <Dropzone onDrop={this.onDrop}>
//                                 {({getRootProps, getInputProps}) => (
//                                 <section className="container">
//                                     <div {...getRootProps({className: 'dropzone'})}>
//                                     <input {...getInputProps()} />
//                                     <p>Drag 'n' drop some files here, or click to select files</p>
//                                     </div>
//                                     <aside>
//                                     <h4>Files</h4>
//                                     <ul>{files}</ul>
//                                     </aside>
//                                 </section>
//                                 )}
//                         </Dropzone>
//                    </div>
//                    {this.state.responseImage ? <img src={this.state.responseImage} /> : ""}
//                </div>
//             </div>
//         );
//     }
// }

// //const mapStateToProps = state => return {}
// ///export default requireAuth(Feature);

// export default connect(null, actions)(FeatureWithDropzone);