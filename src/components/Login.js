import React, { useState } from 'react';

function Login({ onLogin }) {
  const [authEmail, setAuthEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    // const { value } = e.target;
    // e.target.name === 'email' ? setAuthEmail(value) : setPassword(value);
    setAuthEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // onLogin({
    //   email: authEmail.email,
    //   password: authEmail.password
    // });
    onLogin(authEmail, password);
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
            name='email'
            value={authEmail.email || ''}
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

          <button className='auth__submit-button' type='submit'>
            Войти
          </button>
        </form>
      </div>
    </section>
  );
}

export { Login };
