import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { ArrowUpRight, Leaf, Cpu, Database, CheckSquare, Settings2, Code2 } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-b border-border pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">04 / Selected Work</h2>
            <h3 className="text-3xl md:text-5xl font-bold">Featured Projects</h3>
          </div>
          <p className="text-text-secondary max-w-md font-mono text-sm">
            Demonstrating engineering depth across algorithms, blockchain, and game systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group relative flex flex-col lg:flex-row gap-12 lg:items-center"
            >
              {/* Project Visual Area */}
              <div className={`w-full lg:w-1/2 relative aspect-[4/3] rounded-sm overflow-hidden bg-surface border border-border flex items-center justify-center ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="card-noise z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-background to-transparent z-10" />
                
                {/* Abstract representations based on project */}
                {project.id === 'defi-nexus' && (
                  <div className="w-full h-full p-8 flex items-center justify-center relative">
                    <div className="absolute w-[120%] h-1 bg-primary/20 top-1/3 -rotate-12 blur-sm" />
                    <div className="absolute w-[120%] h-1 bg-accent/20 bottom-1/3 rotate-12 blur-sm" />
                    <div className="w-32 h-32 border-4 border-primary rounded-full relative animate-[spin_10s_linear_infinite]">
                      <div className="w-4 h-4 bg-primary absolute -top-2 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>
                )}
                {project.id === 'gslv' && (
                  <div className="w-full h-full p-8 flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                      {[...Array(25)].map((_, i) => (
                        <div key={i} className={`w-12 h-12 border ${i % 3 === 0 ? 'border-primary' : 'border-border'} rounded-sm`} />
                      ))}
                    </div>
                  </div>
                )}
                {project.id === 'tic-tac-toe' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-48 border-2 border-accent/20 rounded-lg flex flex-wrap p-4 gap-2">
                       <div className="w-full text-center text-4xl font-mono text-accent/40 font-bold tracking-[1rem]">XXX</div>
                       <div className="w-full text-center text-4xl font-mono text-primary/40 font-bold tracking-[1rem]">OOO</div>
                       <div className="w-full text-center text-4xl font-mono text-accent/40 font-bold tracking-[1rem]">XOX</div>
                    </div>
                  </div>
                )}
                {project.id === 'khetify' && (
                  <div className="w-full h-full flex items-center justify-center gap-8 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full" />
                    <div className="w-16 h-16 rounded-xl border border-primary/30 bg-surface flex items-center justify-center z-10">
                      <Leaf className="w-8 h-8 text-primary" />
                    </div>
                    <div className="w-16 h-px bg-border relative">
                      <div className="absolute top-0 right-0 w-2 h-px bg-primary animate-ping" />
                    </div>
                    <div className="w-16 h-16 rounded-xl border border-accent/30 bg-surface flex items-center justify-center z-10 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <Cpu className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                )}
                {project.id === 'rocket-validator' && (
                  <div className="w-full h-full flex items-center justify-center relative">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-border bg-surface rounded-md flex items-center justify-center"><Settings2 className="w-6 h-6 text-text-secondary" /></div>
                      <div className="p-4 border border-primary/50 bg-surface rounded-md flex items-center justify-center"><CheckSquare className="w-6 h-6 text-primary" /></div>
                      <div className="p-4 border border-border bg-surface rounded-md flex items-center justify-center"><Database className="w-6 h-6 text-text-secondary" /></div>
                      <div className="p-4 border border-accent/50 bg-surface rounded-md flex items-center justify-center"><Code2 className="w-6 h-6 text-accent" /></div>
                    </div>
                  </div>
                )}

                {/* Overlay hover effect */}
                {project.url && (
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-sm">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full border border-primary/50 text-primary font-mono tracking-wider hover:bg-primary hover:text-background transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                      {project.ctaText} <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Project Content Area */}
              <div className={`w-full lg:w-1/2 flex flex-col ${index % 2 !== 0 ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}>
                <div className="font-mono text-xs tracking-widest text-text-secondary uppercase mb-4 py-1 px-3 border border-border rounded-full inline-block self-start lg:self-auto">
                  {project.category}
                </div>
                
                <h4 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                
                <div className={`p-6 md:p-8 bg-surface border border-border rounded-xl mb-8 relative z-30 shadow-2xl ${index % 2 !== 0 ? 'lg:-mr-12' : 'lg:-ml-12'}`}>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className={`flex flex-wrap gap-3 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                  {project.tags.map((tag, i) => (
                    <span key={i} className="font-mono text-sm text-text-secondary/70">
                      {tag}{i < project.tags.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
