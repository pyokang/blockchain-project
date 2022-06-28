import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "../styles/ConversationList.module.css";
import { DmCard } from ".";

import friends from "../assets/icons/friends.svg";
import nitro from "../assets/icons/nitro.svg";

export const ConversationList = () => {
  const [dms, setDms] = useState([])

  const getDms = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getDm`)
      const data = await response.json();
      setDms(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDms();
  }, [])
  

  return (
    <div className={styles.conversations}>
      <div className={styles.conversationListTop}>
        <input type="search" placeholder="Find or start a conversation" />
      </div>
      <div className={styles.converssationsContainer}>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={friends}
              className={styles.svg}
              alt="friends"
            />
          </div>
          <p>Friends</p>
        </div>
        <div className={styles.elementsContainer}>
          <div className={styles.svgContainer}>
            <Image
              height={25}
              width={25}
              src={nitro}
              className={styles.svg}
              alt="nitro"
            />
          </div>
          <p>Nitro</p>
        </div>
        <div className={styles.dmTitle}>DIRECT MESSAGES</div>
        {dms.map((dm, index) => (
          <DmCard
            key={index}
            id={dm.id}
            name={dm.name}
            avatar={
              dm.avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU"
            }
            status="online"
          />
        ))}
      </div>
    </div>
  );
};
