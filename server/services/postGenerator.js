/**
 * Post Generator Service
 * Generates structured DevOps post content for a given topic.
 */

const CATEGORY_HASHTAGS = {
  Linux: ['#Linux', '#SysAdmin', '#OpenSource', '#Shell', '#BashScripting'],
  'Git & GitHub': ['#Git', '#GitHub', '#VersionControl', '#GitOps', '#OpenSource'],
  Docker: ['#Docker', '#Containers', '#Microservices', '#DockerCompose', '#CloudNative'],
  Kubernetes: ['#Kubernetes', '#K8s', '#CloudNative', '#ContainerOrchestration', '#CNCF'],
  'CI/CD': ['#CICD', '#Jenkins', '#GitHubActions', '#Automation', '#Pipeline'],
  'Cloud (AWS/GCP/Azure)': ['#AWS', '#Azure', '#GCP', '#CloudComputing', '#IaC'],
  'Monitoring & Logging': ['#Monitoring', '#Observability', '#Prometheus', '#Grafana', '#ELK'],
  'Interview Prep': ['#DevOpsInterview', '#TechInterview', '#CareerGrowth', '#Hiring', '#DevOpsJobs'],
};

const HOOKS = {
  Linux: [
    '"90% of DevOps engineers use this Linux command daily — but most beginners don\'t even know it exists…"',
    '"I crashed a production server with one wrong command. Here\'s what I learned about Linux the hard way…"',
    '"Stop Googling basic Linux commands. Master these 5 and you\'ll never look back…"',
  ],
  'Git & GitHub': [
    '"My first merge conflict took me 3 hours to fix. Now it takes me 30 seconds. Here\'s what changed…"',
    '"If you\'re still using `git add .` for everything, you\'re doing it wrong. Let me explain…"',
    '"The one Git workflow that saved my team from deployment disasters…"',
  ],
  Docker: [
    '"Your Docker image is 1.2 GB? Mine is 47 MB. Here\'s the one trick that changed everything…"',
    '"I deployed a broken container to production. The fix? One line in my Dockerfile…"',
    '"Docker isn\'t just for DevOps engineers. Here\'s why every developer needs it…"',
  ],
  Kubernetes: [
    '"Kubernetes felt impossible until I understood this ONE concept…"',
    '"My pod kept crashing. The error message was useless. Here\'s how I actually debugged it…"',
    '"You don\'t need Kubernetes for everything. Here\'s when it actually makes sense…"',
  ],
  'CI/CD': [
    '"Our deployments used to take 4 hours. Now they take 4 minutes. Here\'s exactly what we changed…"',
    '"I broke the CI/CD pipeline on my first day. My senior taught me this golden rule…"',
    '"If your pipeline doesn\'t have this one stage, you\'re shipping bugs to production…"',
  ],
  'Cloud (AWS/GCP/Azure)': [
    '"I got a $2,400 AWS bill because of one misconfigured resource. Don\'t make my mistake…"',
    '"Cloud certifications are overrated unless you actually build this…"',
    '"The cheapest way to host your project on AWS — it costs less than a coffee…"',
  ],
  'Monitoring & Logging': [
    '"Our app went down for 6 hours because nobody was watching the logs. Here\'s the fix…"',
    '"If you can\'t monitor it, you can\'t manage it. Here\'s the setup every DevOps team needs…"',
    '"Prometheus + Grafana changed how I think about infrastructure. Here\'s why…"',
  ],
  'Interview Prep': [
    '"I failed 5 DevOps interviews before I realized they all ask the same 10 questions…"',
    '"The interviewer said: Explain CI/CD in 30 seconds. Here\'s the answer that got me the job…"',
    '"These 3 scenario-based questions appear in EVERY DevOps interview. Be ready…"',
  ],
};

const CTAS = [
  '💬 Found this useful? Drop a comment with your experience! Save this post for later and follow for daily DevOps tips. 🔔',
  '👇 What\'s your take? Share your thoughts in the comments! If this helped you, hit save and follow for more DevOps content.',
  '🚀 Want daily DevOps insights like this? Follow me and save this post! Drop a 🔥 if you learned something new.',
  '📌 Save this for your DevOps journey! Comment below if you have questions — I read every one. Follow for daily tips!',
  '💡 Tag a friend who needs to see this! Like, comment, and follow for consistent DevOps content every single day.',
];

function generatePost(topic) {
  const categoryHooks = HOOKS[topic.category] || HOOKS['Linux'];
  const hook = categoryHooks[Math.floor(Math.random() * categoryHooks.length)];

  const explanation = generateExplanation(topic);
  const technicalBreakdown = generateTechnicalBreakdown(topic);
  const useCase = generateUseCase(topic);
  const commonMistakes = generateCommonMistakes(topic);
  const cta = CTAS[Math.floor(Math.random() * CTAS.length)];
  const hashtags = generateHashtags(topic.category);

  return {
    hook,
    explanation,
    technical_breakdown: technicalBreakdown,
    use_case: useCase,
    common_mistakes: commonMistakes,
    cta,
    hashtags,
  };
}

function generateExplanation(topic) {
  return `📖 **Simple Explanation:**\n${topic.description || topic.title} is a fundamental concept in ${topic.category}. In simple terms, it helps DevOps engineers streamline their workflows, reduce manual effort, and build more reliable systems. Understanding this concept is essential for anyone on the DevOps path — whether you're just starting out or preparing for interviews.\n\nThink of it as the building block that connects development practices with operational excellence.`;
}

function generateTechnicalBreakdown(topic) {
  const breakdowns = {
    Linux: `🛠 **Technical Breakdown:**\n\`\`\`bash\n# Key commands related to ${topic.title}\n$ man ${topic.title.toLowerCase().split(' ')[0]}\n$ ${topic.title.toLowerCase().includes('permission') ? 'chmod 755 file.sh && ls -la' : 'systemctl status service-name'}\n$ journalctl -u service-name --since "1 hour ago"\n\`\`\`\n\n**Tools:** bash, systemd, journalctl\n**Key flags:** -r (recursive), -v (verbose), -f (follow)`,
    'Git & GitHub': `🛠 **Technical Breakdown:**\n\`\`\`bash\n# Git workflow for ${topic.title}\n$ git checkout -b feature/new-feature\n$ git add -p              # Stage changes interactively\n$ git commit -m "feat: implement ${topic.title.toLowerCase()}"\n$ git push origin feature/new-feature\n$ gh pr create --title "feat: ${topic.title}"\n\`\`\`\n\n**Tools:** git, gh CLI\n**Best practice:** Always use conventional commits`,
    Docker: `🛠 **Technical Breakdown:**\n\`\`\`dockerfile\n# Dockerfile for ${topic.title}\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nRUN npm run build\n\nFROM node:18-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nEXPOSE 3000\nCMD ["node", "dist/index.js"]\n\`\`\`\n\n**Tools:** Docker, docker-compose, BuildKit\n**Key flags:** --no-cache, --target, --platform`,
    Kubernetes: `🛠 **Technical Breakdown:**\n\`\`\`yaml\n# K8s manifest for ${topic.title}\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: devops-app\n  template:\n    spec:\n      containers:\n      - name: app\n        image: myapp:latest\n        resources:\n          limits:\n            memory: "256Mi"\n            cpu: "500m"\n\`\`\`\n\n**Tools:** kubectl, helm, kustomize\n**Debug:** kubectl describe pod <name>, kubectl logs -f <pod>`,
    'CI/CD': `🛠 **Technical Breakdown:**\n\`\`\`yaml\n# GitHub Actions workflow for ${topic.title}\nname: CI/CD Pipeline\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v4\n    - name: Run Tests\n      run: npm test\n    - name: Build & Deploy\n      run: |\n        docker build -t myapp .\n        docker push myapp:latest\n\`\`\`\n\n**Tools:** GitHub Actions, Jenkins, ArgoCD\n**Key concept:** Build → Test → Deploy → Monitor`,
    'Cloud (AWS/GCP/Azure)': `🛠 **Technical Breakdown:**\n\`\`\`bash\n# AWS CLI commands for ${topic.title}\n$ aws configure --profile devops\n$ aws ec2 describe-instances --filters "Name=tag:Env,Values=prod"\n$ aws s3 sync ./build s3://my-bucket --delete\n$ aws cloudformation deploy --template-file stack.yml --stack-name prod\n\`\`\`\n\n**Tools:** AWS CLI, Terraform, CloudFormation\n**Best practice:** Always use IAM roles, never hardcode credentials`,
    'Monitoring & Logging': `🛠 **Technical Breakdown:**\n\`\`\`yaml\n# Prometheus config for ${topic.title}\nscrape_configs:\n  - job_name: 'app-metrics'\n    static_configs:\n      - targets: ['app:9090']\n    scrape_interval: 15s\n\n# Grafana dashboard query\nrate(http_requests_total{status="500"}[5m])\n\`\`\`\n\n**Tools:** Prometheus, Grafana, ELK Stack, Loki\n**Key metrics:** Latency, Error Rate, Throughput, Saturation`,
    'Interview Prep': `🛠 **Technical Breakdown:**\n\n**Q: Explain ${topic.title} in a DevOps context.**\n\n✅ **Strong Answer Framework:**\n1. **Define** the concept in 1-2 sentences\n2. **Explain** why it matters in production\n3. **Give** a real-world example\n4. **Mention** the tools you'd use\n5. **Discuss** trade-offs and alternatives\n\n**Pro tip:** Always tie your answer back to reliability, scalability, or automation.`,
  };

  return breakdowns[topic.category] || breakdowns['Linux'];
}

function generateUseCase(topic) {
  return `🌍 **Real-World Use Case:**\nAt a mid-size SaaS company, implementing ${topic.title} reduced deployment incidents by 60% and cut mean time to recovery (MTTR) from 45 minutes to under 8 minutes. The engineering team of 12 was able to ship features 3x faster while maintaining 99.9% uptime. This is exactly why ${topic.category} skills are in such high demand in the DevOps job market.`;
}

function generateCommonMistakes(topic) {
  return `❌ **Common Mistakes:**\n• Skipping documentation — always document your ${topic.title.toLowerCase()} setup\n• Not testing in a staging environment before production\n• Ignoring security best practices (hardcoded secrets, overly permissive roles)\n• Over-engineering the solution when a simpler approach works\n• Not monitoring after deployment — set up alerts from day one`;
}

function generateHashtags(category) {
  const base = ['#DevOps', '#DailyDevOps', '#CloudNative', '#TechCommunity'];
  const categorySpecific = CATEGORY_HASHTAGS[category] || [];
  const combined = [...new Set([...base, ...categorySpecific])];
  return combined.slice(0, 8);
}

module.exports = { generatePost };
