//  Компонент для hero-блока с навигацией  //
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';

import './Banner.css';

const Banner = () => {
  return (
    <section className='banner'>
      <Promo />
      <NavTab />
    </section>
  );
}

export default Banner;
