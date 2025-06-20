import Link from 'next/link';

export default ({ currentUser }) => {
  // Array of links
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href} className="nav-link">
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <Link className="navbar-brand" href="/">
        tickr
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-felx align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
