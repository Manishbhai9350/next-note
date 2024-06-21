import bcrypt from 'bcrypt'


const hash = (str:string) => {
    return bcrypt.hashSync(str,10)
}

const compare = (str:string,hash:string) => {
    return bcrypt.compareSync(str,hash)
}

export {hash,compare}