import { MongoClient } from "mongodb";

const URL = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(URL);
const mainConnection = async () => {
  await client.connect();

  return "database is now connected";
};

mainConnection()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    client.close();
  });

export const db = client.db("bookClassDB").collection("books");