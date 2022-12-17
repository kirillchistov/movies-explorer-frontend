//  Комонент мобильного меню  //
import './Burger.css';

const Burger = ({ isOpen, onClick }) => {
  return (
    <button
      className={
        isOpen
          ? 'link button hidden header__burger'
          : 'link button header__burger'
      }
      onClick={onClick}
    ></button>
  );
}

export default Burger;
