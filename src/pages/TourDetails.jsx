import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, PlusCircle, Mail, Phone, MapPin } from 'lucide-react'
import ImageGallery from '../components/ImageGallery'

// Dynamically load all images from respective folders
const DAY1_MODULES = import.meta.glob('../assets/tours/Day 1/*.jpeg', { eager: true, import: 'default' })
const DAY2_MODULES = import.meta.glob('../assets/tours/Day 2/*.jpeg', { eager: true, import: 'default' })
const DAY3_MODULES = import.meta.glob('../assets/tours/Day 3/*.jpeg', { eager: true, import: 'default' })
const DAY4_MODULES = import.meta.glob('../assets/tours/Day 4/*.jpeg', { eager: true, import: 'default' })
const DAY5_MODULES = import.meta.glob('../assets/tours/day 5/*.jpeg', { eager: true, import: 'default' })

const TOUR_GALLERIES = {
  'day-1': Object.values(DAY1_MODULES),
  'day-2': Object.values(DAY2_MODULES),
  'day-3': Object.values(DAY3_MODULES),
  'day-4': Object.values(DAY4_MODULES),
  'day-5': Object.values(DAY5_MODULES)
}

// Default fallback tour if page is accessed directly
const DEFAULT_TOUR = {
  id: 'day-1',
  title: 'Day 1: Karnak & West Bank Sunset',
  duration: 'Full Day',
  price: '20',
  description: 'Explore Karnak Temple, Luxor Museum, Luxor Temple, and enjoy a West Bank sunset.'
}

const OPTIONAL_ACTIVITIES = [
  { title: 'Horse Riding', desc: 'Experience the landscape of Luxor on authentic Arabian horses.' },
  { title: 'Camel Riding', desc: 'A traditional way to traverse the desert dunes and villages.' },
  { title: 'Desert BBQ', desc: 'A freshly prepared barbecue dinner in the quiet desert.' },
  { title: 'Desert Camping', desc: 'Spend the night under the stars in a traditional camp.' },
  { title: 'Dahabiya Nile Cruises', desc: 'Luxor to Aswan 4 nights sailing experience.' },
  { title: 'Customized Experiences', desc: 'Tailor-made activities based on your personal preferences.' }
]

export default function TourDetails() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = t('seo.tourTitle')
  }, [t, i18n.language])

  const rawTour = location.state?.tour || DEFAULT_TOUR

  // Assign the correct gallery array based on the ID
  const tourImages = TOUR_GALLERIES[rawTour.id] || TOUR_GALLERIES['day-1']

  const tour = {
    ...rawTour,
    title: t(`tours.days.${rawTour.id}.title`, rawTour.title),
    description: t(`tours.days.${rawTour.id}.description`, rawTour.description),
    duration: rawTour.id === 'day-5' ? t('tours.flexible') : t('tours.fullDay'),
    images: tourImages
  }

  const optionalActivities = OPTIONAL_ACTIVITIES.map((act, i) => {
    const keys = ['horse', 'camel', 'bbq', 'camping', 'dahabiya', 'custom']
    const key = keys[i]
    return {
      title: t(`tours.details.optionalList.${key}.title`, act.title),
      desc: t(`tours.details.optionalList.${key}.desc`, act.desc)
    }
  })

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Navbar Header */}
      <header className="sticky top-0 bg-surface/90 backdrop-blur-xl border-b border-white/10 z-40 py-4 transition-luxury shadow-sm">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-charcoal hover:text-mud-brick font-label-caps transition-luxury"
          >
            <ArrowLeft size={16} /> Back to Journey
          </button>
          <div className="font-headline-md tracking-tighter text-charcoal">
            Satalana Luxor
          </div>
          <div className="w-20 hidden md:block"></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-temple-beige text-charcoal px-4 py-2 rounded-xl mb-6 font-label-caps shadow-md text-xs tracking-widest">
            <Clock size={14} className="text-charcoal" /> {tour.duration} Private Tour
          </div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-charcoal mb-4 drop-shadow-sm">
            {tour.title}
          </h1>
        </motion.div>

        {/* Full Width Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-20"
        >
          <ImageGallery images={tour.images} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Detailed Content */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-label-sm text-mud-brick uppercase tracking-[0.2em] block mb-4 text-sm">The Journey</span>
              <p className="font-body-lg text-on-surface-variant leading-loose text-lg">
                {tour.description}
              </p>
            </motion.div>

            {/* Pricing Schema Grid */}
            {tour.id !== 'day-5' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-surface-container p-10 rounded-2xl border border-surface-variant ambient-shadow"
              >
                <h3 className="font-headline-md text-3xl text-charcoal mb-8">{t('tours.details.pricingTitle')}</h3>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-outline-variant/40 pb-8 gap-4">
                    <div>
                      <h4 className="font-semibold text-charcoal text-xl mb-1">{t('tours.details.carDriver')}</h4>
                      <p className="text-sm text-stone max-w-xs leading-relaxed">{t('tours.details.carDriverDesc')}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="font-headline-md text-charcoal text-4xl font-semibold">€{tour.price}</span>
                      <span className="font-label-caps text-stone text-xs block mt-1">{t('tours.details.perDay')}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-semibold text-charcoal text-xl mb-1">{t('tours.details.guide')}</h4>
                      <p className="text-sm text-stone max-w-xs leading-relaxed">{t('tours.details.guideDesc')}</p>
                    </div>
                    <div className="sm:text-right">
                      <span className="font-headline-md text-charcoal text-4xl font-semibold">€50</span>
                      <span className="font-label-caps text-stone text-xs block mt-1">{t('tours.details.perDay')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Additional Optional Activities Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-6 pt-10 border-t border-surface-variant"
            >
              <span className="font-label-sm text-mud-brick uppercase tracking-[0.2em] block mb-4 text-sm">{t('tours.details.enhance')}</span>
              <h3 className="font-headline-md text-3xl text-charcoal mb-8 flex items-center gap-3">
                <PlusCircle className="text-temple-beige" size={28} /> {t('tours.details.addOptional')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {optionalActivities.map((activity, idx) => (
                  <div key={idx} className="bg-background p-8 rounded-2xl border border-outline-variant/40 hover:shadow-xl hover:-translate-y-1 transition-luxury cursor-default">
                    <h4 className="font-semibold text-charcoal mb-3 text-lg">{activity.title}</h4>
                    <p className="text-sm text-stone leading-relaxed">{activity.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Sidebar Contact Information (No Form) */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-surface-container-low p-10 rounded-3xl border border-surface-variant sticky top-32 shadow-2xl"
            >
              <h3 className="font-headline-md text-charcoal text-3xl mb-6">{t('tours.details.bookTour')}</h3>
              <p className="text-stone text-sm mb-10 leading-loose">
                {t('tours.details.bookTourDesc')}
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-charcoal flex items-center justify-center text-temple-beige shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('tours.details.emailUs')}</span>
                    <span className="font-body-md text-charcoal font-semibold">Alaa.luxor1993@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-charcoal flex items-center justify-center text-temple-beige shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('tours.details.callWhatsapp')}</span>
                    <span className="font-body-md text-charcoal font-semibold">+20 102 459 5279</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-charcoal flex items-center justify-center text-temple-beige shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-stone block mb-1">{t('tours.details.location')}</span>
                    <span className="font-body-md text-charcoal font-semibold">{t('tours.details.egypt')}</span>
                  </div>
                </div>
              </div>

              <a
                href={`mailto:Alaa.luxor1993@gmail.com?subject=${t('contact.inquirySubject')}`}
                className="w-full inline-flex justify-center bg-temple-beige text-charcoal font-label-caps py-4 rounded-full hover:bg-surface-variant hover:-translate-y-1 hover:shadow-lg transition-luxury mt-12 text-center tracking-widest"
              >
                {t('tours.details.sendEmail')}
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-temple-beige w-full py-12 mt-12 text-center font-body-md text-sm border-t border-stone/20">
        <p className="mb-2">{t('footer.shortBrand')} — {t('footer.tours')}</p>
        <p className="text-stone text-xs">{t('footer.rights')}</p>
      </footer>
    </div>
  )
}
