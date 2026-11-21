import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Achievements from '../components/Achievements';
import Education from '../components/Education';
import Contact from '../components/Contact';
import { usePageMeta } from '../lib/usePageMeta';

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
