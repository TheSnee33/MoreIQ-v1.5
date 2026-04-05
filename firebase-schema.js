// ─── MoreIQ: FIREBASE FIRESTORE SCHEMA (v1.4) ─────────────────────────────────
// Project: dateiq-3f9b8  (will migrate to moreiq project)
// Database: Cloud Firestore
//
// Supports both DateIQ and BusinessIQ modes under MoreIQ umbrella.
// Includes interest/notes tracking and session mode differentiation.
// ──────────────────────────────────────────────────────────────────────────────

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  COLLECTION STRUCTURE                                                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  users/{userId}                                                              ║
║    ├── sessions/{sessionId}                                                  ║
║    │     ├── traitScores/{traitKey}                                         ║
║    │     └── interests/{interestId}                                         ║
║    ├── credits (embedded field)                                              ║
║    └── referrals (embedded field)                                            ║
║                                                                              ║
║  waitlist/{docId}          (email/IG capture page signups)                   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

// ── COLLECTION: users ─────────────────────────────────────────────────────────
const userDocument = {
  uid: "string",
  displayName: "string",
  email: "string",
  igHandle: "string|null",
  createdAt: "timestamp",
  lastActive: "timestamp",

  credits: {
    balance: "number",
    totalPurchased: "number",
    totalEarned: "number",
    totalSpent: "number",
  },

  referral: {
    code: "string",
    referredBy: "string|null",
    referralCount: "number",
    creditsEarned: "number",
  },

  voiceProfile: {
    trained: "boolean",
    sampleCount: "number",
    trainedAt: "timestamp|null",
  },

  // Bluetooth coaching preferences
  coachingPrefs: {
    bluetoothEnabled: "boolean",
    coachingVolume: "number",       // 0-100
    coachingFrequency: "string",    // "low" | "medium" | "high"
    preferredVoice: "string",       // TTS voice preference
  },

  disclaimersAccepted: "boolean",
  disclaimerAcceptedAt: "timestamp|null",
};

// ── SUBCOLLECTION: users/{userId}/sessions ────────────────────────────────────
const sessionDocument = {
  userId: "string",
  mode: "string",                  // "date" | "business" — MoreIQ mode
  subjectName: "string",           // Name of person being analyzed (date or prospect)
  context: "string",               // DateIQ: "First Date" etc. / BusinessIQ: "Sales Call" etc.
  date: "string",
  createdAt: "timestamp",
  duration: "string",
  durationSeconds: "number",

  audioRef: "string|null",
  transcript: "string",

  overallScore: "number",
  summary: "string",

  reportUnlocked: "boolean",
  unlockedAt: "timestamp|null",
  creditsCost: "number",

  traitCount: "number",            // 37
  clipsCount: "number",
  modelVersion: "string",

  // Interest/Notes tracking (AI-extracted)
  interests: {
    likes: ["string"],             // Things the subject likes/is interested in
    dislikes: ["string"],          // Things the subject dislikes/avoids
    mentions: ["string"],          // Notable mentions (products, places, people)
    keyInsights: ["string"],       // AI-generated actionable insights
  },

  // BusinessIQ-specific fields
  dealStage: "string|null",        // "prospecting" | "qualifying" | "proposal" | "closing"
  nextSteps: ["string"],           // AI-suggested follow-up actions
  objections: ["string"],          // Key objections raised during the conversation
};

// ── SUBCOLLECTION: users/{userId}/sessions/{sessionId}/traitScores ────────────
const traitScoreDocument = {
  traitKey: "string",
  label: "string",
  category: "string",              // DateIQ: "negative"|"positive"|"polar"|"balance"
                                   // BusinessIQ: "buyer"|"risk"|"polar"|"balance"
  score: "number",
  maxScore: "number",
  scoreColor: "string",
  scoreLabel: "string",
  notes: "string",

  idealLabel: "string|null",
  worstLabel: "string|null",

  lowLabel: "string|null",
  midLabel: "string|null",
  highLabel: "string|null",
  zoneLabel: "string|null",

  clips: [
    {
      timestampStart: "string",
      timestampEnd: "string",
      quote: "string",
      significance: "string",
    },
  ],
};

// ── COLLECTION: waitlist ──────────────────────────────────────────────────────
const waitlistDocument = {
  name: "string",
  email: "string",
  igHandle: "string",
  whyAppeal: "string|null",
  followedIG: "boolean",
  createdAt: "timestamp",
  convertedToUser: "boolean",
  creditsAwarded: "number",
};


// ── FIRESTORE SECURITY RULES ─────────────────────────────────────────────────
const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /sessions/{sessionId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;

        match /traitScores/{traitKey} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }

    match /waitlist/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null
        && request.auth.token.admin == true;
    }
  }
}
`;


// ── FIRESTORE INDEXES ─────────────────────────────────────────────────────────
const requiredIndexes = [
  {
    collection: "users/{userId}/sessions",
    fields: [
      { field: "mode", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Filter sessions by mode (date/business), sorted by recency",
  },
  {
    collection: "users/{userId}/sessions",
    fields: [
      { field: "subjectName", order: "ASCENDING" },
      { field: "createdAt", order: "DESCENDING" },
    ],
    description: "Filter sessions by subject name, sorted by recency",
  },
  {
    collection: "users/{userId}/sessions/{sessionId}/traitScores",
    fields: [
      { field: "category", order: "ASCENDING" },
      { field: "score", order: "DESCENDING" },
    ],
    description: "Group trait scores by category, sorted by score",
  },
];


// ── SAVE HELPER (REST API) ───────────────────────────────────────────────────
export const saveSessionToFirestore = async (projectId, apiKey, userId, sessionData) => {
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

  try {
    // 1. Create session document
    const sessionFields = {
      mode: { stringValue: sessionData.mode || "date" },
      subjectName: { stringValue: sessionData.subjectName || "Unknown" },
      context: { stringValue: sessionData.context },
      date: { stringValue: sessionData.date },
      duration: { stringValue: sessionData.duration },
      durationSeconds: { integerValue: sessionData.durationSeconds || 0 },
      transcript: { stringValue: sessionData.transcript },
      overallScore: { doubleValue: sessionData.overallScore },
      summary: { stringValue: sessionData.summary || "" },
      reportUnlocked: { booleanValue: false },
      creditsCost: { integerValue: 5 },
      traitCount: { integerValue: 37 },
      clipsCount: { integerValue: sessionData.clipsCount || 0 },
      modelVersion: { stringValue: "claude-sonnet-4-20250514" },
      userId: { stringValue: userId },
    };

    // Add interests if present
    if (sessionData.interests) {
      sessionFields.interests = {
        mapValue: {
          fields: {
            likes: { arrayValue: { values: (sessionData.interests.likes || []).map(s => ({ stringValue: s })) } },
            dislikes: { arrayValue: { values: (sessionData.interests.dislikes || []).map(s => ({ stringValue: s })) } },
            mentions: { arrayValue: { values: (sessionData.interests.mentions || []).map(s => ({ stringValue: s })) } },
            keyInsights: { arrayValue: { values: (sessionData.interests.keyInsights || []).map(s => ({ stringValue: s })) } },
          },
        },
      };
    }

    // Add BusinessIQ-specific fields
    if (sessionData.mode === "business") {
      if (sessionData.dealStage) sessionFields.dealStage = { stringValue: sessionData.dealStage };
      if (sessionData.nextSteps) {
        sessionFields.nextSteps = { arrayValue: { values: sessionData.nextSteps.map(s => ({ stringValue: s })) } };
      }
      if (sessionData.objections) {
        sessionFields.objections = { arrayValue: { values: sessionData.objections.map(s => ({ stringValue: s })) } };
      }
    }

    const sessionRes = await fetch(`${baseUrl}/users/${userId}/sessions?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: sessionFields }),
    });

    const session = await sessionRes.json();
    const sessionId = session.name?.split("/").pop();

    // 2. Save each trait score
    for (const trait of sessionData.traits) {
      const traitFields = {
        traitKey: { stringValue: trait.key },
        label: { stringValue: trait.label },
        category: { stringValue: trait.category },
        score: { doubleValue: trait.score },
        maxScore: { integerValue: 100 },
        scoreColor: { stringValue: trait.scoreColor || "orange" },
        scoreLabel: { stringValue: trait.scoreLabel || "" },
        notes: { stringValue: trait.notes || "" },
      };

      if (trait.category === "polar") {
        traitFields.idealLabel = { stringValue: trait.idealLabel || "" };
        traitFields.worstLabel = { stringValue: trait.worstLabel || "" };
      }
      if (trait.category === "balance") {
        traitFields.lowLabel = { stringValue: trait.lowLabel || "" };
        traitFields.midLabel = { stringValue: trait.midLabel || "" };
        traitFields.highLabel = { stringValue: trait.highLabel || "" };
        traitFields.zoneLabel = { stringValue: trait.zoneLabel || "" };
      }

      if (trait.clips && trait.clips.length > 0) {
        traitFields.clips = {
          arrayValue: {
            values: trait.clips.map((clip) => ({
              mapValue: {
                fields: {
                  timestampStart: { stringValue: clip.timestampStart || "" },
                  timestampEnd: { stringValue: clip.timestampEnd || "" },
                  quote: { stringValue: clip.quote || "" },
                  significance: { stringValue: clip.significance || "" },
                },
              },
            })),
          },
        };
      }

      await fetch(
        `${baseUrl}/users/${userId}/sessions/${sessionId}/traitScores/${trait.key}?key=${apiKey}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields: traitFields }),
        }
      );
    }

    return sessionId;
  } catch (err) {
    console.error("Firestore save error:", err);
    return null;
  }
};
