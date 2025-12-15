// Adapted from Starlight (github.com/withastro/starlight)
// Source: https://github.com/withastro/starlight/blob/bf1a9e6fd7311c30b7d1adbecfe9ca32e24207d9/packages/starlight/utils/generateToC.ts
// Source is licensed under MIT.

import type { MarkdownHeading } from "astro";

const PAGE_TITLE_ID = "_top";

export interface TocItem extends MarkdownHeading {
  children: TocItem[];
}

interface TocOpts {
  minHeadingLevel: number;
  maxHeadingLevel: number;
  title?: string;
}

export function generateToC(
  headings: MarkdownHeading[],
  { minHeadingLevel, maxHeadingLevel, title }: TocOpts,
) {
  headings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel,
  );
  const toc: Array<TocItem> = [];
  if (title)
    toc.push({ depth: 2, slug: PAGE_TITLE_ID, text: title, children: [] });
  for (const heading of headings)
    injectChild(toc, { ...heading, children: [] });
  return toc;
}

function injectChild(items: TocItem[], item: TocItem): void {
  const lastItem = items.at(-1);
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}
