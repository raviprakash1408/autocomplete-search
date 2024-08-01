interface CardProps {
    title: string;
    author: string;
    summary: string;
  }
  
  export function Card({ title, author, summary }: CardProps) {
    return (
      <div className="border border-gray-700 h-[400px] overflow-y-auto select-none rounded-lg p-4 transition-transform hover:scale-105">
        <h2 className="text-xl text-gray-800 font-bold">{title}</h2>
        <p className="text-sm text-gray-900">{author}</p>
        <p className="mt-2 text-gray-800">{summary}</p>
      </div>
    );
  }
  