import clientPromise from '../../../lib/mongodb'

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Method Not Allowed' })
    }

    await clientPromise.then(async (client) => {
        const { url, description } = req.body

        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.insertOne({ url, description })

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).send({ error: error })
    })
}

export default handler