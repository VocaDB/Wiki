import { slug } from "github-slugger";
import { visit } from "unist-util-visit";

const MAX_HEADING_DEPTH = 6;
const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default function rehypePluginMoveIdToSection() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "section") {
        let firstHeading;
        for (const child of node.children) {
          if (child.tagName && child.tagName.match(/^h[1-3]$/)) {
            firstHeading = child;
            break;
          }
        }
        if (firstHeading) {
          const firstText =
            firstHeading.children.find((child) => child.type === "text")
              ?.value ?? "";
          node.properties = node.properties || {};
          node.properties.id = slug(firstText);
          delete firstHeading.properties.id;
        }
      }
    });
  };
}
