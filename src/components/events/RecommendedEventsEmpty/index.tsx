// src/components/events/RecommendedEventsEmpty/index.tsx

import CautionIcon from "@/assets/icons/CautionIcon";
import Flex from "@/components/common/Flex";
import Text from "@/components/common/Text";
import styles from "./styles.module.css";

export default function RecommendedEventsEmpty() {
  return (
    <Flex direction="column" className={styles.container}>
      <Flex direction="column" align="center" gap="0.5rem">
        <CautionIcon color="var(--Neutral-80)" />
        <Text typography="sub2_m_18" color="neutral-30">
          추천할 행사가 없습니다.
        </Text>
      </Flex>
    </Flex>
  );
}
