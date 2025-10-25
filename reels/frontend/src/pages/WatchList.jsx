import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWatchlist } from '../redux/watchlistSlice';

function Watchlist() {
    console.log('Watchlist component mounted');

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.watchlist);

  useEffect(() => {
    console.log('Dispatching fetchWatchlist');
    dispatch(fetchWatchlist());
  }, [dispatch]);

  console.log('Watchlist status:', status);
  console.log('Watchlist items:', items);

  const handleRemove = async (tmdbId) => {
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/watchlist/${tmdbId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    dispatch(fetchWatchlist()); // ✅ refresh the list
  } catch (err) {
    console.error('Failed to remove item:', err);
  }
};


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Watchlist</h2>

      {status === 'loading' && <p style={styles.message}>Loading...</p>}
      {status === 'failed' && <p style={styles.message}>Failed to load your watchlist.</p>}
      {status === 'succeeded' && items.length === 0 && (
        <p style={styles.message}>Your watchlist is empty. Start adding some favorites!</p>
      )}

      {status === 'succeeded' && items.length > 0 && (
  <div style={styles.grid}>
    {items.map((item) => (
     <div key={item.id || item.tmdbId} style={styles.card}>
  <img
    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
    alt={item.title}
    style={styles.image}
  />
  <p>{item.title}</p>
  <button onClick={() => handleRemove(item.id || item.tmdbId)} style={styles.remove}>
    Remove
  </button>
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
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1rem',
    color: '#555',
    marginTop: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  card: {
    border: '1px solid #ccc',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    overflow: 'hidden', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%', 
    height: 'auto',
    maxWidth: '200px', 
    borderRadius: '4px',
    objectFit: 'cover',
  },
  remove: {
  marginTop: '0.5rem',
  background: '#e74c3c',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
}
};

export default Watchlist;
