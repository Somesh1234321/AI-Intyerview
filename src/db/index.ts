import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Database module.
 *
 * NOTE: The application runs in-memory by default (see `src/lib/interview-store.ts`),
 * so a PostgreSQL database is OPTIONAL. We therefore lazily initialize the pool and
 * drizzle instance to avoid throwing `DATABASE_URL is required` at module load time.
 *
 * If `DATABASE_URL` is provided (e.g. via `.env.local`), the pool/drizzle will be
 * created on first use. If code attempts to actually use the DB without a
 * `DATABASE_URL`, an explicit, useful error is thrown then (not on import).
 */

type DbInstance = ReturnType<typeof drizzle>;

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDrizzle?: DbInstance;
};

const databaseUrl = process.env.DATABASE_URL;

function getPool(): Pool {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    if (!databaseUrl) {
      throw new Error(
        "DATABASE_URL is required to communicate with PostgreSQL. " +
          "Set it in your environment (e.g. `.env.local`) if your app needs database persistence. " +
          "This app currently runs in-memory, so no database is required."
      );
    }

    globalForDb.__arenaNextJsPostgresqlPool = new Pool({
      connectionString: databaseUrl,
    });
  }

  return globalForDb.__arenaNextJsPostgresqlPool;
}

// Lazy getters so importing this module never crashes without DATABASE_URL.
export const pool: Pool = new Proxy({} as Pool, {
  get: (_target, prop, receiver) => Reflect.get(getPool(), prop, receiver),
});

export const db: DbInstance = new Proxy({} as DbInstance, {
  get: (_target, prop, receiver) => {
    const instance = getDrizzle();
    return Reflect.get(instance, prop, receiver);
  },
});

function getDrizzle(): DbInstance {
  if (!globalForDb.__arenaNextJsPostgresqlDrizzle) {
    globalForDb.__arenaNextJsPostgresqlDrizzle = drizzle(getPool());
  }

  return globalForDb.__arenaNextJsPostgresqlDrizzle;
}

