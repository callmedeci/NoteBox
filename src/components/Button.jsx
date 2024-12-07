import PropTypes from "prop-types";

export function Button({
  text,
  width = "max-content",
  height = "max-content",
  padding = "0px",
  borderRadius = "12px",
  color = "text-rose-600 hover:text-rose-800",
  bgColor = "",
  icon = "",
  onClick,
  disabled,
}) {
  const buttonStyle = {
    width,
    height,
    padding,
    borderRadius,
    backgroundColor: bgColor,
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{ ...buttonStyle }}
      className={`shadow font-open-sans-semibold flex items-center justify-center
        bg-zinc-900/50 transition-all duration-300
        disabled:placeholder:text-zinc-600 disabled:opacity-50
        ${color}`}
    >
      {text && <span>{text}</span>}
      {icon && <span>{icon}</span>}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  bgColor: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
