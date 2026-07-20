const mongoose = require("mongoose");
const Actor = require("./models/Actor");
const actors = require("./actors.json");
require("dotenv").config();

async function deleteActors() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const names = actors.map(actor => actor.name);

    const result = await Actor.deleteMany({
      name: { $in: names }
    });

    console.log(`${result.deletedCount} actors deleted.`);

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

deleteActors();