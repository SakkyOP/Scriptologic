import React, { useState } from 'react';
import {  Typography, Paper, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: '7%', // Add margin to push the content down
  },
  formContainer: {
    width: '400px',
    padding: '30px',
    marginBottom: '20px', // Add margin to increase space between the form and footer
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}));

const Contact = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Contact form submitted successfully.');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setMessage('Error submitting contact form. Please try again later.');
      }
    } catch (error) {
      setMessage('Error submitting contact form. Please try again later.');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
        {message && <Typography variant="body1">{message}</Typography>}
      </Paper>
      {/* Footer or other content */}
    </div>
  );
};

export default Contact;
