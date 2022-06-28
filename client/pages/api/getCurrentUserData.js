import { client } from "../../lib/client"

export default async (req, res) => {
  const query = `*[_type == "users" && walletAddress == "${req.query.account}"]{
    name,
    "avatar": profileImage.asset->url
  }
  `
  try {
    const sanityResponse = await client.fetch(query)
  
    res.status(200).send(sanityResponse[0])
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}