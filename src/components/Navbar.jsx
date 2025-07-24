import { BookOpen, Cookie, Music, Info } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 shadow-md px-6 fixed top-0 left-0 right-0 z-20">
        <div className="navbar-start">
          <Link to="/" className="normal-case text-4xl flex items-center">
            <Cookie className="w-8 h-8 mr-2 text-primary" />
            Foodlings
          </Link>
          <ul className="menu menu-horizontal px-1 ml-5">
            <li>
              <Link to="/recipe-list/all" className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                All Recipes
              </Link>
            </li>
            <li>
              <Link to="/playlist">
                <span className="flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Music Ideas
                </span>
              </Link>
            </li>
            <li>
              <Link to="/about">
              <a className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About
              </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
