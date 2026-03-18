import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Ecomme",
    description: "Full-stack MERN e-commerce app with user auth, product management, cart, Razorpay payments, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Razorpay", "JWT", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/Ecomme",
  },
  {
    title: "Baatein",
    description: "Socket.io powered real-time messaging application with group chats, notifications, and file sharing.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT", "Cloudinary"],
    github: "https://github.com/Anshuman-Prakash/chat-app",
  },
  {
    title: "LoveUrDays",
    description: "Online Hotel Booking System with real-time availability, secure payments, and user reviews.",
    tech: ["React", "JavaScript", "Express", "MySQL", "Razorpay", "JWT", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/LoveurDays",
  },
  {
    title: "Coinify",
    description: "Online antique coin marketplace with user authentication, product listings, secure payments, and admin dashboard.",
    tech: ["React", "MongoDB", "Cloudinary", "JWT", "Tailwind CSS", "Node.js", "Express", "Razorpay"],
    github: "https://github.com/Anshuman-Prakash/Coinify",
  },
  {
    title: "Iphone-web",
    description: "Iphone 14 Pro clone built with React, featuring responsive design, interactive UI, and smooth animations.",
    tech: ["React", "Tailwind CSS", "Razorpay", "Three.js", "Framer Motion", "Gsap"],
    github: "https://github.com/Anshuman-Prakash/iPhone-web",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">My work</p>
          <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-hover rounded-2xl p-6 group"
            >
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github size={14} /> Code
                  </a>
                </Button>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
