import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaBitcoin, FaCheck, FaCrown } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: FaCreditCard,
    description: 'Pay securely with your credit card',
    demo: '4242424242424242'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: FaPaypal,
    description: 'Fast and secure payment with PayPal',
    demo: 'demo@paypal.com'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: FaBitcoin,
    description: 'Pay with Bitcoin or other cryptocurrencies',
    demo: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  }
];

export default function PaymentModal({ isOpen, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setPro } = useAuthStore();

  const handleDemoPayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setStep(2);
    setPro(true);
    
    toast.success('Pro features activated! This is a demo mode.');
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={handleClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              {step === 1 ? (
                <>
                  <div className="text-center mb-6">
                    <FaCrown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900">
                      Upgrade to Pro
                    </Dialog.Title>
                    <p className="mt-2 text-gray-600">
                      Demo Mode: Test Pro features instantly
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedMethod(method)}
                        className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                          selectedMethod.id === method.id
                            ? 'bg-blue-50 border-blue-600'
                            : 'border-gray-200 hover:border-blue-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <method.icon className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">{method.name}</p>
                              <p className="text-sm text-gray-500">{method.description}</p>
                              <p className="text-xs text-blue-600 mt-1">
                                Demo: {method.demo}
                              </p>
                            </div>
                          </div>
                          {selectedMethod.id === method.id && (
                            <FaCheck className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 -m-6 p-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-gray-900">Pro Plan</span>
                        <span className="text-2xl font-bold text-blue-600">$29.99</span>
                      </div>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>

                    <button
                      onClick={handleDemoPayment}
                      disabled={loading}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FaCrown className="w-5 h-5" />
                          <span>Activate Pro Demo</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <FaCheck className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Pro Features Activated!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You now have access to all Pro features
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Start Using Pro Features
                  </button>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}