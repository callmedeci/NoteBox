import { TypeAnimation } from "react-type-animation";

export default function TypingAnimation() {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to NoteBox",
        1000,
        "Welcome to NoteBox :)",
        10000,
        "Feel free to create notes",
        1000,
        "Feel free to create notes as much as you want",
        1000,
        "Feel free to create notes as much as you want ;)",
      ]}
      wrapper="h1"
      cursor={true}
      speed={250}
      className="text-2xl md:text-4xl 2xl:text-5xl text-zinc-300
       text-center max-w-md"
    />
  );
}
