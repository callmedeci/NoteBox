export default function Header({ children }) {
  return (
    <header className="flex justify-between w-full h-max gap-5 px-2 py-5 md:p-5">
      {children}
    </header>
  );
}
