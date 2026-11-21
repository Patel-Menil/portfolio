export interface SkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  /** Where this group shows up in real work — keeps the list honest. */
  evidence: string;
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    summary: 'Languages I write production and contest code in.',
    skills: ['C++', 'C#', 'Rust', 'Python', 'Solidity', 'SQL', 'JavaScript'],
    evidence: 'Competitive programming · SealAPI · Unity projects · lead pipeline',
  },
  {
    id: 'fundamentals',
    title: 'CS Fundamentals',
    summary: 'The base everything else is built on.',
    skills: [
      'Data Structures',
      'Algorithms',
      'Object-Oriented Programming',
      'Complexity Analysis',
      'Recursion',
      'Backtracking',
      'Competitive Programming',
      'Problem Solving',
    ],
    evidence: 'CodeChef 5★ · Codeforces Expert · CODAME mentoring',
  },
  {
    id: 'web3',
    title: 'Blockchain & Web3',
    summary: 'Smart contracts and on-chain integrity.',
    skills: [
      'EVM',
      'Gnosis Chain',
      'Smart Contracts',
      'Solidity',
      'Event Logs',
      'On-chain Attestation',
      'Blockchain Anchoring',
      'Gas Optimization',
      'Solana',
    ],
    evidence: 'SealAPI anchoring · DeFi Nexus · Voice RAG proof-of-answer',
  },
  {
    id: 'crypto',
    title: 'Cryptography & Security',
    summary: 'Primitives for confidentiality and integrity.',
    skills: [
      'X25519',
      'ChaCha20-Poly1305',
      'HKDF',
      'Keccak-256',
      'Encryption',
      'Hash Integrity Verification',
      'Secure Data Processing',
    ],
    evidence: 'SealAPI encrypted payload pipeline',
  },
  {
    id: 'ai',
    title: 'AI / ML & Backend',
    summary: 'Retrieval, prediction and data pipelines.',
    skills: [
      'Retrieval-Augmented Generation',
      'BM25',
      'Hybrid Retrieval',
      'Reciprocal Rank Fusion',
      'Grounded Answer Generation',
      'Speech-to-Text',
      'Random Forest',
      'REST APIs',
      'Data Extraction',
    ],
    evidence: 'Voice RAG · Khetify · lead intelligence pipeline',
  },
  {
    id: 'games',
    title: 'Game Development',
    summary: 'Simulations and game AI in Unity.',
    skills: ['Unity 6', 'C#', 'Physics-based Scripting', 'Game Logic', 'Simulation Systems', 'Minimax', 'Game-tree Search'],
    evidence: 'GSLV simulation · Tic-Tac-Toe AI · Khetify',
  },
  {
    id: 'tools',
    title: 'Tools',
    summary: 'Day-to-day engineering tooling.',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Visual Studio', 'VS Code', 'PyCharm', 'Google Cloud Platform'],
    evidence: 'Used across all projects',
  },
];
