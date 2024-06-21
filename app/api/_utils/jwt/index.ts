import jwt from 'jsonwebtoken'

let JWT_SECRET = process.env.JWT_SECRET!

interface SignProps {
    username:string | undefined;
    email:string | undefined;
    id:string | undefined;
}

const sign = (data:SignProps) => {
    return jwt.sign(data,JWT_SECRET)
}

const verify = (token:any) => {
    return jwt.verify(token,JWT_SECRET) || null
}

export  {
    sign,
    verify
}