import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      'Basic subdomain scanning',
      '100 scans per month',
      'Standard DNS records',
      'Community support'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    features: [
      'Advanced subdomain discovery',
      'Unlimited scans',
      'All DNS record types',
      'SSL certificate analysis',
      'Priority support',
      'Custom reporting'
    ],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Business',
    price: '$99',
    period: '/month',
    features: [
      'Everything in Pro',
      'API access',
      'Team collaboration',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function PricingSection({ onSelectPlan }) {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your security needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? 'border-blue-600 shadow-blue-100'
                  : 'border-gray-200'
              } bg-white shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32">
                  <div className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-center text-sm font-semibold text-white">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-gray-500">
                      {plan.period}
                    </span>
                  )}
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0">
                        <FaCheck className="h-5 w-5 text-blue-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`mt-8 w-full rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                      : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}