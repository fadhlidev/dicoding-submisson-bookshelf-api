import bookRepository from "./repository/book.repository.js";
import Book from "./entity/book.entity.js";

export const addBookHandler = ({ payload }, h) => {
  try {
    const book = new Book();
    book.name = payload.name;
    book.year = payload.year;
    book.author = payload.author;
    book.summary = payload.summary;
    book.publisher = payload.publisher;
    book.pageCount = payload.pageCount;
    book.readPage = payload.readPage;
    book.reading = payload.reading;
    bookRepository.save(book);

    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: book.id,
      },
    });
    response.code(201);
    return response;
  } catch (e) {
    const response = h.response({
      status: "fail",
      message: `Gagal menambahkan buku. ${e.message}`,
    });
    response.code(e.status);
    return response;
  }
};

export const getAllBooksHandler = ({ query }) => {
  return {
    status: "success",
    data: {
      books: bookRepository.findAll(query).map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };
};

export const getBookByIdHandler = ({ params }, h) => {
  try {
    const book = bookRepository.findById(params.id);
    return {
      status: "success",
      data: {
        book,
      },
    };
  } catch (e) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

export const updateBookHandler = ({ params, payload }, h) => {
  try {
    const book = bookRepository.findById(params.id);
    book.name = payload.name;
    book.year = payload.year;
    book.author = payload.author;
    book.summary = payload.summary;
    book.publisher = payload.publisher;
    book.pageCount = payload.pageCount;
    book.readPage = payload.readPage;
    book.reading = payload.reading;
    bookRepository.save(book);

    return {
      status: "success",
      message: "Buku berhasil diperbarui",
    };
  } catch (e) {
    const response = h.response({
      status: "fail",
      message: `Gagal memperbarui buku. ${e.message}`,
    });
    response.code(e.status);
    return response;
  }
};

export const deleteBookHandler = ({ params }, h) => {
  try {
    bookRepository.delete(params.id);
    return {
      status: "success",
      message: "Buku berhasil dihapus",
    };
  } catch (e) {
    const response = h.response({
      status: "fail",
      message: `Buku gagal dihapus. ${e.message}`,
    });
    response.code(e.status);
    return response;
  }
};
