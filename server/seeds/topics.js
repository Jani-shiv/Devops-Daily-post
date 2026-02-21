/**
 * Seed file: Pre-seeded pool of 64 DevOps topics across 8 categories.
 * Run: node seeds/topics.js
 */
const sequelize = require('../config/database');
const { Topic } = require('../models');

const topics = [
  // ── Linux (8) ──
  { title: 'Linux File Permissions', category: 'Linux', difficulty: 'Beginner', description: 'Understanding chmod, chown, and file permission bits in Linux.' },
  { title: 'Linux Process Management', category: 'Linux', difficulty: 'Beginner', description: 'Managing processes with ps, top, htop, kill, and systemd.' },
  { title: 'Bash Scripting Fundamentals', category: 'Linux', difficulty: 'Beginner', description: 'Writing your first Bash scripts with variables, loops, and conditionals.' },
  { title: 'Linux Networking Basics', category: 'Linux', difficulty: 'Intermediate', description: 'IP addressing, DNS, netstat, ss, and firewall rules with iptables.' },
  { title: 'Cron Jobs & Scheduling', category: 'Linux', difficulty: 'Beginner', description: 'Automating tasks with cron, crontab, and at.' },
  { title: 'Linux Package Management', category: 'Linux', difficulty: 'Beginner', description: 'apt, yum, dnf — installing, updating, and removing packages.' },
  { title: 'SSH & Remote Access', category: 'Linux', difficulty: 'Intermediate', description: 'SSH keys, config files, tunneling, and secure remote server management.' },
  { title: 'Linux Log Analysis', category: 'Linux', difficulty: 'Intermediate', description: 'Reading system logs with journalctl, syslog, and log rotation.' },

  // ── Git & GitHub (8) ──
  { title: 'Git Branching Strategies', category: 'Git & GitHub', difficulty: 'Intermediate', description: 'GitFlow, trunk-based development, and feature branch workflows.' },
  { title: 'Git Merge vs Rebase', category: 'Git & GitHub', difficulty: 'Intermediate', description: 'When to merge, when to rebase, and how to avoid messy histories.' },
  { title: 'Git Stash & Cherry Pick', category: 'Git & GitHub', difficulty: 'Intermediate', description: 'Saving work in progress and selectively applying commits.' },
  { title: 'GitHub Actions Basics', category: 'Git & GitHub', difficulty: 'Beginner', description: 'Creating your first CI workflow with GitHub Actions YAML files.' },
  { title: 'Pull Request Best Practices', category: 'Git & GitHub', difficulty: 'Beginner', description: 'Writing clear PRs, code review etiquette, and templates.' },
  { title: 'Git Hooks for Automation', category: 'Git & GitHub', difficulty: 'Advanced', description: 'Pre-commit, pre-push hooks for linting, testing, and formatting.' },
  { title: 'Monorepo vs Polyrepo', category: 'Git & GitHub', difficulty: 'Advanced', description: 'Trade-offs of monorepo and polyrepo architectures for team workflows.' },
  { title: 'Git Bisect for Debugging', category: 'Git & GitHub', difficulty: 'Advanced', description: 'Using binary search through commits to find the one that introduced a bug.' },

  // ── Docker (8) ──
  { title: 'Docker Fundamentals', category: 'Docker', difficulty: 'Beginner', description: 'Images, containers, Dockerfile basics, and docker run.' },
  { title: 'Docker Multi-Stage Builds', category: 'Docker', difficulty: 'Intermediate', description: 'Reducing image size with multi-stage Dockerfiles.' },
  { title: 'Docker Compose', category: 'Docker', difficulty: 'Intermediate', description: 'Defining multi-container applications with docker-compose.yml.' },
  { title: 'Docker Volumes & Persistence', category: 'Docker', difficulty: 'Beginner', description: 'Named volumes, bind mounts, and data persistence strategies.' },
  { title: 'Docker Networking', category: 'Docker', difficulty: 'Intermediate', description: 'Bridge, host, overlay networks and container-to-container communication.' },
  { title: 'Docker Security Best Practices', category: 'Docker', difficulty: 'Advanced', description: 'Non-root users, image scanning, secrets management, and read-only filesystems.' },
  { title: 'Optimizing Docker Images', category: 'Docker', difficulty: 'Advanced', description: 'Layer caching, .dockerignore, Alpine base images, and BuildKit.' },
  { title: 'Docker in CI/CD Pipelines', category: 'Docker', difficulty: 'Intermediate', description: 'Building, tagging, and pushing Docker images in automated pipelines.' },

  // ── Kubernetes (8) ──
  { title: 'Kubernetes Architecture', category: 'Kubernetes', difficulty: 'Beginner', description: 'Control plane, worker nodes, etcd, API server, and kubelet.' },
  { title: 'Pods, ReplicaSets & Deployments', category: 'Kubernetes', difficulty: 'Beginner', description: 'Core K8s objects and how they manage container lifecycles.' },
  { title: 'Kubernetes Services & Networking', category: 'Kubernetes', difficulty: 'Intermediate', description: 'ClusterIP, NodePort, LoadBalancer, and Ingress controllers.' },
  { title: 'ConfigMaps & Secrets', category: 'Kubernetes', difficulty: 'Intermediate', description: 'Externalizing configuration and managing sensitive data in K8s.' },
  { title: 'Helm Charts', category: 'Kubernetes', difficulty: 'Intermediate', description: 'Package management for Kubernetes with Helm templates and values.' },
  { title: 'K8s Horizontal Pod Autoscaling', category: 'Kubernetes', difficulty: 'Advanced', description: 'Automatically scaling pods based on CPU, memory, or custom metrics.' },
  { title: 'K8s RBAC & Security', category: 'Kubernetes', difficulty: 'Advanced', description: 'Role-based access control, service accounts, and network policies.' },
  { title: 'K8s Pod Lifecycle & Debugging', category: 'Kubernetes', difficulty: 'Intermediate', description: 'Init containers, probes, pod phases, and debugging CrashLoopBackOff.' },

  // ── CI/CD (8) ──
  { title: 'CI/CD Pipeline Fundamentals', category: 'CI/CD', difficulty: 'Beginner', description: 'Build, test, deploy — the core stages of continuous integration and delivery.' },
  { title: 'GitHub Actions Advanced', category: 'CI/CD', difficulty: 'Intermediate', description: 'Matrix builds, reusable workflows, caching, and secrets management.' },
  { title: 'Jenkins Pipeline as Code', category: 'CI/CD', difficulty: 'Intermediate', description: 'Writing Jenkinsfiles for declarative and scripted pipelines.' },
  { title: 'ArgoCD & GitOps', category: 'CI/CD', difficulty: 'Advanced', description: 'Declarative GitOps continuous delivery for Kubernetes.' },
  { title: 'Blue-Green & Canary Deployments', category: 'CI/CD', difficulty: 'Advanced', description: 'Zero-downtime deployment strategies and progressive rollouts.' },
  { title: 'Pipeline Security (DevSecOps)', category: 'CI/CD', difficulty: 'Advanced', description: 'SAST, DAST, dependency scanning, and security gates in CI/CD.' },
  { title: 'Artifact Management', category: 'CI/CD', difficulty: 'Intermediate', description: 'Managing build artifacts with Nexus, JFrog, or GitHub Packages.' },
  { title: 'Feature Flags in CI/CD', category: 'CI/CD', difficulty: 'Intermediate', description: 'Using feature flags for safe, incremental feature releases.' },

  // ── Cloud (8) ──
  { title: 'AWS EC2 Basics', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Beginner', description: 'Launching, managing, and connecting to EC2 instances.' },
  { title: 'AWS S3 & Static Hosting', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Beginner', description: 'Object storage, bucket policies, and hosting static websites on S3.' },
  { title: 'AWS IAM Deep Dive', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Intermediate', description: 'Users, roles, policies, and the principle of least privilege.' },
  { title: 'Terraform Fundamentals', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Intermediate', description: 'Infrastructure as Code with HCL — providers, resources, and state.' },
  { title: 'AWS VPC & Networking', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Intermediate', description: 'Subnets, route tables, NAT gateways, and security groups.' },
  { title: 'Serverless with AWS Lambda', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Intermediate', description: 'Event-driven computing without managing servers.' },
  { title: 'Cloud Cost Optimization', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Advanced', description: 'Reserved instances, spot instances, right-sizing, and cost alerts.' },
  { title: 'Multi-Cloud Strategy', category: 'Cloud (AWS/GCP/Azure)', difficulty: 'Advanced', description: 'When and how to use multiple cloud providers effectively.' },

  // ── Monitoring & Logging (8) ──
  { title: 'Prometheus Fundamentals', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'Metrics collection, PromQL basics, and exporters.' },
  { title: 'Grafana Dashboards', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'Building visual dashboards for infrastructure and application metrics.' },
  { title: 'ELK Stack Overview', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'Elasticsearch, Logstash, Kibana for centralized log management.' },
  { title: 'Alerting Best Practices', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'Setting up meaningful alerts and avoiding alert fatigue.' },
  { title: 'Distributed Tracing', category: 'Monitoring & Logging', difficulty: 'Advanced', description: 'Tracing requests across microservices with Jaeger or Zipkin.' },
  { title: 'Application Performance Monitoring', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'APM tools like Datadog, New Relic, and custom instrumentation.' },
  { title: 'Log Aggregation Patterns', category: 'Monitoring & Logging', difficulty: 'Intermediate', description: 'Centralized logging with Fluentd, Fluent Bit, or Loki.' },
  { title: 'SRE Golden Signals', category: 'Monitoring & Logging', difficulty: 'Advanced', description: 'Latency, traffic, errors, saturation — the four golden signals of SRE.' },

  // ── Interview Prep (8) ──
  { title: 'DevOps vs SRE vs Platform Engineering', category: 'Interview Prep', difficulty: 'Beginner', description: 'Understanding the differences and overlaps between these roles.' },
  { title: 'Explain CI/CD to a Non-Technical Person', category: 'Interview Prep', difficulty: 'Beginner', description: 'Simplifying complex DevOps concepts for non-technical stakeholders.' },
  { title: 'Scenario: Production Outage', category: 'Interview Prep', difficulty: 'Intermediate', description: 'How to handle a production outage — incident response, RCA, and post-mortems.' },
  { title: 'Scenario: Migrating to Kubernetes', category: 'Interview Prep', difficulty: 'Advanced', description: 'Planning and executing a migration from VMs to Kubernetes.' },
  { title: 'Top 10 DevOps Interview Questions', category: 'Interview Prep', difficulty: 'Beginner', description: 'The most commonly asked DevOps interview questions with structured answers.' },
  { title: 'System Design: Scalable Web App', category: 'Interview Prep', difficulty: 'Advanced', description: 'Designing a highly available, scalable web application architecture.' },
  { title: 'Behavioral Questions for DevOps', category: 'Interview Prep', difficulty: 'Beginner', description: 'STAR method answers for teamwork, conflict, and leadership questions.' },
  { title: 'DevOps Salary Negotiation', category: 'Interview Prep', difficulty: 'Intermediate', description: 'Market rates, leverage points, and how to negotiate your DevOps offer.' },
];

async function seed() {
  try {
    await sequelize.sync({ force: false });
    const existing = await Topic.count();
    if (existing > 0) {
      console.log(`✅ Topics already seeded (${existing} found). Skipping.`);
      return;
    }
    await Topic.bulkCreate(topics);
    console.log(`🌱 Seeded ${topics.length} DevOps topics successfully!`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await sequelize.close();
  }
}

// Run if executed directly
if (require.main === module) {
  seed();
}

module.exports = { topics, seed };
