require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");

const Actor = require("./models/Actor");

const actors = JSON.parse(
  fs.readFileSync("./actors.json", "utf8")
);

async function importActors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const operations = actors.map((actor) => ({
      updateOne: {
        filter: { name: actor.name },
        update: { $setOnInsert: actor },
        upsert: true
      }
    }));

    const result = await Actor.bulkWrite(operations);

    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Skipped: ${actors.length - result.upsertedCount}`);

    await mongoose.disconnect();
    console.log("Done!");
  } catch (err) {
    console.error(err);
  }
}

importActors();