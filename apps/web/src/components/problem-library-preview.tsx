"use client";

import {useQuery} from '@tanstack/react-query';
import {apiClient} from '../lib/api-client';

export const ProblemLibraryPreview = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['problems'],
    queryFn: () => apiClient.listProblems()
  });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading problems…</p>;
  }

  if (!data || !Array.isArray(data)) {
    return <p className="text-sm text-slate-500">Problems will appear here soon.</p>;
  }

  return (
    <ul className="space-y-3">
      {data.slice(0, 3).map((problem: any) => (
        <li key={problem.id} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-slate-800">{problem.title}</p>
            <span className="text-xs uppercase tracking-wide text-slate-500">{problem.difficulty}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{problem.tags?.join(', ')}</p>
        </li>
      ))}
    </ul>
  );
};
