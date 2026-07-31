/* ============================================================
   BINGO OF BIAS - SHARED CONFIGURATION
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

/* 2) PASSWORDS - change these to whatever you like */
const PLAYER_PASSWORD = "bias2025";
const HOST_PASSWORD   = "host2025";

/* ============================================================
   3) GOOGLE SHEET - the live content source
   Paste the ID of your Google Sheet below. The ID is the long
   code in the sheet URL between /d/ and /edit :
   docs.google.com/spreadsheets/d/THIS_PART_HERE/edit
   The sheet must be shared as "Anyone with the link - Viewer".
   Tab names must stay exactly "Ad Sheet" and "Biases".
   ============================================================ */
const SHEET_ID  = "1JIm7uf0omQqyqdTKVNu-7cSF8dpGt91estJIY9UJkYI";
const SHEET_ADS = "Ad Sheet";
const SHEET_BIA = "Biases";

/* 4) GAMEPLAY OPTIONS */
const OPTIONS = {
  markOnlyWhilePlaying: true,  // tiles open once the host plays the ad
  autoplayWithSound: true,
  hintMode: true               // show the HINT, not the bias, above the video
};

/* ============================================================
   BOARD SHAPE - 4x4 card, 16 tiles.
   A player wins on ANY one complete line: row, column or diagonal.
   Cards are dealt from the biases of the ads in the running
   playlist, so early ads always land on every card. With two
   biases revealed per ad this produces the first winners around
   ad 3-4 and a clear group of winners by ad 5.
   ============================================================ */
const GRID      = 4;
const CARD_SIZE = GRID * GRID;   // 16 tiles

/* Colour per category. Unknown categories get a colour automatically. */
const CAT_COLORS = {
  "Gender": "#C75C7A",
  "Colour": "#C58A33",
  "Class": "#5C9070",
  "Body Image": "#5677B5",
  "Age": "#8E7BB8",
  "Sexism": "#B5654A",
  "Objectification": "#A0526D",
  "Religion": "#7E7B4F",
  "Communal": "#4E8A93",
  "Caste": "#8A6A4F",
  "LGBTQ": "#6E7BC8"
};
const CAT_FALLBACK_COLORS = [
  "#C75C7A",
  "#C58A33",
  "#5C9070",
  "#5677B5",
  "#8E7BB8",
  "#B5654A",
  "#A0526D",
  "#7E7B4F",
  "#4E8A93",
  "#8A6A4F",
  "#6E7BC8",
  "#7A8B99"
];

/* ============================================================
   FALLBACK CONTENT
   Used only if the Google Sheet has not been set up or cannot be
   reached. Once the host syncs the sheet, that content wins.
   ============================================================ */
const FALLBACK_BIASES = [
  {
    "t": "Women shown only in domestic or caregiving roles",
    "c": "Gender"
  },
  {
    "t": "Men shown as the sole decision-makers",
    "c": "Gender"
  },
  {
    "t": "Women judged mainly by their appearance",
    "c": "Gender"
  },
  {
    "t": "Men discouraged from showing emotion",
    "c": "Gender"
  },
  {
    "t": "Women shown as dependent on men",
    "c": "Gender"
  },
  {
    "t": "Cooking and cleaning framed as a woman's job",
    "c": "Gender"
  },
  {
    "t": "Career ambition portrayed as unfeminine",
    "c": "Gender"
  },
  {
    "t": "Boys steered to action, girls to beauty",
    "c": "Gender"
  },
  {
    "t": "Fair skin equated with success or beauty",
    "c": "Colour"
  },
  {
    "t": "Dark skin linked to negative or side roles",
    "c": "Colour"
  },
  {
    "t": "Skin-whitening shown as self-improvement",
    "c": "Colour"
  },
  {
    "t": "Fairer brides shown as more desirable",
    "c": "Colour"
  },
  {
    "t": "Dark-skinned characters used for comic relief",
    "c": "Colour"
  },
  {
    "t": "\"Glow\" used as code for lighter skin",
    "c": "Colour"
  },
  {
    "t": "Fair complexion tied to better job prospects",
    "c": "Colour"
  },
  {
    "t": "Before/after framed as dark-to-fair",
    "c": "Colour"
  },
  {
    "t": "Wealth equated with intelligence or worth",
    "c": "Class"
  },
  {
    "t": "Domestic workers shown as invisible or comic",
    "c": "Class"
  },
  {
    "t": "Rural people shown as naive or backward",
    "c": "Class"
  },
  {
    "t": "Manual labour portrayed as low-status",
    "c": "Class"
  },
  {
    "t": "Brands shown as markers of a better person",
    "c": "Class"
  },
  {
    "t": "Poverty shown as a personal failing",
    "c": "Class"
  },
  {
    "t": "English-speaking framed as more competent",
    "c": "Class"
  },
  {
    "t": "One aspirational lifestyle shown as the norm",
    "c": "Class"
  },
  {
    "t": "One body type shown as the beauty standard",
    "c": "Body Image"
  },
  {
    "t": "Overweight characters used as the punchline",
    "c": "Body Image"
  },
  {
    "t": "Weight loss equated with happiness or success",
    "c": "Body Image"
  },
  {
    "t": "Visible ageing on women treated as a flaw",
    "c": "Body Image"
  },
  {
    "t": "Height tied to confidence or attractiveness",
    "c": "Body Image"
  },
  {
    "t": "Skin \"flaws\" shown as problems to fix",
    "c": "Body Image"
  },
  {
    "t": "Thinness equated with discipline",
    "c": "Body Image"
  },
  {
    "t": "Disability shown only as inspiration, if at all",
    "c": "Body Image"
  },
  {
    "t": "Older people shown as out of touch with tech",
    "c": "Age"
  },
  {
    "t": "Youth shown as the only desirable age",
    "c": "Age"
  },
  {
    "t": "Older women made invisible in ads",
    "c": "Age"
  },
  {
    "t": "Ageing framed as something to reverse",
    "c": "Age"
  },
  {
    "t": "Elders shown only as dependent or frail",
    "c": "Age"
  },
  {
    "t": "Being modern equated with being young",
    "c": "Age"
  },
  {
    "t": "Grandparents reduced to one-note roles",
    "c": "Age"
  },
  {
    "t": "Maturity shown as loss rather than growth",
    "c": "Age"
  },
  {
    "t": "Women's bodies used to sell unrelated products",
    "c": "Objectification"
  },
  {
    "t": "Women shown chasing men who use the product",
    "c": "Objectification"
  },
  {
    "t": "Female characters reduced to decorative props",
    "c": "Objectification"
  },
  {
    "t": "Camera lingers on body parts, not faces",
    "c": "Objectification"
  },
  {
    "t": "A woman's consent treated as automatic",
    "c": "Objectification"
  },
  {
    "t": "Innuendo built on a woman's body",
    "c": "Objectification"
  },
  {
    "t": "A woman framed as the reward for buying",
    "c": "Objectification"
  },
  {
    "t": "Women shown as interchangeable, not individual",
    "c": "Objectification"
  },
  {
    "t": "Women's interests mocked as trivial",
    "c": "Sexism"
  },
  {
    "t": "Nagging or tantrums framed as a female trait",
    "c": "Sexism"
  },
  {
    "t": "Men ogling women played for laughs",
    "c": "Sexism"
  },
  {
    "t": "\"Boys will be boys\" used to excuse behaviour",
    "c": "Sexism"
  },
  {
    "t": "Harassment framed as flirtation",
    "c": "Sexism"
  },
  {
    "t": "A woman's opinion dismissed in the ad",
    "c": "Sexism"
  },
  {
    "t": "Women shown as bad at technical things",
    "c": "Sexism"
  },
  {
    "t": "A woman's success credited to a man",
    "c": "Sexism"
  },
  {
    "t": "Sacred symbols used as selling props",
    "c": "Religion"
  },
  {
    "t": "A ritual mocked or trivialised for effect",
    "c": "Religion"
  },
  {
    "t": "Deities placed in a commercial setting",
    "c": "Religion"
  },
  {
    "t": "One faith's festival treated as the default",
    "c": "Religion"
  },
  {
    "t": "A ritual reframed to sell a product",
    "c": "Religion"
  },
  {
    "t": "Sacred space used as an ad backdrop",
    "c": "Religion"
  },
  {
    "t": "Faith used to shame a consumer choice",
    "c": "Religion"
  },
  {
    "t": "Religious practice framed as backward",
    "c": "Religion"
  },
  {
    "t": "One community shown as the outsider",
    "c": "Communal"
  },
  {
    "t": "Interfaith friendship framed as unusual",
    "c": "Communal"
  },
  {
    "t": "Harmony framed as a special exception",
    "c": "Communal"
  },
  {
    "t": "A community shown only through stereotype",
    "c": "Communal"
  },
  {
    "t": "Minority characters given no voice",
    "c": "Communal"
  },
  {
    "t": "Religious identity used as a plot twist",
    "c": "Communal"
  },
  {
    "t": "A community shown only in traditional dress",
    "c": "Communal"
  },
  {
    "t": "Cultural mixing treated as controversial",
    "c": "Communal"
  },
  {
    "t": "Purity or pollution implied around food",
    "c": "Caste"
  },
  {
    "t": "Certain work coded as \"lower\" caste",
    "c": "Caste"
  },
  {
    "t": "Touch treated as contaminating",
    "c": "Caste"
  },
  {
    "t": "Segregated service framed as a feature",
    "c": "Caste"
  },
  {
    "t": "Traditional occupations shown as fixed by birth",
    "c": "Caste"
  },
  {
    "t": "Social hierarchy shown as the natural order",
    "c": "Caste"
  },
  {
    "t": "Surnames used to signal social rank",
    "c": "Caste"
  },
  {
    "t": "A character's place assumed from birth",
    "c": "Caste"
  },
  {
    "t": "Queer characters used as a punchline",
    "c": "LGBTQ"
  },
  {
    "t": "Gender nonconformity mocked",
    "c": "LGBTQ"
  },
  {
    "t": "Same-sex love framed as scandalous",
    "c": "LGBTQ"
  },
  {
    "t": "Trans people shown only as tragic",
    "c": "LGBTQ"
  },
  {
    "t": "Only cis-heterosexual families shown",
    "c": "LGBTQ"
  },
  {
    "t": "Queer identity treated as a phase",
    "c": "LGBTQ"
  },
  {
    "t": "Effeminacy in men used for comedy",
    "c": "LGBTQ"
  },
  {
    "t": "Queer inclusion used only for publicity",
    "c": "LGBTQ"
  }
];

const FALLBACK_PLAYLIST = [
  {
    "id": "eMWLN4OyLJo",
    "title": "Fair & Lovely (now Glow & Lovely) - Classic 'transformation' ads (1975+)",
    "hint": "Watch what physically changes about her just before the world starts taking her seriously.",
    "biasA": "Fair skin equated with success or beauty",
    "biasB": "Before/after framed as dark-to-fair",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "W_h5kK3T7B8",
    "title": "Fair & Lovely - 'Air hostess / job interview' ad (2007)",
    "hint": "She is qualified from the first frame. Notice what the ad says was really holding her back.",
    "biasA": "Fair complexion tied to better job prospects",
    "biasB": "Fair skin equated with success or beauty",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "IOj5pl6YWIM",
    "title": "Fair & Lovely - Father-daughter 'earning member' ad (2008)",
    "hint": "A father's hopes rest on his daughter. Watch what she is told to fix before she can earn.",
    "biasA": "Fair complexion tied to better job prospects",
    "biasB": "Fair skin equated with success or beauty",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "gDhV1LD3_F0",
    "title": "Fair & Handsome (Emami) - Shah Rukh Khan endorsement (2005+)",
    "hint": "The same old promise, now sold to men. What is being equated with confidence here?",
    "biasA": "Fair skin equated with success or beauty",
    "biasB": "Skin-whitening shown as self-improvement",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "MgBevCTBTJw",
    "title": "Fair & Handsome - John Abraham 'instant fairness' (2010s)",
    "hint": "Count the seconds between using the product and becoming attractive. What changed?",
    "biasA": "Skin-whitening shown as self-improvement",
    "biasB": "Fair skin equated with success or beauty",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "S7r98Oy6Akg",
    "title": "Pond's - White Beauty (Priyanka Chopra, Saif, Neha) (2009)",
    "hint": "A love story with a twist. Ask yourself what she had to alter before he came back.",
    "biasA": "Fair skin equated with success or beauty",
    "biasB": "Skin-whitening shown as self-improvement",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "iT9_yuaMrH4",
    "title": "Garnier - Garnier White Complete (2010s)",
    "hint": "Listen to the word the ad uses instead of saying what it actually means.",
    "biasA": "Skin-whitening shown as self-improvement",
    "biasB": "\"Glow\" used as code for lighter skin",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "UPkql4UDIpI",
    "title": "Olay - Natural White (2010s)",
    "hint": "A very particular shade is being sold as the ideal. Notice how it is described.",
    "biasA": "\"Glow\" used as code for lighter skin",
    "biasB": "Fair skin equated with success or beauty",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "q6COW4NNnJg",
    "title": "Nivea - Whitening deodorant / body lotion (2010s)",
    "hint": "Even here, on a part of the body no one sees, something is declared a problem.",
    "biasA": "Skin-whitening shown as self-improvement",
    "biasB": "Skin \"flaws\" shown as problems to fix",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "1bE9soQQu_Q",
    "title": "Vaseline - Vaseline Men fairness face wash (2010)",
    "hint": "Watch the before-and-after. In which direction does the ad assume improvement runs?",
    "biasA": "Before/after framed as dark-to-fair",
    "biasB": "Skin-whitening shown as self-improvement",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "UM_AXM8FbHY",
    "title": "Clean & Dry - Intimate Wash 'freshness & fairness' (2012)",
    "hint": "The product reaches somewhere startlingly private. What is still being sold as the fix?",
    "biasA": "Skin-whitening shown as self-improvement",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "2zyWDrFsny8",
    "title": "Godrej No.1 - Saffron & Milk fairness soap (2010s)",
    "hint": "An everyday household item, carrying a very specific promise about how you should look.",
    "biasA": "Fair skin equated with success or beauty",
    "biasB": "\"Glow\" used as code for lighter skin",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "jKejXbsG7nY",
    "title": "Fem - Turmeric bleach (Karva Chauth) (2000s)",
    "hint": "A festival for her husband. Notice what she is preparing to change about herself, and why.",
    "biasA": "Fairer brides shown as more desirable",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "1YXmTJeItGc",
    "title": "Dabur Gulabari - Rose water 'fair glow' (2010s)",
    "hint": "A traditional ingredient sells a modern promise. What outcome is she being prepared for?",
    "biasA": "\"Glow\" used as code for lighter skin",
    "biasB": "Fairer brides shown as more desirable",
    "cat": "Colour",
    "kind": "Bias"
  },
  {
    "id": "GYxqAKcIOXY",
    "title": "Jack & Jones - Ranveer Singh 'Take your work home' (2016)",
    "hint": "Read the tagline, then look at who is being carried. What is the pun actually about?",
    "biasA": "Women's bodies used to sell unrelated products",
    "biasB": "Female characters reduced to decorative props",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "2kVwjdaq55o",
    "title": "Layer'r - Shot deodorant 'twin' ad (2022)",
    "hint": "A group of men, a joke, and a woman who is not in on it. What is being played for laughs?",
    "biasA": "Harassment framed as flirtation",
    "biasB": "\"Boys will be boys\" used to excuse behaviour",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "TKN_uFOZGIg",
    "title": "Wild Stone - Deodorant temple/'mad' ads (2000s+)",
    "hint": "The spray goes on and the women lose all agency. What does the ad assume about wanting?",
    "biasA": "Women shown chasing men who use the product",
    "biasB": "A woman's consent treated as automatic",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "0SmsnKRvwYU",
    "title": "Axe (Lynx) - 'Axe effect' ads (2000s+)",
    "hint": "Count the women. Do any of them have a name, a face you remember, or a reason?",
    "biasA": "Women shown chasing men who use the product",
    "biasB": "Women shown as interchangeable, not individual",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "d1zVruNxnbs",
    "title": "Set Wet - Deodorant 'wet' ads (2000s)",
    "hint": "Everyone in frame exists to react to one man. What role are the women actually playing?",
    "biasA": "Women shown chasing men who use the product",
    "biasB": "Female characters reduced to decorative props",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "9oyT4dDsUXM",
    "title": "Ola Cabs - 'Annoying wife shopping' TVC (2016)",
    "hint": "The husband is the one we are meant to sympathise with. What is she reduced to?",
    "biasA": "Women's interests mocked as trivial",
    "biasB": "Nagging or tantrums framed as a female trait",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "DvuRDxM9tnU",
    "title": "Amazon India - Women's Day message (2010s)",
    "hint": "It is meant as a tribute. Notice which room of the house the tribute takes place in.",
    "biasA": "Women shown only in domestic or caregiving roles",
    "biasB": "Cooking and cleaning framed as a woman's job",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "1MBkgLDZQVI",
    "title": "Airtel - 'Boss by day, wife by night' ad (2014)",
    "hint": "She runs the office by day. Watch what she is still expected to run by night.",
    "biasA": "Cooking and cleaning framed as a woman's job",
    "biasB": "Women shown only in domestic or caregiving roles",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "J53WqL7gKz4",
    "title": "Prestige - Pressure cooker 'Jo biwi se pyaar' (1990s+)",
    "hint": "The jingle tells you who loves whom. Notice whose labour that love is measured in.",
    "biasA": "Cooking and cleaning framed as a woman's job",
    "biasB": "Women shown only in domestic or caregiving roles",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "wpj2qkaE7YQ",
    "title": "Nirma - Washing powder 'Nirma' housewife (1980s+)",
    "hint": "Decades of this jingle, and always the same smiling person at the washing line.",
    "biasA": "Women shown only in domestic or caregiving roles",
    "biasB": "Cooking and cleaning framed as a woman's job",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "yNvD5Xk97FI",
    "title": "Whirlpool / Voltas Beko - 'Tested by real moms' dishwasher (2010s)",
    "hint": "The machine is new. Notice who the ad still assumes is standing at the sink.",
    "biasA": "Cooking and cleaning framed as a woman's job",
    "biasB": "Women shown only in domestic or caregiving roles",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "I5iXqUt_-uM",
    "title": "Mother Dairy - Milk 'so I can care for mother' ad (2010s)",
    "hint": "A daughter explains why she drinks her milk. Listen to what her future is defined by.",
    "biasA": "Women shown only in domestic or caregiving roles",
    "biasB": "Boys steered to action, girls to beauty",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "8e_6dM23i-U",
    "title": "Kalyan Jewellers - Aishwarya Rai with child 'servant' (2015)",
    "hint": "Look past the star at the edge of the frame. Who is holding the parasol, and how are they lit?",
    "biasA": "Domestic workers shown as invisible or comic",
    "biasB": "Dark skin linked to negative or side roles",
    "cat": "Class",
    "kind": "Bias"
  },
  {
    "id": "0w-aaS4v3CM",
    "title": "Kamasutra - Condom TV commercials (1990s+)",
    "hint": "Track where the camera actually rests. How much of her is a person, how much a surface?",
    "biasA": "Women's bodies used to sell unrelated products",
    "biasB": "Camera lingers on body parts, not faces",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "r8VpZnBWI88",
    "title": "Nando's India - 'Heroine' tagline ad (2016)",
    "hint": "The whole gag rests on one word. What is that word implying about how women behave?",
    "biasA": "Nagging or tantrums framed as a female trait",
    "biasB": "Women's interests mocked as trivial",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "qqNqTF0AiI4",
    "title": "Qraa Men - Instagram grooming posts (2018)",
    "hint": "The product is for men. Ask why a woman's body is doing all the selling.",
    "biasA": "Women's bodies used to sell unrelated products",
    "biasB": "Female characters reduced to decorative props",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "UNvGG2SZeE4",
    "title": "Havells - 'Respect women' fan ad (early) (2010s)",
    "hint": "Before the brand's later rethink, notice what the woman in frame is there to do.",
    "biasA": "Female characters reduced to decorative props",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "PgiVBpAMSgg",
    "title": "Fastrack - 'Move on' watches/helmets ads (2010s)",
    "hint": "Youth, speed, and a very particular way of filming. What is the camera most interested in?",
    "biasA": "Camera lingers on body parts, not faces",
    "biasB": "Women shown as interchangeable, not individual",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "CYRLU7W_MWs",
    "title": "Center Shock / Center Fresh - 'Zubaan pe rakhe lagaam' ads (2000s)",
    "hint": "He chews, and something arrives. What has she been turned into by the end of the ad?",
    "biasA": "A woman framed as the reward for buying",
    "biasB": "Female characters reduced to decorative props",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "wHZhpUgNH2Q",
    "title": "Veet - 'Don't risk dudeness' hair removal (2014)",
    "hint": "The joke is that a body has crossed a line. Who exactly is the punchline landing on?",
    "biasA": "Gender nonconformity mocked",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "m4e5ZwDJ2a0",
    "title": "VLCC - Slimming & fairness makeover ads (2010s)",
    "hint": "A transformation story. Notice which two things must change together before she is celebrated.",
    "biasA": "Weight loss equated with happiness or success",
    "biasB": "One body type shown as the beauty standard",
    "cat": "Body Image",
    "kind": "Bias"
  },
  {
    "id": "1XRnc5hQ46s",
    "title": "Kellogg's Special K - 'Be special' / weight-loss ads (2010s)",
    "hint": "She is only shown smiling after a number changes. What is that number being equated with?",
    "biasA": "Weight loss equated with happiness or success",
    "biasB": "Thinness equated with discipline",
    "cat": "Body Image",
    "kind": "Bias"
  },
  {
    "id": "4TsC7sVb_tc",
    "title": "Horlicks - 'Taller, stronger, sharper' kids (2000s+)",
    "hint": "Three promises for your child. Notice how each one is a measurement rather than a quality.",
    "biasA": "Height tied to confidence or attractiveness",
    "biasB": "One body type shown as the beauty standard",
    "cat": "Body Image",
    "kind": "Bias"
  },
  {
    "id": "HhufM8dWSHs",
    "title": "Complan - 'I'm a Complan boy/girl' height ad (1990s+)",
    "hint": "The children announce what they are. Notice what growing up is reduced to here.",
    "biasA": "Height tied to confidence or attractiveness",
    "biasB": "One body type shown as the beauty standard",
    "cat": "Body Image",
    "kind": "Bias"
  },
  {
    "id": "Kwmcz2uZxSg",
    "title": "Bournvita - 'Tayyari jeet ki' pressure ads (2000s+)",
    "hint": "The child trains hard, but watch who is standing behind them and what she is reduced to.",
    "biasA": "Women shown only in domestic or caregiving roles",
    "biasB": "Boys steered to action, girls to beauty",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "tRFSp2aWK3o",
    "title": "Lux - Beauty-soap 'stars' ads (1950s+)",
    "hint": "Decades of stars, one unchanging promise. What exactly is a woman's value tied to here?",
    "biasA": "Women judged mainly by their appearance",
    "biasB": "One body type shown as the beauty standard",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "BFqj2DvCvEM",
    "title": "Lakmé - Fashion/beauty makeover ads (2000s+)",
    "hint": "A makeover as aspiration. Notice how narrow the finish line actually is.",
    "biasA": "One body type shown as the beauty standard",
    "biasB": "Fair skin equated with success or beauty",
    "cat": "Body Image",
    "kind": "Bias"
  },
  {
    "id": "EItx5D7bHwg",
    "title": "Slice / Aamsutra - Katrina Kaif 'Aamsutra' ads (2008)",
    "hint": "It is a fruit drink. Ask why it is being filmed the way it is.",
    "biasA": "Camera lingers on body parts, not faces",
    "biasB": "Women's bodies used to sell unrelated products",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "LaUdAQqUcrQ",
    "title": "Zatak / other deos - Deodorant 'girls chase' ads (2000s)",
    "hint": "The same trope again. What does the ad assume happens to a woman's will around this scent?",
    "biasA": "Women shown chasing men who use the product",
    "biasB": "A woman's consent treated as automatic",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "9zhozmQCDYg",
    "title": "Imperial Blue - 'Men will be men' ad series (2000s+)",
    "hint": "The tagline is the alibi. What behaviour is it quietly excusing as just natural?",
    "biasA": "Men ogling women played for laughs",
    "biasB": "\"Boys will be boys\" used to excuse behaviour",
    "cat": "Sexism",
    "kind": "Bias"
  },
  {
    "id": "MBUR6fOfoPg",
    "title": "Micromax / phones - 'Slim' phone with model ads (2010s)",
    "hint": "The ad is about a phone's thickness. Ask what the woman beside it is there to signal.",
    "biasA": "Female characters reduced to decorative props",
    "biasB": "Women's bodies used to sell unrelated products",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "wGSFTRXBBZ0",
    "title": "Gillette Vector / Mach3 - 'Shave to get the girl' ads (2000s)",
    "hint": "He shaves, and then something happens. Notice what is presented as the prize.",
    "biasA": "A woman framed as the reward for buying",
    "biasB": "Women shown chasing men who use the product",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "2GKIizsZT68",
    "title": "Wildstone / Old Spice - 'Manly man' ads (2010s)",
    "hint": "This one stereotypes men too. Watch how narrow the only acceptable way to be a man is.",
    "biasA": "Men discouraged from showing emotion",
    "biasB": "Men shown as the sole decision-makers",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "M-j8srAQPrI",
    "title": "Frooti / soft drinks - 'Naughty' teen-girl ads (2000s)",
    "hint": "Teenagers and a soft drink. Notice how young the people being filmed this way are.",
    "biasA": "Camera lingers on body parts, not faces",
    "biasB": "Women's bodies used to sell unrelated products",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "vohm3lf2SZc",
    "title": "Amul Macho - 'Yeh toh bada toing hai' ad (2007)",
    "hint": "She is doing the laundry. Notice what the ad turns that ordinary chore into.",
    "biasA": "Innuendo built on a woman's body",
    "biasB": "Cooking and cleaning framed as a woman's job",
    "cat": "Objectification",
    "kind": "Bias"
  },
  {
    "id": "UYDNSxhSQNc",
    "title": "Tanishq - 'Ekatvam' interfaith baby-shower ad (2020)",
    "hint": "A warm family scene that caused an uproar. What made it feel exceptional rather than ordinary?",
    "biasA": "Interfaith friendship framed as unusual",
    "biasB": "Harmony framed as a special exception",
    "cat": "Communal",
    "kind": "Counter-example"
  },
  {
    "id": "Zq7mN8oi8ds",
    "title": "Surf Excel - Holi 'mosque' ad (2019)",
    "hint": "A girl protects a friend so he can reach prayers. What does the backlash reveal about the default?",
    "biasA": "Interfaith friendship framed as unusual",
    "biasB": "One faith's festival treated as the default",
    "cat": "Communal",
    "kind": "Counter-example"
  },
  {
    "id": "qYwmoiCUZPE",
    "title": "Brooke Bond Red Label - Muslim shopkeeper / tea ad (2010s)",
    "hint": "A simple cup of tea between neighbours. Ask why this needed to be a statement at all.",
    "biasA": "One community shown as the outsider",
    "biasB": "Interfaith friendship framed as unusual",
    "cat": "Communal",
    "kind": "Counter-example"
  },
  {
    "id": "IpShKcoGYVw",
    "title": "Dabur Fem - Same-sex couple Karva Chauth ad (2021)",
    "hint": "A familiar ritual, an unfamiliar couple. What assumption did the outrage expose?",
    "biasA": "Same-sex love framed as scandalous",
    "biasB": "Only cis-heterosexual families shown",
    "cat": "LGBTQ",
    "kind": "Counter-example"
  },
  {
    "id": "rGoVjHkpmmw",
    "title": "FabIndia - 'Jashn-e-Riwaaz' Diwali collection (2021)",
    "hint": "Only the title of the collection changed hands here. What was treated as out of place?",
    "biasA": "One faith's festival treated as the default",
    "biasB": "Cultural mixing treated as controversial",
    "cat": "Communal",
    "kind": "Bias"
  },
  {
    "id": "6oTap85BB10",
    "title": "Sabyasachi - Mangalsutra jewellery campaign (2021)",
    "hint": "A sacred object placed in an intimate frame. What is being used to sell, and how?",
    "biasA": "Sacred symbols used as selling props",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "2I9jFuc-i4k",
    "title": "Manyavar - Alia Bhatt 'Kanyamaan' wedding ad (2022)",
    "hint": "The ad questions a wedding custom. Notice how a ritual becomes a marketing position.",
    "biasA": "A ritual mocked or trivialised for effect",
    "biasB": "A ritual reframed to sell a product",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "v3gLAf6sJYA",
    "title": "AU Small Finance Bank - Aamir Khan-Kiara 'Badlaav' ad (2023)",
    "hint": "A groom moves house instead of a bride. Ask which unspoken default the anger was defending.",
    "biasA": "A ritual reframed to sell a product",
    "biasB": "Women shown as dependent on men",
    "cat": "Gender",
    "kind": "Counter-example"
  },
  {
    "id": "GUBpfyZJfoc",
    "title": "Manforce (Mankind) - Sunny Leone Navratri hoardings (2018)",
    "hint": "A festival poster selling something quite unrelated. Notice both things being used here.",
    "biasA": "One faith's festival treated as the default",
    "biasB": "Women's bodies used to sell unrelated products",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "0axULaQy4Hc",
    "title": "OYO Rooms - 'God is everywhere, so is OYO' (2010s)",
    "hint": "The slogan borrows something enormous to sell something small. What is being borrowed?",
    "biasA": "Deities placed in a commercial setting",
    "biasB": "A ritual mocked or trivialised for effect",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "u9_NYkBXetk",
    "title": "Jawed Habib - Durga Puja salon ad (2017)",
    "hint": "Figures of worship, waiting their turn like customers. What has been made ordinary?",
    "biasA": "Deities placed in a commercial setting",
    "biasB": "Sacred symbols used as selling props",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "V1rsGuAezqA",
    "title": "Ceat Tyres - Aamir Khan 'idol on road' ad (2015)",
    "hint": "A line about where idols should and should not go. Notice what is being casually handled.",
    "biasA": "Sacred space used as an ad backdrop",
    "biasB": "A ritual mocked or trivialised for effect",
    "cat": "Religion",
    "kind": "Bias"
  },
  {
    "id": "JHKq05pwgS0",
    "title": "Zomato - 'Pure Veg Mode' green fleet (2024)",
    "hint": "A separate fleet, a separate colour. Ask what that separation is quietly encoding.",
    "biasA": "Purity or pollution implied around food",
    "biasB": "Segregated service framed as a feature",
    "cat": "Caste",
    "kind": "Bias"
  },
  {
    "id": "K8VmrhU5U5M",
    "title": "Bhima Jewellers - Transgender bride ad (2021)",
    "hint": "A bride's life story, told with real tenderness. What made her presence feel remarkable?",
    "biasA": "Trans people shown only as tragic",
    "biasB": "Only cis-heterosexual families shown",
    "cat": "LGBTQ",
    "kind": "Counter-example"
  },
  {
    "id": "sJPP7h6S104",
    "title": "Kent RO - Atta/Bread maker 'maid touches dough' ad (2020)",
    "hint": "The machine solves a problem the ad invents. Whose hands are being framed as the problem?",
    "biasA": "Touch treated as contaminating",
    "biasB": "Purity or pollution implied around food",
    "cat": "Caste",
    "kind": "Bias"
  },
  {
    "id": "rXIdtnvB8Pc",
    "title": "Red FM / others - Domestic-worker 'invisible maid' ads (2010s)",
    "hint": "Someone is in almost every frame of this household, and almost never the subject of it.",
    "biasA": "Domestic workers shown as invisible or comic",
    "biasB": "Manual labour portrayed as low-status",
    "cat": "Class",
    "kind": "Bias"
  },
  {
    "id": "aG9_2_3RYxw",
    "title": "Anouk (Myntra) - 'The Visible Woman' lesbian ad (2015)",
    "hint": "Two women getting ready together. Notice what the ad chose not to explain or apologise for.",
    "biasA": "Same-sex love framed as scandalous",
    "biasB": "Only cis-heterosexual families shown",
    "cat": "LGBTQ",
    "kind": "Counter-example"
  },
  {
    "id": "YeWfo8_f6Hc",
    "title": "Vicks - #TouchOfCare - Gauri Sawant (trans) (2017)",
    "hint": "A mother and daughter. Ask what kind of family the audience was expected to be surprised by.",
    "biasA": "Trans people shown only as tragic",
    "biasB": "Only cis-heterosexual families shown",
    "cat": "LGBTQ",
    "kind": "Counter-example"
  },
  {
    "id": "O8Vm8sxkh3c",
    "title": "Ariel - 'Share the Load' (#counter-example) (2015+)",
    "hint": "This one deliberately pushes back. Which long-standing assumption is it arguing against?",
    "biasA": "Cooking and cleaning framed as a woman's job",
    "biasB": "Women shown only in domestic or caregiving roles",
    "cat": "Gender",
    "kind": "Counter-example"
  },
  {
    "id": "r4Ix2_-_-sg",
    "title": "Havells - 'Hawa Badlegi' / respect ads (2010s)",
    "hint": "The brand's later rethink. Notice which earlier framing it is trying to correct.",
    "biasA": "Women shown only in domestic or caregiving roles",
    "biasB": "Women shown as dependent on men",
    "cat": "Gender",
    "kind": "Counter-example"
  },
  {
    "id": "3-VzW9_nzAs",
    "title": "Titan Raga - 'Her Life, Her Choices' ads (2010s)",
    "hint": "Progressive on the surface. Look at how narrow the aspirational woman still is.",
    "biasA": "Women judged mainly by their appearance",
    "biasB": "Career ambition portrayed as unfeminine",
    "cat": "Gender",
    "kind": "Bias"
  },
  {
    "id": "rymT28Z6KQY",
    "title": "Dove - 'Real Beauty' India films (2010s)",
    "hint": "It sets out to challenge a norm. Which single standard is it holding up for inspection?",
    "biasA": "One body type shown as the beauty standard",
    "biasB": "Women judged mainly by their appearance",
    "cat": "Body Image",
    "kind": "Counter-example"
  }
];

/* ---------- derived helpers (do not edit) ---------- */
let BIASES = FALLBACK_BIASES.slice();

function catList(list){
  const out = [];
  (list || BIASES).forEach(b => { if (out.indexOf(b.c) < 0) out.push(b.c); });
  return out;
}
function catColor(cat){
  if (CAT_COLORS[cat]) return CAT_COLORS[cat];
  const i = catList().indexOf(cat);
  return CAT_FALLBACK_COLORS[(i < 0 ? 0 : i) % CAT_FALLBACK_COLORS.length];
}
function biasCat(text){
  const b = BIASES.find(x => x.t === text);
  return b ? b.c : (BIASES[0] ? BIASES[0].c : "Gender");
}

/* The 10 winning lines on a 4x4 card (cell indexes 0-15, row-major). */
const WIN_LINES = (function(){
  const L = [];
  for (let r = 0; r < GRID; r++) {
    const row = []; for (let c = 0; c < GRID; c++) row.push(r * GRID + c);
    L.push({ type: "row", cells: row });
  }
  for (let c = 0; c < GRID; c++) {
    const col = []; for (let r = 0; r < GRID; r++) col.push(r * GRID + c);
    L.push({ type: "col", cells: col });
  }
  const d1 = [], d2 = [];
  for (let i = 0; i < GRID; i++) { d1.push(i * GRID + i); d2.push(i * GRID + (GRID - 1 - i)); }
  L.push({ type: "diag", cells: d1 });
  L.push({ type: "diag", cells: d2 });
  return L;
})();

/* Google Sheet CSV endpoints (built from SHEET_ID above). */
function sheetCsvUrl(tab){
  return "https://docs.google.com/spreadsheets/d/" + SHEET_ID +
         "/gviz/tq?tqx=out:csv&sheet=" + encodeURIComponent(tab);
}
function sheetConfigured(){
  return SHEET_ID && SHEET_ID.indexOf("PASTE_") !== 0;
}
