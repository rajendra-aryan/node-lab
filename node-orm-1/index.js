import db from "./db/index.js";
import { usersTable } from "./drizzle/schema.js";


async function getAllUsers() {
    const users = await db.select().from(usersTable)
    console.log(`Users in DB: `,users)
    return users
}

getAllUsers()



async function createUser({id, name, email}) {
    await db.insert(usersTable).values({
        id,
        name, 
        email
    })
}

// createUser({id:1,name:"A", email:"a@gmail.com"})
// createUser({id:2,name:"B", email:"b@gmail.com"})
// createUser({id:3,name:"C", email:"c@gmail.com"})