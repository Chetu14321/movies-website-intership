import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user info
        const userRes = await axios.get("/api/auth/verify", {
          withCredentials: true,
        });
        const currentUser = userRes.data.user;
        setUser(currentUser);

        // Get watchlist
        const watchlistRes = await axios.get("/api/watchlist", {
          withCredentials: true,
        });
        setWatchlist(watchlistRes.data.watchlist || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`/api/watchlist/remove/${movieId}`, {
        withCredentials: true,
      });
      setWatchlist((prev) => prev.filter((item) => item.movie._id !== movieId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove movie from watchlist");
    }
  };

  if (!user) {
    return <p className="text-center mt-5">Loading your dashboard...</p>;
  }

  return (
    <div className="container py-5">
      {/* Welcome Section */}
      <div className="row mb-5">
        <div className="col text-center">
          <h2 className="text-primary mb-1">Welcome, {user.name}!</h2>
          <p className="text-muted">{user.email}</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded-4 border-0 bg-light">
            <h5 className="text-center text-secondary mb-3">User Information</h5>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Mobile:</strong> {user.mobile}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="row justify-content-center">
        <div className="col-12">
          <h5 className="text-secondary mb-3">My Watchlist</h5>
          {watchlist.length === 0 ? (
            <p>You have no movies in your watchlist.</p>
          ) : (
            <div className="row g-4">
              {watchlist.map((item) => (
                <div key={item._id} className="col-sm-6 col-md-4 col-lg-3">
                  <div className="card shadow-sm h-100">
                    <img
                      src={item.movie.thumbnailUrl}
                      className="card-img-top"
                      alt={item.movie.title}
                      style={{ cursor: "pointer", height: "250px", objectFit: "cover" }}
                      onClick={() => navigate(`/movies/${item.movie._id}`)}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6
                        className="card-title text-truncate"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/movies/${item.movie._id}`)}
                      >
                        {item.movie.title}
                      </h6>
                      <button
                        className="btn btn-sm btn-danger mt-auto"
                        onClick={() => removeFromWatchlist(item.movie._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
