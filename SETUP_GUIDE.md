# Bingo of Bias — Setup & Hosting Guide

This is a **live, multiplayer** game. One screen runs the room (the **host**), and 90–100 phones/laptops join as **players**. Ads play on everyone's screen at the same time, marks are saved live, and a leaderboard updates in real time.

To make that work for free you need two free services:

- **GitHub Pages** — hosts the web pages and gives you the two shareable links.
- **Firebase (Firestore)** — the live "switchboard" that syncs video playback, marks, and the leaderboard across all players.

You'll do a one-time setup (about 15–20 minutes), then you can run the game as many times as you like.

You have four files:

| File | What it is |
|---|---|
| `index.html` | The **player** page (the link everyone opens). |
| `host.html` | The **host** dashboard (your private control panel). |
| `firebase-config.js` | The one small file you edit with your keys and passwords. |
| `SETUP_GUIDE.md` | This guide. |

---

## Step 1 — Create a Firebase project (the live switchboard)

1. Go to **https://console.firebase.google.com** and sign in with a Google account.
2. Click **Add project**. Name it anything (e.g. `bingo-of-bias`). You can turn **off** Google Analytics. Click **Create project**.
3. In the left menu open **Build → Firestore Database**. Click **Create database**.
4. Choose a location near you (e.g. `asia-south1` for India), then choose **Start in test mode**, and click **Enable**.
   - Test mode lets the game read and write freely. That's fine for a classroom session. (See the security note at the end.)

### Get your web keys

5. Go to the **Project Overview** page (the home page of your project). In the **center** of the page, under a line like "Get started by adding Firebase to your app," click the **`</>`** (web) icon.
   - If you don't see those icons, look for an **Add app** button in that same area and click it, then pick web.
   - Alternative route: the **gear icon** sits at the **top of the left-hand menu**, next to "Project Overview." Click it → **Project settings** → **General** tab → scroll to the **Your apps** card → click the **`</>`** web icon.
6. (If prompted) skip the **Firebase Hosting** checkbox — you're using GitHub Pages, not Firebase Hosting.
7. Give it a nickname (e.g. `bingo-web`) and click **Register app**.
8. Firebase shows a `firebaseConfig = { ... }` block. Keep this tab open — you'll copy these six values next.

---

## Step 2 — Fill in `firebase-config.js`

Open `firebase-config.js` in any text editor (Notepad, TextEdit, VS Code). Replace the placeholder values at the top with the ones from Firebase:

```js
const FIREBASE_CONFIG = {
  apiKey:            "AIza...your value...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId:             "1:1234567890:web:abcdef..."
};
```

Then set your two passwords just below:

```js
const PLAYER_PASSWORD = "bias2025";   // tell this to the players
const HOST_PASSWORD   = "host2025";   // keep this private
```

Save the file. (You don't need to change anything else, though you can edit the bias tiles or default playlist further down if you want.)

---

## Step 3 — Put the files online with GitHub Pages

1. Go to **https://github.com** and sign in (create a free account if needed).
2. Click **New** to create a repository. Name it e.g. `bingo-of-bias`, set it to **Public**, and click **Create repository**.
3. On the new repo page, click **uploading an existing file** (or **Add file → Upload files**).
4. Drag in all four files together: `index.html`, `host.html`, `firebase-config.js`, `SETUP_GUIDE.md`. Click **Commit changes**.
5. Go to the repo's **Settings → Pages** (left menu).
6. Under **Build and deployment → Source**, choose **Deploy from a branch**. Set branch to **main** and folder to **/(root)**. Click **Save**.
7. Wait about 1–2 minutes. The page will show your site URL, like:
   `https://YOUR-USERNAME.github.io/bingo-of-bias/`

---

## Step 4 — Your two links

Once Pages is live, your links are:

- **Players (share this widely):**
  `https://YOUR-USERNAME.github.io/bingo-of-bias/`
- **Host (keep this private):**
  `https://YOUR-USERNAME.github.io/bingo-of-bias/host.html`

The host dashboard also displays both links once you log in, so you can copy them from there.

---

## Step 5 — Run a session

1. **You (host):** open the host link, enter your **host password**.
2. Click **Start game**.
3. **Players:** open the player link, type a name and the **game password**, tap **Join the game**. You'll see the join count climb on your dashboard.
4. When you're ready, pick an ad in the **Playlist** and press **▶ Play to everyone** (or use **Play to everyone** / **Next** / **Previous** at the top).
   - The ad starts **automatically** on every player's screen at the same time. Players don't press anything to start it.
5. Players watch and tap the matching tiles on their **5×5 card**. The biases to look for show **above the video**.
6. Press **■ End ad** when you want to stop it. When an ad plays all the way through on a player's device it counts toward the **"Ad finished on … screens"** banner on your dashboard — when it reads *all*, everyone has watched it to the end. Then move to the **Next** ad.
7. Watch the **Leaderboard** fill up. A player **wins** only when they complete **one full row, one full column, and one diagonal** on their own card. Winners get a "You won" screen and can relax while everyone else keeps playing.
8. To play a fresh round with the same crowd, click **Reset round**. Everyone keeps their seat but gets a brand-new shuffled card and a cleared score.

### How many winners? You control it.
Each player's card is a **random 25 of 40 biases**, all shuffled — so no two cards match, and the triple-line win (row **and** column **and** diagonal) is deliberately hard. The single dial that decides how many people win is **how many different biases you show across the session** (counting each ad's tagged biases):

| Different biases shown | Winners in a ~100-person room |
|---|---|
| ~12 (the 6 starter ads only) | essentially none |
| ~20 | a rare one or two |
| ~24–28 | **a handful — the sweet spot** |
| ~32+ | many |

So if you want a few winners to emerge, plan to show **around 24–28 distinct biases** — roughly 10–14 ads at 2 biases each, or about 8–10 ads if you tag 3 biases each. Showing only the 6 starter ads will rarely produce a winner.

### Adding an ad on the spot
In **Add an ad now**, paste any YouTube link (or the 11-character video ID), give it a title, pick 2 (or 3) biases from the dropdowns, and click **Add to playlist**. It appears instantly in your playlist, ready to play. The biases you chose are what players see above that video — and only players who happen to have that bias on their card can mark it.

---

## Good to know

- **Players:** the free Firebase plan comfortably handles around 100 simultaneous players. If you expect more than ~100 at once, in the Firebase console switch the project to the **Blaze** plan (still free at this scale — it just asks for a card and only charges if you go far beyond a classroom's usage).
- **Sound:** ads try to play with sound automatically. A few strict browsers (often Safari/iPhone) may start muted; those players will see a small **"Tap for sound"** button once — a single tap fixes it for the rest of the session. On most laptops in Chrome, sound just works because the player already tapped "Join".
- **Marks are permanent.** Once a player marks a tile, it stays struck for the whole round (it never disappears or regenerates). Tiles can only be marked while an ad is actually playing.
- **Refreshing is safe.** If a player reloads, they get their same card and marks back.

---

## Troubleshooting

- **"Game isn't connected" / connecting forever:** you haven't pasted real Firebase keys into `firebase-config.js`, or you re-uploaded the file but GitHub Pages hasn't refreshed yet (give it a minute, then hard-refresh with Ctrl/Cmd+Shift+R).
- **Players see nothing playing:** make sure you pressed **Play to everyone**, not just selected the ad. The host pill at the top should read "Playing: …".
- **A video won't load:** some YouTube videos are blocked from embedding by their owner. Swap in a different video/link.
- **Leaderboard empty:** that's normal until someone completes a full row, column, or diagonal.

---

## A note on security

Test-mode Firestore rules let anyone with the link read and write the game data. That's appropriate for a short, supervised classroom session. For peace of mind afterward you can, in **Firestore → Rules**, set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
  }
}
```

to lock it (set back to `if true;` before your next session), or simply delete the `players` collection between events. The passwords in `firebase-config.js` are a light gate to keep casual visitors out, not strong protection — anyone determined could read them in the page source, so don't reuse an important password here.
