import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
    log: ["error", "warn", "info", "query"],
});

export default db;
