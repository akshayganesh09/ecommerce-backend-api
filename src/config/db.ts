import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";
import { env } from "./env";

// 1. Create a connection pool using your URL
const pool = new Pool({ connectionString: env.databaseUrl });

// 2. Create the adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient
export const prisma = new PrismaClient({ adapter });