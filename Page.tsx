"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {supabase} from "@/lib/supabase";
import {topics} from "@/lib/content";
import {lessons} from "@/lib/lessons";
export default function Dash(){
 const [bm,setBm]=useState<string[]>([]);const [pr,setPr]=useState<Record<string,number>>({});const [ok,setOk]=useState<boolean|null>(null);
 useEffect(()=>{const s=supabase();s.auth.getUser().then(async({data})=>{if(!data.user){setOk(false);return}setOk(true);
  const b=await s.from("bookmarks").select("slug");setBm((b.data??[]).map((r:any)=>r.slug));
  const p=await s.from("progress").select("slug");const m:Record<string,number>={};(p.data??[]).forEach((r:any)=>{m[r.slug]=(m[r.slug]||0)+1});setPr(m)})},[]);
 if(ok===false)return <p className="pt-24 text-center"><Link className="underline" href="/login">Log in</Link> to see your dashboard.</p>;
 const pct=(s:string)=>{const l=lessons[s];return l?Math.round((pr[s]||0)/(l.concepts.length+l.projects.length)*100):0};
 const row=(s:string)=>{const t=topics.find(x=>x.slug===s);return t&&<Link key={s} href={`/topic/${s}`} className="block rounded-xl border border-line bg-panel p-3 hover:border-accent"><div className="flex justify-between"><span>{t.title}</span><span>{pct(s)}%</span></div><div className="mt-2 h-1.5 rounded bg-line"><div className="h-full rounded bg-accent" style={{width:`${pct(s)}%`}}/></div></Link>};
 const all=Math.round(topics.reduce((a,t)=>a+pct(t.slug),0)/topics.length);
 return <div className="pt-10"><h1 className="text-3xl font-bold">Your dashboard</h1><p className="my-2 opacity-70">Overall progress: {all}%</p>
  <h2 className="mb-2 mt-6 font-semibold text-accent">Bookmarks</h2><div className="grid gap-2 sm:grid-cols-2">{bm.length?bm.map(s=>row(s)):<p>No bookmarks yet.</p>}</div>
  <h2 className="mb-2 mt-6 font-semibold text-accent">In progress</h2><div className="grid gap-2 sm:grid-cols-2">{Object.keys(pr).map(s=>row(s))}</div></div>;
}
