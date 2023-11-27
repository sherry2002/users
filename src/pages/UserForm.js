import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { db, storage, firestore } from '../Firebase';
import { ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";

const UserForm = ({userListVersion,setUserListVersion}) => {
  const [formData, setFormData] = useState({
    id: 1,
    name: "",
    email: "",
    phone: "",
    interview_time: "Morning",
    role: "",
    image: null,
    isSwitchOn: 0,
  });
  const isImage = useRef(null)
  const [error, setError] = useState(null)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = () => {
    setFormData({ ...formData, isSwitchOn: formData.isSwitchOn == 0 ? 1 : 0 });
  };

 const inputFile = useRef(null); 
  const handleUploadImg = (e) =>{
    setFormData({ ...formData, image: e.target?.files[0] });
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
  }

  const uploadImage = async (file) => {
    const storageRef = ref(storage, `/image/${file.name}`);
    //uploads the file to firebase storage
    uploadBytes(storageRef, file).then((snapshot) => {
    }
    ).then(() => {
      //gets the url for the uploaded image
      getDownloadURL(ref(storage, `/image/${file.name}`)).then((url) => {
        isImage.current = url
        return url
      }).catch((err)=>{
       toast.error("error in uploading image")
      })
    })
  };

  //user form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(formData.image == null || formData.image == ""){
        setError("image");
        return false
    }
    // Add logic to handle form submission
    if(formData.name == null || formData.name == ""){
        setError("name");
        return false
    }
    if(formData.email == null || formData.email == ""){
        setError("email");
        return false
    }
    if(formData.phone == null || formData.phone == ""){
        setError("phone");
        return false
    }
    if(localStorage.getItem("userList")){
      let emailValid = JSON.parse(localStorage.getItem("userList")).find((users)=> users.email === formData.email);
      if(emailValid && emailValid !== undefined){
        toast.error("User Email Already Exist");
        return false;
      }
    }
    try {
        let data = localStorage.getItem("userList") ? JSON.parse(localStorage.getItem("userList")) : []
        let id = data && data?.length > 0 ? data[data.length-1]?.id + 1 : formData.id;
        let payload = {
            ...formData,
            id:id,
            role : formData.isSwitchOn == 1 ? formData.role : "",
            image: isImage.current
        }
        
        // Add data to Firebase collection
        // await firestore.collection('users').add(payload);
         //await addDoc(collection(firestore, 'users'), payload);
        // const valRef = collection(firestore,'users')
        // await addDoc(valRef,payload)
        data.push(payload)
        localStorage.setItem("userList", JSON.stringify(data));
        setUserListVersion(userListVersion + 1)
        // Clear form data after submission
        setFormData({
            id:1,
            name: "",
            email: "",
            phone: "",
            interview_time: "Morning",
            role: "",
            image: null,
            isSwitchOn: 0,
        });
        inputFile.current.value = null; 
        setError(null)
        isImage.current = null
        toast.success("form submit successfully")
      } catch (error) {
        toast.error("please try again")
      }
  };

  return (
    <div className="user_form">
      <div className="xlg font-weight-bold mb-4">User Form</div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group controlId="file">
                <Form.Label className="md-text">Upload Your Picture <span className="text-danger">*</span></Form.Label>
                <Form.Control className={`${error && error !== "" && error === "image" && "input_icon"} input-padding`} ref={inputFile}  type="file" onChange={(e)=>{
                  handleUploadImg(e)
                  uploadImage(e.target.files[0]);
                }} 
                 //accept="image/*"
                  />
                {
                  error && error !== "" && error === "image" &&<span className="text-danger md-text">Please select image</span>
                }
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mb-4" md={6}>
              <Form.Group controlId="name">
                <Form.Label className="md-text">Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  className={`${error && error !== "" && error === "name" && "input_icon"} input-padding`}
                  value={formData.name}
                  onChange={(e)=>handleInputChange(e)}
                />
                {
                    error && error !== "" && error === "name" && <span className="text-danger md-text">Please type your name</span>
                }
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="email">
                <Form.Label className="md-text">Email <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className={`${error && error !== "" && error === "email" && "input_icon"} input-padding`}
                  value={formData.email}
                  onChange={(e)=>handleInputChange(e)}
                />
                {
                  error && error !== "" && error === "email" && <span className="text-danger md-text">Please type your email</span>
                }
              </Form.Group>
            </Col>
          </Row>
          <Row >
            <Col className="mb-4" md={6}>
              <Form.Group controlId="phone">
                <Form.Label className="md-text">Enter Your Phone <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your phone number"
                  name="phone"
                  className={`${error && error !== "" && error === "phone" && "input_icon"} input-padding`}
                  value={formData.phone}
                  onChange={(e)=>handleInputChange(e)}
                />
                {
                    error && error !== "" && error === "phone" && <span className="text-danger md-text">Please type your phone number</span>
                  }
              </Form.Group>
            </Col>
            <Col className="mb-4" md={6}>
              <Form.Group controlId="role">
                <Form.Label className="md-text">
                  Interview preferred time
                </Form.Label>
                <Form.Select
                  name="interview_time"
                  value={formData.interview_time}
                  onChange={(e)=>handleInputChange(e)}
                  className="input-padding"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className="d-flex align-items-center" md={6} >
              <Form.Group controlId="switch">
                <Form.Check
                  type="switch"
                  label=" Select Your Role (optional)"
                  name="isSwitchOn"
                  checked={formData.isSwitchOn}
                  onChange={handleSwitchChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={12}>
              <Form.Group controlId="radio">
                <label className="form_label">
                  <input type="radio" id="role" name="role" value="Student"  checked={formData.role === 'Student'}  onChange={handleInputChange}/>{" "}
                  Student
                </label>
                <label className="form_label">
                  <input
                    type="radio"
                    id="role"
                    name="role"
                    value="Teacher"
                    checked={formData.role === 'Teacher'}
                    onChange={(e)=>handleInputChange(e)}
                  />{" "}
                  Teacher
                </label>
                <label className="form_label">
                  <input type="radio" id="role" name="role" value="Other" checked={formData.role === 'Other'} onChange={(e)=>handleInputChange(e)}/>{" "}
                  Other
                </label>
              </Form.Group>
            </Col>
          </Row>
          <div className=" w-100 d-flex justify-content-end">
            <Button
              className="submit-btn mt-4 d-flex justify-content-end"
              variant="primary"
              type="submit"
            >
              Add User
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default UserForm;
