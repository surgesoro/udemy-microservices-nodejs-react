import Link from "next/link";

export default ({ currentUser }) => {
  //helper to organize conditional links,
  //if currentUser = null then show Sign Up and Sign In
  //if currentUser <> null then show Sign Out
  //Reminder: The logical AND ( && ) operator (logical conjunction)
  //          for a set of Boolean operands will be true if
  //          and only if all the operands are true . Otherwise it will be false .
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">GetTix</a>
      </Link>
      <div className="d-flex justify-context-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
