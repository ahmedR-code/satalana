import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  Menu, X, MapPin, Calendar, Users, ArrowRight, ShieldCheck, 
  HelpCircle, Sparkles, Compass, CompassIcon, Info, PhoneCall, Mail 
} from 'lucide-react'

// Import actual client assets
import imgHouse1 from '../assets/accommodations/house-1/WhatsApp Image 2026-06-06 at 1.43.47 PM.jpeg'
import imgHouse2 from '../assets/accommodations/house-2/WhatsApp Image 2026-06-06 at 1.47.18 PM.jpeg'

import imgDay1 from '../assets/tours/Day 1/WhatsApp Image 2026-06-07 at 5.22.05 PM (1).jpeg'
import imgDay2 from '../assets/tours/Day 2/WhatsApp Image 2026-06-07 at 5.41.02 PM (1).jpeg'
import imgDay3 from '../assets/tours/Day 3/WhatsApp Image 2026-06-07 at 5.42.09 PM (1).jpeg'
import imgDay4 from '../assets/tours/Day 4/WhatsApp Image 2026-06-07 at 5.48.37 PM (1).jpeg'
import imgDay5 from '../assets/tours/day 5/WhatsApp Image 2026-06-07 at 5.50.43 PM.jpeg'

import imgDahabiya from '../assets/tours/DAHABIYA CRUISE 6/WhatsApp Image 2026-06-06 at 1.57.00 PM (4).jpeg'

// Constants for generic hero/backgrounds from the approved references if needed
const HERO_SUNSET = "https://lh3.googleusercontent.com/aida-public/AB6AXuDOAjXczCyi1CMENs1a9mewNlIjS4d_y_V9UpDXutl-Rt-g4H1_Fm_pijsVVFJJsqtgrcZVCXYWKflcGcGvEf03qduOB0WX2g6xjgXNxnvtH3WDLYWXgfVlogtu7-9LT1bAV5EbYBwr96-6GZ-iy8aRxk76Cp3TPjX1XcU3QMTMcat3Dnc8nPzKStpw2f2SIFTortb5e7fstSY4Q3ZFLseefyw4sXxaRBqNyGB2gI1p8RM_et8Tfyphw_U1xngWa_N2FkfiwByEncjN"

const ACCOMMODATIONS = [
  {
    id: 'property-1',
    name: 'Traditional House',
    image: imgHouse1,
    price: '50',
    description: 'A natural landscape amidst mountains, nature, and Pharaonic temples.',
    features: ['Mountain Views', 'Nature Surroundings', 'Near Pharaonic Temples']
  },
  {
    id: 'property-2',
    name: 'Traditional Villa',
    image: imgHouse2,
    price: '40',
    description: 'A natural landscape amidst nature.',
    features: ['Natural Landscape', 'Immersive Nature', 'Quiet Retreat']
  }
]

const TOURS = [
  {
    id: 'day-1',
    title: 'Day 1: Karnak & West Bank Sunset',
    duration: 'Full Day',
    price: '80',
    image: imgDay1,
    description: 'Explore Karnak Temple, Luxor Museum, Luxor Temple, and enjoy a West Bank sunset.'
  },
  {
    id: 'day-2',
    title: 'Day 2: Medinet Habu & Valley of the Queens',
    duration: 'Full Day',
    price: '80',
    image: imgDay2,
    description: 'Visit Medinet Habu, Valley of the Queens, Temple of Seti, Deir el-Medina, and alabaster workshops.'
  },
  {
    id: 'day-3',
    title: 'Day 3: Valley of the Kings & Banana Island',
    duration: 'Full Day',
    price: '80',
    image: imgDay3,
    description: 'Discover the Valley of the Kings, Hatshepsut, Colossi of Memnon, and a Nile trip to Banana Island.'
  },
  {
    id: 'day-4',
    title: 'Day 4: Hot-air Balloon & Felucca Sailing',
    duration: 'Full Day',
    price: '80',
    image: imgDay4,
    description: 'Experience a hot-air balloon ride followed by a Felucca sailing trip and sunset.'
  },
  {
    id: 'day-5',
    title: 'Day 5: Arrival & Optional Activities',
    duration: 'Flexible',
    price: '80',
    image: imgDay5,
    description: 'Optional activities upon arrival to customize your first day in Luxor.'
  }
]

export default function Home() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update page title when language changes
  useEffect(() => {
    document.title = t('seo.homeTitle')
  }, [t, i18n.language])

  // Track scroll position for header transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Dynamically translate accommodations
  const accommodations = ACCOMMODATIONS.map(acc => ({
    ...acc,
    name: t(`accommodations.props.${acc.id}.name`, acc.name),
    description: t(`accommodations.props.${acc.id}.description`, acc.description),
    features: t(`accommodations.props.${acc.id}.features`, { returnObjects: true }) || acc.features
  }))

  // Dynamically translate tours
  const tours = TOURS.map(tour => {
    const durationLabel = tour.id === 'day-5' ? t('tours.flexible') : t('tours.fullDay')
    return {
      ...tour,
      title: t(`tours.days.${tour.id}.title`, tour.title),
      description: t(`tours.days.${tour.id}.description`, tour.description),
      duration: t('tours.duration', { duration: durationLabel })
    }
  })

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-temple-beige selection:text-white">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-luxury ${
        isScrolled 
          ? 'bg-surface/90 backdrop-blur-xl border-b border-white/10 shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}>
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto">
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-headline-md tracking-tighter text-charcoal hover:opacity-80 transition-luxury cursor-pointer"
          >
            Satalana Luxor
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-8 items-center">
            <li>
              <button 
                onClick={() => scrollToSection('accommodations')} 
                className="text-on-surface-variant hover:text-charcoal font-label-caps hover:opacity-80 transition-luxury cursor-pointer"
              >
                {t('nav.accommodations')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('tours')} 
                className="text-on-surface-variant hover:text-charcoal font-label-caps hover:opacity-80 transition-luxury cursor-pointer"
              >
                {t('nav.tours')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('cruise')} 
                className="text-on-surface-variant hover:text-charcoal font-label-caps hover:opacity-80 transition-luxury cursor-pointer"
              >
                {t('nav.cruise')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-on-surface-variant hover:text-charcoal font-label-caps hover:opacity-80 transition-luxury cursor-pointer"
              >
                {t('nav.about')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-charcoal text-surface font-label-caps py-3 px-6 hover:bg-temple-beige transition-luxury rounded-full shadow-sm cursor-pointer"
              >
                {t('nav.inquire')}
              </button>
            </li>
            <li className="flex items-center gap-2 font-label-caps text-xs border-l border-outline-variant/60 pl-6 h-6">
              <button 
                onClick={() => i18n.changeLanguage('en')} 
                className={`${(i18n.language || 'en').startsWith('en') ? 'text-charcoal font-bold underline underline-offset-4' : 'text-on-surface-variant/60 hover:text-charcoal'} transition-luxury cursor-pointer`}
              >
                EN
              </button>
              <span className="text-on-surface-variant/40">|</span>
              <button 
                onClick={() => i18n.changeLanguage('fr')} 
                className={`${(i18n.language || 'en').startsWith('fr') ? 'text-charcoal font-bold underline underline-offset-4' : 'text-on-surface-variant/60 hover:text-charcoal'} transition-luxury cursor-pointer`}
              >
                FR
              </button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-charcoal hover:opacity-80 transition-luxury"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-surface-container-low border-b border-surface-variant shadow-lg py-6 px-margin-mobile flex flex-col gap-4 lg:hidden"
            >
              <button 
                onClick={() => scrollToSection('accommodations')}
                className="text-left py-2 border-b border-surface-variant font-label-caps text-charcoal"
              >
                {t('nav.accommodations')}
              </button>
              <button 
                onClick={() => scrollToSection('tours')}
                className="text-left py-2 border-b border-surface-variant font-label-caps text-charcoal"
              >
                {t('nav.tours')}
              </button>
              <button 
                onClick={() => scrollToSection('cruise')}
                className="text-left py-2 border-b border-surface-variant font-label-caps text-charcoal"
              >
                {t('nav.cruise')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left py-2 border-b border-surface-variant font-label-caps text-charcoal"
              >
                {t('nav.about')}
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full py-4 mt-2 bg-charcoal text-surface font-label-caps hover:bg-temple-beige transition-luxury rounded-full text-center"
              >
                {t('nav.inquire')}
              </button>
              <div className="flex justify-center gap-6 py-4 mt-2 border-t border-surface-variant">
                <button 
                  onClick={() => { i18n.changeLanguage('en'); setMobileMenuOpen(false); }} 
                  className={`font-label-caps text-sm ${(i18n.language || 'en').startsWith('en') ? 'text-charcoal font-bold underline underline-offset-4' : 'text-on-surface-variant/60'}`}
                >
                  ENGLISH
                </button>
                <span className="text-on-surface-variant/40">|</span>
                <button 
                  onClick={() => { i18n.changeLanguage('fr'); setMobileMenuOpen(false); }} 
                  className={`font-label-caps text-sm ${(i18n.language || 'en').startsWith('fr') ? 'text-charcoal font-bold underline underline-offset-4' : 'text-on-surface-variant/60'}`}
                >
                  FRANÇAIS
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 pb-section-mobile md:pb-section-desktop overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            alt="Cinematic sunset over Luxor" 
            className="w-full h-full object-cover" 
            src={HERO_SUNSET}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-black/30"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-margin-mobile md:px-margin-desktop max-w-screen-2xl mt-12">
          <div className="max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-charcoal mb-6 drop-shadow-sm"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body-lg text-on-surface-variant mb-4 max-w-2xl"
            >
              {t('hero.subtitle1')}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-body-md text-on-surface-variant mb-10 max-w-2xl"
            >
              {t('hero.subtitle2')}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 mt-4"
            >
              <button 
                onClick={() => scrollToSection('accommodations')}
                className="bg-charcoal text-surface font-label-caps py-4 px-10 rounded-full hover:bg-temple-beige hover:-translate-y-1 hover:shadow-xl transition-luxury shadow-lg text-center tracking-widest"
              >
                {t('hero.bookStay')}
              </button>
              <button 
                onClick={() => scrollToSection('tours')}
                className="border border-stone/30 text-charcoal font-label-caps py-4 px-10 rounded-full hover:bg-surface-variant hover:-translate-y-1 transition-luxury text-center tracking-widest"
              >
                {t('hero.explore')}
              </button>
            </motion.div>
          </div>

          {/* Floating Stats - Replaced with Real Value Propositions */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl ambient-shadow border border-white/20 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-temple-beige text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>villa</span>
              <p className="font-label-caps text-charcoal">{t('hero.val_accommodation')}</p>
            </div>
            <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl ambient-shadow border border-white/20 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-temple-beige text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              <p className="font-label-caps text-charcoal">{t('hero.val_tours')}</p>
            </div>
            <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl ambient-shadow border border-white/20 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-temple-beige text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>sailing</span>
              <p className="font-label-caps text-charcoal">{t('hero.val_cruises')}</p>
            </div>
            <div className="bg-surface/80 backdrop-blur-md p-6 rounded-2xl ambient-shadow border border-white/20 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-temple-beige text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>nature_people</span>
              <p className="font-label-caps text-charcoal">{t('hero.val_authentic')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. ACCOMMODATIONS SECTION */}
      <section id="accommodations" className="py-section-mobile md:py-section-desktop px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <span className="font-label-sm text-mud-brick uppercase tracking-widest block mb-2">{t('accommodations.sub')}</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-charcoal mb-4">{t('accommodations.title')}</h2>
          <p className="font-body-md text-stone max-w-xl mx-auto">{t('accommodations.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {accommodations.map((accommodation) => (
            <div 
              key={accommodation.id}
              onClick={() => navigate('/accommodation-details', { state: { accommodation } })}
              className="group cursor-pointer relative rounded-2xl overflow-hidden ambient-shadow h-[500px]"
            >
              <img 
                alt={accommodation.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={accommodation.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="inline-block bg-surface/90 backdrop-blur px-4 py-2 rounded-xl mb-3">
                  <span className="font-label-caps text-mud-brick">{t('accommodations.rate', { price: accommodation.price })}</span>
                </div>
                <h3 className="font-headline-md text-surface mb-2 flex items-center gap-2">
                  {accommodation.name}
                  <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-luxury text-temple-beige" />
                </h3>
                <p className="font-body-md text-surface-variant max-w-md">{accommodation.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-8">
          <div className="bg-surface-container-low border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center h-[200px] text-center">
            <p className="font-label-caps text-stone text-sm tracking-widest">{t('accommodations.comingSoon')}</p>
          </div>
          <div className="bg-surface-container-low border border-surface-variant rounded-2xl p-8 flex flex-col items-center justify-center h-[200px] text-center">
            <p className="font-label-caps text-stone text-sm tracking-widest">{t('accommodations.comingSoon')}</p>
          </div>
        </div>
      </section>
      {/* 4. TOURS & EXPERIENCES SECTION */}
      <section id="tours" className="py-section-mobile md:py-section-desktop px-margin-mobile md:px-margin-desktop bg-surface-container-low scroll-mt-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-label-sm text-mud-brick uppercase tracking-widest block mb-2">{t('tours.sub')}</span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-charcoal mb-4">{t('tours.title')}</h2>
            <p className="font-body-md text-stone max-w-xl mx-auto">{t('tours.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {tours.map((tour) => (
              <motion.div 
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                onClick={() => navigate('/tour-details', { state: { tour } })}
                className="bg-background rounded-2xl overflow-hidden ambient-shadow flex flex-col lg:flex-row group cursor-pointer transition-luxury hover:-translate-y-2 hover:shadow-2xl border border-white/50"
              >
                <div className="relative h-64 lg:h-auto lg:w-1/2 overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded text-white font-label-caps text-[10px]">
                    {tour.duration}
                  </div>
                </div>
                <div className="p-8 lg:w-1/2 flex flex-col justify-between relative">
                  <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-mud-brick/20 to-transparent hidden lg:block"></div>
                  <div>
                    <h3 className="font-headline-md text-charcoal text-2xl mb-4 group-hover:text-mud-brick transition-colors">
                      {tour.title}
                    </h3>
                    <p className="font-body-md text-on-surface-variant mb-8 text-sm leading-loose">
                      {tour.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-label-caps text-charcoal font-semibold">{t('tours.fromPrice', { price: tour.price })}</span>
                    <span className="text-temple-beige font-label-caps flex items-center gap-1 group-hover:text-mud-brick transition-colors">
                      {t('tours.viewDetails')} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nested Additional Experiences Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center pt-20 border-t border-charcoal/10 mt-20">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="font-label-sm text-mud-brick uppercase tracking-widest mb-2 block">{t('tours.additional.sub')}</span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-charcoal mb-6">{t('tours.additional.title')}</h2>
              <p className="font-body-lg text-on-surface-variant mb-6">
                {t('tours.additional.desc')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-temple-beige mt-1">pets</span>
                  <div>
                    <h4 className="font-semibold text-charcoal">{t('tours.additional.horseCamel.title')}</h4>
                    <p className="text-sm text-stone">{t('tours.additional.horseCamel.desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-temple-beige mt-1">outdoor_grill</span>
                  <div>
                    <h4 className="font-semibold text-charcoal">{t('tours.additional.bbq.title')}</h4>
                    <p className="text-sm text-stone">{t('tours.additional.bbq.desc')}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-temple-beige mt-1">camping</span>
                  <div>
                    <h4 className="font-semibold text-charcoal">{t('tours.additional.camping.title')}</h4>
                    <p className="text-sm text-stone">{t('tours.additional.camping.desc')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 relative">
              <div className="rounded-2xl overflow-hidden ambient-shadow h-[400px] lg:h-[500px]">
                <img 
                  alt={t('tours.additional.horseCamel.title')} 
                  className="w-full h-full object-cover" 
                  src={imgDay5}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DAHABIYA CRUISE SECTION */}
      <section id="cruise" className="relative py-32 md:py-48 px-margin-mobile md:px-margin-desktop overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            alt="Dahabiya sailing boat on the Nile" 
            className="w-full h-full object-cover" 
            src={imgDahabiya}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/80 to-charcoal/95 backdrop-blur-[2px]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto text-center text-white"
        >
          <span className="font-label-sm text-temple-beige uppercase tracking-[0.3em] mb-6 block text-xs">{t('dahabiya.sub')}</span>
          <h2 className="font-headline-lg-mobile md:font-display-lg text-white mb-8 drop-shadow-md">{t('dahabiya.title')}</h2>
          <p className="font-body-lg text-surface-variant mb-12 max-w-2xl mx-auto leading-loose text-white/90">
            {t('dahabiya.desc')}
          </p>
          <button 
            onClick={() => navigate('/dahabiya-details')}
            className="bg-temple-beige text-charcoal font-label-caps py-4 px-10 rounded-full hover:bg-surface hover:-translate-y-1 transition-luxury shadow-2xl inline-flex items-center gap-3 tracking-widest"
          >
            {t('dahabiya.cta')} <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      {/* 6. WHY CHOOSE US & ABOUT US SECTION */}
      <section id="about" className="py-section-mobile md:py-section-desktop px-margin-mobile md:px-margin-desktop bg-surface-container scroll-mt-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* About Us Text */}
            <div>
              <span className="font-label-sm text-mud-brick uppercase tracking-widest block mb-2">{t('about.sub')}</span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-charcoal mb-6">{t('about.title')}</h2>
              <p className="font-body-lg text-stone mb-6">
                {t('about.desc1')}
              </p>
              <p className="font-body-lg text-stone mb-8">
                {t('about.desc2')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-temple-beige" size={24} />
                  <span className="font-semibold text-charcoal text-sm">{t('about.exp')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-temple-beige" size={24} />
                  <span className="font-semibold text-charcoal text-sm">{t('about.service')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Compass className="text-temple-beige" size={24} />
                  <span className="font-semibold text-charcoal text-sm">{t('about.tours')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-temple-beige" size={24} />
                  <span className="font-semibold text-charcoal text-sm">{t('about.authentic')}</span>
                </div>
              </div>
            </div>

            {/* Why Choose Us Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background p-6 rounded-2xl border border-surface-variant text-center">
                <h3 className="font-headline-md text-charcoal text-lg mb-2">{t('about.why.accTitle')}</h3>
                <p className="font-body-md text-stone text-xs">{t('about.why.accDesc')}</p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-surface-variant text-center">
                <h3 className="font-headline-md text-charcoal text-lg mb-2">{t('about.why.toursTitle')}</h3>
                <p className="font-body-md text-stone text-xs">{t('about.why.toursDesc')}</p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-surface-variant text-center">
                <h3 className="font-headline-md text-charcoal text-lg mb-2">{t('about.why.cruiseTitle')}</h3>
                <p className="font-body-md text-stone text-xs">{t('about.why.cruiseDesc')}</p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-surface-variant text-center">
                <h3 className="font-headline-md text-charcoal text-lg mb-2">{t('about.why.localTitle')}</h3>
                <p className="font-body-md text-stone text-xs">{t('about.why.localDesc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" className="py-section-mobile md:py-section-desktop px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto scroll-mt-20">
        <div className="max-w-3xl mx-auto text-center bg-surface-container p-8 md:p-12 rounded-2xl border border-surface-variant ambient-shadow">
          <span className="font-label-sm text-mud-brick uppercase tracking-widest mb-2 block">{t('contact.sub')}</span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-charcoal mb-6">{t('contact.title')}</h2>
          <p className="font-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
            {t('contact.desc')}
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-container/30 flex items-center justify-center text-mud-brick mb-2">
                <Mail size={24} />
              </div>
              <span className="font-label-caps text-xs text-stone">{t('contact.email')}</span>
              <span className="font-body-md text-charcoal font-semibold">Alaa.luxor1993@gmail.com</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-container/30 flex items-center justify-center text-mud-brick mb-2">
                <PhoneCall size={24} />
              </div>
              <span className="font-label-caps text-xs text-stone">{t('contact.callWhatsapp')}</span>
              <span className="font-body-md text-charcoal font-semibold">+20 102 459 5279</span>
            </div>
          </div>
          
          <a 
            href={`mailto:Alaa.luxor1993@gmail.com?subject=${t('contact.inquirySubject')}`}
            className="inline-block bg-charcoal text-surface font-label-caps py-4 px-10 rounded-full hover:bg-temple-beige hover:scale-[1.02] transition-luxury mt-12 shadow-md text-center"
          >
            {t('contact.sendEmail')}
          </a>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-charcoal dark:bg-black text-temple-beige w-full pt-20 pb-12 font-body-md text-body-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-screen-2xl mx-auto border-b border-stone/20 pb-12">
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <h2 className="font-headline-lg text-white mb-2">{t('footer.shortBrand')}</h2>
            <p className="text-stone max-w-sm">
              {t('footer.desc')}
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-label-caps text-white text-xs mb-2">{t('footer.reservations')}</h4>
            <button onClick={() => scrollToSection('accommodations')} className="text-stone hover:text-surface-variant text-left transition-luxury">{t('footer.villas')}</button>
            <button onClick={() => scrollToSection('tours')} className="text-stone hover:text-surface-variant text-left transition-luxury">{t('footer.tours')}</button>
            <button onClick={() => scrollToSection('cruise')} className="text-stone hover:text-surface-variant text-left transition-luxury">{t('footer.dahabiyas')}</button>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="font-label-caps text-white text-xs mb-2">{t('footer.company')}</h4>
            <button onClick={() => scrollToSection('about')} className="text-stone hover:text-surface-variant text-left transition-luxury">{t('footer.about')}</button>
            <button onClick={() => scrollToSection('contact')} className="text-stone hover:text-surface-variant text-left transition-luxury">{t('footer.contact')}</button>
          </div>
        </div>
        <div className="mt-8 text-center text-stone text-xs px-margin-mobile">
          {t('footer.rights')}
        </div>
      </footer>

    </div>
  )
}
