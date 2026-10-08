"use client";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import Link from "next/link";
import { hubs, topics } from "@/lib/content";
const THEMES = ["blueberry", "mustard", "olive", "black", "white", "pink"];
// Put royalty-free mp3 files in /public/audio and list them here.
const TRACKS = [{ n: "Calm 1", s: "/audio/calm1.mp3" }, { n: "Calm 2", s: "/audio/calm2.mp3" }, { n: "Calm 3", s: "/audio/calm3.mp3" }];
export function Header() {
    const [t, setT] = useState("blueberry");
    const [on, setOn] = useState(false);
    const [v, setV] = useState(0.4);
    const [i, setI] = useState(0);
    const h = useRef(null);
    useEffect(() => { const s = localStorage.getItem("theme"); if (s) {
        setT(s);
        document.documentElement.dataset.theme = s;
    } }, []);
    useEffect(() => { h.current?.unload(); h.current = new Howl({ src: [TRACKS[i].s], loop: true, volume: v, html5: true }); if (on)
        h.current.play(); return () => { h.current?.unload(); }; }, [i]);
    useEffect(() => { h.current?.volume(v); }, [v]);
    const toggle = () => { if (!h.current)
        return; on ? h.current.pause() : h.current.play(); setOn(!on); };
    const pick = (x) => { setT(x); document.documentElement.dataset.theme = x; localStorage.setItem("theme", x); };
    return <header className="sticky top-0 z-40 flex flex-wrap items-center gap-3 border-b border-line bg-panel/90 px-4 py-2 text-sm backdrop-blur">
  <Link href="/" className="font-bold text-accent">AmbientLearn</Link>
  <Link href="/resources">Resources</Link><Link href="/onboarding">My roadmap</Link><Link href="/dashboard">Dashboard</Link><Link href="/login">Login</Link>
  <div className="ml-auto flex flex-wrap items-center gap-2">
   <button onClick={toggle} className="rounded border border-line px-2">{on ? "⏸" : "▶"}</button>
   <select value={i} onChange={e => setI(+e.target.value)} className="rounded border border-line bg-panel">{TRACKS.map((x, k) => <option key={k} value={k}>{x.n}</option>)}</select>
   <input type="range" min={0} max={1} step={0.05} value={v} onChange={e => setV(+e.target.value)} aria-label="Volume"/>
   {THEMES.map(x => <button key={x} onClick={() => pick(x)} title={x} aria-label={x} className={`h-5 w-5 rounded-full border-2 ${t === x ? "border-ink" : "border-line"}`} style={{ background: { blueberry: "#4b3fbf", mustard: "#d9a521", olive: "#5b6b21", black: "#000", white: "#fff", pink: "#f4a6c0" }[x] }}/>)}
  </div></header>;
}
export function Footer() {
    const slug = { "Programming Languages": "python", "Robotics": "robotics", "Software Testing": "testing", "Databases": "databases", "Maintenance & DevOps": "devops", "Market Insights": "market-insights", "Software Houses": "software-houses", "Business & Tech": "business" };
    return <footer className="mt-20 border-t border-line bg-panel p-6"><nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
  {hubs.map(h => <Link key={h} href={`/topic/${slug[h]}`} className="hover:text-accent">[{h}]</Link>)}</nav></footer>;
}
export function Parallax() {
    const [y, setY] = useState(0);
    useEffect(() => { const f = () => setY(scrollY); addEventListener("scroll", f, { passive: true }); return () => removeEventListener("scroll", f); }, []);
    const L = [[0.1, "15%", "20%", 260, .25], [0.25, "70%", "40%", 180, .2], [0.45, "40%", "70%", 120, .3]];
    return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">{L.map(([s, l, t, z, o], k) => <div key={k} className="absolute rounded-full bg-accent blur-3xl" style={{ left: l, top: t, width: z, height: z, opacity: o, transform: `translateY(${-y * s}px)` }}/>)}</div>;
}
export function Flow({ steps }) {
    const [a, setA] = useState(0);
    return <div className="flex flex-wrap items-center gap-2">{steps.map((s, k) => <div key={k} className="flex items-center gap-2">
  <button onClick={() => setA(k)} className={`rounded-lg border px-3 py-2 text-sm transition ${a === k ? "border-accent bg-accent text-bg" : "border-line bg-panel"}`}>{k + 1}. {s}</button>{k < steps.length - 1 && <span>→</span>}</div>)}</div>;
}
export const siblings = (hub) => topics.filter(t => t.hub === hub);
