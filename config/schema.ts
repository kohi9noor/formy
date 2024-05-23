import { serial, text, varchar, pgTable } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  createdAt: varchar("createdAt", { length: 256 }).notNull(),
  createdBy: varchar("createdBy", { length: 256 }).notNull(),
});
