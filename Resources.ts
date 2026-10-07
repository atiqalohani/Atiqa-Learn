export const cats=["Google/Tech Documentation","Software House Insights","Twitter/Industry Experts","Books & University Datasets"];
const r=(c:number,n:string,u:string,tags:string[]=[])=>({cat:cats[c],n,u,tags});
export const resources=[
r(0,"Python Docs","https://docs.python.org/3/",["python"]),r(0,"MDN JavaScript","https://developer.mozilla.org/en-US/docs/Web/JavaScript",["javascript"]),
r(0,"TypeScript Handbook","https://www.typescriptlang.org/docs/",["typescript"]),r(0,"cppreference","https://en.cppreference.com",["cpp"]),
r(0,"The Rust Book","https://doc.rust-lang.org/book/",["rust"]),r(0,"Go Docs","https://go.dev/doc/",["go"]),
r(0,"PostgreSQL Docs","https://www.postgresql.org/docs/",["sql","databases"]),r(0,"ROS 2 Docs","https://docs.ros.org",["robotics"]),
r(0,"Playwright Docs","https://playwright.dev/docs/intro",["testing"]),r(0,"Docker Docs","https://docs.docker.com",["devops"]),
r(0,"Kubernetes Docs","https://kubernetes.io/docs/home/",["devops"]),
r(1,"Google Engineering Practices","https://google.github.io/eng-practices",["software-houses","testing"]),r(1,"Google Style Guides","https://google.github.io/styleguide",["software-houses"]),
r(1,"The Scrum Guide","https://scrumguides.org",["software-houses"]),r(1,"GitLab Handbook","https://handbook.gitlab.com",["software-houses","devops"]),
r(2,"Martin Fowler's blog","https://martinfowler.com",["software-houses","testing"]),r(2,"Julia Evans (jvns.ca)","https://jvns.ca",["databases","devops"]),
r(2,"The Pragmatic Engineer","https://newsletter.pragmaticengineer.com",["market-insights"]),r(2,"Hacker News","https://news.ycombinator.com",["market-insights","business"]),
r(3,"CS50 (Harvard)","https://cs50.harvard.edu",["python","cpp"]),r(3,"MIT OpenCourseWare","https://ocw.mit.edu"),
r(3,"Stack Overflow Developer Survey","https://survey.stackoverflow.co",["market-insights"]),r(3,"Kaggle Datasets","https://www.kaggle.com/datasets",["python","sql"]),
r(3,"UCI ML Repository","https://archive.ics.uci.edu",["python"]),r(3,"Designing Data-Intensive Applications","https://dataintensive.net",["databases"]),
r(3,"The Pragmatic Programmer","https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/",["software-houses"])];
