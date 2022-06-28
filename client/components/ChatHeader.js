import Image from "next/image";
import { useContext } from "react";

import styles from "../styles/ChatHeader.module.css";
import at from "../assets/icons/at.svg";
import eth from "../assets/eth.png";
import phone from "../assets/icons/phone.svg";
import video from "../assets/icons/video.svg";
import pin from "../assets/icons/pin.svg";
import person from "../assets/icons/person-plus.svg";
import inbox from "../assets/icons/inbox.svg"
import help from "../assets/icons/help.svg"
import { DiscordContext } from "../context/context";

export default function ChatHeader() {
  const { roomName, currentAccount, connectWallet } = useContext(DiscordContext)

  return (
    <div className={styles.chatHeader}>
      <div className={styles.roomNameContainer}>
        <Image height={20} width={20} src={at} className={styles.svg} alt="" />
        <h3 className={styles.title}>{roomName}</h3>
        <div className={styles.chatHeaderStatus} id="online" />
      </div>

      {currentAccount ? (
        <div className={styles.connectWallet}>
          <Image height={20} width={20} src={eth} alt="ethLogo" />
          <span className={styles.separator}>|</span>
          {currentAccount.slice(0, 6)}...{currentAccount.slice(25)}
        </div>
      ) : (
        <div className={styles.connectWallet} onClick={() => connectWallet()}>
          Connect Wallet
        </div>
      )}

      <div className={styles.headerIconsContainer}>
        <div className={styles.headerItem}>
          <Image height={25} width={25} src={phone} alt="" className={styles.svg} />
        </div>
        <div className={styles.headerItem}>
          <Image height={25} width={25} src={video} alt="" className={styles.svg} />
        </div>
        <div className={styles.headerItem}>
          <Image height={25} width={25} src={pin} alt="" className={styles.svg} />
        </div>
        <div className={styles.headerItem}>
          <Image height={25} width={25} src={person} alt="" className={styles.svg} />
        </div>
        <div className={styles.headerItem}>
          <input type='search' placeholder='Search' />
        </div>
        <div className={styles.headerItem}>
          <Image
            height={25}
            width={25}
            src={inbox}
            className={styles.svg}
            alt=''
          />
        </div>
        <div className={styles.headerItem}>
          <Image
            height={25}
            width={25}
            src={help}
            className={styles.svg}
            alt=''
          />
        </div>
      </div>
    </div>
  );
};
