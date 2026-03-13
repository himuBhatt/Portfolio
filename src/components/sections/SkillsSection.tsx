import { motion } from "framer-motion";
import { useState } from "react";
import { Brain, Code, Cpu, Wifi, MessageSquare, Wand2 } from "lucide-react";

const skills = [
  { name: "Python", icon: Code, level: 90 },
  { name: "Machine Learning", icon: Brain, level: 85 },
  { name: "Artificial Intelligence", icon: Cpu, level: 80 },
  { name: "IoT Systems", icon: Wifi, level: 75 },
  { name: "Prompt Engineering", icon: MessageSquare, level: 88 },
  { name: "AI-Augmented Dev", icon: Wand2, level: 82 },
];

const SkillCard = ({
  skill,
  index,
}: {
  skill: (typeof skills)[0];
  index: number;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative"
      style={{ perspective: "800px" }}
    >
      <motion.div
        animate={{
          rotateX: hover ? 5 : 0,
          rotateY: hover ? -5 : 0,
          y: hover ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
          hover ? "neon-border" : ""
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-lg ${hover ? "bg-primary/20" : "bg-muted"} transition-colors`}>
            <skill.icon className={`w-6 h-6 ${hover ? "text-primary" : "text-muted-foreground"} transition-colors`} />
          </div>
          <h4 className="text-foreground font-semibold text-lg">{skill.name}</h4>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{
              boxShadow: hover
                ? "0 0 10px hsl(185 100% 50% / 0.5)"
                : "none",
            }}
          />
        </div>
        <span className="text-muted-foreground text-sm mt-2 block font-mono">
          {skill.level}%
        </span>
      </motion.div>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
            {"// Skills"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            Tech <span className="text-secondary neon-glow-purple">Arsenal</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
