import { motion } from "framer-motion";
import { Code2, Cpu, Lightbulb, Trophy } from "lucide-react";
import profileImg from "@/assets/my_photo.jpeg";

const facts = [
  { icon: Cpu, label: "ECE Graduate", value: "B.Tech" },
  { icon: Code2, label: "DSA Problems", value: "500+" },
  { icon: Lightbulb, label: "Projects Built", value: "15+" },
  { icon: Trophy, label: "Years Coding", value: "3+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">Get to know me</p>
          <h2 className="text-3xl md:text-5xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent opacity-50 blur-lg group-hover:opacity-75 transition-opacity duration-500" />
              <img
                src={profileImg}
                alt="Professional photo"
                className="relative w-72 h-80 md:w-80 md:h-96 object-cover rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a passionate MERN Stack Developer with a background in Electronics and Communication Engineering. 
              My journey from hardware to software has given me a unique perspective on building efficient, 
              scalable applications.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I love solving complex problems, contributing to open-source, and constantly pushing myself 
              through competitive programming on LeetCode. When I'm not coding, I'm exploring new technologies 
              and design patterns to level up my engineering craft.
            </p>

            {/* Bento Facts Grid */}
            <div className="grid grid-cols-2 gap-3">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="glass-hover rounded-xl p-4 text-center"
                >
                  <fact.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xl font-bold font-mono text-foreground">{fact.value}</p>
                  <p className="text-xs text-muted-foreground">{fact.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
