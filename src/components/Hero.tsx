import { motion } from 'framer-motion';
import { Code, User, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[150px]" />
        
        {/* Subtle Node Graph Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <motion.circle 
            cx="20%" cy="30%" r="2" fill="#38bdf8"
            animate={{ cy: ["30%", "32%", "30%"], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle 
            cx="80%" cy="60%" r="2" fill="#8b5cf6"
            animate={{ cy: ["60%", "58%", "60%"], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle 
            cx="40%" cy="70%" r="2" fill="#f3f4f6"
            animate={{ cx: ["40%", "42%", "40%"], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.path 
            d="M 20% 30% L 40% 70% L 80% 60%" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="1" 
            fill="none" 
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 z-10 relative h-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl lg:w-3/5"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-border bg-surface/50 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono tracking-wider text-text-secondary uppercase">Systems Engineer</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6">
            I build systems that <br className="hidden md:block" />
            <span className="text-gradient">think, move, and scale.</span>
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-light mb-4">
            Software engineer working across algorithms, blockchain, games, and AI security.
          </p>

          <p className="text-base md:text-lg text-text-secondary/70 max-w-2xl font-mono mb-12">
            &gt; From competitive programming and game AI to decentralized applications and secure AI infrastructure.
          </p>

          <div className="flex gap-4 mb-16 relative z-20">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
            >
              <Terminal className="w-5 h-5" />
              View Work
            </a>
            <a 
              href="https://github.com/Patel-Menil" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-surface/50 border border-border rounded-lg hover:bg-white/10 hover:border-primary/50 transition-all text-text-secondary hover:text-white backdrop-blur-sm"
              aria-label="GitHub Profile"
            >
              <Code className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/menil-patel-631278321" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-surface/50 border border-border rounded-lg hover:bg-white/10 hover:border-primary/50 transition-all text-text-secondary hover:text-white backdrop-blur-sm"
              aria-label="LinkedIn Profile"
            >
              <User className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:w-2/5 flex justify-center lg:justify-end w-full"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 xl:w-[28rem] xl:h-[28rem] rounded-2xl overflow-hidden border border-border/50 shadow-2xl group">
            {/* Overlay for cinematic effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
            
            {/* Image styling - grayscale to color on hover */}
            <img 
              src="/me.jpg" 
              alt="Menil Patel" 
              className="w-full h-full object-cover object-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-in-out transform group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
