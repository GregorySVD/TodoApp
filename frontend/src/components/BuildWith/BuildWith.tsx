import { useTheme } from "src/context/ThemeContext";
import "./BuildWith.css";
import { CloseModalBtn } from "../common/CloseModalBtn/CloseModalBtn";

interface Props {
  onClick: () => void;
}

export const BuildWith = (props: Props) => {
  const { darkTheme } = useTheme();

  return (
    <div className="nav_about">
      <div className="overlay" onClick={props.onClick}></div>
      <div className={darkTheme ? "build-with dark-theme" : "build-with"}>
        <CloseModalBtn onClick={props.onClick} />
        <h3>This project was build with:</h3>
        <div className="build-with-stack-png">
          <img src="https://img.icons8.com/?size=100&id=123603&format=png&color=000000"></img>
          <img src="https://img.icons8.com/?size=100&id=38561&format=png&color=000000"></img>
          <img src="https://img.icons8.com/?size=100&id=SDVmtZ6VBGXt&format=png&color=000000"></img>
          <img src="https://img.icons8.com/?size=100&id=54087&format=png&color=000000"></img>
        </div>
      </div>
    </div>
  );
};
