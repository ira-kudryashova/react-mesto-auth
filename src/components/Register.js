import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [registerEmail, setRegisterEmail] = useState({})
  const [password, setPassword] = useState('')

  useEffect(() => {
    setRegisterEmail('')
    setPassword('')
  },[])

  function handleChangeEmail(e) {
    setRegisterEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(registerEmail, password);
  }

  return (
    <section className='auth'>
      <div className='auth__container'>
        <h3 className='auth__title'>Вход</h3>
        <form
          className='auth__form'
          name='auth-login'
          onSubmit={handleSubmit}
          //noValidate
        >
          <input
            className='auth__input'
            name='login'
            value={registerEmail.email || ''}
            onChange={handleChangeEmail}
            type='email'
            placeholder='e-mail'
            minLength='2'
            maxLength='30'
            required
            autoComplete='off'
          />

          <input
            className='auth__input'
            name='password'
            value={password || ''}
            onChange={handleChangePassword}
            type='password'
            placeholder='Пароль'
            minLength='8'
            maxLength='15'
            required
            autoComplete='off'
          />

          <button className='auth__submit-button' type='submit' aria-label='Кнопка регистрации'>
            Зарегистрироваться
          </button>

          <Link to='/sign-in' className='reg-link'>
            Уже зарегестрированы? Войти
          </Link>
        </form>
      </div>
    </section>
  );
}

export { Register };
