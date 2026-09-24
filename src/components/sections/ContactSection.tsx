import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/himuBhatt",
    icon: Github,
    color: "hover:text-primary hover:border-primary/30",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/himanshu-bhatt",
    icon: Linkedin,
    color: "hover:text-secondary hover:border-secondary/30",
  },
  {
    label: "Email",
    href: "mailto:himanshu@example.com",
    icon: Mail,
    color: "hover:text-accent hover:border-accent/30",
  },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative min-h-[80vh] flex items-center py-32 px-6">
      <div className="max-w-3xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
            {"// Contact"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let's <span className="text-primary neon-glow">Connect</span>
          </h3>
          <p className="text-muted-foreground text-lg mb-12 max-w-lg mx-auto">
            Interested in collaborating on AI projects or just want to say hello?
            Feel free to reach out.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`glass-card px-8 py-6 flex items-center gap-4 transition-all duration-300 border border-border ${link.color}`}
            >
              <link.icon className="w-6 h-6" />
              <span className="font-semibold text-lg">{link.label}</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </motion.a>
          ))}
        </div>

        {/* Neural network decoration */}
        <div className="mt-24 relative">
          <svg
            className="w-full h-32 opacity-20"
            viewBox="0 0 800 120"
            fill="none"
          >
            {Array.from({ length: 8 }).map((_, i) => {
              const x = 50 + i * 100;
              const y = 30 + Math.sin(i * 0.8) * 40;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="hsl(185 100% 50%)" />
                  {i < 7 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={150 + i * 100}
                      y2={30 + Math.sin((i + 1) * 0.8) * 40}
                      stroke="hsl(185 100% 50%)"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  )}
                  {i < 6 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={250 + i * 100}
                      y2={30 + Math.sin((i + 2) * 0.8) * 40}
                      stroke="hsl(262 83% 58%)"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground/50 text-sm font-mono mt-8"
        >
          © 2024 Himanshu Bhatt — Built with AI & passion
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
