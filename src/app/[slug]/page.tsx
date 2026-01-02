'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Mail, Phone, Globe, Linkedin, Twitter, Github, Instagram, Download, Share2, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { getSupabaseClient } from '@/lib/supabase'
import { Profile } from '@/types'
import { useParams } from 'next/navigation'

export default function BusinessCard() {
  const params = useParams()
  const { theme, setTheme } = useTheme()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const slug = params.slug as string

  useEffect(() => {
    async function fetchProfile() {
      const supabase = getSupabaseClient()
      
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', slug)
        .single()

      if (data) {
        setProfile(data)
        
        await supabase
          .from('profiles')
          .update({ visits: (data.visits || 0) + 1 })
          .eq('id', data.id)
      }

      setLoading(false)
    }

    if (slug) {
      fetchProfile()
    }
  }, [slug])

  const downloadVCard = () => {
    if (!profile) return

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.full_name}
TITLE:${profile.job_title}
ORG:${profile.company}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.website || ''}
NOTE:${profile.bio}
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.full_name.replace(/\s+/g, '_')}.vcf`
    a.click()
    URL.revokeObjectURL(url)
  }

  const shareCard = async () => {
    if (navigator.share && profile) {
      try {
        await navigator.share({
          title: `${profile.full_name}'s Digital Card`,
          text: `Check out ${profile.full_name}'s digital business card!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Share failed:', err)
      }
    }
  }

  const trackQRScan = async () => {
    const supabase = getSupabaseClient()
    
    if (profile && supabase) {
      await supabase
        .from('profiles')
        .update({ qr_code_scans: (profile.qr_code_scans || 0) + 1 })
        .eq('id', profile.id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Profile not found</p>
      </div>
    )
  }

  const primaryColor = profile.custom_theme?.primary_color || '#3b82f6'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div 
            className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ 
              background: profile.custom_theme?.primary_color 
                ? `linear-gradient(135deg, ${profile.custom_theme.primary_color}, ${profile.custom_theme.primary_color}aa)` 
                : undefined 
            }}
          />
          
          <div className="px-6 pb-6">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>

            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700">
                {profile.profile_image ? (
                  <img
                    src={profile.profile_image}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {profile.full_name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profile.full_name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">
              {profile.job_title}
            </p>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {profile.company}
            </p>

            {profile.bio && (
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {profile.bio}
              </p>
            )}

            <div className="mt-6 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <Mail className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
                <span className="text-gray-700 dark:text-gray-300">{profile.email}</span>
              </a>

              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <Phone className="h-5 w-5 text-gray-500 group-hover:text-green-500 transition-colors" />
                <span className="text-gray-700 dark:text-gray-300">{profile.phone}</span>
              </a>

              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                >
                  <Globe className="h-5 w-5 text-gray-500 group-hover:text-purple-500 transition-colors" />
                  <span className="text-gray-700 dark:text-gray-300">{profile.website}</span>
                </a>
              )}
            </div>

            {profile.social_links && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.social_links.linkedin && (
                  <a
                    href={profile.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {profile.social_links.twitter && (
                  <a
                    href={profile.social_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {profile.social_links.github && (
                  <a
                    href={profile.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {profile.social_links.instagram && (
                  <a
                    href={profile.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-pink-50 dark:bg-pink-900/20 text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={downloadVCard}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: primaryColor }}
              >
                <Download className="h-5 w-5" />
                Save Contact
              </button>
              <button
                onClick={shareCard}
                className="px-4 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div onClick={trackQRScan} className="cursor-pointer">
                <QRCodeSVG
                  value={window.location.href}
                  size={150}
                  level="H"
                  includeMargin
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Scan to save this contact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
