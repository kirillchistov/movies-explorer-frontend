import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <div className='signup'>
      <Link to='/signup' className='link signup__link'>
        Регистрация
      </Link>
      <Link to='signin' className='link signup__link signup__link_active'>
        Войти
      </Link>
    </div>
  );
}

export default Signup;
