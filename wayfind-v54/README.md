# Wayfind — Live Version

This is the real, production Wayfind. It uses your Google Maps API key to pull
**live places** (real restaurants, bars, hotels, attractions, shopping) and show
a **real street map**. No more curated lists, no more grid map.

You do not need to install anything or write code. Everything below happens in
your web browser. Total time: about 20 minutes.

---

## What you have

A complete website project (these files). To make it live on the internet, you
put these files on **GitHub** (free storage) and connect them to **Vercel**
(free hosting). Vercel turns the files into a real website with a link you can
open on your phone.

---

## Step 1 — Create a free GitHub account

1. Go to **github.com** and sign up (free). Verify your email.

## Step 2 — Put the project on GitHub

1. Click the **+** in the top-right of GitHub → **New repository**.
2. Name it `wayfind`. Leave it **Public** (or Private, either works). Click **Create repository**.
3. On the next page, click the link **"uploading an existing file"** (in the line
   "Get started by … uploading an existing file").
4. On your computer, **unzip** the Wayfind project I gave you. You'll see folders
   named `app`, `lib`, and files like `package.json`.
5. **Drag all of those files and folders** into the GitHub upload box at once.
   (Select everything inside the unzipped folder and drag it in.)
6. Scroll down and click **Commit changes**.

> Tip: make sure you upload the **contents** of the project folder (the `app`
> folder, `lib` folder, `package.json`, etc.), not a single zip file.

## Step 3 — Deploy on Vercel

1. Go to **vercel.com** → **Sign Up** → choose **Continue with GitHub** (this
   links the two accounts so Vercel can see your project).
2. Click **Add New… → Project**.
3. Find your `wayfind` repository in the list and click **Import**.
4. **Before clicking Deploy**, open the **Environment Variables** section and add:
   - **Name:** `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
   - **Value:** paste your Google key (the long string starting with `AIza…`)
   - Click **Add**.
5. Click **Deploy**. Wait 1–2 minutes.
6. Vercel gives you a link like `wayfind-xxxx.vercel.app`. **Open it on your phone.**

That's it — you should see real places and a real map.

---

## Step 4 — Lock your key to your website (do this right after it works)

Now that you have your live link, go back to Google Cloud and restrict the key so
only your site can use it. This protects you from anyone running up your bill.

1. Go to **console.cloud.google.com** → menu → **APIs & Services → Credentials**.
2. Click your API key.
3. Under **Application restrictions**, choose **Websites**.
4. Click **Add**, and enter your Vercel address two ways so both work:
   - `wayfind-xxxx.vercel.app/*`
   - `*.vercel.app/*`
5. Save. (If you later get a custom domain like `wayfind.com`, add `wayfind.com/*` too.)

---

## Notes & honesty

- **Cost:** You have $300 in free trial credit. Normal testing and showing friends
  costs little to nothing. Set a budget alert in Google Cloud → Billing → Budgets
  & alerts (e.g., alert at $10) so you're never surprised.
- **Events tab:** This first version covers Food, Nightlife, Attractions, Hotels,
  and Shopping from Google. Live **Events** need a separate source (Ticketmaster /
  Eventbrite) — that's the next add-on once this is running.
- **Sub-filters & source badges** (Romantic, Karaoke, "Loved on Reddit", etc.)
  from the prototype are layered back in after the core live version is confirmed
  working. We build on a foundation that works, then add.

If anything errors out, tell me exactly what the screen says and I'll fix it.
