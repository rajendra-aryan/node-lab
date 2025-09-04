import db from "../db/index.js"
import { usersTable } from "../models/index.js"
import { eq } from "drizzle-orm"

async function getUserByEmail(email) {
    const [existingUser] =  await db
    .select({
        id:usersTable.id,
        firstName:usersTable.firstName,
        lastName:usersTable.lastName,
        email:usersTable.email
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))

    return existingUser
}

async function createUser({email, firstName, lastName, salt, password:hassedPassword}) {
    const [user] = await db.insert(usersTable).values({
        email,
        firstName,
        lastName,
        salt,
        password:hassedPassword
    }).returning({id:usersTable.id})

    return user
}

export {getUserByEmail, createUser}