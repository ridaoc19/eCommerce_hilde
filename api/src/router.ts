import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const router = Router();

readdirSync(join(__dirname, "/modules")).map((fileName) => {
  import(`./modules/${fileName}/controller`).then((moudleRouter) => {
    router.use(`/${fileName}`, moudleRouter.router);
  });
});

export { router };
