/* ============================================================
   BINGO OF BIAS — SHARED CONFIGURATION
   This one file is used by BOTH index.html (players) and host.html.
   You only need to edit the two clearly-marked blocks below.
   ============================================================ */

/* ------------------------------------------------------------
   1) FIREBASE KEYS  ——  PASTE YOUR OWN HERE
   Get these from the Firebase console (see SETUP_GUIDE.md, Step 2).
   Until you paste real values the game will not connect.
   ------------------------------------------------------------ */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArvT4dAY2D0H0LNdDmana83YJY4rjZQco",
  authDomain: "bingo-of-bias.firebaseapp.com",
  projectId: "bingo-of-bias",
  storageBucket: "bingo-of-bias.firebasestorage.app",
  messagingSenderId: "690552616081",
  appId: "1:690552616081:web:833c1d347d271bfb68fb30",
  measurementId: "G-ZTJXPP588N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

/* ------------------------------------------------------------
   2) PASSWORDS  ——  CHANGE THESE TO ANYTHING YOU LIKE
   - PLAYER_PASSWORD : you tell this to the room of players.
   - HOST_PASSWORD   : keep this private (only you / the host).
   (This is a light classroom gate, not bank-grade security.)
   ------------------------------------------------------------ */
const PLAYER_PASSWORD = "bias2025";
const HOST_PASSWORD   = "host2025";

/* ------------------------------------------------------------
   3) GAMEPLAY OPTIONS  (sensible defaults — change if you wish)
   ------------------------------------------------------------ */
const OPTIONS = {
  // Players can only mark cells while an ad is actually playing.
  // This keeps the game fair (no marking the whole card before any ad).
  markOnlyWhilePlaying: true,

  // Try to play sound automatically. Some browsers block autoplay sound
  // until the page is touched once; players see a tiny "Tap for sound"
  // pill only if that happens.
  autoplayWithSound: true
};

/* ============================================================
   BELOW THIS LINE you normally don't need to change anything.
   It defines the 16 bias tiles, the default ad playlist, and
   the winning lines. Edit only if you want different content.
   ============================================================ */

/* The four bias categories and their calm colours. */
const CATS = {
  gender: { label: "Gender",     color: "#A8757F" },
  colour: { label: "Colour",     color: "#BE9A5E" },
  klass:  { label: "Class",      color: "#7C8B6C" },
  body:   { label: "Body Image", color: "#7B8AA0" }
};

/* The 16 bias statements that fill every bingo card.
   Each player gets these SAME 16, shuffled into a different layout. */
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

/* A ready-made playlist so the host has content on day one.
   The host can reorder, delete, or add new ones live during the game.
   biasA / biasB are the two biases shown ABOVE the video for that ad. */
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

/* The winning lines on a 4×4 card (cell indexes 0–15, row-major).
   Any completed row, column, or diagonal counts as one line. */
const WIN_LINES = [
  [0, 1, 2, 3],    [4, 5, 6, 7],    [8, 9, 10, 11], [12, 13, 14, 15], // rows
  [0, 4, 8, 12],   [1, 5, 9, 13],   [2, 6, 10, 14], [3, 7, 11, 15],   // columns
  [0, 5, 10, 15],  [3, 6, 9, 12]                                      // diagonals
];

/* Helper: look up a bias category from its text. */
function biasCat(text) {
  const b = BIASES.find(x => x.t === text);
  return b ? b.c : "gender";
}
