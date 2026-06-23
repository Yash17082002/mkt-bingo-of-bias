/* BINGO OF BIAS — SHARED CONFIGURATION */

/* 1) FIREBASE KEYS — PASTE YOUR OWN HERE */
const firebaseConfig = {
  apiKey: "AIzaSyArvT4dAY2D0H0LNdDmana83YJY4rjZQco",
  authDomain: "bingo-of-bias.firebaseapp.com",
  projectId: "bingo-of-bias",
  storageBucket: "bingo-of-bias.firebasestorage.app",
  messagingSenderId: "690552616081",
  appId: "1:690552616081:web:833c1d347d271bfb68fb30",
  measurementId: "G-ZTJXPP588N"
};

/* 2) PASSWORDS */
const PLAYER_PASSWORD = "bias2025";
const HOST_PASSWORD   = "host2025";

/* 3) GAMEPLAY OPTIONS */
const OPTIONS = {
  markOnlyWhilePlaying: true,
  autoplayWithSound: true
};

/* ===== Below: bias tiles, playlist, win lines. Usually no need to edit. ===== */
const CATS = {
  gender: { label: "Gender",     color: "#A8757F" },
  colour: { label: "Colour",     color: "#BE9A5E" },
  klass:  { label: "Class",      color: "#7C8B6C" },
  body:   { label: "Body Image", color: "#7B8AA0" }
};

const BIASES = [
  { t: "Women in domestic or submissive roles",        c: "gender" },
  { t: "Fair skin equals success",                     c: "colour" },
  { t: "Poor characters in submissive roles",          c: "klass"  },
  { t: "Overweight used as a punchline",               c: "body"   },
  { t: "Men as dominant or emotionally absent",        c: "gender" },
  { t: "Dark skin in negative or side roles",          c: "colour" },
  { t: "Labour / rural jobs stereotyped",              c: "klass"  },
  { t: "Body shape as the beauty standard",            c: "body"   },
  { t: "Sexualisation or objectification of women",    c: "gender" },
  { t: "Whitening as social aspiration",               c: "colour" },
  { t: "Wealth equated with competence",               c: "klass"  },
  { t: "Weight loss equated with success",             c: "body"   },
  { t: "Women portrayed as dependent on men",          c: "gender" },
  { t: "Dark skin portrayed as aggressive",            c: "colour" },
  { t: "Blue-collar shown as unambitious",             c: "klass"  },
  { t: "Plus-size shown as lazy or unhealthy",         c: "body"   }
];

const DEFAULT_PLAYLIST = [
  { id: "39W-l-QbkhE", title: "Gender Roles in Indian Ads — I",
    biasA: "Women in domestic or submissive roles", biasB: "Men as dominant or emotionally absent" },
  { id: "ZGKV17Q6Ohc", title: "Gender Roles in Indian Ads — II",
    biasA: "Women portrayed as dependent on men",   biasB: "Sexualisation or objectification of women" },
  { id: "LDlj8CnxWrw", title: "Colour Bias in Advertising — I",
    biasA: "Fair skin equals success",              biasB: "Dark skin in negative or side roles" },
  { id: "HmeT5n0BQxE", title: "Colour Bias in Advertising — II",
    biasA: "Whitening as social aspiration",        biasB: "Dark skin portrayed as aggressive" },
  { id: "oWPLQY-tESk", title: "Class & Occupation in Ads",
    biasA: "Wealth equated with competence",        biasB: "Blue-collar shown as unambitious" },
  { id: "xAB3CZC1BcI", title: "Body Image in Advertising",
    biasA: "Body shape as the beauty standard",     biasB: "Weight loss equated with success" }
];

const WIN_LINES = [
  [0, 1, 2, 3],    [4, 5, 6, 7],    [8, 9, 10, 11], [12, 13, 14, 15],
  [0, 4, 8, 12],   [1, 5, 9, 13],   [2, 6, 10, 14], [3, 7, 11, 15],
  [0, 5, 10, 15],  [3, 6, 9, 12]
];

function biasCat(text) {
  const b = BIASES.find(x => x.t === text);
  return b ? b.c : "gender";
}
