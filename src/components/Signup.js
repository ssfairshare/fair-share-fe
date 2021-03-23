import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const initalValues = {
  username: '',
  password: '',
  email: '',
  firstName: '',
  lastName: '',
};

export default function Signup() {
  const classes = useStyles();

  const [user, setUser] = useState(initalValues);

  const onChange = e => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:2019/createnewuser', user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      <Typography>Sign Up</Typography>
      <Box>
        <TextField
          id='username'
          variant='outlined'
          label='Username'
          value={user.username}
          onChange={onChange}
          helperText='Please enter your username'
        />
      </Box>
      <Box>
        <TextField
          id='password'
          variant='outlined'
          label='Password'
          value={user.password}
          onChange={onChange}
          type='password'
          helperText='Please enter your password'
        />
      </Box>
      <Box>
        <TextField
          id='email'
          variant='outlined'
          label='Email'
          value={user.email}
          onChange={onChange}
          helperText='Please enter your username'
        />
      </Box>
      <Box>
        <TextField
          id='firstName'
          variant='outlined'
          label='First Name'
          value={user.firstName}
          onChange={onChange}
          helperText='Please enter your First Name'
        />
      </Box>
      <Box>
        <TextField
          id='lastName'
          variant='outlined'
          label='Last Name'
          value={user.lastName}
          onChange={onChange}
          helperText='Please enter your Last Name'
        />
      </Box>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        onClick={onSubmit}
      >
        Submit
      </Button>
    </form>
  );
}