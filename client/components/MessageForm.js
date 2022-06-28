import Image from "next/image";
import { useContext } from "react";

import { DiscordContext } from "../context/context";
import styles from "../styles/MessageForm.module.css";
import plusFilled from "../assets/icons/plus-filled.svg";
import gift from "../assets/icons/gift.svg";
import gif from "../assets/icons/gif.svg";
import sticker from "../assets/icons/sticker.svg";
import smiley from "../assets/icons/smiley.svg";

export const MessageForm = () => {
  const {
    messageText,
    setMessageText,
    placeHolder,
    roomName,
    gun,
    currentAccount,
    currentUser,
  } = useContext(DiscordContext);

  const sendMessage = (event) => {
    event.preventDefault();
    if (messageText.trim() === "") return;

    const messageRef = gun.get(roomName)

    const newMessage = {
      sender: currentUser.name,
      avatar: currentUser.avatar ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU",
      content: messageText.trim(),
      createdAt: Date().substring(4, 11),
      messageId: Date.now(),
    }

    messageRef.set(newMessage)
    setMessageText('')
  };

  return (
    <form className={styles.chatInputContainer} onSubmit={(e) => sendMessage(e)}>
      <div className={styles.chatInputWrapper}>
        <div className={styles.svgContainer}>
          <Image
            height={25}
            width={25}
            src={plusFilled}
            alt="plus-filled"
            className={styles.svg}
          />
        </div>
        <input
          type="text"
          className={styles.chatInput}
          value={messageText}
          disabled={currentAccount.name}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={placeHolder}
        />
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gift} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gif} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={sticker} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={smiley} className={styles.svg} />
        </div>
      </div>
    </form>
  );
};
