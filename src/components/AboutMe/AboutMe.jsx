//  AboutMe — компонент с информацией о студенте  //
import Title from '../Title/Title';
import SectionBlock from '../SectionBlock/SectionBlock';
import AboutMeContent from '../AboutMeContent/AboutMeContent';
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <SectionBlock type={'white'} link={'aboutme'}>
      <Title title={'Студент'} />
      <AboutMeContent />
      <Portfolio />
    </SectionBlock>
  );
}

export default AboutMe;
