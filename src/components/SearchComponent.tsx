"use client";

import { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
  occurrences?: number;
}

export default function SearchComponent({
  onAddCard,
}: {
  onAddCard: (book: Book) => void;
}) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      const response = await fetch(
        `/api/books?query=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      setSuggestions(data);
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook) {
      onAddCard(selectedBook);
      setSearch("");
      setSelectedBook(null);
      setSuggestions([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between gap-2"
    >
      <div className="flex-grow relative w-full">
        <Input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-[calc(100vh-100px)] overflow-y-auto">
            {suggestions.map((book) => (
              <li
                key={book.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedBook(book);
                  setSearch(book.title);
                }}
              >
                {book.title} (Occurrences: {book.occurrences})
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button type="submit" disabled={!selectedBook}>
        Add Book
      </Button>
    </form>
  );
}
