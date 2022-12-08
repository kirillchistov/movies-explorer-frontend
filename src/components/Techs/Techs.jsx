//  Techs — компонент с использованными технологиями  //
import Title from '../Title/Title';
import SectionBlock from '../SectionBlock/SectionBlock';
import TechContent from '../TechContent/TechContent';
import './Techs.css';

const Techs = () => {
  return (
    <SectionBlock type={'grey'} link={'techs'}>
      <Title title={'Технологии'} />
      <TechContent />
    </SectionBlock>
  );
}

export default Techs;
