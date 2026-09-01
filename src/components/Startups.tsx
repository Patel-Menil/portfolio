import { motion } from 'framer-motion';
import { startupsData } from '../data/startups';
import { ArrowRight, Lock, Server, Cpu, Cloud } from 'lucide-react';

const Startups = () => {
  const monavi = startupsData.find(s => s.id === 'monavi');
  const sealapi = startupsData.find(s => s.id === 'sealapi');

  return (
    <section id="startups" className="py-24 relative bg-surface/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">03 / Currently Building</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Current Startup Work</h3>
        </motion.div>

        <div className="flex flex-col gap-12">
          {/* SealAPI Card - More Emphasis */}
          {sealapi && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-12 rounded-2xl border border-accent/30 bg-surface/80 relative overflow-hidden group shadow-[0_0_50px_-20px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h4 className="text-3xl font-bold mb-2 flex items-center gap-3">
                      {sealapi.name}
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-mono rounded border border-accent/30">AI Security</span>
                    </h4>
                    <p className="text-accent font-mono">{sealapi.role}</p>
                  </div>
                  <a 
                    href={sealapi.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 transition-colors"
                  >
                    Visit Website <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-text-secondary text-lg mb-12 max-w-3xl leading-relaxed">
                  {sealapi.description}
                </p>

                {/* Abstract Architecture Visualization */}
                <div className="bg-background/50 rounded-xl p-8 border border-border mb-8 overflow-x-auto">
                  <div className="flex items-center justify-between min-w-[700px] gap-4">
                    <div className="flex flex-col items-center gap-2 w-24">
                      <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center">
                        <Server className="w-6 h-6 text-text-secondary" />
                      </div>
                      <span className="text-xs font-mono text-center">Application</span>
                    </div>
                    
                    <div className="flex-1 h-px bg-gradient-to-r from-border via-primary to-border relative">
                      <div className="absolute top-1/2 -translate-y-1/2 right-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>

                    <div className="flex flex-col items-center gap-2 w-32">
                      <div className="w-16 h-16 rounded-xl bg-surface border-2 border-primary/50 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                        <Lock className="w-6 h-6 text-primary z-10" />
                      </div>
                      <span className="text-xs font-mono text-center text-primary">Secure Gateway</span>
                    </div>

                    <div className="flex-1 h-px bg-gradient-to-r from-primary via-accent to-border" />

                    <div className="flex flex-col items-center gap-2 w-32">
                      <div className="w-16 h-16 rounded-xl bg-surface border-2 border-accent/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <Cpu className="w-6 h-6 text-accent" />
                      </div>
                      <span className="text-xs font-mono text-center text-accent">TEE Processing</span>
                    </div>

                    <div className="flex-1 h-px bg-gradient-to-r from-accent to-border" />

                    <div className="flex flex-col items-center gap-2 w-24">
                      <div className="w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center">
                        <Cloud className="w-6 h-6 text-text-secondary" />
                      </div>
                      <span className="text-xs font-mono text-center">AI Provider</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {sealapi.technology.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-background/50 rounded border border-accent/20 text-sm font-mono text-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Monavi Card */}
          {monavi && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 md:p-12 rounded-2xl border border-border bg-surface relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h4 className="text-3xl font-bold mb-2">{monavi.name}</h4>
                  <p className="text-primary font-mono">{monavi.role}</p>
                </div>
                <a 
                  href={monavi.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-white/5 transition-colors"
                >
                  Visit Website <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <p className="text-text-secondary text-lg mb-8 max-w-3xl leading-relaxed">
                {monavi.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {monavi.technology.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-background rounded border border-border text-sm font-mono text-text-secondary">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Startups;
