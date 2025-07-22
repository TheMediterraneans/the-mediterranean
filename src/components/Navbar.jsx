function Navbar() {
    return (
        <>
<nav className="navbar bg-base-100">
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>Recipes</a></li>
      <li><a>Music</a></li>
      <li><a>Journal</a></li>
      <li><a>About</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    {/* optional extras */}
  </div>
</nav>

        <title>Add something</title>
        </>
    )
}

export default Navbar;