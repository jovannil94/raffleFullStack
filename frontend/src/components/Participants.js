import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAPI } from '../util/getAPI';
import { makeStyles } from '@material-ui/core/styles';
import '../css/Participants.css';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import avatar from '../images/avatar.svg';

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(1),
      width: 20,
      height: 20,
    },
  }));

const Participants = () => {
    const [allParticipants, setAllParticipants] = useState([]);
    const API = getAPI();
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {
        const fetchPartipants = async () => {
            try {
                let participants = await axios.get(`${API}/raffles/${id}/participants`);
                setAllParticipants(participants.data.payload);
            } catch (error) {
                console.log(error)
            }
        }

        fetchPartipants();
    }, [])
    
    const count = (arr) => {
        let total = 0;
        for(let i = 0; i < arr.length; i ++) {
            total ++;
        }
        return total
    }
    let total = count(allParticipants);

    const printAll = allParticipants.map((user) => (
        <div className="singleDetails" key={user.id}>
            <div className="singleImage">
                <img src={avatar} className="avatar" alt="avatar"/>
            </div>
            <div className="singleContact">
                <h3>{user.firstname} {user.lastname}</h3>
                <div className="iconLine">
                    <ContactsOutlinedIcon className={classes.icon}/>
                    <p>{user.id}</p>
                </div>
                <div className="iconLine">
                    <EmailOutlinedIcon className={classes.icon}/>
                    <p>{user.email}</p>
                </div>
                <div className="iconLine">
                    <PhoneAndroidOutlinedIcon className={classes.icon}/>
                    <p>{user.phone}</p>
                </div>
            </div>
        </div>
    ))

    return(
        <div className="participantsContainer">
            <div className="participantsDetails">
                <h1>Participants: {total} total</h1>
                {printAll}
            </div>
        </div>
    )
}

export default Participants;