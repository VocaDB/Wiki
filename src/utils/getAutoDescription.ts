import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import stripMarkdown from "strip-markdown";
import remarkStringify from "remark-stringify";
import { visit } from "unist-util-visit";

function removeMdx() {
  return (tree: any) => {
    tree.children = tree.children.filter(
      (node: any) => node.type !== "mdxjsEsm",
    );

    visit(
      tree,
      ["mdxJsxFlowElement", "mdxJsxTextElement"],
      (node, index, parent) => {
        const children = node.children || [];

        if (parent && index !== null) {
          parent.children.splice(index, 1, ...children);
        }

        return index;
      },
    );
  };
}

function filterLeadSection() {
  return (tree: any) => {
    const firstHeadingIndex = tree.children.findIndex(
      (node: any) => node.type === "heading",
    );

    if (firstHeadingIndex !== -1) {
      tree.children = tree.children.slice(0, firstHeadingIndex);
    }
  };
}

export async function getAutoDescription(
  markdownInput: string,
  limit: number = 0,
) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(removeMdx)
    .use(filterLeadSection)
    .use(stripMarkdown)
    .use(remarkStringify)
    .process(markdownInput);

  let text = String(file).trim();

  if (limit && text.length > limit) {
    const truncated = text.slice(0, limit);
    const lastSpace = truncated.lastIndexOf(" ");

    text = (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
  }

  return text;
}
