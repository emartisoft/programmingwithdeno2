interface Book {
  ID: number;
  KitapAdi: string;
  SayfaSayisi: number;
}

interface Props {
  books: Book[];
}

export default function BookList({ books }: Props) {
  return (
    <div>
      <h3 class="text-2xl font-bold text-blue-600">
        Book Table (BookList.tsx)
      </h3>
      <table class="w-full border-collapse border border-gray-100">
        <thead>
          <tr>
            <th class="border border-gray-300 bg-gray-100 px-4 py-2 text-left">
              Book Name
            </th>
            <th class="border border-gray-300 bg-gray-100 px-4 py-2 text-left">
              Page Count
            </th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.ID}>
              <td class="border border-gray-300 px-4 py-2">{book.KitapAdi}</td>
              <td class="border border-gray-300 px-4 py-2">
                {book.SayfaSayisi}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
