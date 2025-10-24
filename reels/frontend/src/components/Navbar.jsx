import { Link, useNavigate } from 'react-router-dom';

function Navbar({ userEmail, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout?.();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/history" style={styles.link}>History</Link>
        <Link to="/watchlist" style={styles.link}>Watchlist</Link>
      </div>
      <div style={styles.right}>
        {userEmail && <span style={styles.greeting}>Hello, {userEmail}</span>}
        <button onClick={handleLogout} style={styles.button}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    background: '#222',
    color: '#fff',
  },
  left: {
    display: 'flex',
    gap: '1rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  greeting: {
    fontWeight: 'bold',
  },
  button: {
    background: '#444',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
};

export default Navbar;
