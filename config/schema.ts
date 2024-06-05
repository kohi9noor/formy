import { serial, text, varchar, pgTable, integer } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: serial("id").primaryKey(),
  jsonform: text("jsonform").notNull(),
  theme: varchar("theme"),
  background: varchar("background"),
  style: varchar("style"),
  createdAt: varchar("createdAt", { length: 256 }).notNull(),
  createdBy: varchar("createdBy", { length: 256 }).notNull(),
});

export const userResponse = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createdAt: varchar("createdAt", { length: 256 }).notNull(),
  formRef: integer("formRef").references(() => forms.id),
});
