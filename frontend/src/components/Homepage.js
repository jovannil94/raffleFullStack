import React, { useState } from 'react';
import AllRafflesDisplay from '../helper/AllRafflesDisplay';
import CreateRaffle from '../helper/CreateRaffle';
import '../css/Homepage.css';

const Homepage = () => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="homeContainer">
            <div className="homeDetails">
                <div className="homeCreate">
                    <h1>Raffle App</h1>
                    <CreateRaffle submitted={submitted} setSubmitted={setSubmitted}/>
                </div>
                <div className="homeRaffles">
                    <h2>All Raffles: </h2>
                    <AllRafflesDisplay submitted={submitted}/>
                </div>
            </div>
        </div>
    )
}

export default Homepage;