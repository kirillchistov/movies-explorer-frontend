//  Компонент с внутренним содержанием блока "О проекте"  //
import './AboutProjectContent.css';

function AboutProjectContent() {
  return (
    <>
      <div className='project'>
        <div className='project__column'>
          <h3 className='project__title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='project__text'>
            Составление плана, работу над бэкендом, вёрстку, 
            добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='project__column'>
          <h3 className='project__title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='project__text'>
            У каждого этапа был мягкий и жёсткий дедлайны, 
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='steps steps_size-1-4'>
        <div className='steps__column'>
          <p className='steps__duration steps__duration_active'>1 неделя</p>
          <p className='steps__name'>Back-end</p>
        </div>
        <div className='steps__column'>
          <p className='steps__duration'>4 недели</p>
          <p className='steps__name'>Front-end</p>
        </div>
      </div>
    </>
  );
}

export default AboutProjectContent;
