const L = [
    ["Python", "Very high: data, AI, backend, automation", "Python is like a Swiss-army notebook: quick to write, flexible to reshape.", ["Dynamic typing", "Virtual envs", "Async/await", "List comprehensions"], ""],
    ["JavaScript", "Very high: every web product needs it", "JS is the electricity of a web page: it makes everything react.", ["Event loop", "Async/Promises", "Closures", "DOM"], ""],
    ["TypeScript", "Very high: default for serious web teams", "TypeScript is JS with building inspectors who catch mistakes early.", ["Static types", "Generics", "Interfaces", "Tooling"], ""],
    ["C++", "High: games, systems, robotics, finance", "C++ is manual-transmission driving: total control, you manage the gears.", ["Memory management", "RAII", "Pointers", "STL"], ""],
    ["Rust", "Growing fast: systems, security, infra", "Rust is a strict librarian: nothing leaves without a record of who owns it.", ["Ownership", "Borrowing", "Lifetimes", "Traits"], ""],
    ["Go", "High: cloud, DevOps, microservices", "Go is a simple, sturdy delivery van built for many parallel trips.", ["Goroutines", "Channels", "Interfaces", "Error handling"], ""],
    ["Java", "High: enterprise, Android, banking", "Java is a large corporate office: structured, standardised, long-lived.", ["OOP", "JVM & GC", "Collections", "Spring"], ""],
    ["C#", "High: enterprise, games (Unity), Azure", "C# is a well-equipped workshop inside the Microsoft ecosystem.", ["OOP", "LINQ", "async/await", ".NET"], ""],
    ["SQL", "Very high: every data-driven company", "SQL is asking a librarian precise questions about shelves of tables.", ["SELECT/JOIN", "Indexes", "Transactions", "Normalisation"], ""],
    ["Swift", "Solid niche: iOS/macOS apps", "Swift is the official toolkit for building inside Apple's house.", ["Optionals", "ARC", "Protocols", "SwiftUI"], ""],
    ["Kotlin", "High: Android, modern JVM backend", "Kotlin is Java with the paperwork trimmed away.", ["Null safety", "Coroutines", "Data classes", "Extensions"], ""],
    ["PHP", "Steady: WordPress, Laravel, legacy web", "PHP is a long-running restaurant kitchen serving most of the web's pages.", ["Request lifecycle", "Composer", "Laravel", "Sessions"], ""],
    ["Dart", "Growing: Flutter cross-platform apps", "Dart is one blueprint that builds both Android and iOS rooms.", ["Sound null safety", "Widgets", "Futures", "Isolates"], ""]
];
const T = (slug, hub, title, flow, analogy, demand, concepts) => ({ slug, hub, title, flow, analogy, demand, concepts });
export const topics = [
    ...L.map(([n, d, a, c]) => T(n.toLowerCase().replace(/\+/g, "p").replace("#", "sharp"), "Programming Languages", n, ["Write source", "Compile / interpret", "Run on runtime", "Output & debug"], a, d + ". Check current surveys (Stack Overflow, job boards) for salary data in your region.", c)),
    T("robotics", "Robotics", "Robotics", ["Sensor reads", "Microcontroller loop", "Decision logic", "Motor/actuator"], "A robot is a body: sensors are senses, the MCU is the reflex brain, ROS 2 is the nervous system.", "Steady demand in automation, drones, manufacturing and embedded roles.", ["Arduino/ESP32", "C/C++ control loops", "ROS 2", "Sensor integration"]),
    T("testing", "Software Testing", "Software Testing", ["Write code", "Unit tests", "Integration tests", "E2E in CI", "Deploy"], "Tests are a car's safety checks before every trip.", "QA/SDET and test-aware developers are expected on nearly every team.", ["Jest", "Cypress", "Playwright", "CI/CD automation"]),
    T("databases", "Databases", "Databases", ["Client query", "API", "Cache (Redis)", "Database", "Response"], "Database = storage attic; cache = the desk drawer for what you use daily.", "Data skills are among the most consistently hired.", ["PostgreSQL/MySQL", "MongoDB/Cosmos DB", "Redis", "Vector DBs for AI"]),
    T("devops", "Maintenance & DevOps", "Maintenance & DevOps", ["Commit", "Build image", "Push to registry", "Orchestrate (K8s)", "Monitor & alert"], "DevOps is the building's facilities team keeping the lights on.", "Cloud and platform engineers are in sustained demand.", ["Docker", "Kubernetes", "AWS/Azure/GCP", "Logging & incidents"]),
    T("market-insights", "Market Insights", "Market Insights", ["Collect data", "Spot trends", "Map skills", "Target roles"], "Reading the market is reading a weather forecast before a trip.", "Remote work and AI reshaped hiring; verify figures against current reports.", ["Hiring trends", "Remote work", "Skill matrices", "Compensation benchmarks"]),
    T("software-houses", "Software Houses", "Software Houses", ["Client brief", "Sprint planning", "Build", "Code review", "Deliver"], "A software house is a construction contractor: scope, schedule, handover.", "Agencies hire many juniors; strong first-job route.", ["Agile/Scrum", "Code reviews", "Delivery standards", "Client communication"]),
    T("business", "Business & Tech", "Business & Tech", ["Find problem", "Build MVP", "Get users", "Measure MRR/churn", "Scale"], "A product is a shop; metrics are the till receipts.", "Product thinking separates developers who ship value.", ["SaaS metrics", "Product-market fit", "Pricing", "Entrepreneurship"]),
];
export const hubs = ["Programming Languages", "Robotics", "Software Testing", "Databases", "Maintenance & DevOps", "Market Insights", "Software Houses", "Business & Tech"];
