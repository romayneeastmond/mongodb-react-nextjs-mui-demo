import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'

/**
 * @swagger
 * /api/sites/update?id={id}:
 *   put:
 *     summary: Result of findOneAndUpdate operation.
 *     description: Result of findOneAndUpdate operation.
 *     tags: 
 *       - sites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String id of the site to update.
 *         schema:
 *           type: string
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
 *               lastChecked:
 *                 type: dateTime
 *                 description: Date site was last checked.
 *                 example: 2022-01-29T11:57:26.154Z
 *     responses:
 *       200:
 *         description: Update a site.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
const handler = async (req, res) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
        res.status(405).json({ error: 'Method Not Allowed' })

        return
    }

    const { id } = req.query
    const { url, description } = req.body

    let errors = []

    if (id === undefined || id.trim().length === 0) {
        errors.push('Query String Parameters requires an id value')
    }

    if ((url === undefined || url.trim().length === 0) || (description === undefined || description.trim().length === 0)) {
        errors.push('Request Payload requires url and description values')
    }

    if (errors.length > 0) {
        res.status(422).json({ errors: errors })

        return
    }

    await clientPromise.then(async (client) => {
        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.findOneAndUpdate(
            { _id: ObjectId(id) }, { $set: { ...req.body } })

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).json({ error: error })
    })
}

export default handler