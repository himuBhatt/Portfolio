import { motion } from "framer-motion";
import { Github, Star, GitFork, Code } from "lucide-react";

const stats = [
  { label: "Repositories", value: "15+", icon: Code },
  { label: "Stars", value: "20+", icon: Star },
  { label: "Contributions", value: "200+", icon: GitFork },
];

const GitHubSection = () => {
  return (
    <section id="github" className="relative min-h-[70vh] flex items-center py-32 px-6">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
            {"// Open Source"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            GitHub <span className="text-secondary neon-glow-purple">Activity</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 text-center hover:neon-border transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-5 h-5 text-foreground" />
            <span className="text-foreground font-semibold">Contribution Activity</span>
          </div>
          <div className="grid grid-cols-[repeat(52,1fr)] gap-[3px]">
            {Array.from({ length: 364 }).map((_, i) => {
              const intensity = Math.random();
              const bg =
                intensity > 0.7
                  ? "bg-primary"
                  : intensity > 0.4
                  ? "bg-primary/50"
                  : intensity > 0.2
                  ? "bg-primary/20"
                  : "bg-muted";
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-[2px] ${bg}`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSection;
