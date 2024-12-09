import PropTypes from "prop-types";
import SortModal from "./SortModal";
import UiIcons from "./UiIcons";
import { Button } from "./Button";

export default function Sort({ onSort, isOpen, onToggle }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button
        text="SORT BY"
        icon={UiIcons.sort("size-4 md:size-6")}
        padding="15px"
        borderRadius="100px"
        onClick={onToggle}
      />

      {isOpen && <SortModal onSort={onSort} />}
    </div>
  );
}

Sort.propTypes = {
  onSort: PropTypes.func,
  onToggle: PropTypes.func,
  isOpen: PropTypes.bool,
};
