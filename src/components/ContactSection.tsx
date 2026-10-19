import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { Arrow, Reveal, SectionHead } from "@/components/editorial";
import { EMAIL_HREF, PHONE, socials } from "@/data/profile";

const channels = [
  { label: "Phone", value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
  { label: "Email", value: EMAIL_HREF.replace("mailto:", ""), href: EMAIL_HREF },
  ...socials.map((s) => ({ label: s.label, value: s.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""), href: s.href })),
];

const fieldClass =
  "peer block w-full border-0 border-b border-input bg-transparent px-0 pb-3 pt-7 text-lg text-foreground placeholder-transparent outline-none transition-colors focus:border-accent focus:ring-0";

const Field = ({
  id,
  label,
  index,
  textarea,
  ...props
}: {
  id: string;
  label: string;
  index: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div className="relative">
    {textarea ? (
      <textarea id={id} placeholder={label} rows={4} className={`${fieldClass} resize-none`} {...props} />
    ) : (
      <input id={id} placeholder={label} className={fieldClass} {...props} />
    )}
    <label
      htmlFor={id}
      className="label pointer-events-none absolute left-0 top-1 flex gap-3 text-muted-foreground transition-colors peer-focus:text-accent"
    >
      <span>{index}</span>
      {label}
    </label>
  </div>
);

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
    <section id="contact" className="ink section bg-background text-foreground">
      <div className="frame">
        <SectionHead index="08" kicker="Get in touch" title="Contact Me" quiet />

        {/* Closing statement, set at the same scale as the hero name */}
        <Reveal>
          <p className="display text-[clamp(4rem,13.5vw,13rem)] leading-[0.84]">
            Let's work
            <br />
            <em className="text-accent pl-[0.55em] lg:pl-[2.2em]">together</em>
          </p>
        </Reveal>

        <div className="grid-12 gap-y-16 mt-16 md:mt-24">
          <div className="col-span-12 lg:col-span-6">
            <Reveal>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground">
                I'm always open to new opportunities, collaborations, and interesting projects. Feel free to reach out!
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-foreground">
              {channels.map((c, i) => (
                <Reveal as="li" key={c.label} delay={i * 0.04} className="border-b border-border">
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 py-4"
                  >
                    <span className="label text-muted-foreground">{c.label}</span>
                    <span className="truncate text-[0.975rem] transition-transform duration-500 ease-expo group-hover:translate-x-1.5">
                      {c.value}
                    </span>
                    <Arrow className="transition-[transform,color] duration-300 group-hover:rotate-45 group-hover:text-accent" />
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <p className="label text-muted-foreground">Or leave a message</p>
              <Field
                id="name"
                index="01"
                label="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                required
              />
              <Field
                id="email"
                index="02"
                label="Your Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
              <Field
                id="message"
                index="03"
                label="Your Message"
                textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-between bg-foreground px-6 py-5 text-background transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                <span className="text-[1.05rem] font-medium">{loading ? "Sending..." : "Send Message"}</span>
                <Arrow direction="e" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
