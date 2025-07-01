import React, { Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface PaymentPartnerDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBank: string;
  setSelectedBank: (val: string) => void;
  selectedGateway: string;
  setSelectedGateway: (val: string) => void;
  selectedCompany: string;
  setSelectedCompany: (val: string) => void;
  selectedDate: string;
  setSelectedDate: (val: string) => void;
  bankOptions: string[];
  gatewayOptions: string[];
  companyOptions: string[];
}

export const PaymentPartnerDialog: React.FC<PaymentPartnerDialogProps> = ({
  open,
  setOpen,
  selectedBank,
  setSelectedBank,
  selectedGateway,
  setSelectedGateway,
  selectedCompany,
  setSelectedCompany,
  selectedDate,
  setSelectedDate,
  bankOptions,
  gatewayOptions,
  companyOptions
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <Dialog.Panel className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* Centering trick */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-6 pt-8 pb-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full">
              <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900 mb-6">
                Payment Partner Verification
              </Dialog.Title>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* User Payment Partner Details */}
                <div>
                  <h4 className="font-semibold mb-4">Your Payment Partner</h4>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">Bank</label>
                    <Listbox value={selectedBank} onChange={setSelectedBank}>
                      <div className="relative z-20">
                        <Listbox.Button className="relative w-full border rounded-lg pl-3 pr-10 py-2 text-left bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="block truncate">{selectedBank}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                          {bankOptions.map((bank) => (
                            <Listbox.Option
                              key={bank}
                              value={bank}
                              className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100' : ''}`}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{bank}</span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">Payment Gateway</label>
                    <Listbox value={selectedGateway} onChange={setSelectedGateway}>
                      <div className="relative z-10">
                        <Listbox.Button className="relative w-full border rounded-lg pl-3 pr-10 py-2 text-left bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="block truncate">{selectedGateway}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                          {gatewayOptions.map((gateway) => (
                            <Listbox.Option
                              key={gateway}
                              value={gateway}
                              className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100' : ''}`}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{gateway}</span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </div>
                {/* Payment Receiving Partner Details */}
                <div>
                  <h4 className="font-semibold mb-4">Receiving Partner</h4>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">Company</label>
                    <Listbox value={selectedCompany} onChange={setSelectedCompany}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full border rounded-lg pl-3 pr-10 py-2 text-left bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <span className="block truncate">{selectedCompany}</span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                          {companyOptions.map((company) => (
                            <Listbox.Option
                              key={company}
                              value={company}
                              className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100' : ''}`}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{company}</span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm mb-1">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
