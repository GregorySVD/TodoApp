import "./NavBarBtn.css";

interface Props {
  text: string;
  icon: string;
  onClick: () => void;
}

export const NavBarBtn = (props: Props) => {
  return (
    <button className="navbar_btn" onClick={props.onClick}>
      <span>{props.text}</span>
      <div className={`fa fa-${props.icon}`}></div>
    </button>
  );
};
