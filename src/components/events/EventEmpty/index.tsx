// src/components/events/EventEmpty/index.tsx

import CautionIcon from "@/assets/icons/CautionIcon";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";

interface EventEmptyProps {
  title: string;
  url: string;
}

export default function EventEmpty({ title, url }: EventEmptyProps) {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap={1}
      className={styles.container}
    >
      <Flex direction="column" align="center" gap={0.5}>
        <CautionIcon color="var(--Primary-normal)" />
        <Text typography="sub2_m_18" color="neutral-30">
          {title}에 등록된 행사가 없어요
        </Text>
      </Flex>
      <Button
        variant="secondary"
        size="medium"
        onClick={() => router.push(url)}
        icon={<ChevronRightIcon />}
      >
        행사 등록하기
      </Button>
    </Flex>
  );
}
