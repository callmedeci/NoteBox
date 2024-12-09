import UiIcons from "./UiIcons";

export default function Icon() {
  return (
    <div className="flex items-center gap-1">
      {UiIcons.inbox("size-7 md:size-10 text-rose-700")}
      <span className="font-open-sans-semibold text-sm sm:text-base md:text-lg">
        NoteBox
      </span>
    </div>
  );
}
