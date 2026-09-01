
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Startups from './components/Startups';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent/30 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Startups />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
