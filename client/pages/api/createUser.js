import { client } from "../../lib/client"

export default async (req, res) => {
  const { userAddress } = req.body;

  const userDoc = {
    _type: 'users',
    _id: `${userAddress}-user`,
    name: "Unnamed",
    walletAddress: userAddress,
  }

  try {
    await client.createIfNotExists(userDoc)

    res.status(200).send("Successful")
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}