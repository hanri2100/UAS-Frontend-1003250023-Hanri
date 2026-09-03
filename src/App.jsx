import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  // TODO: TAHAP 2 - Buat state untuk search input di sini
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: TAHAP 3 - Hapus dummyData dan ambil dari API
  useEffect(() => {
    setLoading(true);

    fetch("https://api.sampleapis.com/movies/classic")
      .then((response) => {
        if (!response.ok) {
          console.error("Gagal mengambil data film");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    // TODO: TAHAP 2 - Lengkapi logika filter pencarian di sini
    // Saat diketik, list 'movies' harus berubah sesuai kata kunci
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="app-container">
      <header>
        <h1> CinemaKampus</h1>
        <input
          type="text"
          placeholder="Cari film kesukaanmu..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>
      {loading && <div className="loading">Sedang memuat data...</div>}
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={
                movie.posterURL ||
                "https://placehold.co/300x450?text=Poster+Tidak+Tersedia"
              }
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/300x450?text=Poster+Tidak+Tersedia";
              }}
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.year || "Tahun tidak tersedia"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
