import { motion } from 'framer-motion';
import { Code, User, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative border-t border-border bg-surface/10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's Build Something Interesting.</h2>
          <p className="text-xl text-text-secondary mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            I'm interested in difficult engineering problems, ambitious products, and systems that push beyond the obvious solution.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a 
                href="mailto:patelmenil8494@gmail.com"
                className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-text-secondary mb-1">Email</h4>
                  <p className="text-lg font-medium">patelmenil8494@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://github.com/Patel-Menil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:text-primary transition-colors">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-text-secondary mb-1">GitHub</h4>
                  <p className="text-lg font-medium">github.com/Patel-Menil</p>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/menil-patel-631278321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center group-hover:text-primary transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-text-secondary mb-1">LinkedIn</h4>
                  <p className="text-lg font-medium">Menil Patel</p>
                </div>
              </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
