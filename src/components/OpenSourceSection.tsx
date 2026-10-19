import { Arrow, Reveal, SectionHead } from "@/components/editorial";

const contributions = [
  {
    org: "Microsoft",
    repo: "agent-framework",
    url: "https://github.com/microsoft/agent-framework",
    desc: "Fixed a bug in the Python SDK where the MCP prompt catalog was not replaced on refresh.",
    tags: ["Python", "MCP"],
    prs: [9121],
  },
  {
    org: "Google",
    repo: "k8s-aibom",
    url: "https://github.com/GoogleCloudPlatform/k8s-aibom",
    desc: "Added detection for AI/ML inference images (vLLM CPU/ROCm, TensorRT-LLM, LocalAI, Speaches, faster-whisper) to a Kubernetes AI bill-of-materials tool.",
    tags: ["Go", "Kubernetes"],
    prs: [140, 141, 142, 179, 180, 181],
  },
  {
    org: "Elastic",
    repo: "eui",
    url: "https://github.com/elastic/eui",
    desc: "React rendering performance fix that memoizes icon styles in EuiFormControlLayout.",
    tags: ["React", "TypeScript"],
    prs: [10184],
  },
  {
    org: "Elastic",
    repo: "beats",
    url: "https://github.com/elastic/beats",
    desc: "Documentation fixes in Filebeat.",
    tags: ["Docs"],
    prs: [53846],
  },
];

const TOTAL = contributions.reduce((n, c) => n + c.prs.length, 0);

const OpenSourceSection = () => {
  return (
    <section id="open-source" className="section">
      <div className="frame">
        <SectionHead
          index="05"
          kicker="Upstream work"
          title={<>Open <em>Source</em></>}
          aside={`${TOTAL} pull requests merged`}
        />

        <p className="grid-12 mb-14 md:mb-20">
          <span className="col-span-12 md:col-start-3 md:col-span-8 lg:col-span-6 text-[1.05rem] leading-relaxed text-muted-foreground">
            Alongside my other work, I contribute to large open-source projects. {TOTAL} of my pull requests have been
            merged so far, across Microsoft, Google and Elastic.
          </span>
        </p>

        <ol className="border-t border-foreground">
          {contributions.map((c, i) => (
            <Reveal as="li" key={c.url} delay={i * 0.06} className="grid-12 gap-y-4 border-b border-border py-8 md:py-10">
              <span className="label col-span-2 md:col-span-1 pt-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="col-span-10 md:col-span-5">
                <p className="label text-muted-foreground">{c.org}</p>
                <h3 className="display mt-2 text-[clamp(2rem,3.4vw,3rem)] leading-[1]">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-baseline gap-2">
                    {c.repo} <Arrow className="text-[0.5em]" />
                  </a>
                </h3>
                <p className="meta mt-3 text-muted-foreground">{c.tags.join(" / ")}</p>
              </div>
              <div className="col-span-10 col-start-3 md:col-start-7 md:col-span-6 md:pt-2">
                <p className="text-[0.975rem] leading-relaxed text-muted-foreground">{c.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Merged pull requests to ${c.repo}`}>
                  {c.prs.map((pr) => (
                    <li key={pr}>
                      <a
                        href={`${c.url}/pull/${pr}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="meta inline-flex items-center gap-1 border border-border px-2 py-1 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        #{pr}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="label mt-8 text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
          More under review at Elastic, HashiCorp, Temporal, AWS and Google.
        </p>
      </div>
    </section>
  );
};

export default OpenSourceSection;
