import Banner from '../Banner/Banner';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main({ isLoggedIn }) {
  return (
    <main className='content'>
      <Banner />
      <AboutProject />
      <Tech />
      <AboutMe />
    </main>
  );
}

export default Main;
