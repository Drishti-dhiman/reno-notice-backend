import { config as dotConfig } from "dotenv"
dotConfig();
const _config = Object.freeze({
    databaseUrl: process.env.DATABASE_URL || "postgresql://user:pass@host:5432/reno?schema=public",
    port: process.env.PORT || 8000,
    nodeEnv:process.env.NODE_ENV
}) 

export const config = _config 