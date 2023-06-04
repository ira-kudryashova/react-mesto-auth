import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ userEmail, onSignOut }) {
  return (
    <div className='Header'>
      <header className='header'>
        <img className='header__logo' src={logo} alt='логотип сайта Место' />

        <Routes>
          <Route path='/sign-in' element={<Link to='/sign-up' className='header__link'>Регистрация</Link>} />
            {/* <Link to='/sign-up' className='header__link'>
              Регистрация
            </Link> */}
          {/* </Route> */}

          <Route path='/sign-up' element={<Link to='sign-in' className='header__link'>Войти</Link>} />
            {/* <Link to='sign-in' className='header__link'>
              Войти
            </Link> */}
          {/* </Route> */}

        {/* {loggedIn && (
          <nav className='header__nav'>
            <span className='header__email'>{userEmail}</span>
            <span className='header__logout' onClick={() => onSignOut()}>
              Выйти
            </span>
          </nav>
        )} */}

          <Route path='/' element={
            <nav className='header__nav'>
              <span className='header__email'>
                {userEmail}
              </span>
              <span className='header__logout' onClick={onSignOut}>
                Выйти
              </span>
            </nav>
          } />
            {/* <nav className='header__nav'>
              <span className='header__email'>
                {userEmail}
              </span>
              <span className='header__logout' onClick={onSignOut}>
                Выйти
              </span>
            </nav> */}
          {/* </Route> */}
        </Routes>
      </header>
    </div>
  );
}

export { Header };
