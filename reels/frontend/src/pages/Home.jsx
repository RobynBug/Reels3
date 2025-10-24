import { useState } from 'react';

function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResults([]);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/content/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Search failed');
        return;
      }

      setResults(data);
    } catch {
      setError('Something went wrong');
    }
  };

  const handleAddToWatchlist = async (item) => {
    const token = localStorage.getItem('token');
    await fetch('/api/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(item),
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ReelRover</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          placeholder="Search movies or shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {results.length > 0 && (
        <div style={styles.grid}>
          {results.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.imageUrl} alt={item.title} style={styles.image} />
              <p>{item.title}</p>
              <button onClick={() => handleAddToWatchlist(item)} style={styles.add}>
                Add to Watchlist
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
    fontSize: '3rem',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  input: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    width: '300px',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
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
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
  },
  add: {
    marginTop: '0.5rem',
    background: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Home;
