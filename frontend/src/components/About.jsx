import { Box, Typography, Avatar, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';
import '../components/css_files/about.css';


const About = () => {
  return (
    <Box className="signup-root">
      <Box className="signup-box" style={{ padding: '32px 20px', maxWidth: 500 }}>
        <Avatar className="signup-avatar" style={{ backgroundColor: '#205c3b', width: 70, height: 70, marginBottom: 16 }}>
          <SchoolIcon style={{ fontSize: 44, color: '#fff' }} />
        </Avatar>
        <Typography variant="h4" className="signup-title" color="primary" gutterBottom>
          About LearnFlow
        </Typography>
        <Typography variant="subtitle1" className="signup-subtitle" color="secondary" gutterBottom>
          LearnFlow is a mini learning platform that allows users to select what they want to learn (by category and sub-category), send prompts to an AI to receive generated lessons, and view their learning history.
        </Typography>
        <Paper elevation={0} style={{ background: 'transparent', boxShadow: 'none', marginTop: 8, width: '100%' }}>
          <Typography variant="body1" style={{ color: '#205c3b', fontWeight: 600, textAlign: 'left', marginBottom: 6 }}>
            ✔️ Choose from a variety of others categories
          </Typography>
          <Typography variant="body1" style={{ color: '#205c3b', fontWeight: 500, textAlign: 'left', marginBottom: 6 }}>
            ✔️ Send a prompt and get a personalized AI-generated lesson.
          </Typography>
          <Typography variant="body1" style={{ color: '#205c3b', fontWeight: 500, textAlign: 'left', marginBottom: 6 }}>
            ✔️ Save and view your personal learning history at any time.
          </Typography>
        </Paper>
        <Typography variant="body2" style={{ color: '#388e3c', textAlign: 'center', marginTop: 18 }}>
          <Link to="/logIn" style={{ color: '#205c3b', fontWeight: 700, textDecoration: 'underline' }}>
            Join LearnFlow and start learning smarter, faster, and your way!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default About;