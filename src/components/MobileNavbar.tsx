import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { groupedNavbarParents, navbarParents, posts } from "./navigationConfig";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

export default function MobileNavbar() {
  const [expanded, setExpanded] = useState<string | undefined>();

  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="mr-6 md:hidden"
      >
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left">
        <ScrollArea className="pl-6 h-full">
          {navbarParents
            .map((i) => {
              return {
                navbarItem: i,
                parentEntry: posts.find(
                  (p) => p.params.slug === i.title.toLowerCase()
                )!,
              };
            })
            .map(({ navbarItem, parentEntry }) => (
              <div
                key={navbarItem.title}
                className="flex flex-col space-y-3 pt-6"
              >
                <h4 className="font-medium">{navbarItem.title}</h4>
                {navbarItem.subcategories !== undefined &&
                  navbarItem.subcategories.length > 0 && (
                    <>
                      {navbarItem.subcategories.map((c) => (
                        <div key={c}>
                          <div
                            className="collapsibleNav group flex flex-row items-center gap-1 peer text-muted-foreground hover:underline cursor-pointer"
                            data-state={c === expanded ? "open" : "closed"}
                            onClick={() =>
                              c === expanded
                                ? setExpanded(undefined)
                                : setExpanded(c)
                            }
                          >
                            {c}
                            <ChevronDownIcon className="group-data-[state=closed]:block hidden" />
                            <ChevronUpIcon className="group-data-[state=closed]:hidden" />
                          </div>
                          <div className="peer-data-[state=open]:grid hidden text-muted-foreground py-1 ml-4">
                            {groupedNavbarParents[c]?.map((post) => (
                              <a
                                className="hover:underline pt-2"
                                key={post.params.slug}
                                href={[
                                  "/docs",
                                  c.toLowerCase(),
                                  post.params.slug,
                                ].join("/")}
                              >
                                {post.props.entry.data.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                {groupedNavbarParents[navbarItem.title]?.map((post) => (
                  <a
                    href={[
                      "/docs",
                      parentEntry.params.slug,
                      post.params.slug,
                    ].join("/")}
                    key={post.params.slug}
                    className="text-muted-foreground"
                  >
                    {post.props.entry.data.title}
                  </a>
                ))}
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
