// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const http = require("http");
// const server = http.createServer(app);

// // socket
// const { Server } = require("socket.io");

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   // to spesefic room
//   socket.on("send_message", (data) => {
//     socket.to(data?.room).emit("receive_message", data);
//   });
//   // send everyone
//   // socket.on("send_message", (data) => {
//   //   socket.broadcast.emit("receive_message", data);
//   // });
// });

// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log(`Server is running on the ${port}`);
// });

const mongoose = require("mongoose");
const config = require("./config");
const app = require("./app");

async function main() {
  try {
    await mongoose.connect(config.database_url);
    console.log("MongoDB connected");
    app.listen(config.port, () => {
      console.log(`App is listening on port: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
