//  AboutProject — компонент с описанием дипломного проекта  //
import Title from '../Title/Title';
import SectionBlock from '../SectionBlock/SectionBlock';
import AboutProjectContent from '../AboutProjectContent/AboutProjectContent';

const AboutProject = () => {
  return (
    <SectionBlock type={'white'} link={'aboutproject'}>
      <Title title={'О проекте'}/>
      <AboutProjectContent />
    </SectionBlock>
  );
}

export default AboutProject;
