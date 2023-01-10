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
          Живу и работаю в Москве. Образование высшее техническое (МГАХМ).
          Люблю путешествовать, бегать, плавать, приобретать ценные навыки.
          Версткой и разработкой "на коленке" занимаюсь давно, впервые учусь системно. 
          Почти 30-летний опыт работы в ИТ в российских и зарубежных компаниях.
          Увлекаюсь темой стартапов в роли продакта и маркетолога, реже - инвестора или трекера.
          <strike>Мечтаю</strike> Планирую найти команду единомышленников и вместе построить "единорога".
        </p>
        <a
          className='link aboutme__link'
          href='https://github.com/kirillchistov/'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
        <a
          className='link aboutme__link'
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
