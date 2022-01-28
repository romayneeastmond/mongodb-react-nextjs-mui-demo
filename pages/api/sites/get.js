import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send({ error: 'Method Not Allowed' })
    }

    await clientPromise.then(async (client) => {
        const { id } = req.query

        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.findOne({ _id: ObjectId(id) })

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).send({ error: error })
    })
}

export default handler