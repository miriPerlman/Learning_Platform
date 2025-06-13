import { Grid } from '@mui/material';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import About from './components/About';
import LogIn from './components/LogIn';
import PersonalArea from './components/PersonalArea.jsx';
import './App.css';
import  Category from './components/Category.jsx';
import SubCategory from './components/SubCategory.jsx';
import Admin from './components/Admin.jsx';
function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/LogIn" className={({ isActive }) => (isActive ? "active" : "")}>
            Log in
          </NavLink>
        </nav>
            <Routes>
              <Route path='/SignUp/:id' element={<SignUp />} />
              <Route path='/' element={<About />} />
              <Route path='/LogIn' element={<LogIn />} />
              <Route path='/Admin' element={<Admin />} />
              <Route path='/PersonalArea/:name' element={<PersonalArea />} />
              <Route path='/Category/:categoryId/:name' element={<Category />} />
              <Route path='/SubCategory/:categoryId/:subCategoryId/:name/:existPrompt?' element={<SubCategory />} />
            </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
