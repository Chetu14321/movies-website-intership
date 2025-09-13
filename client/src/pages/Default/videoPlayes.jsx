import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  return (
    <Box sx={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}

      {error && (
        <Typography sx={{ color: 'error.main', textAlign: 'center', mt: 2 }}>
          Sorry, the video could not be loaded.
        </Typography>
      )}

      <video
        ref={videoRef}
        controls
        onLoadedData={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        style={{ width: '100%', borderRadius: '8px' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoPlayer;
