import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Data.json'), 'utf8'))

interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
}

const books: Book[] = data.titles.map((title: string, index: number) => ({
  id: index,
  title: title,
  author: data.authors.find((a: { book_id: number; author: string }) => a.book_id === index)?.author || 'Unknown',
  summary: data.summaries.find((s: { id: number; summary: string }) => s.id === index)?.summary || ''}))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json([])
  }

  const filteredBooks = books.map(book => {
    const occurrences = (book.summary.toLowerCase().match(new RegExp(query.toLowerCase(), 'g')) || []).length
    return { ...book, occurrences }
  }).filter(book => book.occurrences > 0)
  .sort((a, b) => b.occurrences - a.occurrences)

  return NextResponse.json(filteredBooks)
}
