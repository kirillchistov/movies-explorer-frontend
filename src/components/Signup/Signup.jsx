import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  return (
    <div className='signup'>
      <Link to='/signup' className='link signup__link'>
        Регистрация
      </Link>
      <Link to='signin' className='signin__link signin__link_active'>
        Войти
      </Link>
    </div>
  );
}

export default Signup;
