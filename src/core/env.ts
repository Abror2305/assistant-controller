import * as dotenv from 'dotenv'
import { env } from "process";

(async () => {
    await dotenv.config()
})()

export default env;