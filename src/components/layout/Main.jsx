import PropTypes from "prop-types";

export default function Main({ children }) {
  return <main className="p-5 w-full h-full mb-20">{children}</main>;
}

Main.propTypes = {
  children: PropTypes.object,
};
