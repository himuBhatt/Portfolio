import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";

const titles = [
  "AI & Machine Learning Enthusiast",
  "Python Developer",
  "IoT Systems Builder",
  "AI-Augmented Developer",
];

const HeroSection = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTitleIndex((prev) => (prev + 1) % titles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left md:ml-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
            {"// Welcome to my lab"}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
            <span className="text-foreground">Himanshu</span>
            <br />
            <span className="neon-glow text-primary">Bhatt</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-8 mb-6"
        >
          <span className="text-xl md:text-2xl font-mono text-secondary">
            {displayText}
            <span className="animate-pulse-glow text-primary">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-sm md:text-base font-mono mb-8 tracking-wide"
        >
          Python • Data Analytics • AI-Augmented Development • IoT Projects
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center md:justify-start"
        >
          <a
            href="#projects"
            className="glass-card neon-border px-6 py-3 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
          >
            View Projects
          </a>
          <a
            href="https://github.com/himanshu-bhatt"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-6 py-3 text-foreground hover:text-primary transition-all duration-300 flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/himanshu-bhatt"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card px-6 py-3 text-foreground hover:text-secondary transition-all duration-300 flex items-center gap-2"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-primary/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
