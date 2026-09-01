import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../data/skills';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-accent mb-4 uppercase tracking-widest">02 / Technical Arsenal</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Skills & Domains</h3>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Categories List */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-2">
            {skillsData.map((category, index) => (
              <button
                key={index}
                onMouseEnter={() => setActiveCategory(index)}
                onClick={() => setActiveCategory(index)}
                className={`text-left px-6 py-4 rounded-lg transition-all duration-300 font-mono text-lg border-l-2 ${
                  activeCategory === index
                    ? 'bg-surface border-primary text-text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface/50'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Active Category Details */}
          <div className="w-full lg:w-2/3 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-xl glass-card h-full"
              >
                <h4 className="text-2xl font-bold mb-4 font-mono text-primary">
                  {skillsData[activeCategory].category}
                </h4>
                <p className="text-text-secondary mb-8 text-lg">
                  {skillsData[activeCategory].description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {skillsData[activeCategory].skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
