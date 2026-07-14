import React from 'react';

export default function YouTubeEmbed({ videoId, title = 'YouTube Video' }) {
  if (!videoId) {
    return (
      <div className="w-full bg-soft-off-white rounded-lg flex items-center justify-center aspect-video">
        <p className="text-text-dark-gray">YouTube video not configured.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <iframe
        width="100%"
        height="600"
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full aspect-video"
      />
    </div>
  );
}
