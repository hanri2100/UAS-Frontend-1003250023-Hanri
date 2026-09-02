import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1. State Penampung Data Film dari API (Tahap 3)
  const [movies, setMovies] = useState([]);
  
  // 2. State Indikator Loading (Tahap 3)
  const [loading, setLoading] = useState(true);
  
  // 3. State Kata Kunci Pencarian (Tahap 2)
  const [searchTerm, setSearchTerm] = useState("");

  // TAHAP 3: Integrasi API Menggunakan useEffect
  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch("https://api.sampleapis.com/movies/classic");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []); // [] memastikan fetch hanya dieksekusi 1 kali saat inisialisasi

  // TAHAP 2: Handler Perubahan Input Pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // TAHAP 2: Logika Filter Pencarian (Case-Insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>🎬 CinemaKampus</h1>
        <input
          type="text"
          placeholder="Cari film kesukaanmu..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      {/* Indikator Loading */}
      {loading && <div className="loading">Loading...</div>}

      {/* Grid Daftar Film */}
      {!loading && (
        <div className="movie-grid">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={movie.posterURL || "https://placehold.co/300x450?text=No+Poster"}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src = "https://placehold.co/300x450?text=No+Image";
                  }}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>Tahun: {movie.year || "-"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">
              Film "{searchTerm}" tidak ditemukan.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;