import React,{ useState } from "react";
import useForm from '../../utils/useForm'
import {Link} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import IntlTelInput from "react-bootstrap-intl-tel-input";
import Button from 'react-bootstrap/Button'

const formStyle = {
  padding: "10%",
  width: "100%",
      backgroundColor: "white",
};

const MobileSignup = props => {
  const { values, handleChange, handleSubmit } = useForm(mobileSignup);

const [Mobile,setMobile] = useState("")
const [FirstNameError,setFirstNameError] = useState("")
const [CheckedError,setCheckedError] = useState(false)
const [MobileError,setMobileError] = useState("")
const [checked,setChecked] = useState(false)

const handleChecked = e => {
  setChecked(e.target.checked)
}

function mobileSignup(){
  //handle FORM vaidation here
  if(values.fname === undefined || (values.fname && values.fname.length === 0)){
    setFirstNameError("First name is required")
  }
  else if(!Mobile.valid){
    setMobileError("A valid mobile number is required.Sign up with email, if you don't have one")
  }
  else if(!checked){
    setCheckedError("You should agree to our terms & conditions")
  }
  else{
    values["mobile"] = Mobile.intlPhoneNumber;
    props.signupWithMobile(values)
  }
}

const handleMobile = data => {
  setMobile(data)
}
  return (
    // <div>
      <Form style={formStyle} onSubmit={handleSubmit}>
      <h4 style={{ textAlign: "center" }}>Sign up with Mobile</h4>
      <Form.Group>
        <label>First name</label>
        <Form.Control name="fname" className="btns" onChange={handleChange}/>
        <Form.Text style={{color: "red"}}>{FirstNameError}</Form.Text>
      </Form.Group>

    <Form.Group>
      <label>Mobile</label>
      <IntlTelInput
        preferredCountries={["US", "GB"]}
        defaultCountry={"US"}
        defaultValue={"+1 555-555-5555"}
        onChange={handleMobile}
      />
      <Form.Text style={{color: "red"}}>{MobileError}</Form.Text>
    </Form.Group>

    <Form.Group controlId="formBasicChecbox">
    <Form.Check onChange={handleChecked} type="checkbox" label="I agree to terms and privacy policy" />
    <Form.Text style={{color: "red"}}>{CheckedError}</Form.Text>
  </Form.Group>

    <div style={{display: "flex",justifyContent: "center"}}> 
    <Button className="btns" type="submit">Create Account</Button>
    </div> 
    <h6 style={{textAlign: "center"}}>Have an account? <Link to="/login">Login</Link></h6>
    </Form>
    // </div>
  );
};

export default MobileSignup;
