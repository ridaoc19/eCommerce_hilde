import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const router = Router();

readdirSync(join(__dirname, "/modules")).map((fileName) => {
  import(`./modules/${fileName}/controller`).then((moduleRouter) => {
    router.use(`/${fileName}`, moduleRouter.router);
  });
});

export default router;
