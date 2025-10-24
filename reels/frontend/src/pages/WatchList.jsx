import { useEffect, useState } from 'react';

function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = () => {
    const token = localStorage.getItem('token');
    fetch('/api/watchlist', {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/watchlist/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    fetchWatchlist();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Watchlist</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p style={styles.empty}>No items on your watchlist</p>
      ) : (
        <div style={styles.grid}>
          {items.map(item => (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageWrapper}>
                <img src={item.imageUrl} alt={item.title} style={styles.image} />
              </div>
              <p>{item.title}</p>
              <button onClick={() => handleDelete(item.id)} style={styles.delete}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
  },
  empty: {
    fontSize: '1.2rem',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: '4px',
  },
  image: {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease',
  },
  delete: {
    marginTop: '0.5rem',
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Add hover