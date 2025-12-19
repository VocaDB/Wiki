import {
  CounterClockwiseClockIcon,
  ExclamationTriangleIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons";

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
    <ul className="flex flex-wrap gap-4 leading-none">
      {[
        filePath && [
          "https://github.com/VocaDB/Wiki/edit/main/" + filePath,
          <>
            <Pencil1Icon className="inline align-[-0.125em]" /> Edit this page
          </>,
        ],
        filePath && [
          "https://github.com/VocaDB/Wiki/commits/main/" + filePath,
          <>
            <CounterClockwiseClockIcon className="inline align-[-0.125em]" />{" "}
            See page history
          </>,
        ],
        [
          "https://github.com/VocaDB/Wiki/issues/new" +
          (issueBody ? "?body=" + encodeURIComponent(issueBody) : ""),
          <>
            <ExclamationTriangleIcon className="inline align-[-0.125em]" />{" "}
            Report an issue
          </>,
        ],
      ]
        .filter((e) => e)
        .map((e) => (
          <li>
            <a
              href={e[0]}
              target="_blank"
              className="hover:underline text-foreground/60 hover:text-foreground/80"
            >
              {e[1]}
            </a>
          </li>
        ))}
    </ul>
  );
};
