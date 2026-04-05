// ─── MoreIQ: TRAIT DEFINITIONS ────────────────────────────────────────────────
// Master trait configuration for MoreIQ v1.4
// Includes both DateIQ (37 traits) and BusinessIQ (37 traits) = 74 total
//
// Each mode uses 4 categories:
//   negative/risk:   0–100, lower is better (high = red flag)
//   positive/buyer:  0–100, higher is better (high = green flag)
//   polar:           0–100, red 0–32, orange 33–65, green 66–100 (ideal end)
//   balance:         0–100, red 0–25, green 26–75, red 76–100 (middle is ideal)
// ──────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// DATEIQ TRAITS
// ═══════════════════════════════════════════════════════════════════════════════

export const DATEIQ_CATEGORIES = {
  negative: {
    label: "Negative Traits",
    tagline: "Red flags to watch for",
    description:
      "Standalone traits to watch out for as potential red flags in a dating context. Scored 0–100 where lower is better.",
    colorZones: [
      { min: 0, max: 32, color: "green", label: "Low risk" },
      { min: 33, max: 65, color: "orange", label: "Moderate" },
      { min: 66, max: 100, color: "red", label: "High risk" },
    ],
    icon: "🚩",
  },
  positive: {
    label: "Positive Traits",
    tagline: "Green flags indicating a good match",
    description:
      "Standalone traits that could indicate a good match in a dating context. Scored 0–100 where higher is better.",
    colorZones: [
      { min: 0, max: 32, color: "red", label: "Low" },
      { min: 33, max: 65, color: "orange", label: "Moderate" },
      { min: 66, max: 100, color: "green", label: "Strong" },
    ],
    icon: "💚",
  },
  polar: {
    label: "Polar Opposite Traits",
    tagline: "No healthy balance — lean fully toward the ideal",
    description:
      'Scales where one end is ideal and the other is worst-case. No desirable middle ground — you want someone leaning as far into the ideal as possible.',
    colorZones: [
      { min: 0, max: 32, color: "red", label: "Worst" },
      { min: 33, max: 65, color: "orange", label: "Mixed" },
      { min: 66, max: 100, color: "green", label: "Ideal" },
    ],
    icon: "⚖️",
  },
  balance: {
    label: "Traits Requiring a Healthy Balance",
    tagline: "Extremes on either side are problematic",
    description:
      "Scales where extremes on either side can be problematic. The ideal is a balanced middle ground (26–75 green zone).",
    colorZones: [
      { min: 0, max: 25, color: "red", label: "Too low" },
      { min: 26, max: 75, color: "green", label: "Healthy balance" },
      { min: 76, max: 100, color: "red", label: "Too high" },
    ],
    icon: "🎯",
  },
};

export const DATEIQ_TRAITS = [
  // ── NEGATIVE TRAITS (10) ──────────────────────────────────────────────────
  { key: "narcissism", label: "Narcissism", category: "negative", description: "Self-centeredness and excessive need for admiration" },
  { key: "manipulativeness", label: "Manipulativeness", category: "negative", description: "Tendency to influence others through deceptive tactics" },
  { key: "dishonesty", label: "Dishonesty", category: "negative", description: "Pattern of being untruthful or misleading" },
  { key: "arrogance", label: "Arrogance", category: "negative", description: "Exaggerated sense of superiority and dismissiveness" },
  { key: "jealousy", label: "Jealousy", category: "negative", description: "Insecurity-driven resentment or suspicion" },
  { key: "controllingBehavior", label: "Controlling Behavior", category: "negative", description: "Need to dominate decisions and restrict freedom" },
  { key: "impulsiveness", label: "Impulsiveness", category: "negative", description: "Acting without thinking, poor impulse control" },
  { key: "pessimism", label: "Pessimism", category: "negative", description: "Chronic negativity that drains energy" },
  { key: "selfishness", label: "Selfishness", category: "negative", description: "Prioritizing own needs at others' expense" },
  { key: "rudeness", label: "Rudeness", category: "negative", description: "Dismissive or disrespectful communication" },

  // ── POSITIVE TRAITS (10) ──────────────────────────────────────────────────
  { key: "altruism", label: "Altruism", category: "positive", description: "Selfless concern for others' well-being" },
  { key: "authenticity", label: "Authenticity", category: "positive", description: "Being genuine and true to oneself" },
  { key: "confidence", label: "Confidence", category: "positive", description: "Healthy self-assurance without arrogance" },
  { key: "compassion", label: "Compassion", category: "positive", description: "Deep awareness of suffering coupled with desire to help" },
  { key: "competence", label: "Competence", category: "positive", description: "Demonstrated capability and knowledge" },
  { key: "humor", label: "Humor", category: "positive", description: "Natural wit and lightheartedness" },
  { key: "openMindedness", label: "Open-Mindedness", category: "positive", description: "Willingness to consider new ideas" },
  { key: "reliability", label: "Reliability", category: "positive", description: "Consistency and dependability" },
  { key: "respectfulness", label: "Respectfulness", category: "positive", description: "Regard for others' feelings and boundaries" },
  { key: "empathy", label: "Empathy", category: "positive", description: "Understanding and sharing others' feelings" },

  // ── POLAR OPPOSITE TRAITS (11) ────────────────────────────────────────────
  { key: "honestyPolar", label: "Honesty", category: "polar", idealLabel: "Honest", worstLabel: "Dishonest", description: "Truthfulness in communication" },
  { key: "loyaltyPolar", label: "Loyalty", category: "polar", idealLabel: "Loyal", worstLabel: "Disloyal", description: "Commitment and faithfulness" },
  { key: "generosityPolar", label: "Generosity", category: "polar", idealLabel: "Generous", worstLabel: "Stingy", description: "Willingness to give time and attention" },
  { key: "patiencePolar", label: "Patience", category: "polar", idealLabel: "Patient", worstLabel: "Impatient", description: "Composure under pressure" },
  { key: "kindnessPolar", label: "Kindness", category: "polar", idealLabel: "Kind", worstLabel: "Cruel", description: "Warmth and consideration" },
  { key: "integrityPolar", label: "Integrity", category: "polar", idealLabel: "Principled", worstLabel: "Deceitful", description: "Moral and ethical adherence" },
  { key: "forgivenessPolar", label: "Forgiveness", category: "polar", idealLabel: "Forgiving", worstLabel: "Vindictive", description: "Letting go of grudges" },
  { key: "gratitudePolar", label: "Gratitude", category: "polar", idealLabel: "Grateful", worstLabel: "Entitled", description: "Appreciation vs entitlement" },
  { key: "selflessnessPolar", label: "Selflessness", category: "polar", idealLabel: "Selfless", worstLabel: "Self-centered", description: "Putting others alongside self" },
  { key: "competencePolar", label: "Competence", category: "polar", idealLabel: "Competent", worstLabel: "Incompetent", description: "Ability and follow-through" },
  { key: "teamPlayerPolar", label: "Team Player", category: "polar", idealLabel: "Team Player", worstLabel: "Jealous/Competitive", description: "Collaborative vs envious" },

  // ── BALANCE TRAITS (6) ────────────────────────────────────────────────────
  { key: "selfWorthBalance", label: "Self-Worth", category: "balance", lowLabel: "No Balls", midLabel: "Confident", highLabel: "Narcissist", description: "Self-assurance between insecurity and narcissism" },
  { key: "independenceBalance", label: "Independence", category: "balance", lowLabel: "Clingy", midLabel: "Balanced Autonomy", highLabel: "Emotionally Distant", description: "Autonomy between clinginess and distance" },
  { key: "expressivenessBalance", label: "Expressiveness", category: "balance", lowLabel: "Repressed", midLabel: "Balanced Openness", highLabel: "Unhinged", description: "Openness between repression and drama" },
  { key: "assertivenessBalance", label: "Assertiveness", category: "balance", lowLabel: "Passive", midLabel: "Balanced Communication", highLabel: "Aggressive", description: "Expressing needs between passivity and aggression" },
  { key: "influenceBalance", label: "Influence", category: "balance", lowLabel: "Pushover", midLabel: "Influential", highLabel: "Manipulative", description: "Social influence between weakness and manipulation" },
  { key: "leadershipBalance", label: "Leadership", category: "balance", lowLabel: "Careless", midLabel: "Protective", highLabel: "Controlling", description: "Leadership between negligence and control" },
];


// ═══════════════════════════════════════════════════════════════════════════════
// BUSINESSIQ TRAITS
// ═══════════════════════════════════════════════════════════════════════════════

export const BUSINESSIQ_CATEGORIES = {
  buyer: {
    label: "Buyer Signals",
    tagline: "Positive indicators of purchase intent",
    description:
      "These traits indicate how likely a prospect is to move forward with a purchase. Scored 0–100 where higher means stronger buying intent.",
    colorZones: [
      { min: 0, max: 32, color: "red", label: "Weak" },
      { min: 33, max: 65, color: "orange", label: "Moderate" },
      { min: 66, max: 100, color: "green", label: "Strong" },
    ],
    icon: "💰",
  },
  risk: {
    label: "Risk Signals",
    tagline: "Red flags that may stall or kill the deal",
    description:
      "These traits indicate obstacles or risks that could prevent a deal from closing. Scored 0–100 where lower is better (fewer risks).",
    colorZones: [
      { min: 0, max: 32, color: "green", label: "Low risk" },
      { min: 33, max: 65, color: "orange", label: "Moderate" },
      { min: 66, max: 100, color: "red", label: "High risk" },
    ],
    icon: "⚠️",
  },
  polar: {
    label: "Personality Indicators",
    tagline: "Character scales — lean toward the ideal",
    description:
      "These are personality scales where one end represents an ideal business counterpart and the other a difficult one. Higher scores mean more ideal.",
    colorZones: [
      { min: 0, max: 32, color: "red", label: "Worst" },
      { min: 33, max: 65, color: "orange", label: "Mixed" },
      { min: 66, max: 100, color: "green", label: "Ideal" },
    ],
    icon: "🤝",
  },
  balance: {
    label: "Behavioral Balance",
    tagline: "Extremes on either side can hurt the deal",
    description:
      "Behavioral scales where extremes are problematic. The ideal prospect falls in the balanced middle zone (26–75).",
    colorZones: [
      { min: 0, max: 25, color: "red", label: "Too low" },
      { min: 26, max: 75, color: "green", label: "Healthy balance" },
      { min: 76, max: 100, color: "red", label: "Too high" },
    ],
    icon: "📊",
  },
};

export const BUSINESSIQ_TRAITS = [
  // ── BUYER SIGNALS (10) — higher = stronger buying intent ──────────────────
  { key: "comfortableBuying", label: "Comfortable Buying", category: "buyer", description: "Ease and confidence when discussing purchase decisions" },
  { key: "budgetFlexibility", label: "Budget Flexibility", category: "buyer", description: "Willingness to invest more for the right solution" },
  { key: "decisionAuthority", label: "Decision Authority", category: "buyer", description: "Power and willingness to make the final call" },
  { key: "urgency", label: "Urgency", category: "buyer", description: "Time pressure or motivation to act now" },
  { key: "enthusiasm", label: "Enthusiasm", category: "buyer", description: "Genuine excitement about the product or service" },
  { key: "trustLevel", label: "Trust Level", category: "buyer", description: "Confidence and trust in you and your company" },
  { key: "engagement", label: "Engagement", category: "buyer", description: "Active participation, questions, and interest in the conversation" },
  { key: "visionAlignment", label: "Vision Alignment", category: "buyer", description: "Sees how your solution fits their specific needs" },
  { key: "championPotential", label: "Champion Potential", category: "buyer", description: "Likely to advocate for your solution internally" },
  { key: "followThroughIntent", label: "Follow-Through Intent", category: "buyer", description: "Signals they will take the next steps after the meeting" },

  // ── RISK SIGNALS (10) — lower = fewer obstacles ───────────────────────────
  { key: "priceSensitivity", label: "Price Sensitivity", category: "risk", description: "Excessive focus on cost over value" },
  { key: "indecisiveness", label: "Indecisiveness", category: "risk", description: "Inability to commit or move forward on decisions" },
  { key: "skepticism", label: "Skepticism", category: "risk", description: "Distrust or persistent doubt about your claims" },
  { key: "defensiveness", label: "Defensiveness", category: "risk", description: "Guarded or resistant to new ideas and information" },
  { key: "distraction", label: "Distraction", category: "risk", description: "Lack of focus, attention, or presence in the conversation" },
  { key: "competitorLoyalty", label: "Competitor Loyalty", category: "risk", description: "Strong attachment to existing solutions or vendors" },
  { key: "gatekeeping", label: "Gatekeeping", category: "risk", description: "Blocking access to other stakeholders or decision makers" },
  { key: "objectionStacking", label: "Objection Stacking", category: "risk", description: "Continuously piling on reasons not to move forward" },
  { key: "stallingTactics", label: "Stalling Tactics", category: "risk", description: "Deliberately delaying decisions or next steps" },
  { key: "dishonesty_biz", label: "Dishonesty", category: "risk", description: "Misleading about needs, budget, timeline, or authority" },

  // ── PERSONALITY POLAR (11) — ideal vs worst ───────────────────────────────
  { key: "agreeablePolar", label: "Agreeableness", category: "polar", idealLabel: "Agreeable", worstLabel: "Disagreeable", description: "Cooperative and pleasant vs combative and hostile" },
  { key: "transparencyPolar", label: "Transparency", category: "polar", idealLabel: "Transparent", worstLabel: "Evasive", description: "Open about needs and constraints vs withholding information" },
  { key: "respectPolar", label: "Respect", category: "polar", idealLabel: "Respectful", worstLabel: "Dismissive", description: "Values your time and expertise vs condescending" },
  { key: "collaborationPolar", label: "Collaboration", category: "polar", idealLabel: "Collaborative", worstLabel: "Adversarial", description: "Works toward mutual benefit vs purely self-serving" },
  { key: "decisivenessPolar", label: "Decisiveness", category: "polar", idealLabel: "Decisive", worstLabel: "Wishy-washy", description: "Makes clear commitments vs endlessly waffling" },
  { key: "responsivenessPolar", label: "Responsiveness", category: "polar", idealLabel: "Responsive", worstLabel: "Unresponsive", description: "Engages promptly and thoughtfully vs ghosting" },
  { key: "detailOrientedPolar", label: "Detail Orientation", category: "polar", idealLabel: "Detail-Oriented", worstLabel: "Careless", description: "Pays attention to specifics vs overlooks important details" },
  { key: "openMindedPolar", label: "Open-Mindedness", category: "polar", idealLabel: "Open-Minded", worstLabel: "Closed-Minded", description: "Considers new solutions vs stuck in old ways" },
  { key: "professionalismPolar", label: "Professionalism", category: "polar", idealLabel: "Professional", worstLabel: "Unprofessional", description: "Conducts business with integrity vs erratic behavior" },
  { key: "reliabilityPolar", label: "Reliability", category: "polar", idealLabel: "Reliable", worstLabel: "Flaky", description: "Follows through on commitments vs breaks promises" },
  { key: "solutionFocusPolar", label: "Solution Focus", category: "polar", idealLabel: "Solution-Focused", worstLabel: "Problem-Focused", description: "Seeks solutions vs dwells on obstacles" },

  // ── BALANCE TRAITS (6) — middle is ideal ──────────────────────────────────
  { key: "vulnerabilityBalance", label: "Vulnerability", category: "balance", lowLabel: "Guarded", midLabel: "Open", highLabel: "Oversharing", description: "Openness about their situation balanced between secrecy and TMI" },
  { key: "assertivenessBalance_biz", label: "Assertiveness", category: "balance", lowLabel: "Passive", midLabel: "Assertive", highLabel: "Aggressive", description: "Negotiation style between doormat and bulldozer" },
  { key: "formalityBalance", label: "Formality", category: "balance", lowLabel: "Too Casual", midLabel: "Professional", highLabel: "Rigid", description: "Communication style between unprofessional and overly stiff" },
  { key: "detailFocusBalance", label: "Detail Focus", category: "balance", lowLabel: "Vague", midLabel: "Thorough", highLabel: "Overthinking", description: "Attention to detail between careless and analysis paralysis" },
  { key: "emotionalInvestment", label: "Emotional Investment", category: "balance", lowLabel: "Detached", midLabel: "Engaged", highLabel: "Emotional", description: "Level of caring balanced between apathy and irrational attachment" },
  { key: "negotiationStyle", label: "Negotiation Style", category: "balance", lowLabel: "Pushover", midLabel: "Fair Negotiator", highLabel: "Hardball", description: "Deal-making approach between giving away the farm and scorched earth" },
];


// ═══════════════════════════════════════════════════════════════════════════════
// SHARED HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

export const getCategories = (mode) =>
  mode === "business" ? BUSINESSIQ_CATEGORIES : DATEIQ_CATEGORIES;

export const getTraits = (mode) =>
  mode === "business" ? BUSINESSIQ_TRAITS : DATEIQ_TRAITS;

export const getCategoryKeys = (mode) =>
  mode === "business"
    ? ["buyer", "risk", "polar", "balance"]
    : ["negative", "positive", "polar", "balance"];

export const getTraitsByCategory = (mode, category) =>
  getTraits(mode).filter((t) => t.category === category);

export const getScoreColor = (score, category) => {
  const cats = { ...DATEIQ_CATEGORIES, ...BUSINESSIQ_CATEGORIES };
  const zones = cats[category]?.colorZones || [];
  for (const zone of zones) {
    if (score >= zone.min && score <= zone.max) return zone.color;
  }
  return "orange";
};

export const getScoreLabel = (score, category) => {
  const cats = { ...DATEIQ_CATEGORIES, ...BUSINESSIQ_CATEGORIES };
  const zones = cats[category]?.colorZones || [];
  for (const zone of zones) {
    if (score >= zone.min && score <= zone.max) return zone.label;
  }
  return "Unknown";
};

export const getBalanceZoneLabel = (score, trait) => {
  if (score <= 25) return trait.lowLabel;
  if (score <= 75) return trait.midLabel;
  return trait.highLabel;
};
