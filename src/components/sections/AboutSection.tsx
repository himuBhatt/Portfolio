import { motion } from "framer-motion";
import { Brain, Cpu, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
            {"// About"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            Who I <span className="text-primary neon-glow">Am</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 glass-card p-8 neon-border"
          >
            <p className="text-foreground/90 text-lg leading-relaxed">
              Himanshu Bhatt is a Computer Engineering diploma student passionate about{" "}
              <span className="text-primary font-semibold">Artificial Intelligence</span>,{" "}
              <span className="text-secondary font-semibold">Machine Learning</span>, and
              AI-augmented development. He focuses on building efficient systems that combine
              traditional engineering with modern AI tools.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {[
              { icon: Brain, label: "AI Research", color: "text-primary" },
              { icon: Cpu, label: "Systems", color: "text-secondary" },
              { icon: Sparkles, label: "Innovation", color: "text-accent" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-card p-4 flex items-center gap-4 hover:neon-border transition-all duration-300"
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-foreground font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
