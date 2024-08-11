import "./AboutProjectFeature.css";

interface Props {
  src: string;
  alt?: string;
  header: string;
  subheader?: string;
}

export const AboutProjectFeature = (props: Props) => {
  return (
    <div className="AboutProjectFeature_container">
      <img src={props.src} alt={props.alt}></img>
      <h3>{props.header}</h3>
      <span>{props.subheader}</span>
    </div>
  );
};
