import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { groupedNavbarParents, navbarParents, posts } from "./navigationConfig";
import { cn } from "@/lib/utils.ts";

interface NavContentsProps {
  mobile?: boolean;
}

export function NavContents({ mobile = false }: NavContentsProps) {
  const [expanded, setExpanded] = useState<string | undefined>();

  const containerClass = cn('flex flex-col', mobile ? "space-y-3 pb-6" : "space-y-1 pb-4 text-sm");
  const buttonClass = mobile ? "py-1.5" : "py-1";
  const linkClass = "hover:underline visited:text-blue-500";

  return (
    <>
      {navbarParents
        .map((i) => {
          return {
            navbarItem: i,
            title:
              posts.find((p) => p.params.slug === i.title.toLowerCase())?.props
                .entry.data.title ?? i.title,
          };
        })
        .map(({ navbarItem, title }) => (
          <div key={navbarItem.title} className={containerClass}>
            <h4 className={'font-semibold'}>{title}</h4>

            <div className={"flex flex-col"}>
              {navbarItem.subcategories !== undefined &&
                navbarItem.subcategories.length > 0 && (
                  <div className={mobile ? "" : "text-sm"}>
                    {navbarItem.subcategories.map((c) => (
                      <div key={c}>
                        <div
                          className={cn("collapsibleNav group flex flex-row items-center gap-1 peer text-muted-foreground hover:underline cursor-pointer py-1", buttonClass)}
                          data-state={c === expanded ? "open" : "closed"}
                          onClick={() =>
                            c === expanded
                              ? setExpanded(undefined)
                              : setExpanded(c)
                          }
                        >
                          <p className="flex-1">
                          {c}
                          </p>
                          <ChevronDownIcon className="group-data-[state=closed]:block hidden" />
                          <ChevronUpIcon className="group-data-[state=closed]:hidden" />
                        </div>
                        <div className={cn("peer-data-[state=open]:grid hidden text-muted-foreground ml-4")}>
                          {groupedNavbarParents[c]?.map((post) => (
                            <a
                              className={cn(linkClass, buttonClass)}
                              key={post.params.slug}
                              href={["/docs", post.params.slug].join("/")}
                            >
                              {post.props.entry.data.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {groupedNavbarParents[navbarItem.title]?.map((post) => (
                <a
                  href={["/docs", post.params.slug].join("/")}
                  key={post.params.slug}
                  className={cn('text-muted-foreground', linkClass, buttonClass)}
                >
                  {post.props.entry.data.title}
                </a>
              ))}
            </div>
          </div>
        ))}
    </>
  );
}