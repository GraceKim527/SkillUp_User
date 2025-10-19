import React, { useState } from "react";
import { MdOutlineScreenShare, MdComputer, MdEmojiEvents } from "react-icons/md";
import { FiTool } from "react-icons/fi";
import { TbNetwork } from "react-icons/tb";
import { AiOutlineFileText } from "react-icons/ai";
import styles from "./style.module.css";

const menuItems = [
  { icon: <MdOutlineScreenShare size={28} />, label: "컨퍼런스·세미나" },
  { icon: <MdComputer size={28} />, label: "부트캠프" },
  { icon: <FiTool size={28} />, label: "창업·해커톤·공모전" },
  { icon: <TbNetwork size={28} />, label: "네트워킹·멘토링" },
  { icon: <AiOutlineFileText size={28} />, label: "아티클" },
];

export default function IconMenu() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <nav className={styles.iconMenu}>
      <ul>
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={idx === activeIdx ? styles.active : ""}
            onClick={() => setActiveIdx(idx)}
          >
            <div className={styles.iconBox}>{item.icon}</div>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}