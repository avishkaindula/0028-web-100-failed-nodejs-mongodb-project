const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  // const documentsCursor = await db.getDb().collection("authors").find();
  // We can get access to the database by using getDb()
  // getDb() is a function we created on the database.js file.
  // .find() will return a promise. Therefor we should use async await
  // The above code will give us us a "cursor" that points to the documents on the authors collection.
  // Cursor is a tool that can be used to move through the documents that were fetched step by step.
  // It can be helpful if we fetch a "large" amount of documents and if we wanna work with them in chucks
  // But as there are few authors in our database, we can use the following code instead.
  const authors = await db.getDb().collection("authors").find().toArray();
  // This will output all the author documents as an JavaScript array.
  // So we don't have to do a conversion by our own.

  console.log(authors);
  // Output==============================================================================================
  // [
  //   {
  //     _id: ObjectId("62c713fac676cf78b043aa04"),
  //     name: "Avishka Indula",
  //     email: "indula@email.com",
  //   },
  //   {
  //     _id: ObjectId("62c71402c676cf78b043aa05"),
  //     name: "Janith Wimalasiri",
  //     email: "janith@email.com",
  //   },
  // ];

  res.render("create-post", { authors: authors});
  // authors: authors will make the authors data available on create-post.ejs
});

module.exports = router;
