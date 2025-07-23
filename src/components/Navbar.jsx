import { Home, BookOpen, Cookie, Music, Edit3, Info } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 shadow-md px-6">
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
                <a className="flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Music
                </a>
              </Link>
            </li>
            {/* Maybe only render this for logged in users? */}
            {/* <li>
              <a className="flex items-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Journal
              </a>
            </li> */}
            <li>
              <a className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
