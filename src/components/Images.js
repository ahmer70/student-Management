import React, { Component } from 'react'
import axios from "axios";
export default class Images extends Component {
    constructor(props){
        super(props);
        this.state = {
            multerImage:"https://i.pinimg.com/736x/f6/e4/df/f6e4dfc2834fafdc38caec39ed628748.jpg",

        }
    }
    setDefaultImage(uploadType){
        if(uploadType=="multer"){
            this.setState({
                multerImage:"https://i.pinimg.com/736x/f6/e4/df/f6e4dfc2834fafdc38caec39ed628748.jpg"
            });

        }
    }

    uploadImage(e,method){
        if(method==="multer"){
            let imageFormObj=new FormData();
            imageFormObj.append("imageName","multer-image-"+Date.now());
            imageFormObj.append("imageData",e.target.files[0]);
//store a readable instant of 
//the images begin uploaded using multer        
        this.setState({
            multerImage:URL.createObjectURL(e.target.files[0])
        });
        axios.post(`http://localhost:5000/image/uploadmulter`,imageFormObj)
        .then((data)=>{
            if(data.data.success){
                alert("images has beeb uploaded suffecess fully ")
                this.setDefaultImage("multer");
            }
        }).catch((err)=>{
            alert("error While Uploaded Imaged usign multer");
            this.setDefaultImage("multer")
        })
        }
    }
    render() {
        return (
            <div>
               <div>
                <input type="file" className="process_upload-btn" onChange={(e)=>this.uploadImage(e,"multer")} />
                <img src={this.state.multerImages} alt="" />
            </div> 
            </div>
        )
    }
}
