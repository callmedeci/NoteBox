export default function Footer({ children }) {
  return (
    <footer className="w-full flex items-center justify-between p-5 absolute bottom-0">
      {children}
    </footer>
  );
}
