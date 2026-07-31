import Icon from "./Icon";

export default function ArticleBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="article-copy mb-5 text-[16px] leading-8 text-ink-soft">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="mb-7 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 rounded-md border border-rule-soft/70 bg-paper-raised/60 px-3 py-2.5 text-[15px] leading-7 text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "note":
            return (
              <div key={i} className="my-7 rounded-lg border border-verdigris/25 bg-verdigris/7 px-5 py-4 shadow-sm shadow-ink/5">
                <p className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-verdigris">
                  <Icon name="compass" className="h-3.5 w-3.5" />
                  {block.title || "Note"}
                </p>
                <p className="text-sm leading-7 text-ink-soft">{block.text}</p>
              </div>
            );
          case "tip":
            return (
              <div key={i} className="my-7 rounded-lg border border-brass/30 bg-brass/7 px-5 py-4 shadow-sm shadow-ink/5">
                <p className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-brass">
                  <Icon name="target" className="h-3.5 w-3.5" />
                  {block.title || "Tip"}
                </p>
                <p className="text-sm leading-7 text-ink-soft">{block.text}</p>
              </div>
            );
          case "table":
            return (
              <div key={i} className="my-7 overflow-x-auto rounded-lg border hairline bg-paper-raised">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b hairline bg-paper">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-4 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b hairline last:border-0 hover:bg-paper/70">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 align-top leading-6 text-ink-soft">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
