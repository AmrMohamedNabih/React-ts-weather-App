import { useTheme } from "@/context/them-provider";
import { Link } from "react-router-dom";

function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95  backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img src="/webImages/logo.png" alt="Weather" className="h-14"></img>
        </Link>
        <div
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            isDark ? "rotate-180" : "rotate-0"
          }`}
        >
          <img
            src={isDark ? "/webImages/sun.png" : "/webImages/moon.png"}
            className="h-10"
          ></img>
        </div>
      </div>
    </header>
  );
}
export default Header;
