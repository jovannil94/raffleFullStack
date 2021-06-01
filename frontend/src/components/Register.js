import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAPI } from '../util/getAPI';
import axios from 'axios';
import { useInputs } from '../util/useInputs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/Register.css';


const Register = () => {
    const [submitted, setSubmitted] = useState(false);
    const [failed, setFailed] = useState(false);
    const firstNameContext = useInputs("");
    const lastNameContext = useInputs("");
    const emailContext = useInputs("");
    const phoneContext = useInputs("");
    const API = getAPI();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(phoneContext.value === "") {
            phoneContext.value = null
        }
        try {
            await axios.post(`${API}/raffles/${id}/participants`, {
                firstname: firstNameContext.value,
                lastname: lastNameContext.value,
                email: emailContext.value,
                phone: phoneContext.value
            })
            setSubmitted(true);
        } catch (error) {
            console.log(error);
            setFailed(true);
        }
    }

    return(
        <div className="registerContainer">
            <div className="registerDetails">
                <h1>Register to participate in the raffle:</h1>
                <form className="registerUser" onSubmit={handleSubmit}>
                    <div className="registerName">
                        <TextField id="outlined-basic" color='secondary' label="First Name" variant="outlined" fullWidth={true} autoFocus required {...firstNameContext}/>
                        <TextField id="outlined-basic" color='secondary' label="Last Name" variant="outlined" fullWidth={true} autoFocus required {...lastNameContext}/>
                    </div>
                    <TextField id="outlined-basic" color='secondary' label="Email" variant="outlined" fullWidth={true} autoFocus required {...emailContext}/>
                    <TextField id="outlined-basic" color='secondary' label="Phone (optional)" variant="outlined" fullWidth={true} autoFocus {...phoneContext}/>
                    <Button variant="contained" color='secondary' type="submit" >Submit</Button>
                    {/* <Button variant="contained" color='secondary' type="reset">Reset</Button> */}
                </form>
                {submitted ?
                    <div className="disappear">
                        <p className="success">You entered the raffle!</p>
                    </div>
                : null
                }
                {failed ?
                    <div className="disappear">
                        <p className="fail">Could not enter raffle</p>
                    </div>
                : null
                }
            </div>
        </div>
    )
}

export default Register;