# Deployment Guide

This guide covers deploying Clickshare to Vercel with your own custom domain.

## Deploy to Vercel

### Prerequisites

- Your Clickshare code pushed to GitHub
- A Vercel account (free tier works)
- A Supabase project set up (see SETUP.md)

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Clickshare digital business card app"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Find your `Clickshare` repository and click "Import"
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. Click "Continue"

### Step 3: Add Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `NEXT_PUBLIC_APP_URL`: Your Vercel domain (will get this after first deploy)

3. Click "Save"

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. You'll get a domain like: `clickshare.vercel.app`

### Step 5: Update APP_URL

After first deployment:
1. Copy your Vercel domain
2. Go to **Settings** → **Environment Variables** in Vercel
3. Update `NEXT_PUBLIC_APP_URL` to your domain
4. Redeploy (it will happen automatically on next git push)

## Custom Domain Setup

### Option A: Use Vercel Domain

You can use the default Vercel domain: `your-project.vercel.app`

### Option B: Add Custom Domain

1. Go to your Vercel project
2. Click **Settings** → **Domains**
3. Enter your custom domain (e.g., `cards.yourcompany.com`)
4. Click "Add"

5. **If you own the domain**:
   - Vercel will provide DNS records to add
   - Go to your domain registrar (Namecheap, GoDaddy, etc.)
   - Add the DNS records as shown by Vercel
   - Wait for DNS to propagate (can take 5-30 minutes)

6. **If using a subdomain**:
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or use A record pointing to Vercel's IP

7. Enable HTTPS (Vercel does this automatically with Let's Encrypt)

### Option C: Vercel for Teams Domain

If you're using Vercel Teams:
1. Add domain in team settings
2. Verify domain ownership
3. Assign to your project

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_APP_URL` | Your deployed app URL | `https://cards.yourcompany.com` |

## Database Considerations

### Production Database

- Use a paid Supabase tier if you expect high traffic
- Free tier has limits on bandwidth and connections
- Monitor your Supabase dashboard for usage

### Backups

- Supabase provides automatic daily backups on paid tiers
- Consider setting up manual backups before major changes
- Export your SQL schema and data regularly

## Performance Optimization

### Images

- Profile images are stored in Supabase Storage
- Consider adding image optimization
- Set reasonable upload size limits

### Caching

- Vercel automatically caches static assets
- Consider using ISR (Incremental Static Regeneration) for static cards
- Configure cache headers in `next.config.ts` if needed

### Analytics

- Use Vercel Analytics for deployment metrics
- Use Supabase Analytics for database queries
- Consider adding PostHog or similar for user analytics

## Security Best Practices

### Environment Variables

- Never commit `.env.local`
- Use different keys for dev/staging/production
- Rotate keys periodically

### Supabase RLS

- Row Level Security is enabled
- Currently allows public reads
- Add authentication for editing (future feature)
- Restrict write access if needed

### HTTPS

- Always use HTTPS in production
- Vercel provides SSL certificates automatically
- Redirect HTTP to HTTPS

## Monitoring

### Vercel Dashboard

Monitor:
- Build status
- Deployment logs
- Function executions
- Bandwidth usage

### Supabase Dashboard

Monitor:
- Database connections
- Query performance
- Storage usage
- API requests

## Scaling

### Free Tier Limits

- **Vercel Free**: 
  - 100GB bandwidth/month
  - 6,000 minutes execution/month
  - Unlimited team members
  - 3 deployments per hour

- **Supabase Free**:
  - 500MB database
  - 1GB storage
  - 2GB bandwidth
  - 50,000 monthly active users

### When to Upgrade

Consider upgrading when:
- You exceed bandwidth limits
- Need more storage
- Want better performance
- Need additional features (auth, edge functions, etc.)

## Troubleshooting

### Build Failures

- Check environment variables are set correctly
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Deployment Issues

- Ensure GitHub repo is connected
- Check for merge conflicts
- Verify build settings

### Runtime Errors

- Check Supabase connection
- Verify storage bucket exists
- Check CORS settings if needed
- Review browser console for errors

## CI/CD

### Automatic Deployments

By default, Vercel:
- Deploys on every push to main branch
- Creates preview deployments for pull requests
- Automatically cancels old builds

### Manual Deployments

To deploy manually:
1. Push to your repository
2. Click "Deployments" in Vercel
3. Click "Redeploy" next to a previous deployment

### Custom Build Settings

In `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployments**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Supabase Help**: [supabase.com/docs](https://supabase.com/docs)
