'use client'

import { useState } from 'react'
import SearchComponent from '@/components/SearchComponent'
import { Card } from '@/components/Card';

interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
}

export default function Home() {
  const [cards, setCards] = useState<Book[]>([])

  const addCard = (book: Book) => {
    setCards(prevCards => [...prevCards, book])
  }

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <h1 className='text-3xl text-gray-300 font-bold text-center'>Book Store</h1>
      <SearchComponent onAddCard={addCard} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {cards.map((book) => (
           <Card
           key={book.id}
           title={book.title}
           author={book.author}
           summary={book.summary}
         />
        ))}
      </div>
    </main>
  )
}
