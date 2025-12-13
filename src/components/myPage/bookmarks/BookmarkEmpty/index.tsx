// src/components/myPage/bookmarks/BookmarkEmpty/index.tsx

import CautionIcon from "@/assets/icons/CautionIcon";
import styles from "./styles.module.css";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import Text from "@/components/common/Text";
import Flex from "@/components/common/Flex";

interface BookmarkEmptyProps {
  title: string;
  description: React.ReactNode;
  url?: string;
  buttonText?: string;
}

export default function BookmarkEmpty({
  title,
  description,
  url,
  buttonText,
}: BookmarkEmptyProps) {
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
        <Text typography="head4_sb_20" color="black" as="h3">
          {title}
        </Text>
        <Text typography="body2_r_14" color="neutral-30">
          {description}
        </Text>
      </Flex>
      {url && (
        <Button
          variant="secondary"
          size="medium"
          onClick={() => router.push(url)}
          icon={<ChevronRightIcon />}
        >
          {buttonText}
        </Button>
      )}
    </Flex>
  );
}
