import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useNavigate, useLocation} from "react-router-dom";
import { registerUser, loginUser } from "../../api/api";

const Form = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [ isRegistering, setIsRegistering ] = useState(location.pathname === "/register")

  const [formData, setFormData] = useState({
    email:'',
    username: '',
    password: '',
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    if(isRegistering){
      try{
        const res = await registerUser(formData)
        console.log(`res:`, res)
        localStorage.setItem('token', res.token);
        navigate('/')
      }catch(err){
        console.log('error register',err.response.data.message)
        alert(err.response.data.message)
      }
    }else{
      try{
        const res = await loginUser(formData)
        console.log(res)
        localStorage.setItem('token', res.token);
        navigate('/')
      }catch(err){
        alert(err.response.data.message)
      }
    }
  }
  const flipForm = () => {
    setFormData({ email: '', username: '', password: '' });
    setIsRegistering(!isRegistering);
  };

  return (
    <div className={ styles[`form-container`] }>
      <h1>{ isRegistering ? 'Create an Account': 'Login' }</h1>
      <form onSubmit={ handleSubmit } >
        {isRegistering &&
          <div className={ styles[`form-group`] }>
            <label className={ styles[`form-label`] }
                   htmlFor="email">Email:</label>
            <input
              className={ styles[`form-input`] }
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
          </div>
        }
        <div className={ styles[`form-group`] }>
          <label className={ styles[`form-label`] }
                 htmlFor="username">Username:</label>
          <input
            className={ styles[`form-input`] }
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <br />
        </div>
        <div className={ styles[`form-group`] }>
          <label
            className={ styles[`form-label`] }
            htmlFor="password">Password:</label>
          <input
            className={ styles[`form-input`] }
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <br />
        </div>

        <div className={ styles[`form-group`] }>
          <button
            className={ styles[`form-submit-btn`] }
            type="submit">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>

        <div className={styles[`flip-form`]}>
          <span>
            {isRegistering
              ? "Already have an account? Login"
              : "Not registered yet? Register"}
          </span>
          <button className={styles[`flip-form-link`]} onClick={flipForm}>
            here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;