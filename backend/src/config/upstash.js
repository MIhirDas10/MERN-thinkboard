import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
// to able to access environment variables
import dotenv from "dotenv"

dotenv.config()

// create a ratelimiter that allows 100 reqs per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
})

export default ratelimit