import { createMarkdownProcessor } from "@astrojs/markdown-remark";

const processor = createMarkdownProcessor();

export async function renderMarkdown(markdown: string): Promise<string> {
  const { code } = await (await processor).render(markdown);
  return code;
}
