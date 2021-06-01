import React, { useState } from 'react';
import { getAPI } from '../util/getAPI';
import axios from 'axios';
import { useInputs } from '../util/useInputs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../css/CreateRaffle.css';
import { makeStyles } from '@material-ui/core/styles';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ConfirmationNumberOutlinedIcon from '@material-ui/icons/ConfirmationNumberOutlined';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(0.5),
      width: 40,
      height: 40,
    },
  }));

const CreateRaffle = ({ submitted, setSubmitted }) => {
    const nameContext = useInputs("");
    const tokenContext = useInputs("");
    const API = getAPI();
    const classes = useStyles();
    const [failed, setFailed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API}/raffles`, {
               name: nameContext.value,
               secret_token: tokenContext.value
            })
            setSubmitted(true);
        } catch (error) {
            console.log(error);
            setFailed(true);
        }
    }

    return (
        <form className="createRaffleForm" onSubmit={handleSubmit}>
            <h1>New Raffle:</h1>
            <div className="iconLine">
                <ConfirmationNumberOutlinedIcon className={classes.icon}/>
                <TextField id="outlined-basic" color='secondary' label="Raffle Name" variant="outlined" fullWidth={true} autoFocus required {...nameContext}/>
            </div>
            <div className="iconLine">
                <VpnKeyOutlinedIcon className={classes.icon}/>
                <TextField id="outlined-basic" color='secondary' label="Raffle Secret Token" variant="outlined" fullWidth={true} autoFocus required {...tokenContext}/>
            </div>
            <p>You must remember the Raffle Token because it will be asked when picking a winner</p>
            <Button variant="contained" color='secondary' type="submit">Create New Raffle</Button>
            {submitted ?
                <div className="disappear">
                    <p className="success">Raffle created</p>
                </div>
                : null
            }
            {failed ?
                <div className="disappear">
                    <p className="fail">Raffle not created</p>
                </div>
                : null
            }
        </form>
    )
}

export default CreateRaffle;