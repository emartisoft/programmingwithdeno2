import { connectDb, getBooks } from "../db/db.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import BookList from "../components/BookList.tsx";
import Sayac from "../islands/Sayac.tsx";

interface Book {
  ID: number;
  KitapAdi: string;
  SayfaSayisi: number;
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const client = await connectDb();
    const books = await getBooks(client);
    return ctx.render({ books });
  },
};

export default function Home({ data }: PageProps<{ books: Book[] }>) {
  const books = data.books;

  return (
    <div>
      <br />
      <h1 class="text-3xl text-yellow-300 text-center bg-green-50 p-4 rounded-lg border border-gray-200 mb-[25px]">
        <b>Fresh Web Framework Application Example</b>
      </h1>
      <div>
        <h2 class="text-2xl font-bold text-blue-600">Island (Sayac.tsx)</h2>
        <Sayac />
      </div>
      <hr class="my-4" />
      <div>
        <h2 class="text-2xl font-bold text-blue-600">
          Book List (index.tsx)
        </h2>
        <dl class="bg-gray-100 p-4 rounded-lg border border-gray-200">
          {books.map((book) => (
            <dt key={book.ID}>
              {book.KitapAdi} ({book.SayfaSayisi} pages)
            </dt>
          ))}
        </dl>
      </div>
      <hr class="my-4" />
      <BookList books={data.books} />
      <br />
      <div class="flex justify-center gap-2">
        <img
          src={"https://jsr.io/logos/deno.svg"}
          alt="Deno Logo"
          width="32"
          height="32"
        />
        <img
          src={"https://fresh.deno.dev/logo.svg"}
          alt="Fresh Logo"
          width="32"
          height="32"
        />
      </div>
      <p class="text-sm text-gray-500 mt-4 border-t border-gray-200 pt-2">
        This application is developed using{" "}
        <a class="underline" href="https://www.deno.com">Deno</a> and{" "}
        <a class="underline" href="https://fresh.deno.dev">Fresh</a>. It uses, a
        MongoDB database.
      </p>
      <p class="text-sm text-gray-500 mt-4 border-t border-gray-200 pt-2">
        To view the source code:{" "}
        <a
          class="underline"
          href="https://github.com/emartisoft/KitaplarFreshDeployMongo"
        >
          https://github.com/emartisoft/KitaplarFreshDeployMongo
        </a>
      </p>
      <br />
    </div>
  );
}
