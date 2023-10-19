import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Register({ onRegister }) {
    const [formValue, setFormValue] = useState({
      email: '',
      password: ''
    })

    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormValue({
        ...formValue,
        [name]: value
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const { email, password } = formValue;
      onRegister(email, password)
    } 
  
    return (
      <>
        <div className="authentication__container">
          <h3 className="authentication__title">
            Регистрация
          </h3>
          <form className="authentication__form" onSubmit={handleSubmit}>
            <fieldset className="authentication__fieldset">
              <div className="authentication__field">
                <input 
                  className="authentication__input" 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  minLength="2"
                  maxLength="30"
                  value={formValue.email}
                  onChange={handleChange}
                />
                <span className="authentication__input-error" />
              </div>
              <div className="authentication__field">
                <input
                  className="authentication__input"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  required
                  minLength="2"
                  maxLength="30" 
                  value={formValue.password}
                  onChange={handleChange}
                />
                <span className="authentication__input-error" />
              </div>
              <button className="authentication__save-button" type="submit" name="registerSubmit">Зарегистрироваться</button>
            </fieldset>
          </form>
          <div className="authentication__signin">
            <p>Уже зарегистрированы?</p>
            <Link to="/sign-in" className="authentication__login-link">Войти</Link>
          </div>
        </div>
      </>
    );
  }

export default Register;