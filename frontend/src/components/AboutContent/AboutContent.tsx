import "./AboutContent.css";
import { useTheme } from "../../context/ThemeContext";
import { AboutProjectFeature } from "../AboutProjectFeature/AboutProjectFeature";
import { CloseModalBtn } from "../common/CloseModalBtn/CloseModalBtn";

interface Props {
  onClick: () => void;
}

export const AboutContent = (props: Props) => {
  const { darkTheme } = useTheme();

  return (
    <div className="nav_about">
      <div className="overlay" onClick={props.onClick}></div>
      <div className={darkTheme ? "about-content dark-theme" : "about-content"}>
        <CloseModalBtn onClick={props.onClick} />
        <h2 className="about-content-header">TodoApp - About Project</h2>
        <p className="about-content-description">
          TodoApp is a simple task manager written as a project to train my developer skills in Typscript, React,
          Express and SQL database. The application allows users to add, delete, edit, and mark tasks as completed.
        </p>
        <h3 className="about-content-features">
          <i className="fa fa-gears"></i> Features{" "}
        </h3>
        <div className="about-content-feature_list">
          <AboutProjectFeature
            alt="Adding Tasks"
            src="https://img.icons8.com/?size=100&id=102544&format=png&color=000000"
            header="Adding Tasks"
            subheader="Users can add new tasks by specifying their titles"
          />
          <AboutProjectFeature
            alt="Removing Tasks"
            src="https://img.icons8.com/?size=100&id=102550&format=png&color=000000"
            header="Removing Tasks"
            subheader="Tasks can be deleted, allowing for cleaning up the task list"
          />
          <AboutProjectFeature
            alt="Editing Tasks"
            src="https://img.icons8.com/?size=100&id=12085&format=png&color=000000"
            header="Editing Tasks"
            subheader="Existing tasks can be edited by changing their titles"
          />
          <AboutProjectFeature
            alt="Compliting Tasks"
            src="https://img.icons8.com/?size=100&id=h9ISmq78f1lA&format=png&color=000000"
            header="Compliting Tasks"
            subheader="Users can mark tasks as completed, facilitating progress tracking"
          />
          <AboutProjectFeature
            alt="Theme Changer"
            src="https://img.icons8.com/?size=100&id=59484&format=png&color=000000"
            header="Theme Changer"
            subheader="Users can choose between a dark or light version for a personalized interface"
          />
          <AboutProjectFeature
            alt="Toast notification"
            src="https://img.icons8.com/?size=100&id=13717&format=png&color=000000"
            header="Toast notification"
            subheader="Users receive real-time feedback and updates about their actions, enhancing the
            interactive experience"
          />
        </div>
      </div>
    </div>
  );
};
