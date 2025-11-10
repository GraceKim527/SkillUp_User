// src/components/myPage/bookmarks/ProfileCard/index.tsx

import styles from "./styles.module.css";
import Image from "next/image";
import ProfileImage from "@/assets/images/logoDefaultImg.png";
import Button from "@/components/common/Button";
import Text from "@/components/common/Text";
import BulletPointIcon from "@/assets/svg/bulletPointIcon.svg";
import Flex from "@/components/common/Flex";

interface ProfileCardProps {
  name: string;
  email: string;
  job: string;
  bookmarkCount: number;
}

export default function ProfileCard({
  name,
  email,
  job,
  bookmarkCount,
}: ProfileCardProps) {
  return (
    <Flex direction="column" gap={1.25} className={styles.card}>
      <Flex direction="column" gap={1}>
        <Flex align="center" gap={0.5} className={styles.header}>
          <div className={styles.headerImage}>
            <Image src={ProfileImage} alt="Profile Image" />
          </div>
          <Flex direction="column">
            <Text typography="sub3_m_16" color="black">
              {name}
            </Text>
            <Text typography="label4_m_12" color="neutral-50">
              {email}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Flex justify="space-between" align="center" className={styles.item}>
            <Text typography="label3_m_14" color="black">
              직무
            </Text>
            <Flex align="center">
              <Image src={BulletPointIcon} alt="Bullet Point Icon" />
              <Text typography="label3_m_14" color="primary-strong">
                {job}
              </Text>
            </Flex>
          </Flex>
          <Flex justify="space-between" align="center" className={styles.item}>
            <Text typography="label3_m_14" color="black">
              찜한 행사
            </Text>
            <Flex align="center">
              <Image src={BulletPointIcon} alt="Bullet Point Icon" />
              <Text typography="label3_m_14" color="primary-strong">
                {bookmarkCount}개
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Button variant="primary" size="large">
        프로필 수정
      </Button>
    </Flex>
  );
}
