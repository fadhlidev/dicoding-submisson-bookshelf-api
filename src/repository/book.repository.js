import { InsertionError, NotFoundError, ValidationError } from "../errors.js";

class BookRepository {
  #books = null;

  constructor() {
    this.#books = [];
  }

  #existById(id) {
    const book = this.#books.find((book) => book.id === id);
    return book !== undefined;
  }

  #insert(book) {
    if (this.#existById(book.id)) {
      throw new InsertionError("Buku gagal ditambahkan");
    }

    book.insertedAt = new Date().toISOString();
    book.updatedAt = book.insertedAt;
    this.#books.push(book);
  }

  #update(id, updatedBook) {
    const book = this.#books.find((book) => book.id === id);

    if (book === undefined) {
      throw new NotFoundError("Id tidak ditemukan");
    }

    const updatedAt = new Date().toISOString();
    Object.assign(book, { ...updatedBook, updatedAt });
  }

  #validate(book) {
    if (book.name === "" || book.name === undefined || book.name === null) {
      throw new ValidationError("Mohon isi nama buku");
    }

    if (book.readPage > book.pageCount) {
      throw new ValidationError(
        "readPage tidak boleh lebih besar dari pageCount"
      );
    }

    book.finished = book.readPage === book.pageCount;
  }

  save(book) {
    this.#validate(book);

    if (this.#existById(book.id)) {
      return this.#update(book.id, book);
    }

    this.#insert(book);
  }

  findById(id) {
    const book = this.#books.find((book) => book.id === id);

    if (book === undefined) {
      throw new NotFoundError("Id tidak ditemukan");
    }

    return book;
  }

  findAll({ name = "", reading = "-1", finished = "-1" }) {
    return this.#books.filter((book) => {
      const isNameMatch = book.name.toLowerCase().includes(name.toLowerCase());
      const isReading =
        reading === "1" ? book.reading : reading === "0" ? !book.reading : true;
      const isFinished =
        finished === "1"
          ? book.finished
          : finished === "0"
          ? !book.finished
          : true;
      return isNameMatch && isReading && isFinished;
    });
  }

  delete(id) {
    const index = this.#books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new NotFoundError("Id tidak ditemukan");
    }

    this.#books.splice(index, 1);
  }
}

export default new BookRepository();
