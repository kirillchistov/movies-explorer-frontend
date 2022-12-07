//  Компонент "Используемые технологии"  //
import Title from '../Title/Title';
import SectionBlock from '../SectionBlock/SectionBlock';
import TechContent from '../TechContent/TechContent';
import './Techs.css';

function Techs() {
  return (
    <SectionBlock type={'grey'} link={'techs'}>
      <Title title={'Технологии'} />
      <TechContent />
    </SectionBlock>
  );
}

export default Techs;
