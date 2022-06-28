import { client } from "../../lib/client"

const query = `*[_type == "conversations" && isDm==true]{
  "conversation": userReference->{
    name,
    walletAddress,
    "image": profileImage.asset->url
  }
}`

export default async (req, res) => {
try {
  const sanityResponse = await client.fetch(query)
  
  const response = sanityResponse.map((item) => ({
    avatar: item.conversation.image,
    name: item.conversation.name,
    id: item.conversation.walletAddress,
  }))
  console.log(response)
  
  res.status(200).send(response)
} catch (err) {
  console.error(err)
  res.status(500).send(err)
}
}