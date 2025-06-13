import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUoToUsres } from '../redux/thunk';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import '../components/css_files/signUp.css';

const SignUp = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        try {
            await dispatch(SignUoToUsres({ Id: id, Name: username, Phone: phone }));
            navigate(`/PersonalArea/${id}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="signup-root">
            <Box className="signup-box">
                <Avatar className="signup-avatar">
                    <PersonAddAlt1Icon sx={{ fontSize: 32, color: '#fff' }} />
                </Avatar>
                <Typography variant="h4" className="signup-title" color="primary" gutterBottom>
                    Sign Up
                </Typography>
                <Typography variant="subtitle1" className="signup-subtitle" color="secondary" gutterBottom>
                    Please fill in your details to sign up.
                </Typography>
                <Box component="form" className="signup-form" onSubmit={handleSubmit}>
                    <TextField
                        className="signup-textfield"
                        label="Id"
                        type="tel"
                        value={id}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className="signup-textfield"
                        label="User Name"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        className="signup-textfield"
                        label="Phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        className="signup-btn"
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;
