import { visit } from "unist-util-visit";

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default function rehypePluginMoveIdToSection() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "section") {
        let firstHeading;
        for (const child of node.children) {
          if (HEADINGS.includes(child.tagName)) {
            firstHeading = child;
            break;
          }
        }
        if (firstHeading && firstHeading.properties.id) {
          node.properties.id = firstHeading.properties.id;
          delete firstHeading.properties.id;
        }
      }
    });
  };
}
