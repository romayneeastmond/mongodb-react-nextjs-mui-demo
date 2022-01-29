import clientPromise from '../../../lib/mongodb'

/**
 * @swagger
 * components:
 *   schemas:
 *     Site:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB identity field.
 *           example: 5f7d356e-a02c-4de2-86b6-b0dd993054ee
 *         url:
 *           type: string
 *           description: Url of the site.
 *           example: https://www.google.com/ 
 *         description:
 *           type: string
 *           description: Description of the site.
 *           example: Google Homepage
 *         lastChecked:
 *           type: dateTime
 *           description: Date site was last checked.
 *           example: 2022-01-29T11:57:26.154Z
 * /api/sites/list:
 *   get:
 *     summary: Array of find operation.
 *     description: Array of find operation.
 *     tags: 
 *       - sites
 *     responses:
 *       200:
 *         description: List sites.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Site'
 */
const handler = async (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send({ error: 'Method Not Allowed' })

        return
    }

    await clientPromise.then(async (client) => {
        const db = client.db()

        const collection = db.collection('definitions')

        const data = await collection.find().toArray()

        res.status(200).json(data)
    }).catch((error) => {
        res.status(500).send({ error: error })
    })
}

export default handler