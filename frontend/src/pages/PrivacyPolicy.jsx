import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  const tableOfContents = [
    'Background',
    '1. Definitions and Interpretation',
    '2. Information About Us',
    '3. What Does This Policy Cover?',
    '4. What Is Personal Data?',
    '5. What Are My Rights?',
    '6. What Data Do You Collect and How?',
    '7. How Do You Use My Personal Data?',
    '8. How Long Will You Keep My Personal Data?',
    '9. Store of Personal Data?',
    '10.Do You Share My Personal Data?',
    '11. Can I Withhold Information?',
    '12. How Can I Access My Personal Data?',
    '13. How Do I Contact You?',
    '14. Changes to this Privacy Policy'
  ];

  const sections = [
    {
      title: 'BACKGROUND',
      preContent: `Lambano5 group of Companies Ltd understands that your privacy is important to you and that you care about how your personal data is used. We respect and value the privacy of everyone who visits this website www.downtown-shopping.org or any mobile application developed Us, (collectively known as "Our Site") and will only collect and use personal data in ways that are described here, and in a way that is consistent with our obligations and your rights under the law.

Please read this Privacy Policy carefully and ensure that you understand it and is subject to change from time to time without notice. It is strongly recommended that you periodically review this policy as posted on Our Site.

Your acceptance of this Privacy Policy is requested when you first register on Our Site.`
    },
    {
      title: '1. Definitions and Interpretation',
      preContent: `1.1 In these Privacy Policy, unless the context otherwise requires, the following expressions have the following meanings:`,
      table: {
        headers: ['Terms', 'Meaning'],
        rows: [
            ['"Goods"', 'means the goods sold by Us through Our Site;'],
            ['"We/Us/Our"', 'means Lambano5 Group of Companies Ltd P.O Box 1074, Kampala, Uganda.'],
            ['"Our Site"', 'Means the website www.downtown-shopping.org and it will include a desktop website and any mobile application developed by Us.']
        ]
    }

    },
    {
      title: '2. Information About Us',
      preContent: `2.1 Our Site is operated by Lambano5 group of Companies Ltd. We are a limited company registered in Uganda under company number 80020001079624. Our registered address is P.O Box 1074, Kampala, Uganda.

2.2 Our TIN number is 1016504351.`
    },
    {
      title: '3. What Does This Policy Cover?',
      preContent: `This Privacy Policy applies only to your use of Our Site. Our Site may contain links to other websites. Please note that we have no control over how your data is collected, stored, or used by other websites and we advise you to check the privacy policies of any such websites before providing any data to them.`
    },
    {
      title: '4. What Is Personal Data?',
      preContent: `Personal data is defined by The Data Protection and Privacy Act 2019 ("the DPA") 'as information about a person from which the person can be identified that is recorded' as provided under section 2 of DPA.

Personal data is, in simpler terms, any information about you that enables you to be identified. Personal data covers obvious information such as your name and contact details, but it also covers less obvious information such as identification numbers, electronic location data, and other online identifiers.`
    },
    {
        title: '5. What Are My Rights?',
        preContent: `Under the Data Protection Legislation, you have the following rights, which we will always work to uphold:`,
        lists: [
          {
            type: 'lettered',
            items: [
              'The right to access the personal data we hold about you. Part 12 will tell you how to do this.',
              'The right to restrict (i.e. prevent) the processing of your personal data.',
              'The right to prevent processing of personal data for direct marketing.',
              'The right to be informed about our collection and use of your personal data. This Privacy Policy should tell you everything you need to know, but you can always contact us to find out more or to ask any questions using the details in Part 13.',
              'The right to have your personal data rectified if any of your personal data held by is inaccurate or incomplete. Please contact us using the details in Part 13 to find out more.',
              `The right to withdraw consent. This means that, if we are relying on your consent as the legal basis for using your personal data, you are free to withdraw that consent at any time.
  
  For purposes of using sale of Goods and Services pursuant to the Terms of Sale, we will not rely on your consent but for the performance of our Contract to which you are a party and in order to take steps at your request prior to entering into a contract.`,
              'Rights relating to automated decision-making and profiling. We do not use your personal data in this way.'
            ]
          }
        ],
        postContent: `For more information about our use of your personal data or exercising your rights as outlined above, please contact us using the details provided in Part 13.
  
  It is important that your personal data is kept accurate and up to date. If any of the personal data we hold about you changes, please keep us informed as long as we have that data.`
      },
    {
        title: '6. What Data Do You Collect and How?',
        preContent: `Depending upon your use of Our Site, we may collect and hold some or all of the personal and non-personal data set out in the table below, using the methods also set out in the table. We do not collect any ‘special category’ or ‘sensitive’ personal data AND/OR personal data relating to children AND/OR [data relating to criminal convictions and/or offences.`,
        table: {
            headers: ['Data Collected', 'How We Collect the Data'],
            rows: [
            ['Personal details such as name and title', 'When you register on Our Site as a first time user.'],
            ['Contact information including address, email address, telephone number', 'When you register on Our Site and place an Order for Goods from Our Site.']
            ]
        }
      },
      {
        title: '7. How Do You Use My Personal Data?',
        preContent: `Under the DPA 2019, we must collect personal data for a lawful purpose which is specific, explicitly defined and is related to your Use of our website and for purposes of fulfilling Our contact with you. The following table describes how we will use your personal data:`,
        table: {
            headers: ['Process', 'Data Type'],
            rows: [
            ['Registering you on Our Site.', 'Name, email, phone number'],
            ['Administering our business.', 'TIN number, orders, refunds'],
            ['Supplying our Good to you.', 'Your postal and physical address'],
            ['Communicating with you', 'Postal address, email address and phone Number']
            ]
        },
        postContent: `With your permission and/or where permitted by law, we may also use your personal data for marketing purposes, which may include contacting you by email AND/OR telephone AND/OR text message AND/OR post with information, news, and offers on our products AND/OR services.

        We may use automated systems for carrying out certain kinds of decision-making AND/OR profiling. If at any point you wish to query any action that we take on the basis of this or wish to request ‘human intervention’ (i.e. have someone review the action themselves, rather than relying only on the automated method), the Data Protection Act gives you the right to do so. Please contact us to find out more using the details in Part 12.

        Your Rights in relation to automated decision making does not apply to entering or performance of the contract under the Terms of Sale and as provided for under section 27 4(a) to 4 (e) of the DPA.`
      },
      {
        title: '8. How Long Will You Keep My Personal Data?',
        preContent: `We will not keep your personal data for any longer than is necessary in light of the reason(s) for which it was first collected. Your personal data will therefore be kept for the following periods (or, where there is no fixed period, the following factors will be used to determine how long it is kept):`,
        table: {
            headers: ['Type of Data', 'How Long We Will Keep It'],
            rows: [
            ['Identity Information including name, title', 'We keep your personal information to enable your continued use of Our Site, for as long as it is required in order to fulfil the relevant purposes. described in this Privacy Policy, as may be required by law such as for tax and accounting purposes, or as otherwise communicated to you or as required under the relevant laws and regulations of Republic of Uganda.'],
            ['Contact information including address, email address, telephone number.', ''],
            ['Business information including business name, job title, profession', ''],
            ['Username and Password', '']
            ]
        }
      },
      {
        title: '9. Store of Personal Data?',
        preContent: `We retain your personal data only for the period necessary for the purposes set out in this Policy or in accordance with the provisions of applicable law in the Republic of Uganda.`
      },
      {
        title: '10. Do You Share My Personal Data?',
        preContent: `This section explains how and why we share personal data with Service Providers that carry out certain functions on our behalf.

        When we share personal data with these companies and we require them to keep it safe.

        These include, for example, companies that help us with technology services, storing, combining and analysing data, processing payments, provide us with legal or other professional services as well as delivering orders. We only share personal data that enable our Service Providers to provide their services.

        All storage processing is handled by DigitalOcean, LLC Canada & USA, in compliance with the Data Protection Laws of the appropriate jurisdiction, including the State of California, the European Union, the European Economic Area and/or its member states, Switzerland and/or the United Kingdom.

        All transaction processing is handled by Pesapal Uganda Limited based in Uganda. The company complies with the Payment Card Industry Data Security Standards (PCIDSS). No personal financial information is stored by Us except the date, time and value of financial transactions.`
      },
      {
        title: '11. Can I Withhold Information?',
        preContent: `You may access Our Site without providing any personal data at all. However, to use all features and functions available on Our Site you may be required to submit or allow for the collection of certain data.`
      },
      {
        title: '12. How Can I Access My Personal Data?',
        preContent: `If you want to know what personal data we have about you, you can ask us for details of that personal data and for a copy of it (where any such personal data is held). This is known as a “subject access request”.

        There may be a fee or a charge for a subject access request. All subject access requests should be made in writing and sent to the email or postal addresses shown in Part 12.

        We will respond to your subject access request within 21 days and, in any case, not more than 30 days of receiving it. Normally, we aim to provide a complete response, including a copy of your personal data within that time. In some cases, however, particularly if your request is more complex, more time may be required up to a maximum of three months from the date we receive your request.`
      },
      {
        title: '13. How Do I Contact You?',
        preContent: `To contact us about anything to do with your personal data and data protection, including to make a subject access request, please use the following details of the Marketing Manager
        
        Telephone number: +256 766531370
        Postal Address: 1074, Kampala, Uganda.`
      },
      {
        title: '14. How Can I Access My Personal Data?',
        preContent: `We may change this Privacy Notice from time to time. This may be necessary, for example, if the law changes, or if we change our business in a way that affects personal data protection.

        Any changes will be immediately posted on Our Site and you will be deemed to have accepted the terms of the Privacy Policy on your first use of Our Site following the alterations. We recommend that you check this page regularly to keep up-to-date.`
      },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-light mb-4">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: January 15, 2025</p>
            </div>

            {/* Table of Contents */}
            <div className="mb-12 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {tableOfContents.map((item, index) => (
                  <li key={index} className="text-gray-600 hover:text-gray-900">
                    <a href={`#section-${index}`} className="hover:underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="prose prose-gray max-w-none">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={`section-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-xl font-medium mb-4">{section.title}</h2>
                  <div className="text-gray-600 space-y-6">
                    {/* Pre-content */}
                    {section.preContent && (
                      <div className="whitespace-pre-line">{section.preContent}</div>
                    )}

                    {/* Lists if any */}
                    {section.lists && section.lists.map((list, listIndex) => (
                      <div key={listIndex} className="space-y-4">
                        {list.title && (
                          <p className="text-gray-600">{list.title}</p>
                        )}
                        {list.type === 'lettered' ? (
                          <div className="ml-6 space-y-4">
                            {list.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex">
                                <span className="w-6 flex-shrink-0">
                                  {String.fromCharCode(97 + itemIndex)})
                                </span>
                                <span className="text-gray-600 whitespace-pre-line">{item}</span>
                              </div>
                            ))}
                          </div>
                        ) : list.type === 'ordered' ? (
                          <ol className="list-decimal list-outside ml-6 space-y-2">
                            {list.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="pl-2 text-gray-600 whitespace-pre-line">{item}</li>
                            ))}
                          </ol>
                        ) : (
                          <ul className="list-disc list-outside ml-6 space-y-2">
                            {list.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="pl-2 text-gray-600 whitespace-pre-line">{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}

                    {/* Table */}
                    {section.table && (
                      <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              {section.table.headers.map((header, idx) => (
                                <th
                                  key={idx}
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {section.table.rows.map((row, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {row.map((cell, cellIdx) => (
                                  <td
                                    key={cellIdx}
                                    className="px-6 py-4 text-sm text-gray-600 whitespace-normal"
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Post-content */}
                    {section.postContent && (
                      <div className="whitespace-pre-line">{section.postContent}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;