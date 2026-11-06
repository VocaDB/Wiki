import { wikilinks } from "@/markdown/wikilinks";
import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";

const processor = createSatteriMarkdownProcessor({
  features: { wikilinks: true },
  mdastPlugins: [wikilinks()],
});

export async function renderMarkdown(markdown: string): Promise<string> {
  const { code } = await (await processor).render(markdown);
  return code;
}
