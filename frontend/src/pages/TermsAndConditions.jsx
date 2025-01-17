import React from 'react';
import { motion } from 'framer-motion';
import TermsSection from './TermsSection';

const TermsAndConditions = () => {
  // Table of Contents data
  const tableOfContents = [
    { title: 'Background', id: 'background' },
    { title: '1. Definitions and Interpretation', id: 'definitions' },
    { title: '2. Information About Us', id: 'information' },
    { title: '3. How to Contact Us', id: 'contact' },
    { title: '4. Access to Our Site and Use of Our Site', id: 'access' },
    { title: '5. Changes to these Terms of Sale', id: 'changes' },
    { title: '6. Business Customers and Individual Consumers', id: 'customers' },
    { title: '7. International Customers', id: 'international' },
    { title: '8. Goods, Descriptions, and Changes', id: 'goods' },
    { title: '9. Pricing', id: 'pricing' },
    { title: '10. Orders and How Contracts Are Formed', id: 'orders' },
    { title: '11. No part of Our Site constitutes a contractual offer capable of acceptance.', id: 'acceptance' },
    { title: '12. Payment', id: 'payment' },
    { title: '13. When You Own the Goods', id: 'ownership' },
    { title: '14. Delivery', id: 'delivery' },
    { title: '15. Cancelling the Order and the Contract', id: 'cancellation' },
    { title: '16. Returning Goods After Cancelling', id: 'returns' },
    { title: '17. Refunds', id: 'refunds' },
    { title: '18. Our Liability to Consumers', id: 'liability' },
    { title: '19. Complaints and Feedback', id: 'complaints' },
    { title: '20. How We Use Your Personal Information', id: 'privacy' },
    { title: '21. What Happens if We Transfer this Agreement to Another Party', id: 'transfer' },
    { title: '22. Other Important Terms', id: 'other-terms' },
    { title: '23. Law and Jurisdiction', id: 'law' }
  ];

  // Content sections
  const sections = [
    {
      id: 'background',
      title: 'Background',
      preContent: `Please read these Terms of Sale carefully before placing an order with Us. These Terms of Sale, together with any other documents referred to herein (unless otherwise stated), set out the terms under which Goods are sold by Us to consumers through this website, downtown-shopping.org (“Our Site”).

      These Terms of Sale explain who We are, how Our Goods will be provided to you, how you or We may change, cancel, or otherwise end the Contract, what to do in the event of problems, and other important information.

      These Terms of Sale were last updated on 15th January 2025 .

      You will be required to read and accept these Terms of Sale when ordering Goods. If you do not agree to comply with and be bound by these Terms of Sale, you will not be able to order Goods through Our site. These Terms of Sale, as well as all Contracts, are in the English language only.

      The following documents may also apply to your use of Our Site:
•          Our Terms of Use, available at www.downtown-shopping.org, apply to your use of Our Site.
 
•          Our Privacy Policy, available at www.downtown-shopping.org. This is also referred to below in Part 20.
`
    },
    {
      id: 'definitions',
      title: '1. Definitions and Interpretation',
      preContent: '1.1 In these Terms of Sale, unless the context otherwise requires, the following expressions have the following meanings:',
      table: {
        headers: ['Term', 'Definition'],
        rows: [
          ['"Contract"', 'means a contract for the purchase and sale of Goods, as explained in Part 10'],
          ['"Contact Tools"', 'means any online communications facility that We make available on Our Site enabling you to contact Us including, but not limited to, contact forms and live chat;'],
          ['“Goods”', 'means the goods sold by Us through Our Site;'],
          ['“Order”', 'means your order for Goods'],
          ['“Order Confirmation”', 'means Our acceptance and confirmation of your Order;'],
          ['"Order Number"', 'means the reference number for your Order;'],
          ['"We/Us/Our"', 'means Lambano5 Group of Companies Ltd P.O Box 1074, Kampala, Uganda., as explained in Part 10'],
          ['“Our Site”', 'Means the website www.downtown-shopping.org and it will include a desktop website and any mobile application developed by Us.']
        ]
      },
      subsections: [
        {
          id: '1.2',
          title: '1.2',
          content: 'Unless the context otherwise requires, each reference in these Terms of Sale to:',
          subItems: [
            {
              id: '1.2.1',
              content: '"writing", and any similar term, includes a reference to any communication effected by electronic or facsimile transmission or similar means;'
            },
            {
              id: '1.2.2',
              content: 'a statute or a provision of a statute is a reference to that statute or provision as amended or re-enacted at the relevant time;'
            },
            {
                id: '1.2.3',
                content: 'a Part or paragraph is a reference to a section, part, or clause of these Terms of Sale.'
              },
          ]
        }
      ]
    },
    {
        id: 'information',
        title: '2. Information About Us',
        subsections: [
            {
              id: '2.1',
              title: '2.1',
              content: 'Our Site is operated by Lambano5 group of Companies Ltd. We are a limited company registered in Uganda under company number 80020001079624. Our registered address is P.O Box 1074, Kampala, Uganda.',
            },
            {
                id: '2.2',
                title: '2.2',
                content: 'Our TIN number is 1016504351.',
              }
        ]
      },
      {
        id: 'contact',
        title: '3. How To Contact Us',
        subsections: [
            {
              id: '3.1',
              title: '3.1',
              content: 'To contact Us with general questions or complaints by email, please email Us at downtownshopping3@gmail.com to contact Us by telephone, please call Us on 0766531370 and to contact Us by post, please write to Us at P.O Box 1074, Kampala, Uganda.',
            },
            {
                id: '3.2',
                title: '3.2',
                content: 'To contact Us about the Goods or your Order by email, please email Us at downtownshopping3@gmail.com to contact Us by telephone, please call Us on 0766531370 and to contact Us by post, please write to Us at P.O Box 1074, Kampala, Uganda.',
            },
            {
            id: '3.3',
            title: '3.3',
            content: 'To contact Us about cancellations by email, please email Us at downtownshopping3@gmail.com to contact Us by telephone, please call Us on 0766531370 and to contact Us by post, please write to Us at P.O Box 1074, Kampala, Uganda.',
            },
        ]
      },
      {
        id: 'access',
        title: '4. Access to Our Site and Use of Our Site',
        subsections: [
            {
              id: '4.1',
              title: '4.1',
              content: 'Access to Our Site is free of charge.',
            },
            {
                id: '4.2',
                title: '4.2',
                content: 'It is your responsibility to make the arrangements necessary in order to access Our Site.',
            },
            {
            id: '4.3',
            title: '4.3',
            content: 'Use of Our Site is subject to Our Website Terms of Use, available at www.downtown-shopping.org. Please ensure that you have read them carefully, that you understand them, and that you agree to them.',
            },
        ]
      },
      {
        id: 'changes',
        title: '5. Changes to these Terms of Sale',
        subsections: [
            {
              id: '5.1',
              title: '5.1',
              content: 'We may alter these Terms of Sale from time to time, for example, to reflect changes in relevant laws and regulatory requirements. It is recommended that you review these Terms of Sale periodically.',
            },
        ]
      },
      {
        id: 'customers',
        title: '6. Business Customers and Individual Consumers',
        subsections: [
            {
              id: '6.1',
              title: '6.1',
              content: 'These Terms of Sale apply to business customers and Individual consumers.',
            },
            {
                id: '6.2',
                title: '6.2',
                content: 'These Terms of Sale constitute the entire agreement between Us and you with respect to your purchase of Goods from Us.  You acknowledge that you have not relied upon any statement, representation, warranty, assurance, or promise made by or on behalf of Us that is not set out in these Terms of Sale and that you shall have no claim for innocent or negligent misrepresentation or negligent misstatement based upon any statement herein.',
            },
        ]
      },
      {
        id: 'international',
        title: '7. International Customers',
        subsections: [
            {
              id: '7.1',
              title: '7.1',
              content: 'Please note that We currently only deliver within the Greater Kampala area.',
            },
        ]
      },
      {
        id: 'goods',
        title: '8. Goods, Descriptions, and Changes',
        subsections: [
            {
              id: '8.1',
              title: '8.1',
              content: 'We make all reasonable efforts to ensure that all descriptions and images of Goods available from Us on Our Site match the actual Goods. Please note:',
              subItems: [
                {
                  id: '8.1.1',
                  content: 'Images of Goods are for illustrative purposes only. There may be slight variations in colour between the image of a product and the actual product due to differences in computer or device displays and lighting conditions;'
                },
                {
                  id: '8.1.2',
                  content: 'Images or descriptions of packaging are for illustrative purposes only and the actual packaging may vary; and'
                },
                {
                    id: '8.1.3',
                    content: 'Due to the nature of [certain] Goods, there may be a variance of up to 2% in weight or capacity between the actual Goods and the description.'
                },
              ]
            },
            {
                id: '8.2',
                title: '8.2',
                content: 'Minor changes may be made to certain Goods from time to time. This may happen between you placing your Order and the Goods being dispatched.',
            },
            {
            id: '8.3',
            title: '8.3',
            content: 'Minor changes may be made, for example, to reflect changes in relevant laws and regulatory requirements or to address particular technical or security issues.',
            },
        ]
      },
      {
        id: 'pricing',
        title: '9. Pricing',
        subsections: [
            {
                id: '9.1',
                title: '9.1',
                content: 'We make all reasonable efforts to ensure that prices shown on Our Site are correct. We may change prices from time to time. Changes in price will not affect any Order that you have already placed. Please note, however, that changes in VAT will, as explained below in Part 9.2.',
            },
            {
                id: '9.2',
                title: '9.2',
                content: 'All prices on Our Site include VAT. If the VAT rate changes between your Order being placed and Us taking payment, the amount of VAT payable will be automatically adjusted when taking payment.',
            },
            {
              id: '9.3',
              title: '9.3',
              content: 'All prices are checked before We accept your Order. If We have shown incorrect pricing information, we will inform you of the mistake in writing.',
              subItems: [
                {
                  id: '9.3.1',
                  content: 'If the correct price is lower than that shown when you make your Order, We will simply charge you the lower price.'
                },
                {
                  id: '9.3.2',
                  content: ' If the correct price is higher than that shown when you make your Order, We will give you the option to purchase the Goods at the correct price or to cancel your Order (or the affected part of it). We will not proceed with processing your Order in this case until you respond. If you do not respond within 8 hours on a working day. We will treat your Order as cancelled and inform you of the cancellation in writing.'
                },
              ]
            },
            {
                id: '9.4',
                title: '9.4',
                content: 'If We mistakenly accept and process an Order where an obvious and unmistakeable pricing error has been made, which you could have reasonably recognised as mispricing, We have the right to end the Contract, refund any sums paid, and require you to return the affected Goods to Us.',
            },
            {
                id: '9.5',
                title: '9.5',
                content: 'Delivery charges and service charges are not included in the price of Goods shown on Our Site. Delivery options and related charges will be presented to you as part of the order process.',
            },
        ]
      },
      {
        id: 'orders',
        title: '10. Orders and How Contracts Are Formed',
        subsections: [
            {
              id: '10.1',
              title: '10.1',
              content: 'Our Site will guide you through the ordering process. Before submitting your Order, you will be given the opportunity to review and amend it. Please ensure that you check your Order carefully before submitting it so as to:',
              subItems: [
                {
                  id: '10.1.1',
                  content: 'Review the entire electronic transaction;'
                },
                {
                  id: '10.1.2',
                  content: 'Correct any mistakes; and'
                },
                {
                    id: '10.1.3',
                    content: 'Withdraw from the transaction before placing an order.'
                },
              ]
            },
            {
                id: '10.2',
                title: '10.2',
                content: 'If you provide Us with incorrect or incomplete information during the order process, please contact Us as soon as possible. Where any information is required, it will be stated on Our Site, either in the product descriptions or during the order process, as applicable.',
            },
            {
                id: '10.3',
                title: '10.3',
                content: 'If We cannot process your Order due to incorrect or incomplete information, We will contact you to ask you to correct it or provide the missing information required for Us to supply the Goods to you.',
            },
            {
                id: '10.4',
                title: '10.4',
                content: 'If you do not provide the required information within a reasonable period of Us asking for it, or if the information is inaccurate or incomplete, We may either end the Contract or charge you a reasonable sum as compensation for the extra work required as a result.',
            },
            {
                id: '10.5',
                title: '10.5',
                content: 'We will not be responsible for supplying the affected Goods late or for not supplying the affected Goods if this is due to you not providing Us with the required information within a reasonable period of Us asking for it.',
            },
        ]
      },
      {
        id: 'acceptance',
        title: '11. No part of Our Site constitutes a contractual offer capable of acceptance.',
        subsections: [
            {
              id: '11.1',
              title: '11.1',
              content: `Your Order constitutes a contractual offer. Our acceptance of that offer is indicated by Us sending you an Order Confirmation by email.
              Only once we have sent you an Order Confirmation will there be a legally binding Contract between Us and you for the sale of the Goods.`,
            },
            {
                id: '11.2',
                title: '11.2',
                content: 'Order Confirmations contain the following information:',
                subItems: [
                    {
                      id: 'a)',
                      content: 'Your Order Number;'
                    },
                    {
                      id: 'b)',
                      content: 'Confirmation of the Goods ordered including full details of their main characteristics; and'
                    },
                    {
                        id: 'c)',
                        content: 'Fully itemised pricing for the Goods ordered including, where appropriate, taxes, delivery, and other additional charges.'
                    },
                  ]
            },
            {
                id: '11.3',
                title: '11.3',
                content: 'We may also include a paper copy of your Order Confirmation with your Goods.',
            },
            {
                id: '11.4',
                title: '11.4',
                content: 'Please quote your Order Number if you contact Us about your Order for any reason. You do not have to do this, but it may help Us to locate your Order and help you more quickly and easily.',
            },
            {
                id: '11.5',
                title: '11.5',
                content: 'In the unlikely event that We cannot accept your Order, We will inform you in writing and explain why. No payment will be taken under normal circumstances. If We have taken payment, any such sums will be refunded.',
            },
            {
                id: '11.6',
                title: '11.6',
                content: 'We may not accept your Order because the Goods are out of stock, because of unexpected limits on Our resources that We could not have reasonably planned for, because We have identified a mistake in the description or price of the Goods, or because We are not able to meet a delivery deadline that you have set.',
            },
        ]
      },
      {
        id: 'payment',
        title: '12. Payment',
        subsections: [
            {
              id: '12.1',
              title: '12.1',
              content: 'Payment for Goods and related delivery charges must always be made in advance in cash when the delivery is made. If paying by Mobile Money or Debit/ Credit card You will be prompted to provide payment details during the ordering process.',
            },
            {
                id: '12.2',
                title: '12.2',
                content: ' We will not charge your chosen payment method until We dispatch the Goods.',
            },
            {
                id: '12.3',
                title: '12.3',
                content: 'We accept the following methods of payment: Cash on Delivery, Mobile Money and Debit/ credit card.',
            },
        ]
      },
      {
        id: 'ownership',
        title: '13. When You Own the Goods',
        subsections: [
            {
              id: '13.1',
              title: '13.1',
              content: 'Ownership of the Goods passes to you once We have received payment in full of all sums due.',
            }
        ]
      },
      {
        id: 'delivery',
        title: '14. When You Own the Goods',
        subsections: [
            {
              id: '14.1',
              title: '14.1',
              content: 'Currently we only deliver Orders for Goods within the Greater Kampala area.',
            },
            {
                id: '14.2',
                title: '14.2',
                content: 'All Goods purchased through Our Site will be delivered within 30 calendar days after the date of Our Order Confirmation unless otherwise agreed or specified during the ordering process.',
            },
            {
                id: '14.3',
                title: '14.3',
                content: 'We will not be responsible or liable for any delay, omission, or failure to deliver Goods as per your Order and the time frames given in any Order are estimates. By accepting these Terms of Sale you irrevocably agree not to hold us responsible for any delay, omission or failure to deliver goods other than what has been expressly set out under the Terms of Sale and Terms of Use Terms of Use if any such delay, omission or failure is wholly or partly caused, whether directly or indirectly by circumstances beyond our control.',
            },
            {
                id: '14.4',
                title: '14.4',
                content: 'If there is a risk of a substantial delay to delivery, you may contact Us to end the Contract and will be refunded any sums paid for Goods that you have not received.',
              },
              {
                  id: '14.5',
                  title: '14.5',
                  content: 'If you are collecting the Goods from Us instead of having them delivered to you, they can be collected during Our business hours of 8pm to 4pm On Monday to Saturday.',
              },
              {
                  id: '14.6',
                  title: '14.6',
                  content: 'If you (or someone on your behalf) are not available at your address to take delivery of the Goods and they cannot be left at your place of delivery, We will leave a note informing you of how to arrange for re-delivery or of where to collect the Goods.',
              },
              {
                id: '14.7',
                title: '14.7',
                content: `If you do not arrange to have the Goods re-delivered or do not collect them, We will contact you to ask for further instructions.
                
                We may charge you for storage and for further delivery costs. If, despite Our reasonable efforts, We cannot contact you or cannot arrange for re-delivery or collection of the Goods, We may end the Contract and issue you with a refund. We may deduct a reasonable sum in compensation for any net costs incurred by Us as a result.`,
              },
              {
                  id: '14.8',
                  title: '14.8',
                  content: 'In the unlikely event that We do not deliver the Goods on time (within 30 calendar days of the Order Confirmation or as otherwise agreed or specified), you may treat the Contract as being at an end immediately.',
              },
              {
                  id: '14.9',
                  title: '14.9',
                  content: 'If you do not wish to cancel under Part 14.7 you may specify a new (reasonable) delivery date. If We fail to meet the new deadline, you may then treat the Contract as being at an end.',
              },
              {
                id: '14.10',
                title: '14.10',
                content: 'Any sums that you have already paid for cancelled Goods and their delivery will be refunded to you.',
              },
              {
                  id: '14.11',
                  title: '14.11',
                  content: 'If any cancelled Goods are delivered to you, you must return them to Us or arrange for their collection.',
              },
              {
                  id: '14.12',
                  title: '14.12',
                  content: 'Responsibility for the Goods passes to you once We have delivered the Goods to the address you have provided or once you (or a carrier organised by you, if applicable) collect the Goods from Us.',
              },
              {
                id: '14.13',
                title: '14.13',
                content: 'As explained in Part 10.2, We will not be responsible for delivering Goods late or for not delivering Goods if this is due to you not providing Us with required information within a reasonable period of Us asking for it.',
            },
        ]
      },
      {
        id: 'cancellation',
        title: '15. Cancelling the Order and the Contract',
        subsections: [
            {
                id: '15.1',
                title: '15.1',
                content: ' If you are a consumer, the Electronic Transactions Act 2011 gives you the legal right to change your mind and end the Contract for any reason. This 7-calendar day “cooling-off period” begins either:',
                subItems: [
                    {
                      id: '15.1.1',
                      content: 'Once your Order is complete and we send you the Order Confirmation, i.e. when the Contract is formed, and ends as set out below; OR'
                    },
                    {
                      id: '15.1.2',
                      content: 'From the date of delivery of the Goods.'
                    },
                  ]
            },
            {
                id: '15.2',
                title: '15.2',
                content: ' If you wish to end the Contract for this reason, you must inform Us within the cooling-off period. You may inform Us in any way you wish (including by email, post, or telephone). Please state that you want to cancel and end the Contract, providing your name, address, details of your Order and, where possible, your email address and telephone number.',
            },
            {
                id: '15.3',
                title: '15.3',
                content: 'Your cancellation notice is effective from the date on which you send it. Provided you send your cancellation notice or contact Us directly by 23:59:59 on the final day of the cooling-off period, your cancellation will be valid and accepted.',
            },
            {
                id: '15.4',
                title: '15.4',
                content: 'Please note that this right to cancel shall not apply, whether you are a Business user or an Individual user, and any payment made is not refundable in the following circumstances:',
                subItems: [
                    {
                      id: '15.4.1',
                      content: 'If the Goods are foodstuff, beverages, disposable Goods, foils and packing, personal care and toiletry products, stationery, pet food, toilet and tissue paper and other daily household products or other goods intended for everyday consumption.'
                    },
                    {
                      id: '15.4.2',
                      content: ' If the Goods are used for health or hygiene reasons.'
                    },
                    {
                        id: '15.4.3',
                        content: 'If the Goods consist of sealed audio or video recordings or sealed computer software on physical media and you have unsealed them after receiving them.'
                    },
                    {
                        id: '15.4.4',
                        content: 'If the Goods have been personalised or custom-made for you.'
                    },
                    {
                        id: '15.4.5',
                        content: 'If the Goods have been inseparably mixed with other items (according to their nature) after you have received them.'
                    },
                    {
                        id: '15.4.6',
                        content: 'Good are sold by way of an auction.'
                    },
                  ]
            },
        ]
      },
      {
        id: 'returns',
        title: '16. Returning Goods After Cancelling and Ending the Contract.',
        subsections: [
            {
              id: '16.1',
              title: '16.1',
              content: 'Subject to your right to cancel your Order under Part 15.4, if you cancel and end the Contract for any reason after Goods have been dispatched or delivered to you, you must return the Goods to Us or arrange for their collection. Please contact Us using the details provided above in Part 3 to arrange for delivery or collection.',
            },
            {
                id: '16.2',
                title: '16.2',
                content: 'If you are exercising your right to change your mind under the cooling-off period as set out in Part 14, you must return the Goods to Us no more than 7 calendar days after the day on which you informed Us that you wish to cancel.',
            },
            {
                id: '16.3',
                title: '16.3',
                content: 'If you are returning the Goods to Us in person instead of posting them or having them collected, they can be returned during Our business hours of 8pm to 4pm on Monday to Saturday (which is not a public holiday in Uganda)',
            },
            {
                id: '16.4',
                title: '16.4',
                content: 'We will only cover the costs of returning the Goods to Us in the event the Goods are proved to be faulty.',
              },
              {
                  id: '16.5',
                  title: '16.5',
                  content: 'In all other circumstances, including where you are exercising your right to change your mind under the cooling-off period, you must cover the costs of returning the Goods to Us.',
              },
              {
                  id: '16.6',
                  title: '16.6',
                  content: 'If you are responsible for the costs of returning the Goods to Us and We are collecting them, the cost charged to you will only be the direct cost to Us of collecting the Goods.',
              }
        ]
      },
      {
        id: 'refunds',
        title: '17. Refunds',
        subsections: [
            {
                id: '17.1',
                title: '17.1',
                content: 'All refunds due to you will be made using the same method used by you when paying for the Goods or it can be credited in your e-wallet. You will be refunded the price paid for the Goods and for delivery, subject to the following limitations and deductions:',
                subItems: [
                    {
                      id: '17.1.1',
                      content: 'If you are exercising your right to change your mind under the cooling-off period, We may reduce your refund to reflect any reduction in the value of the Goods if that reduction has been caused by your handling of the Goods in a way that would not be permitted in a shop. If We issue the refund before inspecting the Goods and subsequently discover that you have handled them in this way, We may charge you an appropriate sum.'
                    },
                    {
                      id: '17.1.2',
                      content: ' Standard delivery charges will be refunded, but we do not reimburse premium delivery charges.'
                    },
                  ]
            },
            {
                id: '17.2',
                title: '17.2',
                content: 'All refunds due to you will be made as soon as possible. If you are exercising your right to change your mind under the cooling-off period, We will issue your refund within Thirty (30) calendar days of:',
                subItems: [
                    {
                      id: '17.2.1',
                      content: 'The day on which We receive the returned Goods; or'
                    },
                    {
                      id: '17.2.2',
                      content: 'If We have not yet provided an Order Confirmation or have not yet dispatched the Goods, the day on which you inform Us that you wish to cancel and end the Contract.'
                    },
                  ]
            },
        ]
      },
      {
        id: 'liability',
        title: '18. Our Liability to Consumers',
        subsections: [
            {
              id: '18.1',
              title: '18.1',
              content: 'We will not be responsible for any loss or damage that is not foreseeable.',
            },
            {
                id: '18.2',
                title: '18.2',
                content: 'We only supply goods for domestic and private use by consumers. We make no warranty or representation that the Goods are fit for commercial, business or industrial use of any kind (including resale). We will not be liable to you for any loss of profit, loss of business, interruption to business, or for any loss of business opportunity.',
            },
        ]
      },
      {
        id: 'complaints',
        title: '19. Complaints and Feedback',
        subsections: [
            {
              id: '19.1',
              title: '19.1',
              content: 'We always welcome feedback from Our customers and, whilst We always use reasonable efforts to ensure that your experience as a customer of Ours is a positive one, We nevertheless want to hear from you if you have any cause for complaint using our contact details in Part 3.',
            },
        ]
      },
      {
        id: 'privacy',
        title: '20. How We Use Your Personal Information',
        subsections: [
            {
              id: '20.1',
              title: '20.1',
              content: 'We will only use your personal information as set out in Our Privacy Policy, available from (www.downtown-shopping.org).',
            },
        ]
      },
      {
        id: 'transfer',
        title: '21. What Happens if We Transfer this Agreement to Another Party',
        subsections: [
            {
              id: '21.1',
              title: '21.1',
              content: 'We may transfer (assign) Our obligations and rights under these Terms of Sale (and the Contract) to a third party (this may happen, for example, if We sell Our business).',
            },
        ]
      },
      {
        id: 'other-terms',
        title: '22. Other Important Terms',
        subsections: [
            {
              id: '22.1',
              title: '22.1',
              content: 'You may not transfer (assign) your obligations and rights under these Terms of Sale (and under the Contract, as applicable) without Our express written permission.',
            },
            {
                id: '22.2',
                title: '22.2',
                content: 'The Contract is between you and Us. It is not intended to benefit any other person or third party in any way and no such person or party will be entitled to enforce any provision of these Terms of Sale.',
            },
            {
                id: '22.3',
                title: '22.3',
                content: ' If any of the provisions of these Terms of Sale are found to be unlawful, invalid or otherwise unenforceable by any court or other authority, that / those provision(s) shall be deemed severed from the remainder of these Terms of Sale. The remainder of these Terms of Sale shall be valid and enforceable.',
            },
            {
                id: '22.4',
                title: '22.4',
                content: 'No failure or delay by Us in exercising any of Our rights under these Terms of Sale means that We have waived that right, and no waiver by Us of a breach of any provision of these Terms of Sale means that We will waive any subsequent breach of the same or any other provision.',
              },
        ]
      },
      {
        id: 'law',
        title: '23.  Law and Jurisdiction',
        subsections: [
            {
              id: '23.1',
              title: '23.1',
              content: 'These Terms of Sale, and the relationship between you and Us (whether contractual or otherwise) shall be governed by, and construed in accordance with, law of the Republic of Uganda.',
            },
            {
                id: '23.2',
                title: '23.2',
                content: ' If you are a consumer, any dispute, controversy, proceedings, or claim between you and Us relating to these Terms of Sale or to the relationship between you and Us (whether contractual or otherwise) shall be subject to the jurisdiction of the courts of the Republic of Uganda.',
            },
            {
                id: '23.3',
                title: '23.3',
                content: 'If you are a business user, any dispute, controversy, proceedings, or claim between you and Us relating to these Terms of Sale or to the relationship between you and Us (whether contractual or otherwise) shall be subject to the exclusive jurisdiction of the courts of the Republic of Uganda.',
            },
        ]
      },
  ];

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <h1 className="text-3xl font-light mb-4">Terms and Conditions</h1>
              <p className="text-gray-600">Last updated: January 15, 2025</p>
            </div>

            {/* Table of Contents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12 p-6 bg-gray-50 rounded-lg"
            >
              <h2 className="text-xl font-medium mb-6">Table of Contents</h2>
              <nav className="space-y-2">
                {tableOfContents.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleScrollToSection(section.id)}
                    className="block text-gray-600 hover:text-gray-900 hover:underline text-left w-full py-1"
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Content Sections */}
            <div className="prose prose-gray max-w-none">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-xl font-medium mb-4">{section.title}</h2>
                  <TermsSection section={section} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;