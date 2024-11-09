import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaCrown, FaBuilding, FaRocket } from 'react-icons/fa';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: [
      'Basic subdomain scanning',
      '3 scans per day',
      'Standard DNS records',
      'Basic SSL analysis',
      'Community support'
    ],
    icon: FaRocket,
    color: 'from-gray-500 to-gray-600',
    buttonText: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: [
      'Everything in Free, plus:',
      'Unlimited scans',
      'Deep reconnaissance',
      'Advanced DNS enumeration',
      'Full SSL certificate analysis',
      'Search engine discovery',
      'Priority support',
      'Export reports (PDF/HTML)',
      'Custom API access'
    ],
    icon: FaCrown,
    color: 'from-blue-600 to-indigo-600',
    buttonText: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro, plus:',
      'Custom deployment',
      'Team collaboration',
      'Advanced reporting',
      'SLA guarantee',
      'Dedicated support',
      'Security consultation',
      'Custom integrations'
    ],
    icon: FaBuilding,
    color: 'from-purple-600 to-pink-600',
    buttonText: 'Contact Sales',
    popular: false
  }
];

export default function PricingPlans({ onSelectPlan }) {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Choose Your Security Plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600"
        >
          Professional security tools for every need
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl bg-white shadow-xl ${
              plan.popular ? 'ring-2 ring-blue-600' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-sm text-white text-center font-medium">
                  Most Popular
                </div>
              </div>
            )}

            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl text-gray-500">{plan.period}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${plan.color}`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <FaCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>All plans include:</p>
        <div className="mt-4 flex items-center justify-center gap-8 text-sm">
          <span>30-day money-back guarantee</span>
          <span>•</span>
          <span>Cancel anytime</span>
          <span>•</span>
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  );
}</content>