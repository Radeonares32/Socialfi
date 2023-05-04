import { signPayload } from './jwt.sec'
import { verifyToken } from './verify.jwt'

export const jwt = {
    payload: {
        signPayload
    },
    token: {
        verifyToken
    }
}