import PropTypes from "prop-types";
import UiIcons from "../ui/UiIcons";
import { Button } from "../ui/Button";

export default function EditNotesPanel({ onRemove, note }) {
  function handleCopyText() {
    const copiedText = `${note?.title} \n ${note.text}`.trim();
    navigator.clipboard.writeText(copiedText);
  }

  function handleRemoveNote() {
    onRemove(note.id);
  }

  return (
    <div className="bg-zinc-700/50 flex w-44 p-4 rounded-2xl justify-between translate-y-2 shadow">
      <Button
        icon={UiIcons.delete()}
        bgColor="transparent"
        onClick={handleRemoveNote}
      />

      <Button
        icon={UiIcons.copy()}
        bgColor="transparent"
        onClick={handleCopyText}
        color="text-yellow-400  hover:text-yellow-600"
      />

      <Button
        icon={UiIcons.edit()}
        bgColor="transparent"
        onClick={handleCopyText}
        color="text-green-500 hover:text-green-700"
      />
    </div>
  );
}

EditNotesPanel.propTypes = {
  onRemove: PropTypes.func,
  note: PropTypes.object,
};
