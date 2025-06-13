import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Avatar
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserById, checkAdminPassword } from '../redux/thunk';
import '../components/css_files/logIn.css';

const THEME = createTheme({
  palette: {
    primary: {
      main: '#205c3b', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#213547',
    },
  },
  typography: {
    fontFamily: 'Varela Round, Alef, Arial, sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: 2,
    },
  },
});

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminError, setAdminError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePassword = (e) => setPassword(e.target.value);

  const handleAdminPassword = (e) => {
    setAdminPassword(e.target.value);
    setAdminError('');
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowAdminPassword = () => setShowAdminPassword((show) => !show);
  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const resultAction = await dispatch(getUserById(password));
      if (getUserById.fulfilled.match(resultAction)) {
        setMessage('Welcome again!!');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(`/PersonalArea/${password}`);
      } else {
        setMessage('Please sign up to continue.');
        navigate(`/SignUp/${password}`);
      }
    } catch (error) {
      if (error = "this id is not exist at the system.") {
        setMessage('Please sign up to continue.');
        navigate(`/SignUp/${password}`);
      }
      setMessage('Error: ' + error.message);
    }
  };
  const handleAdminClick = () => {
    setShowAdminInput(true);
  };
  const checkPassword = async (password) => {
    try {
      const resultAction = await dispatch(checkAdminPassword(password));
      if (resultAction.payload) {
        setAdminError('');
        navigate('/admin/');
      } else {
        setAdminError('a wrong admin password');
        setAdminPassword('');
      }
    } catch (error) {
      setAdminError('שגיאה בבדיקת סיסמה');
    }
  };

  return (
    <ThemeProvider theme={THEME}>
      <Box className="login-root">
        <Box className="login-box">
          <Avatar className="login-avatar">
            <LockOutlinedIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Avatar>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            className="login-title"
          >
            Log In
          </Typography>
          <Typography
            variant="subtitle1"
            color="secondary"
            gutterBottom
            className="login-subtitle"
          >
            Welcome! Please enter your Id to continue.
          </Typography>
          {message && (
            <Typography
              variant="subtitle2"
              color="secondary"
              className="login-message"
            >
              {message}
            </Typography>
          )}
          <Box
            component="form"
            className="login-form"
            onSubmit={handleSubmit}
          >
            <TextField
              className="login-textfield"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Id"
              value={password}
              onChange={handlePassword}
              variant="outlined"
              autoFocus
              placeholder="Enter your Id"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: '#205c3b', fontWeight: 600 }} // ירוק כהה
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: "login-textfield-label"
              }}
            />
            <Stack direction="row" spacing={2} className="login-stack">
              <Button
                className="login-signin-btn"
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </Box>

        <Button
          className="login-admin-btn"
          variant="outlined"
          color="secondary"
          onClick={handleAdminClick}
        >
          כניסת מנהל
        </Button>

        {showAdminInput && (
          <>
            <div
              className="login-admin-overlay"
              onClick={() => setShowAdminInput(false)}
            ></div>
            <Box
              component="form"
              className="login-admin-form"
              onClick={e => e.stopPropagation()} // מונע סגירה בלחיצה על הטופס עצמו
              onSubmit={(event) => {
                event.preventDefault();
                if (adminPassword) {
                  checkPassword(adminPassword);
                }
              }}
            >
              <TextField
                className="login-admin-textfield"
                fullWidth={false}
                inputProps={{ maxLength: 9, style: { width: '180px', textAlign: 'center' } }} // אורך מתאים ל-9 תווים
                type={showAdminPassword ? 'text' : 'password'}
                label="Admin Password"
                value={adminPassword}
                onChange={handleAdminPassword}
                variant="outlined"
                placeholder="Enter admin password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle admin password visibility"
                        onClick={handleClickShowAdminPassword}
                        edge="end"
                        sx={{ color: '#205c3b', fontWeight: 600 }}
                      >
                        {showAdminPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  className: "login-admin-textfield-label"
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    if (adminPassword) {
                      checkPassword(adminPassword);
                    }
                  }
                }}
              />
              {adminError && (
                <Typography color="error" className="login-admin-error">
                  {adminError}
                </Typography>
              )}
              <Button
                className="login-signin-btn"
                onClick={() => {
                  if (adminPassword) {
                    checkPassword(adminPassword);
                  }
                }}
                variant="contained"
                color="primary"
                type="button"
              >
                כניסת מנהל
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default LogIn;
