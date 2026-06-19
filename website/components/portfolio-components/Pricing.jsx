import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const PLANS = [
  {
    tier: 'Starter',
    price: '₹25K',
    period: '/mo',
    desc: 'For brands starting their digital journey',
    popular: false,
    features: [
      '1 Ad Channel (Meta or Google)',
      'Basic Landing Page',
      'Monthly Performance Report',
      'Email Support',
      '2 Ad Creatives / Month',
    ],
    cta: 'Get Started',
    variant: 'outline',
  },
  {
    tier: 'Growth',
    price: '₹65K',
    period: '/mo',
    desc: 'For brands ready to scale aggressively',
    popular: true,
    features: [
      'Meta + Google + SEO',
      'Conversion-Optimised Website',
      'Weekly Strategy Calls',
      '8 Premium Ad Creatives',
      'CRM & Funnel Setup',
      'Dedicated Account Manager',
    ],
    cta: 'Book a Call →',
    variant: 'fill',
  },
  {
    tier: 'Elite',
    price: 'Custom',
    period: '',
    desc: 'Full-stack domination for ambitious brands',
    popular: false,
    features: [
      'Omnichannel Strategy',
      'Custom Tech & Automation',
      'Content Velocity Engine',
      'Unlimited Ad Creatives',
      'Fractional CMO Access',
      'Priority 24/7 Support',
    ],
    cta: "Let's Talk",
    variant: 'outline',
  },
]

function PricingCard({ plan, index }) {
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl p-8 flex flex-col"
      style={{
        background: plan.popular ? 'rgba(139,92,246,0.07)' : 'rgba(255,255,255,0.04)',
        border: plan.popular
          ? '1px solid rgba(139,92,246,0.45)'
          : '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center
                     gap-1.5 px-4 py-1 rounded-full text-[0.65rem] font-semibold text-white
                     font-sora tracking-wide whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
            boxShadow: '0 0 20px rgba(139,92,246,0.5)',
          }}
        >
          <Zap size={10} fill="white" /> Most Popular
        </div>
      )}

      {/* Tier label */}
      <p className="font-sora text-[0.7rem] tracking-widest uppercase text-white/40 mb-1.5">
        {plan.tier}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-sora text-4xl font-extrabold text-white">{plan.price}</span>
        {plan.period && <span className="text-sm text-white/40">{plan.period}</span>}
      </div>

      <p className="text-[0.78rem] text-white/45 mb-6 leading-relaxed">{plan.desc}</p>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[0.82rem] text-white/65">
            <Check size={14} className="mt-0.5 shrink-0" color="#8B5CF6" strokeWidth={2.5} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={scrollToContact}
        className="w-full py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
        style={
          plan.variant === 'fill'
            ? {
                background: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
                border: 'none',
                color: '#fff',
                boxShadow: '0 0 24px rgba(139,92,246,0.35)',
              }
            : {
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
              }
        }
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="section-label mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Packages
          </motion.p>

          <motion.h2
            className="font-sora text-3xl md:text-5xl font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Transparent{' '}
            <span style={{ color: '#8B5CF6' }}>Pricing</span>
          </motion.h2>

          <motion.p
            className="text-white/45 text-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
            No hidden fees. No surprises. Just results.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.tier} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-white/25 text-xs mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          All packages include onboarding strategy session. GST applicable as per norms.
        </motion.p>
      </div>
    </section>
  )
}
