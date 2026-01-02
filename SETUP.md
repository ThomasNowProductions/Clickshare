# Setup Guide

This guide will help you set up Clickshare from scratch.

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- A Supabase account (free tier works)

## Step 1: Clone or Initialize the Project

If you're starting from this repository:
```bash
git clone <your-repo-url>
cd Clickshare
npm install
```

If you're creating a new project, the code has already been set up for you in the current directory.

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and sign in/create an account
2. Click "New Project"
3. Choose a name (e.g., "clickshare") and a database password
4. Wait for the project to be created (this may take a couple of minutes)

### Configure Supabase

1. Go to your project's **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xyz.supabase.co`)
   - **anon public** key (the long string under "Project API keys")

3. Create the database tables by running the SQL from `supabase/migrations/001_initial_schema.sql`:
   - Go to **SQL Editor** in Supabase dashboard
   - Click "New query"
   - Copy the content of `supabase/migrations/001_initial_schema.sql`
   - Paste and click "Run"

4. Set up storage for profile images:
   - Go to **Storage** in the left sidebar
   - Create a new bucket named "profiles"
   - Make it **Public**
   - The RLS policies are already created in the SQL migration

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important**: Replace the values with your actual Supabase URL and anon key.

## Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Create Your First Card

1. Click "Create Your Card"
2. Fill in your profile information
3. Upload a profile picture (optional)
4. Add social media links (optional)
5. Choose a custom theme color
6. Click "Create Card"

Your card will be created and you'll be redirected to view it at `/your-slug`.

## Step 6: Test the Features

- **View your card**: Navigate to your slug
- **Download vCard**: Click "Save Contact" to download a .vcf file
- **Scan QR Code**: Use your phone's camera to scan the QR code
- **Share**: Click the share button (on mobile) or copy the URL
- **Toggle Theme**: Click the sun/moon icon to switch between light and dark mode
- **Analytics**: Check visits in your Supabase dashboard

## Troubleshooting

### "Profile not found" error

Make sure:
- You've run the SQL migration
- The slug you're looking for exists in the database
- Environment variables are correctly set

### Image upload not working

Make sure:
- Storage bucket "profiles" exists in Supabase
- The bucket is set to public
- You have the correct Supabase URL and anon key

### Build errors

Check that:
- All dependencies are installed: `npm install`
- TypeScript errors are resolved: `npm run lint`
- Environment variables are set

## Next Steps

- Deploy to Vercel (see DEPLOYMENT.md)
- Customize the design
- Add more features (analytics dashboard, PDF export, etc.)
- Share your card!

## Security Notes

- Never commit `.env.local` to version control
- The anon key is safe for client-side use
- Row Level Security (RLS) is enabled on the database
- Consider adding authentication for editing profiles (future enhancement)
