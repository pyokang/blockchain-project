export const conversationSchema = {
  name: "conversations",
  type: "document",
  title: "Conversations",
  fields: [
    {
      name: "roomName",
      type: "string",
      title: "Room Name",
    },
    {
      name: "roomId",
      type: "string",
      title: "Room Id",
    },
    {
      name: "image",
      type: "image",
      title: "image",
    },
    {
      name: "isDm",
      type: "boolean",
      title: "Is DM",
    },
    {
      name: "userReference",
      type: "reference",
      to: [{ type: "users" }],
    },
  ],
};
