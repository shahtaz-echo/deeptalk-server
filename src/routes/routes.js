const express = require("express");
const AuthRoutes = require("../modules/auth/auth.routes");
const UserRoutes = require("../modules/user/user.routes");
const MessageRoutes = require("../modules/message/message.routes")

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
