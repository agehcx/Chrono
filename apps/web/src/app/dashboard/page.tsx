"use client";

import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {useAuth} from '../../hooks/use-auth';
import {Button, Card, Badge} from '@code-arena/ui';
import {apiClient, type SoloMatchResponse} from '../../lib/api-client';
import {useMutation} from '@tanstack/react-query';

export default function DashboardPage() {
  const router = useRouter();
  const {token, user} = useAuth();

  useEffect(() => {
    if (!token) {
      router.replace('/');
    }
  }, [token, router]);

  const soloMatch = useMutation<SoloMatchResponse>({
    mutationFn: () => apiClient.createSoloMatch(token ?? ''),
    onSuccess: (data) => {
      router.push(`/matches/${data.match.id}?mode=solo`);
    }
  });

  if (!token) {
    return null;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-4 py-12">
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">Welcome back</p>
          <h1 className="text-3xl font-bold text-slate-900">
            {(user as any)?.displayName ?? 'Arena Player'}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button size="lg" onClick={() => soloMatch.mutate()} disabled={soloMatch.isPending}>
            {soloMatch.isPending ? 'Preparing...' : 'Start Solo Match'}
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/matches">
              Enter Clash Queue
            </Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-2">
  <Card heading="Rank Summary">
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Rating: {(user as any)?.rating ?? 1200}</li>
            <li>Total solved: {(user as any)?.totalSolved ?? 0}</li>
            <li>Streak: {(user as any)?.streak ?? 0}</li>
          </ul>
        </Card>
  <Card heading="Arena Status" actions={<Badge tone="success">Live</Badge>}>
          <p className="text-sm text-slate-600">
            Queue up for Clash of Code to compete in real-time matches. All players are verified with World ID.
          </p>
        </Card>
      </section>
    </main>
  );
}
