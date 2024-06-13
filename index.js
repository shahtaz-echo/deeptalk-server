const mongoose = require("mongoose");
const config = require("./config");
const app = require("./app");
const {server} = require("./src/socket/socket")

async function main() {
  try {
    await mongoose.connect(config.database_url);
    console.log("MongoDB connected");
    server.listen(config.port, () => {
      console.log(`App is listening on port: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
