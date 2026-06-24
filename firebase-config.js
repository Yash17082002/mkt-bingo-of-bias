/* ============================================================
   BINGO OF BIAS — SHARED CONFIGURATION
   Used by BOTH index.html (players) and host.html.
   Plain JavaScript loaded via a <script> tag.
   It must NOT contain any "import" or "initializeApp" lines.
   ============================================================ */

/* 1) FIREBASE KEYS (project "bingo-of-bias") */
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyArvT4dAY2D0H0LNdDmana83YJY4rjZQco",
  authDomain:        "bingo-of-bias.firebaseapp.com",
  projectId:         "bingo-of-bias",
  storageBucket:     "bingo-of-bias.firebasestorage.app",
  messagingSenderId: "690552616081",
  appId:             "1:690552616081:web:833c1d347d271bfb68fb30"
};

/* 2) PASSWORDS — change these to whatever you like */
const PLAYER_PASSWORD = "bias2025";
const HOST_PASSWORD   = "host2025";

/* 3) GAMEPLAY OPTIONS */
const OPTIONS = {
  markOnlyWhilePlaying: true,   // tiles markable only while an ad is playing
  autoplayWithSound: true
};

/* ============================================================
   BOARD SHAPE
   5x5 card. Each player is dealt a RANDOM 25 of the 40 biases
   below, shuffled — so no two cards are alike.
   ============================================================ */
const GRID      = 5;            // 5 columns / 5 rows
const CARD_SIZE = GRID * GRID;  // 25 tiles per card

/* The five bias categories and their calm colours. */
const CATS = {
  gender: { label: "Gender", color: "#C75C7A" },
  colour: { label: "Colour", color: "#C58A33" },
  klass:  { label: "Class",  color: "#5C9070" },
  body:   { label: "Body",   color: "#5677B5" },
  age:    { label: "Age",    color: "#8E7BB8" }
};

/* The 40 bias statements — 8 per category.
   Every player's card is a random, shuffled subset of 25 of these. */
const BIASES = [
  /* ---- Gender (8) ---- */
  { t: "Women shown only in domestic or caregiving roles", c: "gender" },
  { t: "Men shown as the sole decision-makers",            c: "gender" },
  { t: "Women judged mainly by their appearance",          c: "gender" },
  { t: "Men discouraged from showing emotion",             c: "gender" },
  { t: "Women shown as dependent on men",                  c: "gender" },
  { t: "Cooking and cleaning framed as a woman's job",     c: "gender" },
  { t: "Career ambition portrayed as unfeminine",          c: "gender" },
  { t: "Boys steered to action, girls to beauty",          c: "gender" },

  /* ---- Colour / skin tone (8) ---- */
  { t: "Fair skin equated with success or beauty",         c: "colour" },
  { t: "Dark skin linked to negative or side roles",       c: "colour" },
  { t: "Skin-whitening shown as self-improvement",         c: "colour" },
  { t: "Fairer brides shown as more desirable",            c: "colour" },
  { t: "Dark-skinned characters used for comic relief",    c: "colour" },
  { t: "\"Glow\" used as code for lighter skin",           c: "colour" },
  { t: "Fair complexion tied to better job prospects",     c: "colour" },
  { t: "Before/after framed as dark-to-fair",              c: "colour" },

  /* ---- Class (8) ---- */
  { t: "Wealth equated with intelligence or worth",        c: "klass" },
  { t: "Domestic workers shown as invisible or comic",     c: "klass" },
  { t: "Rural people shown as naive or backward",          c: "klass" },
  { t: "Manual labour portrayed as low-status",            c: "klass" },
  { t: "Brands shown as markers of a better person",       c: "klass" },
  { t: "Poverty shown as a personal failing",              c: "klass" },
  { t: "English-speaking framed as more competent",        c: "klass" },
  { t: "One aspirational lifestyle shown as the norm",     c: "klass" },

  /* ---- Body image (8) ---- */
  { t: "One body type shown as the beauty standard",       c: "body" },
  { t: "Overweight characters used as the punchline",      c: "body" },
  { t: "Weight loss equated with happiness or success",    c: "body" },
  { t: "Visible ageing on women treated as a flaw",        c: "body" },
  { t: "Height tied to confidence or attractiveness",      c: "body" },
  { t: "Skin \"flaws\" shown as problems to fix",          c: "body" },
  { t: "Thinness equated with discipline",                 c: "body" },
  { t: "Disability shown only as inspiration, if at all",  c: "body" },

  /* ---- Age (8) ---- */
  { t: "Older people shown as out of touch with tech",     c: "age" },
  { t: "Youth shown as the only desirable age",            c: "age" },
  { t: "Older women made invisible in ads",                c: "age" },
  { t: "Ageing framed as something to reverse",            c: "age" },
  { t: "Elders shown only as dependent or frail",          c: "age" },
  { t: "Being modern equated with being young",            c: "age" },
  { t: "Grandparents reduced to one-note roles",           c: "age" },
  { t: "Maturity shown as loss rather than growth",        c: "age" }
];

/* Ready-made playlist so the host has content on day one.
   biasA / biasB are shown ABOVE the video. They must match BIASES text. */
const DEFAULT_PLAYLIST = [
  { id: "39W-l-QbkhE", title: "Gender Roles in Indian Ads — I",
    biasA: "Women shown only in domestic or caregiving roles", biasB: "Men shown as the sole decision-makers" },
  { id: "ZGKV17Q6Ohc", title: "Gender Roles in Indian Ads — II",
    biasA: "Women shown as dependent on men",                  biasB: "Cooking and cleaning framed as a woman's job" },
  { id: "LDlj8CnxWrw", title: "Colour Bias in Advertising — I",
    biasA: "Fair skin equated with success or beauty",         biasB: "Dark skin linked to negative or side roles" },
  { id: "HmeT5n0BQxE", title: "Colour Bias in Advertising — II",
    biasA: "Skin-whitening shown as self-improvement",         biasB: "Fairer brides shown as more desirable" },
  { id: "oWPLQY-tESk", title: "Class & Occupation in Ads",
    biasA: "Wealth equated with intelligence or worth",        biasB: "Domestic workers shown as invisible or comic" },
  { id: "xAB3CZC1BcI", title: "Body Image in Advertising",
    biasA: "One body type shown as the beauty standard",       biasB: "Weight loss equated with happiness or success" }
];

/* The winning lines on a 5x5 card (cell indexes 0–24, row-major),
   tagged by type so the game can require one row + one column + one diagonal. */
const WIN_LINES = [
  { type:"row",  cells:[0,1,2,3,4] },
  { type:"row",  cells:[5,6,7,8,9] },
  { type:"row",  cells:[10,11,12,13,14] },
  { type:"row",  cells:[15,16,17,18,19] },
  { type:"row",  cells:[20,21,22,23,24] },
  { type:"col",  cells:[0,5,10,15,20] },
  { type:"col",  cells:[1,6,11,16,21] },
  { type:"col",  cells:[2,7,12,17,22] },
  { type:"col",  cells:[3,8,13,18,23] },
  { type:"col",  cells:[4,9,14,19,24] },
  { type:"diag", cells:[0,6,12,18,24] },
  { type:"diag", cells:[4,8,12,16,20] }
];

/* Helper: look up a bias category from its text. */
function biasCat(text){
  const b = BIASES.find(x => x.t === text);
  return b ? b.c : "gender";
}
