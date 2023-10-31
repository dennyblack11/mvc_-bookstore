import { ObjectId } from "mongodb";

export class bookModel {
  public _id: ObjectId;
  public title: string;
  public author: string;
  public description: string;
  public numberOfPages: string;
  public category: string;
  public interesting: boolean;

  constructor(
    title: string,
    author: string,
    description: string,
    numberOfPages: string,
    category: string,
    interesting: boolean
  ) {
    this._id = new ObjectId();
    this.title = title;
    this.author = author;
    this.description = description;
    this.numberOfPages = numberOfPages;
    this.category = category;
    this.interesting = interesting;
  }
}