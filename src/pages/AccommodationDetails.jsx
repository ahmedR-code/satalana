import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Check, MapPin, Mail, Phone } from 'lucide-react'
import ImageGallery from '../components/ImageGallery'

const WHATSAPP_URL = "https://wa.me/201024595279?text=Hello%20Alaa%2C%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20Luxor%20tours%20and%20accommodations.%0A%0AThank%20you."

// Dynamically load all images from respective folders using Vite's import.meta.glob
const HOUSE_1_MODULES = import.meta.glob('../assets/accommodations/house-1/*.jpeg', { eager: true, import: 'default' })
const HOUSE_2_MODULES = import.meta.glob('../assets/accommodations/house-2/*.jpeg', { eager: true, import: 'default' })

// Convert modules to arrays of URLs
const HOUSE_1_IMAGES = Object.values(HOUSE_1_MODULES)
const HOUSE_2_IMAGES = Object.values(HOUSE_2_MODULES)

// Default fallback accommodation if page is accessed directly
const DEFAULT_VILLA = {
  id: 'property-1',
  name: 'Traditional House',
  images: HOUSE_1_IMAGES,
  price: '50',
  description: 'A natural landscape amidst mountains, nature, and Pharaonic temples.',
  features: ['Mountain Views', 'Nature Surroundings', 'Near Pharaonic Temples']
}

export default function AccommodationDetails() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  // In Home.jsx, we passed accommodation object. But the `image` was a single URL. 
  // We need to map the images array based on the ID.
  const rawAccommodation = location.state?.accommodation || DEFAULT_VILLA

  // Assign the correct gallery array based on the ID from Home.jsx
  const accommodationImages = rawAccommodation.id === 'property-2' ? HOUSE_2_IMAGES : HOUSE_1_IMAGES

  const accommodation = {
    ...rawAccommodation,
    name: t(`accommodations.props.${rawAccommodation.id}.name`, rawAccommodation.name),
    description: t(`accommodations.props.${rawAccommodation.id}.description`, rawAccommodation.description),
    features: t(`accommodations.props.${rawAccommodation.id}.features`, { returnObjects: true }) || rawAccommodation.features,
    images: accommodationImages
  }

  // Update page title when language changes
  useEffect(() => {
    document.title = `${accommodation.name} | Satalana Luxor`
  }, [accommodation.name, i18n.language])

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
          <div className="w-20 hidden md:block"></div> {/* Spacer to center title */}
        </div>
      </header>

      {/* Main Content Layout */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">

        {/* Header Block */}
        <div className="mb-8">
          <div className="inline-block bg-temple-beige text-charcoal px-4 py-2 rounded-xl mb-4 font-label-caps shadow-md text-xs tracking-widest">
            {t('accommodations.privateStay')}
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-charcoal mb-4">
            {accommodation.name}
          </h1>
        </div>

        {/* Full Width Gallery */}
        <div className="mb-16">
          <ImageGallery images={accommodation.images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Details Column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div>
              <h2 className="font-headline-lg text-charcoal mb-4">{t('accommodations.theExperience')}</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                {accommodation.description}
              </p>
            </div>

            {/* Features List */}
            {accommodation.features && accommodation.features.length > 0 && (
              <div className="bg-surface-container-low p-8 rounded-2xl border border-surface-variant">
                <h3 className="font-headline-md text-charcoal mb-6">{t('accommodations.highlights')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {accommodation.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-secondary-container/40 flex flex-shrink-0 items-center justify-center text-on-secondary-container">
                        <Check size={12} className="text-secondary" />
                      </div>
                      <span className="font-body-md text-charcoal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking Information (No Form) */}
          <div className="lg:col-span-4">
            <div className="bg-surface-container p-8 rounded-2xl border border-surface-variant sticky top-28 shadow-lg">
              <span className="font-label-caps text-stone text-xs block mb-2">{t('accommodations.standardRate')}</span>
              <div className="flex items-end gap-2 mb-8">
                <span className="font-headline-md text-charcoal text-4xl font-semibold">€{accommodation.price}</span>
                <span className="text-stone text-sm mb-1">{t('accommodations.personNight')}</span>
              </div>

              <div className="border-t border-outline-variant/40 pt-6">
                <h3 className="font-headline-md text-charcoal text-xl mb-4">{t('accommodations.contactReserve')}</h3>
                <p className="text-stone text-sm mb-6">
                  {t('accommodations.conciergeText')}
                </p>

                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-mud-brick">
                      <Mail size={18} />
                    </div>
                    <span className="font-body-md text-charcoal text-sm">Alaa.luxor1993@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-mud-brick">
                      <Phone size={18} />
                    </div>
                    <span className="font-body-md text-charcoal text-sm">+20 102 459 5279</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-mud-brick">
                      <MapPin size={18} />
                    </div>
                    <span className="font-body-md text-charcoal text-sm">{t('accommodations.westBankEgypt', 'West Bank, Luxor, Egypt')}</span>
                  </div>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center bg-charcoal text-surface font-label-caps py-4 rounded-full hover:bg-temple-beige transition-luxury mt-8 shadow-md text-center tracking-widest"
                >
                  {t('accommodations.bookWhatsApp')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-temple-beige w-full py-12 mt-12 text-center font-body-md text-sm border-t border-stone/20">
        <p className="mb-2">{t('footer.shortBrand')} — {t('footer.villas')}</p>
        <p className="text-stone text-xs">{t('footer.rights')}</p>
      </footer>
    </div>
  )
}
