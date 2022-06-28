import { client } from "../../lib/client"

const query = `*[_type == "conversations" && isDm == false]{
  roomId,
  roomName,
  "avatar": image.asset->url
}`

export default async (req, res) => {
  try {
    const sanityResponse = await client.fetch(query)
  
    res.status(200).send(sanityResponse)
  } catch (err) {
    console.error(err)
    res.status(500).send(err)
  }
}