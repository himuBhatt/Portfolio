import { motion } from "framer-motion";
import { useState } from "react";
import { Activity, FolderSearch, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "VitalCare",
    description:
      "IoT healthcare monitoring prototype designed to track patient health data in real time. Combines sensor networks with data analytics for continuous vital sign monitoring.",
    icon: Activity,
    tags: ["IoT", "Healthcare", "Real-time", "Python"],
    color: "primary" as const,
  },
  {
    title: "RecordKeeper",
    description:
      "File location management system that tracks physical files using rack, shelf, drawer and sequence number. Users can upload Excel files or manually input records and search for files quickly.",
    icon: FolderSearch,
    tags: ["Python", "Data Management", "Excel", "Search"],
    color: "secondary" as const,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const [hover, setHover] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateY: hover ? (isLeft ? 3 : -3) : 0,
          y: hover ? -10 : 0,
          scale: hover ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`glass-card p-8 relative overflow-hidden ${
          hover
            ? project.color === "primary"
              ? "neon-border"
              : "neon-border-purple"
            : ""
        }`}
      >
        {/* Glow overlay */}
        <div
          className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
            hover ? "opacity-100" : ""
          }`}
          style={{
            background:
              project.color === "primary"
                ? "radial-gradient(circle at 50% 0%, hsl(185 100% 50% / 0.08), transparent 60%)"
                : "radial-gradient(circle at 50% 0%, hsl(262 83% 58% / 0.08), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 rounded-lg ${
                project.color === "primary"
                  ? "bg-primary/10"
                  : "bg-secondary/10"
              }`}
            >
              <project.icon
                className={`w-8 h-8 ${
                  project.color === "primary"
                    ? "text-primary"
                    : "text-secondary"
                }`}
              />
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
          </div>

          <h4 className="text-2xl font-bold text-foreground mb-3">
            {project.title}
          </h4>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-mono px-3 py-1 rounded-full border ${
                  project.color === "primary"
                    ? "border-primary/30 text-primary"
                    : "border-secondary/30 text-secondary"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative min-h-screen flex items-center py-32 px-6">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-2">
            {"// Projects"}
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            Featured <span className="text-primary neon-glow">Work</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
