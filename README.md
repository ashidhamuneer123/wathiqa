# WATHIQA · وثيقة — Document Clearing Services website template

Next.js 15 + Three.js (3D Dubai skyline hero, 3D stamp animation, 3D tilt cards).
English / Arabic (RTL) switch · WhatsApp integration · social icons · mobile hamburger menu · link-preview card.

---

## 1. Run it on your laptop
1. Install **Node.js 20 LTS** from nodejs.org (once).
2. Unzip this folder, open it in VS Code.
3. In the VS Code terminal:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000

## 2. Change it for a client
| What | File |
|---|---|
| Name, WhatsApp number, phone, email, hours, map location, social links | `lib/site.ts` |
| All English + Arabic text, service lists | `lib/content.ts` |
| Logo | `components/Logo.tsx` + `app/icon.svg` (browser tab icon) |
| Photos | `public/images/about-main.jpg`, `about-small.jpg` (prompts in `IMAGE-PROMPTS.md`) |
| WhatsApp/Facebook link-preview picture (1200×630) | `public/og.png` |
| Colours | top of `app/globals.css` |
| 3D hero (globe + Dubai skyline) | `components/three/GlobeScene.tsx` (Earth textures in `public/globe/`, NASA Blue Marble, public domain) |

WhatsApp number format in `lib/site.ts`: digits only with country code, e.g. `971501234567`.

## 3. Put the code on GitHub (needed for all hosts)
1. github.com → **New repository** → name it (e.g. `wathiqa-site`) → Create.
2. In the VS Code terminal inside the project:
   ```bash
   git init
   git add .
   git commit -m "first version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/wathiqa-site.git
   git push -u origin main
   ```

## 4A. Host on Vercel (easiest for Next.js — recommended)
1. vercel.com → **Sign up with GitHub**.
2. **Add New → Project** → pick the repo → **Import**.
3. Leave settings as they are (Framework: Next.js). Open **Environment Variables** and add
   `NEXT_PUBLIC_SITE_URL` = `https://clientdomain.ae`
4. **Deploy** → you get `something.vercel.app` in ~1 minute.
5. Custom domain: Project → **Settings → Domains** → add `clientdomain.ae` and `www.clientdomain.ae` → Vercel shows the DNS records (an A record `76.76.21.21` and a CNAME `cname.vercel-dns.com`) → add them at the domain provider (GoDaddy / Hostinger / etc.). SSL is automatic.
6. Every `git push` updates the site automatically.

## 4B. Host on Cloudflare Pages (free, very fast in UAE)
1. dash.cloudflare.com → sign up → **Workers & Pages → Create → Pages → Connect to Git** → choose the repo.
2. Build settings:
   - Framework preset: **None**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Environment variables: `NODE_VERSION` = `20`, `NEXT_PUBLIC_SITE_URL` = `https://clientdomain.ae`
3. **Save and Deploy** → you get `something.pages.dev`.
4. Custom domain: Pages project → **Custom domains → Set up a domain**. Easiest if the domain's nameservers are moved to Cloudflare (Cloudflare guides you; free plan). Otherwise add the CNAME it shows at the domain provider.
5. Every `git push` redeploys.

## 4C. Netlify
Same as Cloudflare: build command `npm run build`, publish directory `out`, env `NEXT_PUBLIC_SITE_URL`.

## 5. After going live — check
- Open the site on your phone, test the hamburger menu and the Arabic switch.
- Tap every WhatsApp button — it should open a chat with the client's number.
- Paste the link in WhatsApp → the preview card should show. If an old preview sticks, test at https://developers.facebook.com/tools/debug/ (click "Scrape again").
- Add the site to Google Business Profile and Google Search Console.

## Notes
- The contact form needs no backend: it opens WhatsApp with the message filled in.
- The numbers band and "10+ years" badge are sample figures — replace them.
- 3D scenes load only when visible and lower quality on phones; "reduce motion" users get static animations.
