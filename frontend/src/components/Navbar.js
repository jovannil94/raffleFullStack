import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GradeIcon from '@material-ui/icons/Grade';
// import { useHistory } from "react-router-dom";
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

const Navbar = () => {
    const classes = useStyles();
    // const history = useHistory();

    // const linkRedirect = (path) => {
    //     history.push({
    //         pathname: `/${path}`
    //     });
    // }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        debugger
    }
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary" className={classes.link}>
                    <Link color="inherit" value="/" onClick={handleClick} className={classes.link}>
                        <ConfirmationNumberIcon className={classes.icon}/>
                        Raffles
                    </Link>
                </Typography>
                <Typography color="textPrimary" className={classes.link}>
                    <Link color="inherit" value="signup" onClick={handleClick} className={classes.link}>
                        <PersonAddIcon className={classes.icon}/>
                        Enter A Raffle
                    </Link>
                </Typography>
                <Typography color="textPrimary" className={classes.link}>
                    <Link color="inherit" value="admin" onClick={handleClick} className={classes.link}>
                        <GradeIcon className={classes.icon}/>
                        Admin
                    </Link>
                </Typography>
            </Breadcrumbs>
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default Navbar;