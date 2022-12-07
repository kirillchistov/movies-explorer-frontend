//  Main — компонент страницы «О проекте».  //
//  Содержит только презентационные компоненты, кроме шапки навигации  //
import Banner from '../Banner/Banner';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main({ isLoggedIn }) {
  return (
    <main className='content'>
      <Banner />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default Main;
