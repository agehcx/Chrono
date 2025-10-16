"use client";

import {useQuery} from '@tanstack/react-query';
import {apiClient, type LeaderboardEntry} from '../lib/api-client';
import {Badge} from '@code-arena/ui';

export const LeaderboardPreview = () => {
  const {data, isLoading} = useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard'],
    queryFn: () => apiClient.getLeaderboard()
  });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading leaderboard…</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-slate-500">No data available yet.</p>;
  }

  return (
    <div className="space-y-3">
      {data.slice(0, 3).map((entry) => {
        const displayName = entry.displayName || 'Anonymous competitor';
        return (
          <div key={entry.userId} className="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3">
            <div>
              <p className="font-semibold text-slate-800">{displayName}</p>
              <p className="text-xs text-slate-500">Rating {entry.rating}</p>
            </div>
            <Badge tone="success">#{entry.rank}</Badge>
          </div>
        );
      })}
    </div>
  );
};
