import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Sailboat, Users, Clock, Mail, Phone, MapPin, Check } from 'lucide-react'
import ImageGallery from '../components/ImageGallery'

const WHATSAPP_URL = "https://wa.me/201024595279?text=Hello%20Alaa%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20Luxor%20tours%20and%20accommodations.%0A%0AThank%20you."

// Dynamically load all images from Dahabiya folder
const DAHABIYA_MODULES = import.meta.glob('../assets/tours/DAHABIYA CRUISE 6/*.jpeg', { eager: true, import: 'default' })

// Ensure cover.jpeg is the first image in the gallery, followed by the remaining images
const DAHABIYA_IMAGES = (() => {
  const entries = Object.entries(DAHABIYA_MODULES)
  const coverEntry = entries.find(([path]) => path.endsWith('cover.jpeg'))
  const otherEntries = entries.filter(([path]) => !path.endsWith('cover.jpeg'))
  
  const sortedEntries = coverEntry ? [coverEntry, ...otherEntries] : entries
  return sortedEntries.map(([, imgModule]) => imgModule)
})()

export default function DahabiyaDetails() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = t('seo.dahabiyaTitle')
  }, [t, i18n.language])

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Navbar Header */}
      <header className="sticky top-0 bg-surface/90 backdrop-blur-xl border-b border-white/10 z-40 py-4 transition-luxury shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-charcoal hover:text-mud-brick font-label-caps transition-luxury cursor-pointer"
          >
            <ArrowLeft size={16} /> {t('nav.back')}
          </button>
          <div className="font-headline-md tracking-tighter text-charcoal">
            {t('footer.shortBrand')}
          </div>
          <div className="w-20 hidden md:block"></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">

        {/* Header Block */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-temple-beige text-charcoal px-4 py-2 rounded-xl mb-4 font-label-caps shadow-md text-xs tracking-widest">
            <Sailboat size={12} className="text-charcoal" /> {t('dahabiya.details.charter')}
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-charcoal mb-4">
            {t('dahabiya.details.title')}
          </h1>
        </div>

        {/* Full Width Gallery */}
        <div className="mb-16">
          <ImageGallery images={DAHABIYA_IMAGES} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Detailed Content */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <span className="font-label-sm text-mud-brick uppercase tracking-[0.2em] block mb-4 text-sm">{t('dahabiya.details.sub')}</span>
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-6">
                {t('dahabiya.details.desc1')}
              </p>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {t('dahabiya.details.desc2')}
              </p>
            </div>

            {/* Key Specifications Grid */}
            <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant">
              <h3 className="font-headline-md text-charcoal mb-6">{t('dahabiya.details.charterTitle')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container/40 flex items-center justify-center text-mud-brick mb-4">
                    <Users size={24} />
                  </div>
                  <span className="font-headline-md text-charcoal text-lg mb-1">{t('dahabiya.details.guests')}</span>
                  <span className="text-stone text-xs font-label-caps tracking-widest">{t('dahabiya.details.capacity')}</span>
                </div>

                <div className="flex flex-col items-center text-center p-4 border-t sm:border-t-0 sm:border-x border-surface-variant">
                  <div className="w-12 h-12 rounded-full bg-primary-container/40 flex items-center justify-center text-mud-brick mb-4">
                    <Sailboat size={24} />
                  </div>
                  <span className="font-headline-md text-charcoal text-lg mb-1">{t('dahabiya.details.fullCharter')}</span>
                  <span className="text-stone text-xs font-label-caps tracking-widest">{t('dahabiya.details.exclusivity')}</span>
                </div>

                <div className="flex flex-col items-center text-center p-4 border-t sm:border-t-0 border-surface-variant">
                  <div className="w-12 h-12 rounded-full bg-primary-container/40 flex items-center justify-center text-mud-brick mb-4">
                    <Clock size={24} />
                  </div>
                  <span className="font-headline-md text-charcoal text-lg mb-1">{t('dahabiya.details.oneNight')}</span>
                  <span className="text-stone text-xs font-label-caps tracking-widest">{t('dahabiya.details.duration')}</span>
                </div>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-charcoal p-8 rounded-2xl text-white ambient-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="font-headline-md text-2xl text-white mb-2">{t('dahabiya.details.totalRate')}</h3>
                  <p className="text-stone text-sm max-w-sm">
                    {t('dahabiya.details.secures')}
                  </p>
                </div>
                <div className="text-center sm:text-right bg-black/30 px-8 py-4 rounded-xl border border-white/10">
                  <span className="font-headline-md text-temple-beige text-4xl font-semibold block">€3000</span>
                  <span className="text-stone text-xs font-label-caps tracking-widest mt-1 block">{t('dahabiya.details.perVoyage')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Contact Information (No Form) */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container p-8 rounded-2xl border border-surface-variant sticky top-28 shadow-lg">
              <h3 className="font-headline-md text-charcoal text-2xl mb-4">{t('dahabiya.details.inquireTitle')}</h3>
              <p className="text-stone text-sm mb-8 leading-relaxed">
                {t('dahabiya.details.inquireDesc')}
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-background flex items-center justify-center text-mud-brick border border-outline-variant/40 shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('tours.details.emailUs')}</span>
                    <span className="font-body-md text-charcoal font-semibold">Alaa.luxor1993@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-background flex items-center justify-center text-mud-brick border border-outline-variant/40 shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('tours.details.callWhatsapp')}</span>
                    <span className="font-body-md text-charcoal font-semibold">+20 102 459 5279</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-background flex items-center justify-center text-mud-brick border border-outline-variant/40 shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('dahabiya.details.departures')}</span>
                    <span className="font-body-md text-charcoal font-semibold">{t('tours.details.egypt')}</span>
                  </div>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center bg-charcoal text-surface font-label-caps py-4 rounded-full hover:bg-temple-beige transition-luxury mt-10 shadow-md text-center tracking-widest"
              >
                {t('dahabiya.details.requestWhatsApp')}
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-temple-beige w-full py-12 mt-12 text-center font-body-md text-sm border-t border-stone/20">
        <p className="mb-2">{t('footer.shortBrand')} — {t('dahabiya.details.nileCruises')}</p>
        <p className="text-stone text-xs">{t('footer.rights')}</p>
      </footer>
    </div>
  )
}
