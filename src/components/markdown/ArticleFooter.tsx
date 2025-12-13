import {
  CounterClockwiseClockIcon,
  ExclamationTriangleIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface ArticleFooterProps {
  filePath?: string;
  pagePath?: string;
}

export const ArticleFooter: React.FC<ArticleFooterProps> = ({
  filePath,
  pagePath,
}) => {
  let issueBody = "";

  if (pagePath)
    issueBody += `- **Page**: [${pagePath}](https://wiki.vocadb.net/${pagePath})\n`;
  if (filePath)
    issueBody += `- **File**: [${filePath}](https://github.com/VocaDB/Wiki/blob/main/${filePath})\n`;

  if (issueBody) issueBody += "\n[your issue here]";

  return (
    <ul className="flex flex-wrap gap-1 leading-none">
      {[
        filePath && [
          "https://github.com/VocaDB/Wiki/edit/main/" + filePath,
          <>
            <Pencil1Icon /> Edit this page
          </>,
        ],
        filePath && [
          "https://github.com/VocaDB/Wiki/commits/main/" + filePath,
          <>
            <CounterClockwiseClockIcon /> See page history
          </>,
        ],
        [
          "https://github.com/VocaDB/Wiki/issues/new" +
            (issueBody ? "?body=" + encodeURIComponent(issueBody) : ""),
          <>
            <ExclamationTriangleIcon /> Report an issue
          </>,
        ],
      ]
        .filter((e) => e)
        .map((e) => (
          <li>
            <Button variant="outline" asChild>
              <a href={e[0]} target="_blank" className="flex">
                {e[1]}
              </a>
            </Button>
          </li>
        ))}
    </ul>
  );
};
