import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { navigate } from "astro:transitions/client";
import { useCallback, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button } from "../ui/button";

interface ArticleData {
  url: string;
  content: string;
  locations: number[];
  meta: {
    title: string;
  };
  excerpt: string;
}

interface SearchResult {
  data: () => Promise<ArticleData>;
  id: string;
  score: number;
  words: number[];
  excerpt: string;
}

declare global {
  interface Window {
    pagefind?: {
      init(): void;
      debouncedSearch(term: string): Promise<{
        results: SearchResult[];
      }>;
    };
  }
}

const extractSearchWords = (searchTerm: string): string[] => {
  return searchTerm
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2);
};

const findBestExcerpt = (
  content: string,
  searchTerm: string,
  maxLength: number = 200,
): string => {
  if (!content) return "";

  const paragraphs = content.split(". ");
  const searchTerms = extractSearchWords(searchTerm);

  // Select the paragraph with most search term matches
  let bestParagraph = "";
  let maxMatches = 0;

  for (const paragraph of paragraphs) {
    if (
      paragraph.trim().length < 3 ||
      paragraph.toLowerCase().includes("wikipage")
    ) {
      continue;
    }

    const lowerPara = paragraph.toLowerCase();
    const matches = searchTerms.filter((term) =>
      lowerPara.includes(term),
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestParagraph = paragraph;
    }
  }

  if (!bestParagraph) return "";

  return bestParagraph.length > maxLength
    ? bestParagraph.substring(0, maxLength) + "..."
    : bestParagraph;
};

function HighlightedText({
  text,
  searchTerm,
}: {
  text: string;
  searchTerm: string;
}) {
  const searchWords = extractSearchWords(searchTerm);

  return (
    <Highlighter
      highlightClassName="bg-yellow-200"
      searchWords={searchWords}
      autoEscape={true}
      textToHighlight={text}
    />
  );
}

function ResultItem({
  result,
  searchTerm,
}: {
  result: SearchResult & { titleScore?: number };
  searchTerm: string;
}) {
  const [data, setData] = useState<ArticleData | null>(null);
  const [excerpt, setExcerpt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const res = await result.data();

        if (!isMounted) return;

        setData(res);

        if (res.content) {
          const bestExcerpt = findBestExcerpt(res.content, searchTerm);
          setExcerpt(bestExcerpt);
        }
      } catch (err) {
        console.error("Error loading result data:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [result, searchTerm]);

  if (isLoading) {
    return <CommandItem>Loading...</CommandItem>;
  }

  if (!data) {
    return null;
  }

  return (
    <CommandItem
      className="flex flex-col items-start py-2 cursor-pointer"
      onSelect={() => navigate(data.url.replace(".html", "") ?? "/")}
    >
      <div className="font-medium">
        <HighlightedText text={data.meta.title} searchTerm={searchTerm} />
      </div>
      {excerpt && (
        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
          <HighlightedText text={excerpt} searchTerm={searchTerm} />
        </div>
      )}
    </CommandItem>
  );
}

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<
    (SearchResult & { titleScore?: number })[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const MAX_RESULT_COUNT = 15;

  const performSearch = useCallback(
    async (term: string) => {
      // @ts-ignore
      if (window.pagefind === undefined || !term) {
        setResults([]);
        return;
      }

      setIsSearching(true);

      try {
        const searchResults = await window.pagefind.debouncedSearch(term);

        if (!searchResults || !searchResults.results) {
          setResults([]);
          return;
        }

        const resultsWithTitleScoring = await Promise.all(
          searchResults.results.map(async (result) => {
            try {
              const data = await result.data();
              const title = data.meta?.title || "";

              let titleScore = 0;
              const lowerTitle = title.toLowerCase();
              const lowerTerm = term.toLowerCase();

              if (lowerTitle === lowerTerm) {
                titleScore = 10;
              } else if (lowerTitle.startsWith(lowerTerm)) {
                titleScore = 8;
              } else if (lowerTitle.includes(lowerTerm)) {
                titleScore = 5;
              } else {
                const searchWords = extractSearchWords(term);
                const titleWords = title.toLowerCase().split(/\s+/);

                for (const searchWord of searchWords) {
                  if (
                    titleWords.some((titleWord) =>
                      titleWord.includes(searchWord),
                    )
                  ) {
                    titleScore += 2;
                  }
                }
              }

              return { ...result, titleScore };
            } catch (err) {
              console.error("Error loading result data for scoring:", err);
              return { ...result, titleScore: 0 };
            }
          }),
        );

        // Prioritize title match
        resultsWithTitleScoring.sort((a, b) => {
          if ((b.titleScore || 0) !== (a.titleScore || 0)) {
            return (b.titleScore || 0) - (a.titleScore || 0);
          }
          return b.score - a.score;
        });

        setResults(resultsWithTitleScoring.slice(0, MAX_RESULT_COUNT));
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [MAX_RESULT_COUNT],
  );

  // Effect for search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, performSearch]);

  // Initialize pagefind when dialog opens
  useEffect(() => {
    if (open && window.pagefind) {
      window.pagefind.init();
    }
  }, [open]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button
        className="relative h-8 text-muted-foreground sm:pr-12 w-full justify-start md:w-40 lg:w-64 px-4 transition-none hover:transition-colors"
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label="Search documentation"
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
          {isSearching ? (
            <CommandGroup>
              <CommandItem disabled>Searching...</CommandItem>
            </CommandGroup>
          ) : searchTerm.length > 0 && results.length === 0 ? (
            <CommandEmpty>No results found</CommandEmpty>
          ) : searchTerm.length === 0 ? (
            <CommandEmpty>Type something to search</CommandEmpty>
          ) : (
            <CommandGroup>
              {results.map((res) => (
                <ResultItem key={res.id} result={res} searchTerm={searchTerm} />
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
