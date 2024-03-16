import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";
import { useState } from "react";
import { Button } from "./ui/button";

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(undefined);

  return (
    <>
      <Button
        className="relative h-8 text-muted-foreground sm:pr-12 w-full justify-start md:w-40 lg:w-64 px-4"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="absolute right-[0.3rem] h-5 select-none bg-muted gap-1 items-center rounded px-1.5 sm:flex text-[10px]">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
