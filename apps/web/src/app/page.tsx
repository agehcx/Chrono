
'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Flame,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users
} from 'lucide-react';
import {motion, type Transition, type Variants} from 'framer-motion';
import {Badge, Button, Card} from '@code-arena/ui';
import {LeaderboardPreview} from '../components/leaderboard-preview';
import {ProblemLibraryPreview} from '../components/problem-library-preview';
import {SiteHeader} from '../components/site-header';
import {AppFooter} from '../components/app-footer';
import {LoginButton} from '../components/login-button';

const fadeUp: Variants = {
  hidden: {opacity: 0, y: 36},
  visible: {opacity: 1, y: 0, transition: {duration: 0.65, ease: 'easeOut'}}
};

const fadeIn: Variants = {
  hidden: {opacity: 0},
  visible: {opacity: 1, transition: {duration: 0.6, ease: 'easeOut'}}
};

const stagger: Variants = {
  hidden: {},
  visible: {transition: {staggerChildren: 0.12, delayChildren: 0.15}}
};

const floatTransition: Transition = {duration: 14, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror'};

const partnerLogos = ['SCB 10X', 'Sea Labs', 'Bitkub', 'True Digital', 'Digital Economy', 'AWS Activate'];

export default function HomePage() {
  const stats = [
    {label: 'Verified competitors', value: '5,000+', accent: 'text-emerald-300'},
    {label: 'Match completions', value: '32k', accent: 'text-sky-300'},
    {label: 'Career introductions', value: '1,200', accent: 'text-indigo-300'}
  ];

  const pillars = [
    {
      title: 'Proof of Personhood',
      description: 'World ID verification ensures every rank and reward is Sybil-resistant.',
      icon: ShieldCheck
    },
    {
      title: 'Nationwide Arena',
      description: 'Host solo drills or real-time PvP clashes with players across Thailand.',
      icon: Users
    },
    {
      title: 'Talent Passports',
      description: 'Match-ready profiles and problem history employers can trust instantly.',
      icon: Flame
    }
  ];

  const timeline = [
    {
      label: 'Phase 1 · Now',
      title: 'Solo challenges & verified leaderboards',
      body: 'Practice mode, streak tracking, and foundational analytics to showcase consistency.'
    },
    {
      label: 'Phase 2 · Quarter 1, 2026',
      title: 'Clash of Code tournaments',
      body: 'Ranked PvP brackets with live commentary, match replays, and spot offers from partners.'
    },
    {
      label: 'Phase 3 · Mid 2026',
      title: 'Career launch week',
      body: 'Partner showcases, curated hiring sprints, and mentor-led office hours for finalists.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{backgroundPosition: ['0% 0%', '70% 70%', '0% 0%']}}
        transition={{duration: 35, repeat: Infinity, ease: 'linear'}}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(56, 189, 248, 0.25), transparent 50%), linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(3,7,18,0.8) 60%, rgba(2,6,23,1) 100%)'
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.12)_0%,transparent_60%)]"
        animate={{opacity: [0.35, 0.55, 0.35]}}
        transition={{duration: 18, repeat: Infinity, repeatType: 'mirror'}}
      />
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
        animate={{y: [0, -30, 20, 0], x: [0, 20, -10, 0], opacity: [0.4, 0.6, 0.4]}}
        transition={floatTransition}
      />
      <motion.div
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl"
        animate={{y: [0, 40, -30, 0], opacity: [0.35, 0.55, 0.35]}}
        transition={{...floatTransition, duration: 18}}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-24 px-4 pb-24 pt-16">
        <motion.section
          id="hero"
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div className="space-y-10">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200 backdrop-blur"
            >
              <Sparkles className="h-4 w-4" /> Verified by World ID · Fair for Everyone
            </motion.span>
            <motion.div className="space-y-6" variants={fadeUp}>
              <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Thailand&apos;s proving ground for unstoppable developers.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                Build your Arena rating through solo drills and real-time clashes. Every match is human-verified, every badge is earned, and every leaderboard tells a story recruiters can trust.
              </p>
            </motion.div>
            <motion.div className="flex flex-wrap items-center gap-4" variants={fadeUp}>
              <motion.div whileHover={{scale: 1.03}} whileTap={{scale: 0.98}}>
                <LoginButton />
              </motion.div>
              <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                <Button asChild variant="ghost" className="border border-slate-700/70 bg-slate-900/60 text-slate-100">
                  <Link href="#play" className="inline-flex items-center gap-2">
                    Watch how matchmaking works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div className="grid w-full gap-4 sm:grid-cols-3" variants={stagger}>
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{y: -6, borderColor: 'rgba(148, 163, 184, 0.4)'}}
                  transition={{type: 'spring', stiffness: 220, damping: 18}}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200 backdrop-blur"
                >
                  <p className={`text-2xl font-semibold ${item.accent}`}>{item.value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="relative">
            <motion.div
              className="pointer-events-none absolute -inset-6 rounded-[32px] border border-white/5 bg-white/5/20 blur-3xl"
              animate={{opacity: [0.35, 0.55, 0.35]}}
              transition={{duration: 12, repeat: Infinity, repeatType: 'mirror'}}
            />
            <Card className="glass-card relative overflow-hidden">
              <motion.div
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"
                animate={{rotate: [0, 7, -4, 0], scale: [1, 1.08, 1]}}
                transition={{duration: 18, repeat: Infinity, repeatType: 'mirror'}}
              />
              <motion.div
                className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-sky-500/25 blur-3xl"
                animate={{rotate: [0, -6, 5, 0], scale: [1, 1.04, 1]}}
                transition={{duration: 16, repeat: Infinity, repeatType: 'mirror'}}
              />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Live Arena Snapshot</h2>
                  <Badge tone="success" className="uppercase tracking-wide">Online</Badge>
                </div>
                <LeaderboardPreview />
                <motion.div
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100"
                  animate={{borderColor: ['rgba(16, 185, 129, 0.35)', 'rgba(129, 140, 248, 0.35)', 'rgba(16, 185, 129, 0.35)']}}
                  transition={{duration: 10, repeat: Infinity}}
                >
                  Next match invite sent to verified players. Ready up within <span className="font-semibold">00:45</span>.
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section
          id="partners"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">Trusted launch partners</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Community-backed, industry verified</h2>
            </div>
            <motion.div whileHover={{scale: 1.02}} className="inline-flex items-center gap-2 text-sm text-slate-300">
              <span>View partner programme</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
          <div className="relative mt-8 overflow-hidden">
            <motion.div
              className="flex min-w-full gap-12 py-2 text-sm uppercase tracking-[0.3em] text-slate-400"
              animate={{x: ['0%', '-50%']}}
              transition={{duration: 30, repeat: Infinity, ease: 'linear'}}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <span key={`${logo}-${index}`} className="whitespace-nowrap text-slate-300/80">
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="play"
          className="relative grid gap-8 rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-10 backdrop-blur md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          variants={stagger}
        >
          {pillars.map(({title, description, icon: Icon}) => (
            <motion.article
              key={title}
              variants={fadeUp}
              whileHover={{y: -10, rotate: -0.5}}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-[0_20px_60px_-40px_rgba(15,118,110,0.7)]"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <Icon className="h-3.5 w-3.5 text-emerald-300" />
                {title}
              </div>
              <p className="mt-4 text-sm text-slate-300">{description}</p>
            </motion.article>
          ))}
        </motion.section>

        <motion.section
          id="learn-more"
          className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.25}}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Card
              className="glass-card text-slate-100"
              heading={<span className="flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-300" />Season one impact</span>}
            >
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-4 w-4 text-emerald-300" />
                  Verified fair play across every leaderboard entry.
                </li>
                <li className="flex items-start gap-3">
                  <Users className="mt-1 h-4 w-4 text-sky-300" />
                  Spotlight stories from underserved regions entering the tech arena.
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="mt-1 h-4 w-4 text-indigo-300" />
                  Five hiring partners onboarding Code Arena leaderboards as screening signal.
                </li>
              </ul>
              <motion.div className="mt-6" whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                <Button asChild>
                  <Link href="#impact" className="inline-flex items-center gap-2">
                    Explore success stories
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </Card>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Card className="glass-card" heading="Featured challenges">
              <ProblemLibraryPreview />
              <motion.div
                className="mt-6 rounded-xl border border-slate-700/60 bg-slate-900/70 p-4 text-sm text-slate-400"
                animate={{borderColor: ['rgba(30, 64, 175, 0.35)', 'rgba(16, 185, 129, 0.35)', 'rgba(30, 64, 175, 0.35)']}}
                transition={{duration: 12, repeat: Infinity}}
              >
                Rotating pools ensure fresh problems every week—from algorithmic puzzles to data-ops sprints.
              </motion.div>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section
          id="impact"
          className="bg-grid-slate relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-12 backdrop-blur"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.2}}
          variants={stagger}
        >
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-[-10%] w-1 bg-gradient-to-b from-emerald-400/0 via-emerald-400/40 to-emerald-400/0"
            animate={{opacity: [0.2, 0.5, 0.2]}}
            transition={{duration: 14, repeat: Infinity, repeatType: 'mirror'}}
          />
          <div className="relative z-10 grid gap-12 md:grid-cols-[0.45fr_0.55fr]">
            <motion.div variants={fadeUp} className="space-y-6">
              <h2 className="text-3xl font-semibold text-white">Built for social mobility</h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Code Arena is a mobility engine: we bring underrepresented talent into the national spotlight with fair gameplay, localized onboarding, and trusted credentials that travel beyond the arena.
              </p>
              <div className="space-y-4 text-sm text-slate-300">
                <motion.div
                  className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4"
                  whileHover={{y: -6}}
                  transition={{type: 'spring', stiffness: 220, damping: 18}}
                >
                  <p className="font-semibold text-emerald-200">Community satellites</p>
                  <p>Campus and community hubs host viewing parties, technical workshops, and mentor nights in Thai & local dialects.</p>
                </motion.div>
                <motion.div
                  className="rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-4"
                  whileHover={{y: -6}}
                  transition={{type: 'spring', stiffness: 220, damping: 18}}
                >
                  <p className="font-semibold text-indigo-200">Trusted signals</p>
                  <p>Companies plug into verified rankings and replay archives to spot diamonds in the rough faster than ever.</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div variants={stagger} className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-200"
                >
                  <motion.div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"
                    animate={{opacity: [0.3, 0.65, 0.3]}}
                    transition={{duration: 8, delay: index * 0.4, repeat: Infinity, repeatType: 'mirror'}}
                  />
                  <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="roadmap"
          className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 via-slate-900 to-slate-950 p-10 text-slate-100 shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.25}}
          variants={fadeUp}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_60%)]"
            animate={{opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1]}}
            transition={{duration: 16, repeat: Infinity, repeatType: 'mirror'}}
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
              Ready to spar?
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">Claim your verified arena pass today.</h2>
            <p className="max-w-xl text-sm text-slate-200">
              Plug into a national stage where skill speaks louder than background. One identity, one account, and endless chances to prove what you can build.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97}}>
                <LoginButton />
              </motion.div>
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.97}}>
                <Button asChild variant="ghost" className="border border-white/30 bg-white/10 text-white">
                  <Link href="#partners" className="inline-flex items-center gap-2">
                    Become a partner
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <AppFooter />
    </div>
  );
}
