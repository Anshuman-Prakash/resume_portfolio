import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Code2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const socials = [
  { icon: Github, href: "https://github.com/Anshuman-Prakash", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anshuman-prakash-7a6008299", label: "LinkedIn" },
  { icon: Code2, href: "https://leetcode.com/u/anshumanprakash/", label: "LeetCode" },
  { icon: Mail, href: "mailto:nakulsrivastava2004@email.com", label: "Email" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to send message. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">Contact Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Let's work together
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always open to new opportunities, collaborations, and
              interesting projects. Feel free to reach out!
            </p>

            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone size={18} />
                <span className="text-sm">+91 8825384063</span>
              </div>
            </div>

            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-12 h-12 rounded-xl glass-hover flex items-center justify-center text-muted-foreground hover:text-primary"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
              className="bg-background/50 border-border/50 focus:border-primary"
            />

            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              className="bg-background/50 border-border/50 focus:border-primary"
            />

            <Textarea
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              required
              className="bg-background/50 border-border/50 focus:border-primary resize-none"
            />

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              <Send size={16} />
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;