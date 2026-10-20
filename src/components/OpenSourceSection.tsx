import { Arrow, Reveal, SectionHead } from "@/components/editorial";

const AUTHOR = "ShivamSharma43";

const mergedQuery = (slug: string) =>
  `https://github.com/${slug}/pulls?q=is%3Apr+is%3Amerged+author%3A${AUTHOR}`;

const contributions = [
  {
    org: "Microsoft",
    repo: "agent-governance-toolkit",
    slug: "microsoft/agent-governance-toolkit",
    desc: "Correctness fixes across agent-sre (SLOs, burn rate, W3C trace context, CycloneDX), agent-hypervisor (shell denylist parsing, a deadlock), agent-mesh (trust decay, TTL expiry), agent-compliance and agent-discovery.",
    tags: ["Go", "Agents", "Observability"],
    merged: 27,
  },
  {
    org: "Elastic",
    repo: "connectors",
    slug: "elastic/connectors",
    desc: "Bug fixes in the Elasticsearch sink and the SharePoint, Box, Notion, Jira, Zoom, Oracle, PostgreSQL, ServiceNow, Dropbox, Azure Blob and GitHub connectors.",
    tags: ["Python", "Data ingestion"],
    merged: 17,
  },
  {
    org: "Google Cloud",
    repo: "k8s-aibom",
    slug: "GoogleCloudPlatform/k8s-aibom",
    desc: "AI/ML image detection patterns (vLLM ROCm/CPU, TensorRT-LLM, TF Serving, TorchServe, Xinference, Aphrodite, LocalAI, Speaches) plus two controller features.",
    tags: ["Go", "Kubernetes"],
    merged: 12,
  },
  {
    org: "Microsoft",
    repo: "PyRIT",
    slug: "microsoft/PyRIT",
    desc: "Made converter and target identifiers reflect output-changing settings to stop bad cache reuse, added input validation, and fixed OpenAI Realtime state handling.",
    tags: ["Python", "AI red teaming"],
    merged: 12,
  },
  {
    org: "Microsoft",
    repo: "agent-framework",
    slug: "microsoft/agent-framework",
    desc: "Python SDK: MCP prompt catalog refresh, fenced-JSON parsing in the group chat orchestrator, and the AG-UI approval snapshot.",
    tags: ["Python", "MCP"],
    merged: 3,
  },
  {
    org: "Elastic",
    repo: "beats",
    slug: "elastic/beats",
    desc: "Documentation corrections for Filebeat GCS and Azure Blob inputs, Kafka output credentials, and Redis fields.",
    tags: ["Docs", "Go"],
    merged: 3,
  },
  {
    org: "Microsoft",
    repo: "edge-ai",
    slug: "microsoft/edge-ai",
    desc: "Plan-level Terraform tests for the Fabric, assets and Azure ML modules.",
    tags: ["Terraform", "Testing"],
    merged: 2,
  },
];

const singles = [
  { label: "microsoft/typespec", slug: "microsoft/typespec", note: "http-client-js unused context" },
  { label: "microsoft/mcp", slug: "microsoft/mcp", note: "server start failures to stderr" },
  { label: "elastic/eui", slug: "elastic/eui", note: "memoized EuiFormControlLayout icon styles" },
  { label: "temporalio/sdk-rust", slug: "temporalio/sdk-rust", note: "activity cancel-token map leak" },
];

const TOTAL = contributions.reduce((n, c) => n + c.merged, 0) + singles.length;

const byOrg = [
  { org: "Microsoft", count: 46 },
  { org: "Elastic", count: 21 },
  { org: "Google Cloud", count: 12 },
  { org: "Temporal", count: 1 },
];

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
            Alongside my other work, I contribute to large open-source projects — mostly correctness fixes in
            agent infrastructure, data connectors and AI tooling. {TOTAL} of my pull requests have been merged so far.
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
                <span> — {s.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="label mt-10 text-muted-foreground">
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
          More under review at Elastic, HashiCorp, Temporal, AWS and Google.
        </p>
      </div>
    </section>
  );
};

export default OpenSourceSection;
