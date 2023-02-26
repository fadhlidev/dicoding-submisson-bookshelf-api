import { nanoid } from "nanoid";

export default class Book {
  id = null;
  name = null;
  year = null;
  author = null;
  summary = null;
  publisher = null;
  pageCount = 0;
  readPage = 0;
  finished = false;
  reading = false;
  insertedAt = null;
  updatedAt = null;

  constructor() {
    this.id = nanoid(16);
  }
}
