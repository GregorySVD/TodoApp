import "./CloseModalBtn";

interface Props {
  onClick: () => void;
}

export const CloseModalBtn = (props: Props) => {
  return (
    <>
      <button className="modal-close-btn" onClick={props.onClick}>
        <i className="fa fa-close"></i>
      </button>
    </>
  );
};
