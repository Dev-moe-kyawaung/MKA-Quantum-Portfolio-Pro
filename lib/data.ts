export const profile = {
  name: 'Moe Kyaw Aung',
  firstName: 'Moe Kyaw',
  lastName: 'Aung',
  title: 'Android Senior Developer',
  shortTitle: 'Android · Kotlin · Firebase',
  drawingNo: 'DWG-MKA-2026',
  revision: 'REV C',
  location: 'Tachileik, Myanmar',
  timezone: 'GMT+07',
  company: 'Microsoft',
  available: true,
  tagline:
    'Senior Android engineering drafted with production precision — Kotlin modules, Jetpack systems, secure backends.',
  bio: `I am an Android Developer with nearly 12 years of experience in building Android applications and working within the Android ecosystem. I have completed several professional certification courses covering programming, computer vision using Python, cyber security, web technologies, and digital growth strategies.\n\nMy goal is to develop reliable, secure, and user-friendly mobile applications. I enjoy learning new technologies, solving real-world problems, and continuously improving my skills as a developer.`,
  avatar:
    'https://0.gravatar.com/avatar/a2dae9a29fbf7c72552047efc744be54a018938aacd9009e7500f93d72eb0f2e?s=400',
  headerImage:
    'https://1.gravatar.com/userimage/275420990/7a03140bb6a413d9ec47679608e32f94?size=1024',
  email: 'moekyawaung@fastmail.com',
  phone: '+959666000050',
  website: 'https://Dev-Moe-kyawaung.github.io/',
  gravatar: 'https://gravatar.com/moekyawaung2026',
  linkedin: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1',
  github: 'https://github.com/Moekyawaung',
  stats: [
    { value: '12+', label: 'Years' },
    { value: '40+', label: 'Certs' },
    { value: '18+', label: 'Skills' },
    { value: '08', label: 'Modules' },
  ],
};

export type Skill = {
  name: string;
  icon: string;
  category: 'mobile' | 'backend' | 'web' | 'cloud' | 'data' | 'tools';
  level: number;
  partNo: string;
};

export const skills: Skill[] = [
  { name: 'Kotlin', icon: 'logo-android', category: 'mobile', level: 95, partNo: 'P-01' },
  { name: 'Android', icon: 'phone-portrait-outline', category: 'mobile', level: 95, partNo: 'P-02' },
  { name: 'Jetpack', icon: 'layers-outline', category: 'mobile', level: 90, partNo: 'P-03' },
  { name: 'Firebase', icon: 'flame-outline', category: 'backend', level: 88, partNo: 'P-04' },
  { name: 'Java', icon: 'cafe-outline', category: 'mobile', level: 85, partNo: 'P-05' },
  { name: 'React', icon: 'logo-react', category: 'web', level: 75, partNo: 'P-06' },
  { name: 'Flutter', icon: 'color-palette-outline', category: 'mobile', level: 70, partNo: 'P-07' },
  { name: 'Swift', icon: 'logo-apple', category: 'mobile', level: 65, partNo: 'P-08' },
  { name: 'Python', icon: 'code-slash-outline', category: 'data', level: 80, partNo: 'P-09' },
  { name: 'JavaScript', icon: 'logo-nodejs', category: 'web', level: 78, partNo: 'P-10' },
  { name: 'AWS', icon: 'cloud-outline', category: 'cloud', level: 72, partNo: 'P-11' },
  { name: 'Cyber Sec', icon: 'shield-checkmark-outline', category: 'tools', level: 80, partNo: 'P-12' },
  { name: 'ML / AI', icon: 'hardware-chip-outline', category: 'data', level: 70, partNo: 'P-13' },
  { name: 'Git', icon: 'git-branch-outline', category: 'tools', level: 90, partNo: 'P-14' },
  { name: 'Linux', icon: 'terminal-outline', category: 'tools', level: 82, partNo: 'P-15' },
  { name: 'IoT', icon: 'wifi-outline', category: 'data', level: 68, partNo: 'P-16' },
  { name: 'Big Data', icon: 'bar-chart-outline', category: 'data', level: 65, partNo: 'P-17' },
  { name: 'Crypto', icon: 'key-outline', category: 'tools', level: 60, partNo: 'P-18' },
];

export type Certification = {
  id: string;
  title: string;
  category: string;
  issuer: string;
  icon: string;
  sheet: string;
};

export const certifications: Certification[] = [
  { id: '1', title: 'Kotlin for Android', category: 'Mobile', issuer: 'Google Dev Launchpad', icon: 'phone-portrait', sheet: 'A1' },
  { id: '2', title: 'Firebase', category: 'Backend', issuer: 'Google Dev Launchpad', icon: 'flame', sheet: 'A2' },
  { id: '3', title: 'Machine Learning', category: 'AI/ML', issuer: 'Google Dev Launchpad', icon: 'hardware-chip', sheet: 'B1' },
  { id: '4', title: 'Artificial Intelligence', category: 'AI/ML', issuer: 'Google Dev Launchpad', icon: 'bulb', sheet: 'B2' },
  { id: '5', title: 'Cyber Security', category: 'Security', issuer: 'Google Dev Launchpad', icon: 'shield-checkmark', sheet: 'C1' },
  { id: '6', title: 'Ethical Hacking', category: 'Security', issuer: 'Google Dev Launchpad', icon: 'lock-closed', sheet: 'C2' },
];

export type SocialLink = {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
};

export const socials: SocialLink[] = [
  { id: 'github', name: 'GitHub', handle: 'Moekyawaung', url: 'https://github.com/Moekyawaung', icon: 'logo-github' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'moe-kyaw-aung', url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', icon: 'logo-linkedin' },
  { id: 'website', name: 'Website', handle: 'Dev-Moe-kyawaung', url: 'https://Dev-Moe-kyawaung.github.io/', icon: 'globe-outline' },
  { id: 'gravatar', name: 'Gravatar', handle: 'moekyawaung2026', url: 'https://gravatar.com/moekyawaung2026', icon: 'person-circle-outline' },
  { id: 'bluesky', name: 'Bluesky', handle: 'moekyawaung96', url: 'https://bsky.app/profile/moekyawaung96.bsky.social', icon: 'cloud-outline' },
  { id: 'tiktok', name: 'TikTok', handle: '@moelay262411', url: 'https://tiktok.com/@moelay262411', icon: 'logo-tiktok' },
];

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: '1',
    role: 'Android Senior Developer',
    company: 'Microsoft',
    period: 'Present',
    description:
      'Building reliable, secure, and user-friendly Android applications within a world-class engineering culture.',
    highlights: [
      'Kotlin & Jetpack Compose architecture',
      'REST API integration & offline-first design',
      'Performance, security, and polished UX',
    ],
  },
  {
    id: '2',
    role: 'Android Developer',
    company: 'Independent / Freelance',
    period: '2014 — Present',
    description:
      'Nearly 12 years shipping Android apps across the full ecosystem — from native Kotlin/Java to multi-platform stacks.',
    highlights: [
      'End-to-end mobile product delivery',
      'Firebase backends & cloud services',
      'Cross-platform with Flutter & React',
    ],
  },
];

export type TechModule = {
  id: string;
  moduleNo: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'APPROVED' | 'IN REVIEW' | 'DRAFT' | 'PRODUCTION';
  scale: string;
  summary: string;
  layers: { name: string; note: string }[];
  specs: { label: string; value: string }[];
  connections: string[];
  icon: string;
};

/** Technical project modules — exploded blueprint parts */
export const techModules: TechModule[] = [
  {
    id: 'm1',
    moduleNo: 'MOD-01',
    title: 'Android Core Chassis',
    subtitle: 'Native runtime frame',
    category: 'Platform',
    status: 'PRODUCTION',
    scale: '1:1',
    summary:
      'Primary structural frame for production Kotlin apps — modular features, lifecycle governors, Material shell.',
    layers: [
      { name: 'Application Shell', note: 'Process entry & DI graph' },
      { name: 'Feature Modules', note: 'Isolated navigation domains' },
      { name: 'Domain Layer', note: 'Use-cases & repositories' },
      { name: 'Data Sources', note: 'Local + remote adapters' },
    ],
    specs: [
      { label: 'Lang', value: 'Kotlin' },
      { label: 'Min SDK', value: '24+' },
      { label: 'Arch', value: 'MVVM/UDF' },
    ],
    connections: ['m2', 'm3', 'm5'],
    icon: 'phone-portrait-outline',
  },
  {
    id: 'm2',
    moduleNo: 'MOD-02',
    title: 'Compose Interface Plate',
    subtitle: 'Declarative UI deck',
    category: 'UI',
    status: 'PRODUCTION',
    scale: '2:1',
    summary:
      'Composable surface plate with motion tolerances, density mapping, and accessibility callouts.',
    layers: [
      { name: 'Theme Tokens', note: 'Color / type / elevation' },
      { name: 'Component Library', note: 'Reusable schematic parts' },
      { name: 'Screen Graphs', note: 'Nav host assemblies' },
      { name: 'Motion Specs', note: 'Transition tolerances' },
    ],
    specs: [
      { label: 'UI', value: 'Compose' },
      { label: 'Design', value: 'Material 3' },
      { label: 'A11y', value: 'WCAG-minded' },
    ],
    connections: ['m1', 'm4'],
    icon: 'color-wand-outline',
  },
  {
    id: 'm3',
    moduleNo: 'MOD-03',
    title: 'Firebase Service Bay',
    subtitle: 'Backend utility housing',
    category: 'Backend',
    status: 'PRODUCTION',
    scale: '1:2',
    summary:
      'Service bay for auth, Firestore, functions, and messaging — bolted to offline-first clients.',
    layers: [
      { name: 'Auth Gate', note: 'Identity lock assembly' },
      { name: 'Realtime Bus', note: 'Snapshot listeners' },
      { name: 'Cloud Functions', note: 'Server-side actuators' },
      { name: 'Push Rail', note: 'FCM delivery track' },
    ],
    specs: [
      { label: 'Auth', value: 'Firebase' },
      { label: 'DB', value: 'Firestore' },
      { label: 'Push', value: 'FCM' },
    ],
    connections: ['m1', 'm5', 'm6'],
    icon: 'flame-outline',
  },
  {
    id: 'm4',
    moduleNo: 'MOD-04',
    title: 'API Conduit',
    subtitle: 'Network manifold',
    category: 'Data',
    status: 'APPROVED',
    scale: '1:5',
    summary:
      'Typed network manifold with cache reservoirs, retry valves, and serialization fittings.',
    layers: [
      { name: 'HTTP Client', note: 'OkHttp core pipe' },
      { name: 'API Interface', note: 'Retrofit blueprints' },
      { name: 'Cache Tank', note: 'Response holding' },
      { name: 'Error Valves', note: 'Retry & fallback' },
    ],
    specs: [
      { label: 'Proto', value: 'REST/JSON' },
      { label: 'Client', value: 'Retrofit' },
      { label: 'Policy', value: 'Resilient' },
    ],
    connections: ['m2', 'm3', 'm5'],
    icon: 'git-network-outline',
  },
  {
    id: 'm5',
    moduleNo: 'MOD-05',
    title: 'Security Bulkhead',
    subtitle: 'Threat isolation wall',
    category: 'Security',
    status: 'PRODUCTION',
    scale: '1:1',
    summary:
      'Bulkhead plate for keystore, pinning patterns, encrypted prefs, and least-privilege ports.',
    layers: [
      { name: 'Keystore Vault', note: 'Hardware-backed keys' },
      { name: 'Transport Seal', note: 'TLS + pinning options' },
      { name: 'Storage Lock', note: 'Encrypted local state' },
      { name: 'Permission Gate', note: 'Runtime access control' },
    ],
    specs: [
      { label: 'Std', value: 'OWASP' },
      { label: 'Crypto', value: 'Android KS' },
      { label: 'Mode', value: 'Zero-trust lean' },
    ],
    connections: ['m1', 'm3', 'm4'],
    icon: 'shield-checkmark-outline',
  },
  {
    id: 'm6',
    moduleNo: 'MOD-06',
    title: 'AI Insight Gear',
    subtitle: 'Decision assist assembly',
    category: 'AI',
    status: 'IN REVIEW',
    scale: '5:1',
    summary:
      'Assist gear that drafts architecture maps, surfaces trade-offs, and annotates module coupling.',
    layers: [
      { name: 'Prompt Lathe', note: 'Intent shaping' },
      { name: 'Pattern Index', note: 'Known good assemblies' },
      { name: 'Map Plotter', note: 'Blueprint generator' },
      { name: 'Review Callouts', note: 'Risk annotations' },
    ],
    specs: [
      { label: 'Mode', value: 'On-device + guide' },
      { label: 'Out', value: 'Schematic maps' },
      { label: 'Focus', value: 'Android arch' },
    ],
    connections: ['m1', 'm3'],
    icon: 'hardware-chip-outline',
  },
  {
    id: 'm7',
    moduleNo: 'MOD-07',
    title: 'Cross-Platform Bridge',
    subtitle: 'Multi-surface coupler',
    category: 'Multi',
    status: 'APPROVED',
    scale: '1:3',
    summary:
      'Coupler for Flutter/React surfaces when multi-platform delivery is the optimal assembly path.',
    layers: [
      { name: 'Shared Contracts', note: 'API + model parity' },
      { name: 'UI Bridges', note: 'Platform shells' },
      { name: 'Build Jigs', note: 'CI fixtures' },
    ],
    specs: [
      { label: 'Flutter', value: 'Ready' },
      { label: 'React', value: 'Ready' },
      { label: 'Native', value: 'Preferred' },
    ],
    connections: ['m1', 'm2'],
    icon: 'layers-outline',
  },
  {
    id: 'm8',
    moduleNo: 'MOD-08',
    title: 'Cloud Orbit Mount',
    subtitle: 'AWS gravity fixture',
    category: 'Cloud',
    status: 'DRAFT',
    scale: '1:10',
    summary:
      'Mounting plate for cloud storage, compute, and distributed mobile backend fixtures.',
    layers: [
      { name: 'Object Store', note: 'Media & artifacts' },
      { name: 'Compute Hooks', note: 'Serverless actuators' },
      { name: 'Edge Cache', note: 'Latency dampers' },
    ],
    specs: [
      { label: 'Cloud', value: 'AWS' },
      { label: 'Scale', value: 'Elastic' },
      { label: 'Cost', value: 'Metered' },
    ],
    connections: ['m3', 'm4'],
    icon: 'cloud-outline',
  },
];

export type BlueprintTemplate = {
  id: string;
  title: string;
  prompt: string;
  nodes: { id: string; label: string; x: number; y: number; kind: string }[];
  edges: { from: string; to: string; label: string }[];
  notes: string[];
};

/** AI assistant blueprint map templates */
export const blueprintTemplates: BlueprintTemplate[] = [
  {
    id: 'bp1',
    title: 'Offline-First Android',
    prompt: 'Draft offline-first mobile architecture',
    nodes: [
      { id: 'ui', label: 'UI (Compose)', x: 0.15, y: 0.2, kind: 'ui' },
      { id: 'vm', label: 'ViewModel', x: 0.5, y: 0.2, kind: 'logic' },
      { id: 'repo', label: 'Repository', x: 0.5, y: 0.5, kind: 'data' },
      { id: 'local', label: 'Room/Cache', x: 0.2, y: 0.78, kind: 'storage' },
      { id: 'remote', label: 'API/Firebase', x: 0.78, y: 0.78, kind: 'cloud' },
    ],
    edges: [
      { from: 'ui', to: 'vm', label: 'state' },
      { from: 'vm', to: 'repo', label: 'intent' },
      { from: 'repo', to: 'local', label: 'source of truth' },
      { from: 'repo', to: 'remote', label: 'sync' },
      { from: 'local', to: 'remote', label: 'reconcile' },
    ],
    notes: [
      'Local DB is primary read path',
      'Sync workers reconcile in background',
      'UI never blocks on network',
    ],
  },
  {
    id: 'bp2',
    title: 'Secure Auth Stack',
    prompt: 'Map secure authentication bulkhead',
    nodes: [
      { id: 'app', label: 'App Gate', x: 0.5, y: 0.12, kind: 'ui' },
      { id: 'auth', label: 'Auth SDK', x: 0.5, y: 0.38, kind: 'logic' },
      { id: 'token', label: 'Token Vault', x: 0.2, y: 0.65, kind: 'storage' },
      { id: 'api', label: 'API Guard', x: 0.8, y: 0.65, kind: 'cloud' },
      { id: 'session', label: 'Session', x: 0.5, y: 0.88, kind: 'data' },
    ],
    edges: [
      { from: 'app', to: 'auth', label: 'login' },
      { from: 'auth', to: 'token', label: 'store' },
      { from: 'auth', to: 'api', label: 'verify' },
      { from: 'token', to: 'session', label: 'restore' },
      { from: 'api', to: 'session', label: 'claims' },
    ],
    notes: [
      'Tokens in encrypted storage / keystore',
      'Short-lived access + refresh rotation',
      'Certificate pinning optional on high-risk paths',
    ],
  },
  {
    id: 'bp3',
    title: 'Modular Feature Graph',
    prompt: 'Explode modular feature navigation',
    nodes: [
      { id: 'app', label: 'App Nav', x: 0.5, y: 0.15, kind: 'ui' },
      { id: 'f1', label: 'Feature A', x: 0.18, y: 0.45, kind: 'logic' },
      { id: 'f2', label: 'Feature B', x: 0.5, y: 0.45, kind: 'logic' },
      { id: 'f3', label: 'Feature C', x: 0.82, y: 0.45, kind: 'logic' },
      { id: 'core', label: 'Core/DI', x: 0.5, y: 0.8, kind: 'data' },
    ],
    edges: [
      { from: 'app', to: 'f1', label: 'route' },
      { from: 'app', to: 'f2', label: 'route' },
      { from: 'app', to: 'f3', label: 'route' },
      { from: 'f1', to: 'core', label: 'inject' },
      { from: 'f2', to: 'core', label: 'inject' },
      { from: 'f3', to: 'core', label: 'inject' },
    ],
    notes: [
      'Features compile as isolated modules',
      'Navigation contracts stay thin',
      'Shared core owns networking & storage',
    ],
  },
  {
    id: 'bp4',
    title: 'Realtime Sync Bay',
    prompt: 'Blueprint realtime listener bay',
    nodes: [
      { id: 'ui', label: 'Live UI', x: 0.2, y: 0.25, kind: 'ui' },
      { id: 'bus', label: 'Event Bus', x: 0.5, y: 0.25, kind: 'logic' },
      { id: 'fs', label: 'Firestore', x: 0.8, y: 0.5, kind: 'cloud' },
      { id: 'cache', label: 'Memory Cache', x: 0.35, y: 0.7, kind: 'storage' },
      { id: 'worker', label: 'Sync Worker', x: 0.65, y: 0.85, kind: 'data' },
    ],
    edges: [
      { from: 'ui', to: 'bus', label: 'observe' },
      { from: 'bus', to: 'fs', label: 'listen' },
      { from: 'fs', to: 'cache', label: 'snapshot' },
      { from: 'cache', to: 'ui', label: 'render' },
      { from: 'worker', to: 'fs', label: 'write' },
    ],
    notes: [
      'Debounce noisy snapshot storms',
      'Conflict policy documented per collection',
      'Workers own privileged writes',
    ],
  },
];

export const focuses = [
  {
    title: 'Native Android',
    desc: 'Kotlin, Jetpack, Material Design, production architecture.',
    icon: 'phone-portrait-outline',
  },
  {
    title: 'Reliable Backends',
    desc: 'Firebase, REST APIs, secure auth, scalable data layers.',
    icon: 'server-outline',
  },
  {
    title: 'Security First',
    desc: 'Cyber security practices in every release cycle.',
    icon: 'shield-checkmark-outline',
  },
  {
    title: 'Continuous Growth',
    desc: '40+ certifications across AI, ML, cloud, and web.',
    icon: 'rocket-outline',
  },
];
