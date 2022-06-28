import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Sidebar.module.css";
import { RoomAvatar } from "."

export const Sidebar = () => {
  const router = useRouter();
  const [channels, setChannels] = useState([]);

  const getChannel = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getChannels`)
      const data = await response.json();
      setChannels(data)
      console.log("sidebar", channels)

      router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getChannel()
  }, [])

  return (
    <div className={styles.wrapper}>
      {channels.map((channel, index) => (
        <RoomAvatar
          key={index}
          id={channel.roomId}
          avatar={channel.avatar}
          name={channel.roomName}
        />
      ))}
    </div>
  );
};
