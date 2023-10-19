import React, { useState } from 'react';

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    const { email, password } = formValue;
    onLogin(email, password);
    setFormValue({ email: '', password: '' });
  }
  
    return (
      <div className="authentication__container">
        <h3 className="authentication__title">
          Вход
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
                maxLength="40"
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
                maxLength="40" 
                value={formValue.password}
                onChange={handleChange}
              />
              <span className="authentication__input-error" />
            </div>
            <button className="authentication__save-button" type="submit" name="registerSubmit" onSubmit={handleSubmit}>Войти</button>
          </fieldset>
        </form>
      </div>
    )
  }

export default Login;