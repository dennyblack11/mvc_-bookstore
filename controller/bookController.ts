import { Request, Response } from "express";
import { client, db } from "../utils/dbConfig";
import { bookModel } from "../model/bookModels";
import { statusCode } from "../utils/statusCode";
import { ObjectId } from "mongodb";

export const createBook = async (req: Request, res: Response) => {
  try {
    
    await client.connect();

    const { title, author, description, numberOfPages, interesting, category } =
      req.body;

    const book = new bookModel(
      title,
      author,
      description,
      numberOfPages,
      category,
      interesting
    );

    await db.insertOne(book);

    return res.status(statusCode.OK).json({
      message: "book created",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readBooks = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const book = await db.find().toArray();

    return res.status(statusCode.OK).json({
      message: "book created",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readBookById = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { bookID } = req.params;

    const book = db.findOne({ _id: new ObjectId(bookID) });

    return res.status(statusCode.OK).json({
      message: "book read by ID",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const readBookByCategory = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { category } = req.body;

    const book = await db.find({ category }).toArray();

    return res.status(statusCode.OK).json({
      message: "book read by category",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { bookID } = req.params;
    const { title } = req.body;

    const book = await db.updateOne(
      { _id: new ObjectId(bookID) },
      { $set: { title } }
    );

    return res.status(statusCode.OK).json({
      message: "book updated",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
export const deleteBook = async (req: Request, res: Response) => {
  try {
    await client.connect();

    const { bookID } = req.params;

    const book = await db.deleteOne({ _id: new ObjectId(bookID) });

    return res.status(statusCode.OK).json({
      message: "book deleted",
      data: book,
    });
  } catch (err) {
    res.status(statusCode.BAD_REQUEST).json({
      message: "Error",
    });
  }
};