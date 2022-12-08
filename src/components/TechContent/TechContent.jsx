import './TechContent.css';

const TechContent = () => {
  return (
    <>
      <h3 className='techs__title'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className='nav-tab nav-tab_techs'>
        <li className='nav-tab__item'>HTML</li>
        <li className='nav-tab__item'>CSS</li>
        <li className='nav-tab__item'>JS</li>
        <li className='nav-tab__item'>React</li>
        <li className='nav-tab__item'>Git</li>
        <li className='nav-tab__item'>Express.js</li>
        <li className='nav-tab__item'>mongoDB</li>
        <li className='nav-tab__item'>Nginx</li>
      </ul>
    </>
  );
}

export default TechContent;
