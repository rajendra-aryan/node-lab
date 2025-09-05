import db from "../db/index.js"
import { urlsTable } from "../models/index.js"


async function codeShortner(shortCode, url, userId) {
    const [result] = await db.insert(urlsTable).values({
        shortCode,
        targetURL: url,
        userId
    }).returning({id:urlsTable.id, shortCode: urlsTable.shortCode, targetURL:urlsTable.targetURL})

    return result
}

export {codeShortner}