export default function Header({ children }) {
  return (
    <header className="flex justify-between w-full h-max p-5">
      {children}
    </header>
  );
}
