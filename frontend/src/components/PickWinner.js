import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAPI } from '../util/getAPI';
import { useInputs } from '../util/useInputs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import winImage from '../images/winner.png';
import '../css/PickWinner.css';
import { makeStyles } from '@material-ui/core/styles';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(0.5),
      width: 40,
      height: 40,
    },
  }));

const PickWinner = () => {
    const [currentWinner, setCurrentWinner] = useState([]);
    const [winnerExist, setWinnerExist] = useState(false);
    const tokenContext = useInputs("");
    const classes = useStyles();
    const API = getAPI();
    const { id } = useParams();

    useEffect(() => {
        let checkWinner = async () => {
            let check = await axios.get(`${API}/raffles/${id}/winner`);
            if(check) {
                setCurrentWinner(check.data.payload);
                setWinnerExist(true);
            }
        }
        checkWinner();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let getWinner = await axios.patch(`${API}/raffles/${id}/winner`, {
                secret_token: tokenContext.value
            });
            setCurrentWinner(getWinner.data.payload);
            setWinnerExist(true);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="winnerContainer">
            {winnerExist === true ?
                <div className="winnerDetails">
                    <h1>Winner</h1>
                    <img src={winImage} alt="winner" className="winnerImg"/>
                    <div className="winnerContact">
                        <h2>{currentWinner.firstname} {currentWinner.lastname}</h2>
                        <p>Registered at: {currentWinner.registered_at}</p>
                        <div className="iconLine">
                            <ContactsOutlinedIcon className={classes.icon}/>
                            <p>{currentWinner.id}</p>
                        </div>
                        <div className="iconLine">
                            <EmailOutlinedIcon className={classes.icon}/>
                            <p>{currentWinner.email}</p>
                        </div>
                        <div className="iconLine">
                            <PhoneAndroidOutlinedIcon className={classes.icon}/>
                            <p>{currentWinner.phone}</p>
                        </div>
                    </div>
                </div>
            : 
            <div className="noWinner">
                <h1>Pick a Winner</h1>
                <form className="winnerForm" onSubmit={handleSubmit}>
                    <div className="iconLine">
                        <VpnKeyOutlinedIcon className={classes.icon}/>
                        <TextField id="outlined-basic" color='secondary' label="Secret Token" variant="outlined" fullWidth={true} autoFocus required {...tokenContext}/>  
                    </div>
                    <Button variant="contained" color='secondary' type="submit">Submit</Button>
                </form>
                <div className="winnerTokenContext">
                    <h4>Secret Token</h4>
                    <p>The secret token used when creating the raffle must be provided.</p>
                </div>
            </div>
            }
        </div>
    )
}

export default PickWinner;