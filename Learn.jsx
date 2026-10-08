"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { lessons } from "@/lib/lessons";
import { resources } from "@/lib/resources";
export function Learn({ slug }) {
    const L = lessons[slug];
    const [uid, setUid] = useState("");
    const [done, setDone] = useState([]);
    const [bm, setBm] = useState(false);
    const [msg, setMsg] = useState("");
    useEffect(() => {
        const s = supabase();
        s.auth.getUser().then(async ({ data }) => {
            if (!data.user)
                return;
            setUid(data.user.id);
            const p = await s.from("progress").select("item").eq("slug", slug);
            setDone((p.data ?? []).map((r) => r.item));
            const b = await s.from("bookmarks").select("slug").eq("slug", slug).maybeSingle();
            setBm(!!b.data);
        });
    }, [slug]);
    const guard = () => { if (uid)
        return true; setMsg("Log in to save progress and bookmarks."); return false; };
    const tick = async (item) => {
        if (!guard())
            return;
        const s = supabase(), on = done.includes(item);
        setDone(on ? done.filter(x => x !== item) : [...done, item]);
        if (on)
            await s.from("progress").delete().match({ user_id: uid, slug, item });
        else
            await s.from("progress").insert({ user_id: uid, slug, item });
    };
    const mark = async () => {
        if (!guard())
            return;
        const s = supabase();
        setBm(!bm);
        if (bm)
            await s.from("bookmarks").delete().match({ user_id: uid, slug });
        else
            await s.from("bookmarks").insert({ user_id: uid, slug });
    };
    if (!L)
        return null;
    const n = L.concepts.length + L.projects.length, pct = Math.round(done.length / n * 100), rel = resources.filter(r => r.tags?.includes(slug));
    const box = (id, t, d) => <label key={id} className="flex cursor-pointer gap-3 py-1"><input type="checkbox" checked={done.includes(id)} onChange={() => tick(id)}/><span><b>{t}</b>{d && <span className="opacity-80"> {d}</span>}</span></label>;
    return <section className="my-6 rounded-2xl border border-line bg-panel p-6">
  <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold text-accent">Go deeper</h2><button onClick={mark} className="rounded border border-line px-3 py-1 text-sm">{bm ? "★ Bookmarked" : "☆ Bookmark"}</button></div>
  <div className="h-2 overflow-hidden rounded bg-line"><div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }}/></div><p className="mb-3 mt-1 text-xs opacity-70">{pct}% complete</p>
  <h3 className="font-semibold">Core concepts</h3>{L.concepts.map(([t, d], k) => box(`c${k}`, t, d))}
  <h3 className="mt-4 font-semibold">Practice projects</h3>{L.projects.map((t, k) => box(`p${k}`, t))}
  <h3 className="mt-4 font-semibold">How to get hired</h3><p>{L.hire}</p>
  {rel.length > 0 && <><h3 className="mt-4 font-semibold">Related resources</h3><ul className="list-disc pl-5">{rel.map(r => <li key={r.u}><a className="underline" href={r.u} target="_blank" rel="noreferrer">{r.n}</a></li>)}</ul></>}
  {msg && <p className="mt-3 text-sm">{msg} <a className="underline" href="/login">Login</a></p>}</section>;
}
