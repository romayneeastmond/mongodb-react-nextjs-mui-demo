import clientPromise from '../../../lib/mongodb'

/**
 * @swagger
 * /api/sites/add:
 *   post:
 *     summary: Result of insertOne operation.
 *     description: Result of insertOne operation.
 *     tags: 
 *       - sites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Url of the site.
 *                 example: https://www.google.com/ 
 *               description:
 *                 type: string
 *                 description: Description of the site.
 *                 example: Google Homepage
 *     responses:
 *       200:
 *         description: Add site.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).send({ error: 'Method Not Allowed' })

        return
    }

    const { url, description } = req.body

    if (url.trim().length === 0 || description.trim().length === 0) {
        res.status(422).send({ error: 'Request Payload requires url and description values' })

        return
    }

    await clientPromise.then(async (client) => {
        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.insertOne({ url, description })

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).send({ error: error })
    })
}

export default handler