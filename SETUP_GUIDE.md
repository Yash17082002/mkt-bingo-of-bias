# Bingo of Bias - Setup and Hosting Guide

A live, multiplayer classroom game. One screen runs the room (the **host**), and up to about 100 phones or laptops join as **players**. Ads play on every screen at the same moment, marks save live, and a leaderboard updates in real time.

**What is new in this version**

- The bingo card is now **4x4** (16 tiles) and you win on **any one full line**: a row, a column or a diagonal.
- Players see a **hint**, not the answer. They have to work out which bias the ad is showing and tap that tile.
- A wrong tap turns the tile **red for that ad only**. It returns to normal on the next ad, so nothing is lost permanently.
- All content now lives in a **Google Sheet**. Edit the sheet, press Sync, and the game updates. No re-uploading files.
- The host sees, live, how many players got each ad **right**, **partly right**, or **wrong**.

You have five files:

| File | What it is |
|---|---|
| `index.html` | The **player** page (the link everyone opens). |
| `host.html` | The **host** dashboard (your private control panel). |
| `firebase-config.js` | The one small file you edit with your keys, passwords and Sheet ID. |
| `Indian_Ads_Biases.xlsx` | The content workbook. Upload this to Google Sheets. |
| `SETUP_GUIDE.md` | This guide. |

---

## Step 1 - Put the workbook on Google Sheets

1. Go to **https://drive.google.com** and sign in.
2. Click **New**, then **File upload**, and choose `Indian_Ads_Biases.xlsx`.
3. When it appears in Drive, **double click it**, then choose **Open with, Google Sheets**.
4. Go to **File, Save as Google Sheets**. You now have a proper Google Sheet. You can delete the uploaded .xlsx copy.
5. Click the blue **Share** button (top right). Under **General access** change **Restricted** to **Anyone with the link**, and leave the role as **Viewer**. Click **Done**.
6. Look at the address bar. The long code between `/d/` and `/edit` is your **Sheet ID**:

```
https://docs.google.com/spreadsheets/d/1AbC...longcode...XyZ/edit
                                        ^^^^^^^^^^^^^^^^^^^^ this part
```

Copy that code. Keep the tab names exactly **Ad Sheet** and **Biases**.

---

## Step 2 - Fill in `firebase-config.js`

Your Firebase keys are already filled in. You only need to add the Sheet ID:

```js
const SHEET_ID = "1AbC...longcode...XyZ";
```

Passwords are just below, change them if you like:

```js
const PLAYER_PASSWORD = "bias2025";   // tell this to the players
const HOST_PASSWORD   = "host2025";   // keep this private
```

Save the file.

---

## Step 3 - Upload to GitHub

1. Open your repository on **https://github.com**.
2. Click **Add file, Upload files**.
3. Drag in `index.html`, `host.html` and `firebase-config.js`, replacing the old ones.
4. Click **Commit changes**, wait about a minute, then hard refresh (Ctrl+Shift+R or Cmd+Shift+R).

Your two links stay the same:

- **Players:** `https://yash17082002.github.io/mkt-bingo-of-bias/`
- **Host (keep private):** `https://yash17082002.github.io/mkt-bingo-of-bias/host.html`

---

## Step 4 - Run a session

1. Open the **host link** and sign in with your host password.
2. Press **Sync from Google Sheet**. You should see a green note saying how many ads, biases and categories loaded. Any problem rows are listed in an amber box.
3. Press **Build 8 ad session**. This is important, read the next section for why.
4. Press **Start game**, then share the player link and password with the room.
5. Pick the first ad and press **Play to everyone**. It starts automatically on every screen at once.
6. Players read the hint above the video and tap the tile they think it points to.
7. Watch the four counters: **Found all**, **Found some**, **Guessed wrong**, **No answer yet**.
8. When the banner says the ad finished on every screen, press **Next**.
9. Winners appear on the **Leaderboard** as they complete a line. Expect the first ones around ad 3 or 4.
10. To run another round with the same crowd, press **Reset round**. Everyone keeps their seat and gets a fresh card.

---

## Why you must press "Build 8 ad session"

Cards are dealt from the biases of the ads in your session, so a card can only be filled if the session covers enough **different** biases. A 4x4 card needs **16 different biases** to be completely fillable.

The workbook is grouped by theme, so the first several rows are all fairness ads that repeat the same few biases. Taking ads in sheet order would cover only about **5** different biases and nobody could ever complete a line.

**Build 8 ad session** picks ads that between them cover as many different biases as possible. It reliably reaches all 16.

Under the playlist you will always see one of these:

- A green note: the session covers 16 or more biases and is ready.
- An amber warning: too few biases, nobody can win. Press the build button or add ads from other categories.

**How the timing works out.** Each ad reveals 2 biases, so after 5 ads 10 of the 16 tiles are in play. Tested across a simulated 100 player room:

| After ad | Players who have won (playing well) | (playing at about 70 percent accuracy) |
|---|---|---|
| 2 | almost none | almost none |
| 3 | about 9 percent | about 2 percent |
| 4 | about 36 percent | about 9 percent |
| 5 | about 81 percent | about 25 percent |

So the first winner nearly always appears at ad 3 or 4, and by ad 5 there is a clear group of winners. Nobody can win in the first two ads, which keeps the room in suspense.

---

## Editing the content

Everything lives in the Google Sheet. Edit it, then press **Sync from Google Sheet** in the host console. That is the whole workflow.

### Sheet "Ad Sheet" - one row per advertisement

| Column | What it does |
|---|---|
| Brand, Ad / Campaign, Year | Used to build the title the host sees. |
| Main Category, Subcategory | Labels for your own reference and the library filter. |
| Bias | Your description of the bias. Not shown in the game. |
| **Video ID** | The 11 character YouTube id. This is what actually plays. Required. |
| **Hint (shown to players)** | Shown above the video instead of the answer. Required for hint mode to make sense. |
| **Bingo Bias 1 / 2** | The correct answers. Must match the Biases tab exactly. |
| **Type** | `Bias` or `Counter-example` (an ad that pushes back against a stereotype). |

### Sheet "Biases" - the master list of tiles

| Column | What it does |
|---|---|
| Category | Any category you like. Add or remove categories freely. |
| Bias | The statement printed on a bingo tile. |

### To add a new ad

1. Add a row to **Ad Sheet**. Paste the **Video ID** and write a **Hint**.
2. Put the correct bias text into **Bingo Bias 1** (and 2 if there are two).
3. If that bias does not exist yet, add it to the **Biases** tab first, then copy the text across exactly.
4. Press **Sync from Google Sheet**.

### To add a new category

Just start using it in the **Biases** tab. The game picks up categories automatically and assigns each one a colour. No code change is needed.

### Finding a Video ID

Open the ad on YouTube. The id is the code after `v=`:

```
https://www.youtube.com/watch?v=Zq7mN8oi8ds
                                ^^^^^^^^^^^ this part
```

You can also paste a full link into **Add an ad by hand** in the host console and it will extract the id for you.

---

## Good to know

- **Bias text must match exactly** between the two tabs. The host console lists any row that does not match, so sync once before class and fix anything flagged.
- **All 71 ads have been checked** and their video ids verified as playable and embeddable. A few of the most controversial ads were pulled from YouTube by their brands, so those rows point at the closest available coverage. Swap in a better link any time.
- **Players:** the free Firebase plan comfortably handles about 100 players at once.
- **Sound:** ads try to play with sound automatically. Strict browsers may start muted and show a one tap **Tap for sound** button.
- **Correct marks are permanent.** Wrong taps only lock that tile for the current ad.
- **Refreshing is safe.** A player who reloads gets the same card and marks back.
- **Counter-examples** are ads that challenge a stereotype rather than commit it. They are marked in the Type column and are useful for discussion after the round.

---

## Troubleshooting

- **"Could not read the sheet"** - check the sheet is shared as **Anyone with the link, Viewer**, that the Sheet ID is right, and that the tabs are still named `Ad Sheet` and `Biases`.
- **Amber box listing rows** - a bias in Ad Sheet does not match the Biases tab character for character. Copy and paste the text rather than retyping it.
- **Nobody can complete a line** - your session covers fewer than 16 biases. Press **Build 8 ad session**.
- **Connecting forever** - the Firebase keys in `firebase-config.js` are missing, or GitHub Pages has not refreshed yet. Wait a minute and hard refresh.
- **Players see nothing playing** - make sure you pressed **Play to everyone**, not just selected the ad. The pill at the top should read "Playing: ...".
- **A video will not load** - some YouTube videos are blocked from embedding by their owner. Swap in a different link.
- **Leaderboard empty** - normal until someone completes a full line.

---

## A note on security

Test mode Firestore rules let anyone with the link read and write the game data, which is fine for a short supervised session. To lock it afterwards, go to **Firestore, Rules** and set:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
  }
}
```

Set it back to `if true;` before your next session, or simply delete the `players` collection between events. The passwords in `firebase-config.js` are a light gate, not strong protection, so do not reuse an important password there.
