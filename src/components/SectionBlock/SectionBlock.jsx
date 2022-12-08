//  Компонент с содержанием секции блока  //
import './SectionBlock.css';

const SectionBlock = ({ type, link, children }) => {
  return (
    <section className={`section-block section-block_${type}`} id={link}>
      {children}
    </section>
  );
}

export default SectionBlock;
