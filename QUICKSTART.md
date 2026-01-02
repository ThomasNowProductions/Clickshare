# Quick Start Guide

Get Clickshare up and running in 5 minutes.

## 1. Install Dependencies (Already Done)

```bash
npm install
```

## 2. Set Up Supabase (5 minutes)

### Create Account & Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project" → Name it "clickshare"
3. Set a password and click "Create new project"
4. Wait 2-3 minutes for project to initialize

### Get Credentials
1. Go to **Settings** → **API** (left sidebar)
2. Copy **Project URL** (starts with https://)
3. Copy **anon/public** key

### Run SQL Migration
1. Go to **SQL Editor** in left sidebar
2. Click "New query"
3. Copy all SQL from `supabase/migrations/001_initial_schema.sql`
4. Paste it in the editor
5. Click "Run" bottom right

### Set Up Storage
1. Go to **Storage** in left sidebar
2. Click "New bucket"
3. Name it `profiles` (exact match!)
4. Make it **Public**
5. Click "Create bucket"

## 3. Configure Environment

Create `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the values with your Supabase credentials.

## 4. Start Development

```bash
npm run dev
```

Open http://localhost:3000

## 5. Create Your Card

1. Click "Create Your Card"
2. Fill in:
   - **Slug**: Choose a URL path (e.g., `john-doe`)
   - **Profile Info**: Name, job, company
   - **Contact**: Email, phone
   - **Optional**: Website, bio, photo, social links
   - **Theme**: Pick your brand color
3. Click "Create Card"

Your card is now live at `http://localhost:3000/john-doe`

## What You Can Do

- **Share URL**: Copy the link from your browser
- **QR Code**: Scan it with your phone camera
- **Download vCard**: Click "Save Contact" → opens in Contacts app
- **Share Button**: On mobile, use native share menu
- **Theme Toggle**: Click sun/moon icon for dark/light mode

## Common Issues

### "Profile not found"

Run the SQL migration in Supabase SQL Editor (step 2.3)

### Image upload fails

- Check storage bucket name is exactly `profiles`
- Make sure bucket is Public

### Build errors

```bash
# Clean and rebuild
rm -rf .next
npm install
npm run build
```

## Next Steps

- Deploy to Vercel (see DEPLOYMENT.md)
- Customize design
- Add your real profile
- Share with friends/colleagues

## Need Help?

- **Supabase Docs**: supabase.com/docs
- **Next.js Docs**: nextjs.org/docs
- **Vercel Docs**: vercel.com/docs
