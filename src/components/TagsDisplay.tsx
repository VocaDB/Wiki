import { Badge, badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

interface TagsDisplayProps {
  tags: string[];
}

export const TagsDisplay: React.FC<TagsDisplayProps> = ({ tags }) => {
  return (
    <div className="space-x-2">
      {tags.map((tag) => (
        <a
          href={["/tags", tag].join("/")}
          className={cn(badgeVariants(), "no-underline")}
        >
          {tag}
        </a>
      ))}
    </div>
  );
};

// <Badge key={tag} variant="outline">
//   {tag}
// </Badge>
