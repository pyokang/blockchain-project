import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/DmCard.module.css";

export const DmCard = ({ id, name, avatar, status }) => {
  const router = useRouter();

  const changeUrl = () => router.push(`?conversation=${id}&name=${name}`);

  return (
    <div className={styles.dmCard} onClick={changeUrl}>
      <div className={styles.dmAvatarContainer}>
        <Image
          src={avatar}
          className={styles.dmAvatar}
          height={48}
          width={48}
          alt={name}
        />
        <div className={styles.dmCardStatus} id={status} />
      </div>
      <p className={styles.dmCardName}>{name}</p>
    </div>
  );
};
