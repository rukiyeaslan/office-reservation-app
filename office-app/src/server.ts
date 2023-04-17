import { config } from "./config/config";
import express from "express";
import deserializeUser from "./middleware/deserializeUser";
import {swaggerDocs} from "./utils/swagger";
import router from "./routes/routes";
import connectToDb from "./utils/connectToDb";

//TODO: test cron
import './cron'

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.server.port;

/**
 * @openapi
 * /api.check:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
app.get('/api/check', (req, res, next)=>{
    res.status(200).json({message: 'pong'});
});

app.listen(port, async () => {
  console.log(`App started at http://localhost:${port}`);
  await connectToDb();
  swaggerDocs(app, config.server.port);
});
