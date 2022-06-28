import Image from "next/image";
import styles from "../styles/MessageCard.module.css";

export const MessageCard = ({ avatar, sender, timestamp, content }) => {
  return (
    <div className={styles.messageCard}>
      {/* Avatar */}
      <div className={styles.messageAvatarContainer}>
        <Image
          height={48}
          width={48}
          className={styles.messageAvatar}
          src={avatar}
          alt={sender}
        />
      </div>

      {/* Message Content */}
      <div>
        <div className={styles.messageDetails}>
          <p className={styles.sender}>{sender}</p>
          <small className={styles.timestamp}>{timestamp}</small>
        </div>
        <p className={styles.messageText}>{content}</p>
      </div>
    </div>
  );
};
