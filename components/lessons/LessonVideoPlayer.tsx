'use client';

import { HiOutlinePlay } from 'react-icons/hi';

interface LessonVideoPlayerProps {
  videoUrl?: string;
}

export function LessonVideoPlayer({ videoUrl }: LessonVideoPlayerProps) {
  return (
    <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-gray-900 shadow-lg">
      {videoUrl ? (
        <iframe
          src={videoUrl}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <HiOutlinePlay className="mx-auto h-16 w-16 text-gray-400" />
            <p className="mt-2 text-gray-400">Video content coming soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
