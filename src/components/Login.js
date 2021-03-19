import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const initalValues = {
  username: '',
  password: '',
};

export default function Login() {
  const classes = useStyles();
  const [credentials, setCredentials] = useState(initalValues);
  const onChange = e => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:2019/login',
        `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
        {
          headers: {
            // btoa is converting our client id/client secret into base64
            Authorization: `Basic ${btoa(process.env.REACT_APP_CLIENT_INFO)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        setCredentials(initalValues);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Typography>Login</Typography>
      <Box>
        <TextField
          id='username'
          variant='outlined'
          label='Username'
          value={credentials.username}
          onChange={onChange}
        />
      </Box>
      <Box>
        <TextField
          id='password'
          variant='outlined'
          label='Password'
          value={credentials.password}
          onChange={onChange}
          type='password'
        />
      </Box>
      <Button variant='contained' color='primary' onClick={onSubmit}>
        Submit
      </Button>
    </form>
  );
}
