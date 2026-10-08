import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// Edit PATHS as industry trends change.
const PATHS = {
    web: [{ title: "JavaScript", slug: "javascript" }, { title: "TypeScript", slug: "typescript" }, { title: "Databases", slug: "databases" }, { title: "Testing", slug: "testing" }],
    "data-ai": [{ title: "Python", slug: "python" }, { title: "SQL", slug: "sql" }, { title: "Databases", slug: "databases" }],
    systems: [{ title: "C++", slug: "cpp" }, { title: "Rust", slug: "rust" }, { title: "Go", slug: "go" }],
    mobile: [{ title: "Kotlin", slug: "kotlin" }, { title: "Swift", slug: "swift" }, { title: "Dart", slug: "dart" }],
    devops: [{ title: "Go", slug: "go" }, { title: "DevOps", slug: "devops" }, { title: "Testing", slug: "testing" }],
    robotics: [{ title: "C++", slug: "cpp" }, { title: "Robotics", slug: "robotics" }],
    business: [{ title: "Business & Tech", slug: "business" }, { title: "Market Insights", slug: "market-insights" }, { title: "Python", slug: "python" }]
};
export async function POST(req) {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: { user } } = await sb.auth.getUser(token);
    if (!user)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const a = await req.json();
    const base = PATHS[a.target] ?? PATHS.web;
    const pace = a.hours >= 4 ? "~4 weeks" : a.hours >= 2 ? "~8 weeks" : "~12 weeks";
    const steps = [...(a.background === "beginner" ? [{ title: "Foundations: how the web & computers work" }] : []),
        ...base.map(s => ({ ...s, title: `Learn ${s.title}` })),
        { title: `Build 2-3 projects (${pace} at ${a.hours}h/day)` }, { title: `Portfolio: ${a.style === "visual" ? "visual demos & case studies" : "clean GitHub repos & READMEs"}` }, { title: "Job applications & interview practice" }];
    await sb.from("assessments").upsert({ user_id: user.id, background: a.background, hours: a.hours, style: a.style, target: a.target });
    await sb.from("roadmaps").upsert({ user_id: user.id, steps });
    return NextResponse.json({ steps });
}
