import {
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavContents } from "./NavContents.tsx";

export default function MobileNavbar() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="mr-6 md:hidden"
      >
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <ScrollArea className="h-full">
          <div className="p-6">
            <NavContents mobile={true} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
