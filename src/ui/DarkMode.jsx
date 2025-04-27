import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../Context/DarkModeContext";
import { HiOutlineLightBulb } from "react-icons/hi2";

export default function DarkMode() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
