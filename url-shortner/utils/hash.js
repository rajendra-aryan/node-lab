import {randomBytes, createHmac} from "crypto"

function hashPasswordWithSalt(password) {
    const salt = randomBytes(256).toString('hex')
    const hassedPassword = createHmac('sha256', salt).update(password).digest('hex')

    return {salt, password:hassedPassword}
}

export {hashPasswordWithSalt}