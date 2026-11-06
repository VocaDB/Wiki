import GithubSlugger from "github-slugger";
import { htmlToHast, type HastNode, type HastPluginDefinition } from "satteri";

type Node = HastNode & { children?: Node[] };
type Element = Extract<HastNode, { type: "element" }>;

const headingRank = (node: Node): number =>
  node.type === "element" && /^h[1-6]$/.test(node.tagName)
    ? Number(node.tagName[1])
    : 0;

const textContent = (node: Node): string =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map((child) => textContent(child)).join("");

function sectionize(children: Node[]): Node[] {
  const result: Node[] = [];
  let i = 0;
  while (i < children.length) {
    const heading = children[i];
    const rank = headingRank(heading);
    i += 1;
    if (!rank) {
      result.push(heading);
      continue;
    }
    const body: Node[] = [];
    while (i < children.length) {
      const nextRank = headingRank(children[i]);
      if (nextRank && nextRank <= rank) break;
      body.push(children[i]);
      i += 1;
    }
    result.push({
      type: "element",
      tagName: "section",
      properties: {},
      children: [heading, ...sectionize(body)],
    } as Element);
  }
  return result;
}

export function headingSections({
  icon,
  linkClass,
}: {
  icon: string;
  linkClass: string[];
}): () => HastPluginDefinition {
  const iconNode = (htmlToHast(icon, { fragment: true }) as Node).children![0];

  return () => ({
    name: "heading-sections",
    after(root, ctx) {
      const slugger = new GithubSlugger();

      const transform = (node: Node): Node => {
        if (!node.children) return node;
        const children = node.children.map(transform);
        if (headingRank(node)) {
          const heading = node as Element;
          const id =
            typeof heading.properties?.id === "string"
              ? heading.properties.id
              : slugger.slug(textContent(heading));
          return {
            ...heading,
            properties: { ...heading.properties, id },
            children: [
              {
                type: "element",
                tagName: "a",
                properties: { className: linkClass, href: `#${id}` },
                children: [...children, iconNode],
              } as Element,
            ],
          };
        }
        const isSection = node.type === "element" && node.tagName === "section";
        return {
          ...node,
          children: isSection ? children : sectionize(children),
        } as Node;
      };

      ctx.replaceNode(root, transform(root as Node) as never);
    },
  });
}
