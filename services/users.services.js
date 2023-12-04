import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

const client = new MongoClient('mongodb://m4rt1n:s0yM4RT1NG4LV4N@62.72.51.41:27017/')

const db = client.db('MAXIMAL_STRCORP') //LE ERRÉ A LA HORA DE PONER EL NOMBRE, POR LO QUE EN VEZ DE MAXIMAL_SRTCORP ES MAXIMAL_STRCORP

const users = db.collection('Users')

async function findById(id) {
    await client.connect()

    const user = await users.findOne({ _id: ObjectId(id) })

    return user
}

async function login(userLogin) {
    await client.connect()

    const user = await users.findOne({ email: userLogin.email })

    if (!user) {
        throw new Error('No existe el usuario')
    }

    const isMatch = await bcrypt.compare(userLogin.password, user.password)

    if (!isMatch) {
        throw new Error('Contraseña incorrecta')
    }

    return user

}


async function find(filter) {
    await client.connect()

    const usersCollection = await users.find(filter).toArray()

    return usersCollection
}

async function create(user) {
    const newUser = { 
        ...user}

    await client.connect()

    const userExist = await users.findOne({ email: newUser.email })

    if (userExist) {
        throw new Error('El email ya existe')
    }

    const salt = await bcrypt.genSalt(10)

    newUser.password = await bcrypt.hash(newUser.password, salt)

    await users.insertOne(newUser)

    return newUser
}

async function remove(id) {
    await client.connect()

    await users.deleteOne({ _id: ObjectId(id) })
}

export {
    find,
    create,
    remove,
    login,
    findById

}

