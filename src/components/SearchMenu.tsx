import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/ui/command";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { navigate } from "astro:transitions/client";

interface ArticleData {
  url: string;
  content: string;
  locations: number[];
  meta: {
    title: string;
  };
}

interface SearchResult {
  data: () => Promise<ArticleData>;
  id: string;
  score: number;
  words: number[];
}

function ResultItem({ result }: { result: SearchResult }) {
  const [data, setData] = useState<ArticleData | undefined>(undefined);

  useEffect(() => {
    result.data().then((res) => setData(res));
  }, []);

  return (
    <CommandItem onSelect={() => navigate(data?.url ?? "/")}>
      {data !== undefined && data.meta.title}
    </CommandItem>
  );
}

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const search = async () => {
      // @ts-ignore
      if (window.pagefind === undefined || searchTerm === "") return;

      // @ts-ignore
      const res = await window.pagefind.debouncedSearch(searchTerm);

      if (res === null) return;

      setResults(res.results);
    };

    search();
  }, [searchTerm]);

  useEffect(() => {
    if (open) {
      // @ts-ignore
      window.pagefind.init();
    }
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        className="relative h-8 text-muted-foreground sm:pr-12 w-full justify-start md:w-40 lg:w-64 px-4 hover:transition-colors"
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
          <CommandEmpty>Type something to search</CommandEmpty>
          <CommandGroup>
            {results.slice(0, 5).map((res) => (
              <ResultItem key={res.id} result={res} />
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
