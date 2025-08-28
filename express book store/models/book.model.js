import {pgTable, uuid, varchar, text, index} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { authorsTable } from "./author.model.js"


export const booksTable = pgTable('books',{
    id: uuid().primaryKey().defaultRandom(),
    title:varchar({length:100}).notNull(),
    description: text(),
    authorId: uuid().references(()=>authorsTable.id,{onDelete:"cascade"}).notNull()
},(table)=>[
    index('title_index').
    using('gin', sql`to_tsvector('english', ${table.title})`),
])