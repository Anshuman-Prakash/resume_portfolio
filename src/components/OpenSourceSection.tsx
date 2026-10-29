import { Arrow, Reveal, SectionHead } from "@/components/editorial";

const AUTHOR = "Anshuman-Prakash";

const mergedQuery = (slug: string) =>
  `https://github.com/${slug}/pulls?q=is%3Apr+is%3Amerged+author%3A${AUTHOR}`;

const contributions = [
  {
    org: "Elastic",
    repo: "beats",
    slug: "elastic/beats",
    desc: "Documentation, error-string and stale-metadata corrections across Filebeat inputs, outputs and the module reference.",
    tags: ["Docs", "Go"],
    merged: 8,
  },
  {
    org: "Elastic",
    repo: "elastic-agent",
    slug: "elastic/elastic-agent",
    desc: "Documentation and error-message fixes across the agent's install, upgrade and diagnostics paths.",
    tags: ["Docs", "Go"],
    merged: 8,
  },
  {
    org: "Google Cloud",
    repo: "k8s-aibom",
    slug: "GoogleCloudPlatform/k8s-aibom",
    desc: "Six new AI/ML container image detection patterns — vLLM on ROCm and CPU, NVIDIA TensorRT-LLM, LocalAI, Speaches and faster-whisper.",
    tags: ["Go", "Kubernetes"],
    merged: 6,
  },
  {
    org: "Elastic",
    repo: "eui",
    slug: "elastic/eui",
    desc: "Memoized two Emotion style computations to cut re-render cost in form control components.",
    tags: ["TypeScript", "React"],
    merged: 2,
  },
  {
    org: "Temporal",
    repo: "sdk-rust",
    slug: "temporalio/sdk-rust",
    desc: "Fixed a cancel-token map leak in the activity task handler.",
    tags: ["Rust", "Concurrency"],
    merged: 1,
  },
];

const singles = [
  {
    org: "Microsoft",
    label: "microsoft/hve-core",
    slug: "microsoft/hve-core",
    note: "docs and stale-metadata corrections",
    merged: 6,
  },
  {
    org: "AWS Labs",
    label: "awslabs/graphrag-toolkit",
    slug: "awslabs/graphrag-toolkit",
    note: "CloudFormation stack deletion waiter",
    merged: 1,
  },
  {
    org: "Microsoft",
    label: "microsoft/agent-framework",
    slug: "microsoft/agent-framework",
    note: "MCP prompt catalog refresh",
    merged: 1,
  },
  {
    org: "Kiwix",
    label: "kiwix/kiwix-android",
    slug: "kiwix/kiwix-android",
    note: "documentation and grammar fixes",
    merged: 1,
  },
];

const TOTAL = [...contributions, ...singles].reduce((n, c) => n + c.merged, 0);
const OPEN = 36;
const REPOS = 12;

const byOrg = Object.entries(
  [...contributions, ...singles].reduce<Record<string, number>>((acc, c) => {
    acc[c.org] = (acc[c.org] ?? 0) + c.merged;
    return acc;
  }, {}),
)
  .map(([org, count]) => ({ org, count }))
  .sort((a, b) => b.count - a.count);

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

        <div className="grid-12 mb-14 md:mb-20 gap-y-8">
          <p className="col-span-12 md:col-start-3 md:col-span-8 lg:col-span-6 text-[1.05rem] leading-relaxed text-muted-foreground">
            Alongside my other work I contribute to large production codebases — reading unfamiliar code, following
            each project's contribution process, and landing small, reviewed changes. {TOTAL} pull requests have been
            merged across {REPOS} upstream repositories since September 2026: 23 documentation, error-string and
            stale-metadata corrections, 6 new AI/ML image-detection patterns in k8s-aibom, and 5 code fixes in
            elastic/eui, temporalio/sdk-rust, awslabs/graphrag-toolkit and microsoft/agent-framework. Between merged
            and in-review work that spans Go, Rust, Python, TypeScript/React, Java and Kotlin.
          </p>
          <ul className="col-span-12 md:col-start-3 md:col-span-8 lg:col-start-9 lg:col-span-4 flex flex-wrap gap-x-8 gap-y-3 self-end">
            {byOrg.map((o) => (
              <li key={o.org}>
                <span className="display block text-[1.75rem] leading-none text-accent">{o.count}</span>
                <span className="label mt-1 block text-muted-foreground">{o.org}</span>
              </li>
            ))}
          </ul>
        </div>

        <ol className="border-t border-foreground">
          {contributions.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 0.06} className="grid-12 gap-y-4 border-b border-border py-8 md:py-10">
              <span className="label col-span-2 md:col-span-1 pt-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="col-span-10 md:col-span-5">
                <p className="label text-muted-foreground">{c.org}</p>
                <h3 className="display mt-2 text-[clamp(2rem,3.4vw,3rem)] leading-[1]">
                  <a href={mergedQuery(c.slug)} target="_blank" rel="noopener noreferrer" className="u-link inline-flex items-baseline gap-2">
                    {c.repo} <Arrow className="text-[0.5em]" />
                  </a>
                </h3>
                <p className="meta mt-3 text-muted-foreground">{c.tags.join(" / ")}</p>
              </div>
              <div className="col-span-10 col-start-3 md:col-start-7 md:col-span-6 md:pt-2">
                <p className="text-[0.975rem] leading-relaxed text-muted-foreground">{c.desc}</p>
                <p className="meta mt-4">
                  <span className="inline-flex items-center gap-1 border border-border px-2 py-1">
                    {c.merged} merged
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="grid-12 mt-8">
          <p className="label col-span-12 md:col-span-3 text-muted-foreground">Also merged</p>
          <ul className="col-span-12 md:col-span-9 mt-3 md:mt-0 space-y-2">
            {singles.map((s) => (
              <li key={s.slug} className="text-[0.975rem] leading-relaxed text-muted-foreground">
                <a href={mergedQuery(s.slug)} target="_blank" rel="noopener noreferrer" className="u-link text-foreground">
                  {s.label}
                </a>
                <span> — {s.note} ({s.merged} merged)</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="label mt-10 text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
          {OPEN} more pull requests open and awaiting maintainer review at Elastic, Google Cloud and HashiCorp.
        </p>
      </div>
    </section>
  );
};

export default OpenSourceSection;
