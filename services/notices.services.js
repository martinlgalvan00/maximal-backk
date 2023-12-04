import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://m4rt1n:s0yM4RT1NG4LV4N@62.72.51.41:27017/')

const db = client.db('MAXIMAL_STRCORP') // LE ERRÉ A LA HORA DE PONER EL NOMBRE, POR LO QUE EN VEZ DE MAXIMAL_SRTCORP ES MAXIMAL_STRCORP

const notices = db.collection('Notices')

async function getAllNotices(){

    return client.connect()
        .then(async function () {
            return notices.find().toArray()
        })
}

async function getNoticeById(id){
    return client.connect()
        .then(function(){
            return notices.find({ _id: new ObjectId(id) }).toArray()

        })
}

async function createNotice(notice){

    return client.connect()
        .then(function(){
            return notices.insertOne(notice)
        })
}

async function editNotice(id, notice){
    return client.connect()
        .then(function(){
            return notices.updateOne({ _id: new ObjectId(id) }, { $set: notice })
        })
}

async function deleteNotice(id){
    return client.connect()
        .then(function(){
            return notices.deleteOne({ _id: new ObjectId(id) })
        })
        .then(function(){
            return true
        })
}


export {
    getAllNotices,
    getNoticeById,
    createNotice,
    editNotice,
    deleteNotice,
}
