//  Компонент с содержанием секции блока  //
import './SectionBlock.css';

function SectionBlock({ type, link, children }) {
  return (
    <section className={`section-block section-block_${type}`} id={link}>
      {children}
    </section>
  );
}

export default SectionBlock;
