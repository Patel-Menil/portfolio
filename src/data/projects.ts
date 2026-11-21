import type { Project } from './types';

// Content rules for this file:
// - Metrics come from Menil's resume or the project's own repository. Targets are labelled as targets.
// - Implementation details for DeFi Nexus, Lead Intelligence, Voice RAG and the minor project were
//   checked against their public repositories (Nov 2026).
// - No screenshot here is a mock-up: DeFi Nexus images are captures of the live deployment and the
//   Tic-Tac-Toe image is served from the game's own itch.io page.

export const projects: Project[] = [
  // ───────────────────────────── FEATURED ─────────────────────────────
  {
    slug: 'sealapi',
    title: 'SealAPI',
    tagline:
      'An AI security and outcome-integrity system that protects sensitive AI payloads and produces verifiable cryptographic evidence of generated results.',
    category: 'AI Security · Cryptography · Blockchain',
    tier: 'featured',
    status: 'Ongoing at Bavrix Labs',
    context: 'Origin project of Bavrix Labs — the Bavrix product line builds on this work.',
    stack: ['Rust', 'Solidity', 'Gnosis Chain', 'X25519', 'HKDF', 'ChaCha20-Poly1305', 'Keccak-256'],
    highlights: [
      'Encrypted AI-payload pipeline built on X25519, HKDF and ChaCha20-Poly1305, spanning 5 media types.',
      'Five integrity domains committed to a single Keccak-256 root and anchored on Gnosis Chain.',
      'Event-log anchoring instead of on-chain proof storage — full payloads never touch the chain.',
    ],
    links: [],
    visual: 'sealapi',
    problem:
      'AI applications move sensitive prompts, documents and generated outputs through third-party infrastructure. Two questions follow: is the payload protected in transit and at rest, and can anyone later prove that a specific output was produced and has not been altered since? Conventional application logs are controlled by the operator, so they do not, on their own, give a customer independently verifiable evidence that an output is unchanged.',
    architecture: {
      steps: [
        { label: 'AI Application', detail: 'Client request' },
        { label: 'Secure Gateway', detail: 'Encrypted request path', tone: 'primary' },
        { label: 'Payload Processing', detail: '5 media types' },
        { label: 'Encryption / Verification', detail: 'X25519 · HKDF · ChaCha20-Poly1305', tone: 'primary' },
        { label: 'Hash Generation', detail: '5 integrity domains' },
        { label: 'Merkle Root', detail: 'Single Keccak-256 root', tone: 'success' },
        { label: 'Gnosis Chain', detail: 'Event log + block timestamp', tone: 'success', async: true },
      ],
      caption:
        'Only the integrity root reaches the chain. Payloads and proofs stay off-chain; the on-chain event provides a timestamped reference to verify against later.',
    },
    implementation: [
      {
        title: 'Encrypted payload pipeline',
        body: 'Each session establishes a shared secret through X25519 key agreement. HKDF derives purpose-specific symmetric keys from that secret, and ChaCha20-Poly1305 encrypts and authenticates payloads so that any tampering fails decryption. The pipeline handles five media types.',
      },
      {
        title: 'Outcome-integrity model',
        body: 'Every AI interaction is described by five integrity domains — request hash, output hash, attestation hash, enclave measurement and metadata. These are combined into a single Keccak-256 root, so one 32-byte value commits to the whole record.',
      },
      {
        title: 'On-chain anchoring',
        body: 'A Solidity contract on Gnosis Chain emits the root in an event. The block timestamp gives a public time reference, and the transaction receipt becomes the proof that the root existed at that point.',
      },
      {
        title: 'Verification path',
        body: 'To check an output later, the verifier recomputes the domain hashes from the retained off-chain record, rebuilds the root and compares it with the anchored event. Any change to the request, output or metadata produces a different root.',
      },
    ],
    decisions: [
      {
        title: 'Emit events instead of writing storage',
        body: 'The contract never needs to read an anchor back, so contract storage would be paying for a capability nobody uses. Event logs are part of the transaction receipt, publicly verifiable, and much cheaper than storage writes — this is the source of the gas-reduction target.',
      },
      {
        title: 'Commit a root, not the data',
        body: 'Putting customer payloads or full proofs on a public chain would leak data and make cost scale with payload size. A single root keeps on-chain footprint constant and reveals nothing about the content.',
      },
      {
        title: 'AEAD with ChaCha20-Poly1305',
        body: 'Authenticated encryption gives confidentiality and integrity in one primitive, and ChaCha20 performs well in software without relying on AES hardware acceleration.',
      },
      {
        title: 'Separate key agreement from key derivation',
        body: 'X25519 produces raw shared secrets; HKDF turns them into independent keys per purpose. Keys for different uses never share material directly.',
      },
    ],
    results: [
      { value: '~40%', label: 'Lower gas through event-based anchoring', kind: 'target' },
      { value: '~$0.05', label: 'Anchoring fee per 1,000 transactions', kind: 'target' },
      { value: '<200 ms', label: 'Round-trip on the encrypted path, excluding AI generation', kind: 'target' },
      { value: '5 → 1', label: 'Integrity domains committed to one Keccak-256 hash', kind: 'fact' },
    ],
    resultsNote:
      'Gas, fee and latency figures are design targets and estimates from the project, not independently benchmarked production guarantees.',
    panels: [
      {
        type: 'primitives',
        title: 'Cryptographic building blocks',
        items: [
          { name: 'X25519', role: 'Key agreement', detail: 'Two parties derive a shared secret without ever sending it.' },
          { name: 'HKDF', role: 'Key derivation', detail: 'Expands the shared secret into independent, purpose-bound keys.' },
          { name: 'ChaCha20-Poly1305', role: 'Authenticated encryption', detail: 'Encrypts payloads and detects any modification.' },
          { name: 'Keccak-256', role: 'Hashing', detail: 'Produces the integrity hashes and the anchored root.' },
        ],
      },
      {
        type: 'domains',
        title: 'Five integrity domains → one root',
        items: ['Request hash', 'Output hash', 'Attestation hash', 'Enclave measurement', 'Metadata'],
        result: 'Keccak-256 root → Gnosis Chain event',
        note: 'Changing any single domain changes the root, so the anchor commits to the full record.',
      },
      {
        type: 'comparison',
        title: 'Why event-based anchoring',
        columns: [
          {
            name: 'Storing proofs in contract storage',
            points: [
              'Pays for persistent state the contract never reads',
              'Cost grows with proof size',
              'Proof data becomes permanently public',
            ],
          },
          {
            name: 'Emitting the root in an event',
            points: [
              'Root lives in the transaction receipt — still publicly verifiable',
              'Constant cost: one 32-byte value per anchor',
              'Payloads and proofs stay off-chain',
            ],
          },
        ],
        conclusion: 'Integrity only needs a tamper-evident, timestamped commitment — not on-chain data availability.',
      },
    ],
  },
  {
    slug: 'voice-rag',
    title: 'Voice RAG with Proof-of-Answer',
    tagline:
      'A three-stage voice RAG pipeline — speech-to-text, hybrid retrieval and grounded answer generation — with hashes of the evidence and answer anchored on Solana Devnet.',
    category: 'Applied AI · Information Retrieval · Solana',
    tier: 'featured',
    status: 'Hackathon project',
    context: 'Built for the HH Goa 2026 hackathon on the ai4bharat/MSMARCO-XI dataset.',
    team: 'Team project',
    stack: ['Python', 'FastAPI', 'FAISS', 'BM25', 'Reciprocal Rank Fusion', 'Speech-to-Text', 'Solana Devnet', 'Next.js'],
    highlights: [
      'Dense and BM25 retrieval fused with Reciprocal Rank Fusion.',
      'Grounding-score guardrail on generated answers.',
      'Proof hashes anchored on Solana Devnet, off the critical HTTP path.',
    ],
    links: [
      {
        label: 'Team repository',
        href: 'https://github.com/jeel-p/voice-rag-with-web3',
        kind: 'github',
        note: 'Hosted on a teammate’s GitHub account',
      },
    ],
    visual: 'voice-rag',
    problem:
      'People ask questions by voice, in several Indian languages, over a corpus far too large to put in a prompt. Answers have to come from retrieved evidence rather than the model’s memory. Once an answer is shown, there should also be a way to show later which evidence it was based on.',
    architecture: {
      steps: [
        { label: 'Voice Input', detail: 'Microphone stream' },
        { label: 'Speech-to-Text', detail: 'Streaming STT', tone: 'primary' },
        {
          parallel: [
            { label: 'Dense retrieval', detail: 'Embeddings + FAISS' },
            { label: 'BM25', detail: 'Lexical index' },
          ],
        },
        { label: 'RRF', detail: 'Rank fusion', tone: 'primary' },
        { label: 'Grounded Answer', detail: 'LLM + grounding score', tone: 'primary' },
        { label: 'Answer Hash', detail: 'Chunks + answer digest', tone: 'success' },
        { label: 'Solana Devnet', detail: 'Async anchor', tone: 'success', async: true },
      ],
      caption:
        'The answer is returned to the user before any blockchain write. Anchoring runs as a separate flow, so chain latency or outages never block the RAG response.',
    },
    implementation: [
      {
        title: 'Stage 1 · Voice and speech processing',
        body: 'Audio is streamed from the browser to a realtime speech-to-text service over a WebSocket, and the transcript becomes the retrieval query.',
      },
      {
        title: 'Stage 2 · Hybrid retrieval',
        body: 'Two retrievers run on the same query: dense search with multilingual embeddings in a FAISS index, and BM25 over per-language lexical shards. Each returns its top candidates, Reciprocal Rank Fusion merges the two rankings, and the winning chunks are fetched from a chunk store.',
      },
      {
        title: 'Stage 3 · Grounded answer generation',
        body: 'An LLM writes the answer using only the top retrieved evidence. A grounding score compares the answer with that evidence and acts as a guardrail against unsupported content.',
      },
      {
        title: 'Proof-of-Answer',
        body: 'A canonical digest is computed over the retrieved chunks and the generated answer. That digest is written to Solana Devnet in a flow separate from the HTTP response, which gives a timestamped public record of what the answer was based on.',
      },
    ],
    decisions: [
      {
        title: 'Hybrid instead of a single retriever',
        body: 'Dense embeddings handle paraphrase and meaning across languages but can miss exact names, numbers and rare terms. BM25 is the opposite. Running both covers each one’s blind spots.',
      },
      {
        title: 'Reciprocal Rank Fusion to combine them',
        body: 'Cosine similarity and BM25 scores sit on different, uncalibrated scales. RRF ignores raw scores and combines ranks, so no score normalisation or tuning per query is needed, and documents both retrievers agree on rise to the top.',
      },
      {
        title: 'Blockchain writes off the critical path',
        body: 'Waiting for chain confirmation inside the request would add seconds of latency and make answers depend on Devnet availability. Anchoring separately keeps the RAG core independent of the blockchain layer.',
      },
      {
        title: 'Hash the evidence, not just the answer',
        body: 'Including the retrieved chunks in the digest ties the answer to the exact context it was generated from, which is what a later audit actually needs.',
      },
    ],
    results: [
      { value: '3', label: 'Stages: speech-to-text, retrieval, grounded answer', kind: 'fact' },
      { value: '3', label: 'Languages indexed — English, Gujarati, Hindi', kind: 'fact', note: 'Per repository README' },
      { value: '~7.9M', label: 'Unique passages in the production index', kind: 'fact', note: 'Per repository README' },
    ],
    resultsNote: 'No retrieval-accuracy, recall or latency benchmarks are claimed for this project.',
    panels: [
      {
        type: 'comparison',
        title: 'Dense retrieval vs BM25',
        columns: [
          {
            name: 'Dense retrieval',
            points: [
              'Matches meaning, not exact words',
              'Handles paraphrases and cross-lingual queries',
              'Weaker on names, IDs, numbers and rare terms',
            ],
          },
          {
            name: 'BM25',
            points: [
              'Exact term matching weighted by rarity',
              'Strong on names, numbers and domain terms',
              'Misses synonyms and rephrased questions',
            ],
          },
        ],
        conclusion: 'RRF merges both rankings by position, so a passage ranked well by both retrievers wins.',
      },
      {
        type: 'code',
        title: 'Reciprocal Rank Fusion',
        code: `score(d) = Σ  1 / (k + rank_r(d))
          r ∈ {dense, bm25}

# rank_r(d): position of passage d in retriever r's list
# k: smoothing constant that dampens the top ranks`,
        caption: 'Standard RRF formulation. Only ranks are used, so retrievers with incomparable scores can be fused directly.',
      },
    ],
  },
  {
    slug: 'lead-intelligence',
    title: 'Lead Generation & Prospect Intelligence',
    tagline:
      'A Python workflow that collects, enriches and prioritises potential business leads, turning raw lists into a structured prospect database for targeted outreach.',
    category: 'Data Engineering · Web Scraping',
    tier: 'featured',
    status: 'Internal tool for SealAPI',
    context: 'Built to support SealAPI business development.',
    stack: ['Python', 'FastAPI', 'Scrapling', 'Pydantic', 'openpyxl', 'Next.js', 'Docker', 'pytest'],
    highlights: [
      'Scraped 950+ potential leads for SealAPI.',
      'Shortlisted 144 high-potential prospects.',
      'Deterministic, explainable prioritisation with per-person JSON profiles.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/Patel-Menil/LeadDetailsScraper', kind: 'github' }],
    visual: 'lead-intelligence',
    problem:
      'Outreach for an early-stage security product depends on knowing who to contact and why. Researching hundreds of people and companies by hand is slow and inconsistent, and an unprioritised list wastes outreach effort on poor fits.',
    architecture: {
      steps: [
        { label: 'Profile Discovery', detail: 'CSV / XLSX lead lists' },
        { label: 'Information Extraction', detail: 'Rate-limited scraping', tone: 'primary' },
        { label: 'Company / Product Enrichment', detail: 'Public web signals' },
        { label: 'Lead Qualification', detail: 'Deterministic P0 / P1 / P2', tone: 'primary' },
        { label: 'Structured Prospect Database', detail: 'CSV + JSON profiles', tone: 'success' },
      ],
      caption: 'A batch pipeline with a CLI and a dashboard. Each batch is resumable and writes its own manifest and error log.',
    },
    implementation: [
      {
        title: 'Import and de-duplication',
        body: 'Lead lists are imported from CSV or XLSX with automatic column detection. Each lead gets a stable ID, and duplicates are flagged by normalised email, profile URL, or name plus company before any network request is made.',
      },
      {
        title: 'Extraction and enrichment',
        body: 'Scrapling pulls public page titles, meta descriptions, headings and technology or security keywords for each person and their company. Requests are rate-limited with timeouts and bounded retries, and login walls are detected and flagged rather than bypassed.',
      },
      {
        title: 'Qualification',
        body: 'Leads are assigned deterministic priorities — P0, P1 or P2 — from the extracted signals, so the same input always produces the same ranking.',
      },
      {
        title: 'Outputs and interfaces',
        body: 'Each batch writes a prioritised CSV, one JSON profile per person, an error log and a manifest. A FastAPI backend and a Next.js dashboard sit on top, along with an individual-research page that looks up a single person by name.',
      },
    ],
    decisions: [
      {
        title: 'Deterministic scoring over a black box',
        body: 'Rule-based priorities are reproducible and easy to explain to whoever does the outreach. When a lead looks mis-ranked, the reason can be traced to specific signals.',
      },
      {
        title: 'De-duplicate before fetching',
        body: 'Merging duplicates first avoids repeated requests and keeps one profile per person.',
      },
      {
        title: 'Polite, resumable crawling',
        body: 'Rate limits, timeouts and retry caps keep the scraper well-behaved. Resumable batches mean a long run can be interrupted without starting over.',
      },
    ],
    results: [
      { value: '950+', label: 'Potential leads scraped', kind: 'reported' },
      { value: '144', label: 'High-potential prospects shortlisted', kind: 'reported' },
    ],
    resultsNote: 'No conversion rate or outreach outcome is claimed.',
  },
  {
    slug: 'defi-nexus',
    title: 'DeFi Nexus',
    tagline:
      'A DeFi protocol and dashboard with an ERC-4626 tokenized vault, a collateralised lending market and on-chain risk enforcement.',
    category: 'Blockchain · DeFi · Full-stack',
    tier: 'featured',
    status: 'Open source (MIT) · live frontend',
    stack: ['Solidity', 'Hardhat', 'OpenZeppelin', 'Chainlink AggregatorV3', 'React', 'ethers.js', 'Zustand', 'Recharts'],
    highlights: [
      'ERC-4626 vault built on OpenZeppelin with re-entrancy guards.',
      'Lending market that blocks any borrow or withdrawal leaving the health factor below 1.',
      'Price oracle that rejects stale and non-positive feed answers.',
    ],
    links: [
      { label: 'Live app', href: 'https://defi-nexus-two.vercel.app/', kind: 'live' },
      { label: 'GitHub', href: 'https://github.com/Patel-Menil/DefiNexus', kind: 'github' },
    ],
    visual: 'defi-nexus',
    problem:
      'Most DeFi tutorials stop at a single token contract. DeFi Nexus builds the whole stack end to end — vault, lending, oracle and dashboard — with the focus on enforcing safety inside the contracts. A frontend check can always be bypassed by calling the contract directly.',
    architecture: {
      steps: [
        { label: 'User / Wallet', detail: 'MetaMask' },
        { label: 'React Frontend', detail: 'ethers.js v6 · Zustand', tone: 'primary' },
        { label: 'Smart Contracts', detail: 'Solidity 0.8.24' },
        {
          parallel: [
            { label: 'ERC-4626 Vault', detail: 'Deposit · withdraw · shares' },
            { label: 'Lending Market', detail: 'Collateral · borrow · repay' },
          ],
        },
        { label: 'On-chain Risk Checks', detail: 'Price oracle · health factor', tone: 'success' },
      ],
      caption:
        'Runs against a local Hardhat chain by default, with network configs for Sepolia, Arbitrum Sepolia, Base Sepolia, Optimism Sepolia and Polygon Amoy.',
    },
    implementation: [
      {
        title: 'ERC-4626 vault',
        body: 'DeFiNexusVault inherits OpenZeppelin’s ERC4626 implementation for standard share accounting. deposit, mint, withdraw and redeem are wrapped with nonReentrant, and an owner-set strategy address is reserved for future yield routing.',
      },
      {
        title: 'Lending market',
        body: 'DeFiNexusLending supports depositCollateral, borrow, repay and withdrawCollateral for a collateral and a debt asset. Positions are valued in USD through the oracle, and the health factor is computed on-chain from collateral value, liquidation threshold and debt value.',
      },
      {
        title: 'Price and risk oracles',
        body: 'PriceOracle reads Chainlink-style AggregatorV3 feeds per token. It rejects non-positive answers, enforces a maximum staleness, normalises to 18 decimals and supports an admin-set fallback price. RiskOracle stores role-gated protocol risk scores from 0 to 100.',
      },
      {
        title: 'Frontend and services',
        body: 'A React + Vite app with ethers v6, a Zustand store and Recharts covers the dashboard, portfolio, yield, lending, borrowing, risk centre and activity pages. A service layer wraps vault, lending, risk and yield logic, and a local rule-based engine generates portfolio insights.',
      },
    ],
    decisions: [
      {
        title: 'Standardise on ERC-4626',
        body: 'Using the tokenized-vault standard makes shares composable with other protocols and reuses an audited OpenZeppelin implementation instead of hand-rolled share maths.',
      },
      {
        title: 'Enforce risk in the contract, not the UI',
        body: 'Borrow and withdrawCollateral revert with HealthFactorTooLow when a position would become unsafe. The rule holds no matter which client calls the contract.',
      },
      {
        title: 'Treat oracle data as untrusted',
        body: 'Stale or invalid prices are a classic DeFi failure mode. The oracle reverts instead of silently using a bad price.',
      },
      {
        title: 'Role-based access control',
        body: 'Feed configuration and risk-score updates are restricted to dedicated roles through OpenZeppelin AccessControl, which separates operational permissions from ownership.',
      },
    ],
    results: [
      { value: 'ERC-4626', label: 'Tokenized vault standard, via OpenZeppelin', kind: 'fact' },
      { value: 'HF < 1', label: 'Unsafe borrows and withdrawals revert on-chain', kind: 'fact' },
      { value: '5 + local', label: 'Testnet configs plus a local Hardhat chain', kind: 'fact' },
    ],
    limitations: [
      'Liquidations are not implemented: unsafe positions are prevented rather than liquidated.',
      'Dashboard figures on the live site are demo data until a wallet is connected to a deployed chain.',
      'Built as a learning project; the contracts have not been audited.',
    ],
    media: [
      {
        src: '/projects/defi-nexus/dashboard.jpg',
        alt: 'DeFi Nexus dashboard showing portfolio value, blended APY, risk score gauge, 30-day performance chart and top risk-adjusted yields.',
        caption: 'Dashboard — portfolio, risk score and yield table (demo data, as labelled in the app).',
        width: 800,
        height: 500,
      },
      {
        src: '/projects/defi-nexus/risk-center.jpg',
        alt: 'DeFi Nexus Risk Center with an overall risk gauge, a four-factor heatmap and warnings about concentration and health factor.',
        caption: 'Risk Center — four-factor risk model with health-factor warnings.',
        width: 799,
        height: 506,
      },
      {
        src: '/projects/defi-nexus/landing.jpg',
        alt: 'DeFi Nexus landing page describing a multi-chain yield aggregator with lending, vaults and a risk engine.',
        caption: 'Landing page of the live deployment.',
        width: 799,
        height: 506,
      },
    ],
  },
  {
    slug: 'gslv',
    title: 'GSLV Rocket Simulation',
    tagline:
      'An interactive, replayable GSLV launch simulation built in Unity and C#, with a three-stage launch sequence driven by physics-based scripts.',
    category: 'Simulation · Game Development',
    tier: 'featured',
    status: 'Released · playable in browser',
    context: 'Developed during the NextIn Lab Unity internship.',
    stack: ['Unity', 'C#', 'Physics simulation', 'UI systems', 'Audio systems'],
    highlights: [
      'Three-stage launch sequence: ignition, booster separation and ascent.',
      '20+ integrated asset packages for gameplay, controls, interface and sound.',
      'Held 30 FPS after optimising the UI and audio pipelines.',
    ],
    links: [{ label: 'Play on itch.io', href: 'https://spiritmenil.itch.io/gslv', kind: 'play', note: 'Runs in the browser (HTML5)' }],
    visual: 'gslv',
    problem:
      'A multi-stage launch is a precise sequence of events. Ignition, booster separation and each stage handover have to happen in the right order and respond believably to physics. The goal was to make that sequence interactive and replayable instead of a fixed animation.',
    architecture: {
      steps: [
        { label: 'Pre-launch', detail: 'Controls + UI' },
        { label: 'Ignition', detail: 'Stage 1 + boosters', tone: 'primary' },
        { label: 'Booster Separation', detail: 'Physics-driven detach', tone: 'primary' },
        { label: 'Stage 2', detail: 'Ascent' },
        { label: 'Stage 3', detail: 'Upper stage' },
        { label: 'Telemetry', detail: 'Validation graphs', tone: 'success' },
      ],
      caption: 'A stage-wise flow in which each phase owns its own events, physics behaviour, UI state and audio cues.',
    },
    implementation: [
      {
        title: 'Stage-wise simulation flow',
        body: 'The launch is divided into explicit stages, each with its own entry conditions and events, which keeps the sequence predictable and replayable.',
      },
      {
        title: 'Physics-driven behaviour',
        body: 'C# scripts model ignition, booster detachment and ascent through physics rather than canned animation, so separation and flight respond to the simulation state.',
      },
      {
        title: 'Assets, UI and audio',
        body: 'More than 20 asset packages were integrated for gameplay, controls, interface and sound. The UI workflow and audio pipeline were then optimised to keep the frame rate stable.',
      },
      {
        title: 'Reusable tooling',
        body: 'The simulation spans 5+ C# scripts, along with reusable debugging workflows for checking stage transitions and physics behaviour.',
      },
    ],
    decisions: [
      {
        title: 'Physics over keyframed animation',
        body: 'Physics-based scripting makes each run behave like a simulation rather than a cutscene, which is what makes it replayable.',
      },
      {
        title: 'Explicit stages',
        body: 'Giving every stage clear ownership of its events made ordering bugs easy to isolate and debug.',
      },
      {
        title: 'Optimise UI and audio first',
        body: 'With many assets loaded, the UI and audio pipelines were the main sources of frame-time cost, so they were optimised to hold a steady frame rate.',
      },
    ],
    results: [
      { value: '3', label: 'Launch stages simulated', kind: 'fact' },
      { value: '20+', label: 'Asset packages integrated', kind: 'reported' },
      { value: '30 FPS', label: 'Sustained frame rate', kind: 'reported' },
      { value: '10 ms', label: 'Load times', kind: 'reported' },
    ],
    resultsNote: 'Performance figures as reported from the internship work.',
  },

  // ───────────────────────────── OTHER ─────────────────────────────
  {
    slug: 'khetify',
    title: 'Khetify',
    tagline:
      'A farming assistant built as a Smart India Hackathon team project, using machine learning on weather and soil data to give crop-related insights.',
    category: 'AI · Agriculture · Unity',
    tier: 'other',
    status: 'SIH 2025 · Top 10',
    context: 'Smart India Hackathon 2025 — Top 10 with Team Khetify.',
    team: 'Team project',
    stack: ['Unity 6', 'C#', 'Random Forest', 'Weather API', 'SoilGrids API'],
    highlights: ['Random Forest crop and yield prediction', 'Six agricultural parameters', 'NPK calculator module in Unity'],
    links: [],
    visual: 'none',
    problem:
      'Crop decisions depend on local rainfall, humidity and soil chemistry, but farmers rarely have that data in one place or a way to turn it into a recommendation.',
    architecture: {
      steps: [
        { label: 'Location', detail: 'Farm coordinates' },
        {
          parallel: [
            { label: 'Weather API', detail: 'Rainfall · humidity' },
            { label: 'SoilGrids API', detail: 'pH · N · P · K' },
          ],
        },
        { label: 'Feature Vector', detail: '6 parameters', tone: 'primary' },
        { label: 'Random Forest', detail: 'Crop / yield prediction', tone: 'primary' },
        { label: 'Insights', detail: 'In-app recommendations', tone: 'success' },
      ],
      caption: 'Environmental data is gathered automatically from the user’s location and fed to the model.',
    },
    implementation: [
      {
        title: 'Prediction model',
        body: 'A Random Forest model predicts suitable crops and yield from six parameters: rainfall, humidity, soil pH, nitrogen, phosphorus and potassium.',
      },
      {
        title: 'Data integration',
        body: 'Weather data comes from a weather API and soil properties from the SoilGrids API, both based on the user’s location.',
      },
      {
        title: 'NPK calculator',
        body: 'A Unity module helps users work out nitrogen, phosphorus and potassium requirements.',
      },
      {
        title: 'Application scripting',
        body: 'C# scripting and integration work in Unity 6 connected the APIs, the model output and the interface.',
      },
    ],
    decisions: [
      {
        title: 'Random Forest for tabular data',
        body: 'An ensemble of decision trees handles features on very different scales without normalisation, captures non-linear interactions between soil and weather, and holds up on modest datasets.',
      },
      {
        title: 'Fetch data instead of asking for it',
        body: 'Pulling weather and soil values from APIs removes the hardest step for users — knowing their own soil chemistry.',
      },
    ],
    results: [
      { value: 'Top 10', label: 'Smart India Hackathon 2025', kind: 'fact' },
      { value: '6', label: 'Agricultural input parameters', kind: 'fact' },
      { value: '2', label: 'External data APIs integrated', kind: 'fact' },
    ],
    resultsNote: 'No model-accuracy or agricultural-impact figures are claimed.',
  },
  {
    slug: 'tic-tac-toe',
    title: 'Tic-Tac-Toe AI',
    tagline:
      'An adversarial game AI that uses Minimax and recursive game-tree search to play a hard mode that cannot be beaten.',
    category: 'Game AI · Algorithms',
    tier: 'other',
    status: 'Released · browser and Android',
    stack: ['Unity 6', 'C#', 'Minimax', 'Recursion', 'Game-tree search'],
    highlights: ['Unbeatable hard mode', 'Player-vs-player and player-vs-computer modes', 'Playable in the browser'],
    links: [{ label: 'Play on itch.io', href: 'https://spiritmenil.itch.io/tictactoe', kind: 'play', note: 'HTML5 and Android' }],
    visual: 'none',
    problem:
      'A computer opponent that plays perfectly has to evaluate every consequence of every move — the canonical introduction to adversarial search.',
    architecture: {
      steps: [
        { label: 'Board State', detail: '3 × 3 grid' },
        { label: 'Generate Moves', detail: 'Empty cells' },
        { label: 'Recursive Minimax', detail: 'Max / min turns', tone: 'primary' },
        { label: 'Terminal Scoring', detail: 'Win · loss · draw' },
        { label: 'Best Move', detail: 'Optimal choice', tone: 'success' },
      ],
      caption: 'At each turn the AI explores the game tree from the current position and plays the move with the best guaranteed outcome.',
    },
    implementation: [
      {
        title: 'Minimax',
        body: 'The AI assumes the opponent also plays perfectly. On its own turns it picks the move that maximises the score; on the opponent’s turns it assumes the move that minimises it.',
      },
      {
        title: 'Recursive decision-making',
        body: 'Each candidate move is applied, the function recurses on the resulting board with the other player to move, and the move is undone afterwards.',
      },
      {
        title: 'Game-tree exploration',
        body: 'Recursion continues until a terminal state — a win, a loss or a full board — which is scored and propagated back up the tree.',
      },
      {
        title: 'Optimal move selection',
        body: 'Because Tic-Tac-Toe is small enough to search completely, the chosen move is provably optimal. That is why hard mode can at best be drawn, never beaten.',
      },
    ],
    decisions: [
      {
        title: 'Exhaustive search over heuristics',
        body: 'Tic-Tac-Toe has only 5,478 legal positions, so a full search is cheap and gives perfect play. No evaluation heuristic is needed.',
      },
      {
        title: 'Adversarial framing',
        body: 'Modelling the opponent as a minimiser is what makes the AI defensive as well as aggressive. It blocks forks as readily as it creates them.',
      },
    ],
    results: [
      { value: 'Unbeatable', label: 'Hard mode — best result for a human is a draw', kind: 'fact' },
      { value: '2', label: 'Game modes: PvP and PvC', kind: 'fact' },
    ],
    panels: [
      {
        type: 'code',
        title: 'Minimax, in essence',
        code: `int Minimax(Board b, bool aiTurn) {
    if (b.IsWin(AI))    return +1;
    if (b.IsWin(Human)) return -1;
    if (b.IsFull())     return  0;

    int best = aiTurn ? int.MinValue : int.MaxValue;
    foreach (var cell in b.EmptyCells()) {
        b.Place(cell, aiTurn ? AI : Human);
        int score = Minimax(b, !aiTurn);
        b.Clear(cell);
        best = aiTurn ? Math.Max(best, score)
                      : Math.Min(best, score);
    }
    return best;
}`,
        caption: 'Illustrative C# sketch of the algorithm, not a verbatim excerpt from the game source.',
      },
    ],
    media: [
      {
        src: 'https://img.itch.zone/aW1hZ2UvMzg0OTA4Mi8yMjk2MzM0Ny5qcGc=/347x500/ZQgCh%2F.jpg',
        alt: 'Tic-Tac-Toe game screen with a neon-styled 3 by 3 board and buttons for player-vs-player and player-vs-computer modes.',
        caption: 'In-game screenshot from the itch.io release.',
        width: 322,
        height: 500,
        portrait: true,
      },
    ],
  },
  {
    slug: 'rocket-validator',
    title: 'Rocket Assembly Validator',
    tagline: 'A rule-based C++ system that checks whether a multi-stage rocket assembly sequence is valid.',
    category: 'Algorithms · C++ · Logical Systems',
    tier: 'other',
    status: 'Personal project',
    stack: ['C++', 'Data structures', 'Logical modelling', 'State-based reasoning'],
    highlights: ['Assembly constraints and dependencies', 'Invalid-sequence detection', 'Conditional state transitions'],
    links: [],
    visual: 'none',
    problem:
      'Assembling a multi-stage rocket is order-dependent: some components require others to be in place first, and some combinations are never valid. Checking a proposed sequence by hand is error-prone.',
    architecture: {
      steps: [
        { label: 'Assembly Sequence', detail: 'Ordered steps' },
        { label: 'Constraint Model', detail: 'Rules + dependencies', tone: 'primary' },
        { label: 'State Transitions', detail: 'Step-by-step', tone: 'primary' },
        { label: 'Violation Check', detail: 'Missing / out-of-order' },
        { label: 'Verdict', detail: 'Valid or first violation', tone: 'success' },
      ],
      caption: 'The validator replays a sequence step by step against a model of assembly rules.',
    },
    implementation: [
      {
        title: 'Assembly constraints',
        body: 'Rules describe which components can be attached and under what conditions.',
      },
      {
        title: 'Dependency validation',
        body: 'Each step is checked against its prerequisites, so attaching a component before something it depends on is rejected.',
      },
      {
        title: 'Conditional state transitions',
        body: 'The assembly state is updated after each valid step, and later rules are evaluated against that evolving state.',
      },
      {
        title: 'Invalid-sequence detection',
        body: 'Sequences that violate a rule are flagged so the problem can be located.',
      },
    ],
    decisions: [
      {
        title: 'Model it as a state machine',
        body: 'Treating assembly as transitions between well-defined states turns a vague checklist into logic that can be checked mechanically.',
      },
      {
        title: 'Keep rules declarative',
        body: 'Separating the rule data from the checking logic makes new constraints easy to add.',
      },
    ],
    results: [],
    resultsNote: 'An algorithmic exercise; not used in any production setting.',
  },

  // ───────────────────────────── ACADEMIC ─────────────────────────────
  {
    slug: 'federated-icu',
    title: 'Federated Multimodal Graph Learning for ICU Outcome Prediction',
    tagline:
      'A B.Tech minor project exploring multimodal learning, patient-similarity graphs and federated optimisation for mortality and sepsis prediction on eICU data.',
    category: 'Academic Research · Machine Learning · Healthcare',
    tier: 'academic',
    status: 'Academic prototype',
    context: 'B.Tech minor project, IIIT Bhopal.',
    team: 'Menil Patel · Dhruv Savaliya',
    stack: ['Python', 'PyTorch', 'PyTorch Geometric', 'GraphSAGE', 'FedAvg', 'pandas', 'scikit-learn'],
    highlights: ['Tabular + time-series fusion', 'Patient-similarity graphs with GraphSAGE', 'Simulated FedAvg across hospitals'],
    links: [{ label: 'GitHub', href: 'https://github.com/Patel-Menil/minorProject', kind: 'github' }],
    visual: 'none',
    problem:
      'ICU data is split across hospitals that cannot easily pool patient records. The project asks whether a model can learn from several sites without centralising the data, and whether relationships between similar patients improve early prediction of mortality and sepsis.',
    architecture: {
      steps: [
        { label: 'eICU (per hospital)', detail: 'First 24 h of stay' },
        {
          parallel: [
            { label: 'Tabular encoder', detail: 'MLP' },
            { label: 'Time-series encoder', detail: 'LSTM over 4-h bins' },
          ],
        },
        { label: 'Multimodal Fusion', detail: 'Joint embedding', tone: 'primary' },
        { label: 'Patient Graph', detail: 'Cosine k-NN', tone: 'primary' },
        { label: 'GraphSAGE', detail: '2 layers' },
        { label: 'Prediction Heads', detail: 'Mortality · sepsis', tone: 'success' },
      ],
      caption: 'Each simulated hospital trains locally, and model weights are aggregated with Federated Averaging.',
    },
    implementation: [
      {
        title: 'Data processing',
        body: 'Prepared eICU data is loaded per hospital. Tabular and time-series records are paired by patient, and the first 24 hours are represented as six 4-hour bins. Hospitals are split into separate train, validation and test groups.',
      },
      {
        title: 'Multimodal encoding',
        body: 'An MLP encodes tabular features and a two-layer LSTM encodes the time series. The two embeddings are fused into a joint patient representation.',
      },
      {
        title: 'Patient-similarity graphs',
        body: 'Within each hospital, patients are connected to their nearest neighbours by cosine similarity, and a two-layer GraphSAGE model propagates information across those edges.',
      },
      {
        title: 'Federated optimisation',
        body: 'Training uses Federated Averaging over hospital clients, with class-weighted loss for the heavily imbalanced outcomes and evaluation on held-out hospitals.',
      },
    ],
    decisions: [
      {
        title: 'Split by hospital, not by patient',
        body: 'Holding out entire hospitals tests whether the model generalises to unseen sites, which is the question federated learning is meant to answer.',
      },
      {
        title: 'Graph layer on fused embeddings',
        body: 'Building the similarity graph after multimodal fusion lets neighbourhoods reflect both static and temporal patient information.',
      },
      {
        title: 'Imbalance-aware evaluation',
        body: 'With rare positive outcomes, accuracy is misleading. Class weighting and threshold-aware metrics give a more honest picture.',
      },
    ],
    results: [],
    resultsNote: 'Experimental results are not reported here until they have been reviewed.',
    limitations: [
      'Federated training is simulated in a single process on one machine.',
      'It does not demonstrate a real multi-hospital deployment.',
      'No differential privacy or secure aggregation is implemented.',
      'Not clinically validated and not medical software — no clinical efficacy is claimed.',
      'The public repository’s demo runs on synthetic data; eICU data is not redistributed.',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.tier === 'featured');
export const otherProjects = projects.filter((p) => p.tier === 'other');
export const academicProjects = projects.filter((p) => p.tier === 'academic');

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
