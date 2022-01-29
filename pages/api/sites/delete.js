import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

/**
 * @swagger
 * /api/sites/delete?id={id}:
 *   delete:
 *     summary: Result of findOneAndDelete operation.
 *     description: Result of findOneAndDelete operation.
 *     tags: 
 *       - sites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String id of the site to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Delete site.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
const handler = async (req, res) => {
    if (req.method !== 'DELETE') {
        res.status(405).send({ error: 'Method Not Allowed' })

        return
    }

    const { id } = req.query

    if (id.trim().length === 0) {
        res.status(422).send({ error: 'Query String Parameters requires an id value' })

        return
    }

    await clientPromise.then(async (client) => {
        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.findOneAndDelete({ _id: ObjectId(id) })

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).send({ error: error })
    })
}

export default handler