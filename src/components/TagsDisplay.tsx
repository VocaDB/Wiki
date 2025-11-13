import { cn } from "@/lib/utils";
import { badgeVariants } from "./ui/badge";

interface TagsDisplayProps {
  tags: string[];
}

export const TagsDisplay: React.FC<TagsDisplayProps> = ({ tags }) => {
  return (
    <div className="mb-2">
      {tags.map((tag) => (
        <>
          <a
            href={["/tags", tag].join("/")}
            key={tag}
            className={cn(badgeVariants(), "no-underline")}
          >
            {tag}
          </a>
          {" "}
        </>
      ))}
    </div>
  );
};

// <Badge key={tag} variant="outline">
//   {tag}
// </Badge>
