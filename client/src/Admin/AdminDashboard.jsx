import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [userList, setUserList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    synopsis: "",
    posterUrl: "",
    videoUrl: "",
    thumbnailUrl: "",
    duration: "",
    averageRating: ""
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const usersRes = await axios.get("/api/auth/count");
      const moviesRes = await axios.get("/api/movies/count/total");
      setTotalUsers(usersRes.data.count);
      setTotalMovies(moviesRes.data.totalMovies);
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/auth/getall");
      setUserList(res.data);
      setShowUsers(!showUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("/api/movies/getall");
      setMovieList(res.data);
      setShowMovies(!showMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert cast string to array
      const movieData = {
        ...formData,
        cast: formData.cast.split(",").map(c => c.trim())
      };

      await axios.post("/api/movies/add", movieData);
      alert("Movie added successfully!");
      setShowForm(false);
      fetchCounts();
      setFormData({
        title: "",
        genre: "",
        releaseYear: "",
        director: "",
        cast: "",
        synopsis: "",
        posterUrl: "",
        videoUrl: "",
        thumbnailUrl: "",
        duration: "",
        averageRating: ""
      });
    } catch (err) {
      console.error("Error adding movie:", err);
      alert("Error adding movie.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="row mb-4 text-center">
        <h3 className="display-4 text-danger border-bottom pb-2">Admin Dashboard</h3>
        <p className="lead text-muted">Manage users and movies efficiently.</p>
      </div>

      {/* Stats */}
      <div className="row text-center">
        <div className="col-md-6 mb-4" onClick={fetchUsers} style={{ cursor: "pointer" }}>
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-primary">Total Users</h5>
              <h1 className="display-6">{totalUsers}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4" onClick={fetchMovies} style={{ cursor: "pointer" }}>
          <div className="card shadow border-0">
            <div className="card-body">
              <h5 className="card-title text-success">Total Movies</h5>
              <h2 className="display-6">{totalMovies}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* User List */}
      {showUsers && (
        <div className="row mb-4">
          <div className="col">
            <h4>All Users</h4>
            <ul className="list-group">
              {userList.map(u => (
                <li key={u._id} className="list-group-item">
                  {u.name || u.email || u._id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Movie List */}
      {showMovies && (
        <div className="row mb-4">
          <div className="col">
            <h4>All Movies</h4>
            <ul className="list-group">
              {movieList.map(m => (
                <li key={m._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {m.title} ({m.releaseYear})
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={async () => {
                      await axios.delete(`/api/movies/delete/${m._id}`);
                      setMovieList(movieList.filter(movie => movie._id !== m._id));
                      fetchCounts();
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add Movie Button */}
      <div className="row mt-4">
        <div className="col text-center">
          <button
            className="btn btn-outline-danger btn-lg"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "+ Add New Movie"}
          </button>
        </div>
      </div>

      {/* Add Movie Form */}
      {showForm && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card border-0 shadow">
              <div className="card-body">
                <h4 className="mb-3 text-danger">Add New Movie</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="genre"
                      placeholder="Genre"
                      value={formData.genre}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      name="releaseYear"
                      placeholder="Release Year"
                      value={formData.releaseYear}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="director"
                      placeholder="Director"
                      value={formData.director}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="cast"
                      placeholder="Cast (comma separated)"
                      value={formData.cast}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      name="synopsis"
                      placeholder="Synopsis"
                      value={formData.synopsis}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="posterUrl"
                      placeholder="Poster URL"
                      value={formData.posterUrl}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="videoUrl"
                      placeholder="Video URL"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="thumbnailUrl"
                      placeholder="Thumbnail URL"
                      value={formData.thumbnailUrl}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      name="duration"
                      placeholder="Duration (minutes)"
                      value={formData.duration}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      step="0.1"
                      name="averageRating"
                      placeholder="Average Rating"
                      value={formData.averageRating}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-danger">
                      Add Movie
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
