//  Компонент с фото и текстом о студенте  //
import './AboutMeContent.css';
import aboutmeimage from '../../images/aboutme.jpg';

const AboutMeContent = () => {
  return (
    <div className='aboutme'>
      <div className='aboutme__description'>
        <h3 className='aboutme__name'>Кирилл</h3>
        <p className='aboutme__status'>
          Студент Яндекс.Практикум, продакт, маркетолог, 48 лет
        </p>
        <p className='aboutme__text'>
          Живу и работаю в Москве. Образование высшее техническое (Академия ХимМаш). 
          Люблю ездить, ходить, бегать, плавать и приобретать новые полезные навыки.
          Делать сайты и приложения "на коленке" начал давно, сейчас впервые изучаю тему системно. 
          За почти 30 лет карьеры много где поработал в ИТ в российских и зарубежных компаниях.
          Увлекаюсь темой стартапов в роли продакта и маркетолога, реже - инвестора или трекера.
        </p>
        <a
          className='aboutme__link link'
          href='https://github.com/kirillchistov/'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
        <a
          className='aboutme__link link'
          href='https://fb.me/kirchistov'
          target='_blank'
          rel='noreferrer'
        >
          Facebook
        </a>
      </div>
      <img className='aboutme__image' src={aboutmeimage} alt='Фото' />
    </div>
  );
}

export default AboutMeContent;
