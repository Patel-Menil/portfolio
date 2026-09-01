import { motion } from 'framer-motion';

const philosophies = [
  {
    title: "Algorithmic Thinking",
    content: "I don't treat algorithms as interview exercises. I use algorithmic reasoning to design real systems, optimize hot paths, and build complex game logic."
  },
  {
    title: "Systems Thinking",
    content: "I care about what happens underneath the abstraction layer: data flow, streaming, reliability, security, and the architecture that holds it all together."
  },
  {
    title: "Cross-Domain Engineering",
    content: "My projects span Web3, games, AI security, and application development. I believe the best engineers can move between domains while maintaining strong fundamentals."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-primary mb-4 uppercase tracking-widest">01 / Engineering Philosophy</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Beyond the Stack</h3>
          <p className="text-xl text-text-secondary max-w-3xl font-light leading-relaxed">
            I enjoy understanding how things work beneath the surface—then turning that understanding into working systems. 
            <span className="block mt-4 font-mono text-sm text-accent">Build → Break → Understand → Improve</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-xl bg-surface border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-1 bg-border group-hover:bg-primary transition-colors mb-6" />
              <h4 className="text-xl font-bold mb-4 font-mono">{item.title}</h4>
              <p className="text-text-secondary leading-relaxed">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
