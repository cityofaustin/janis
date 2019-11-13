import React from 'react';
import renderer from 'react-test-renderer';
// BrowserRouter is necessary so the tests know where to find Link
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from 'js/helpers/createComponentWithIntl';
import Steps from 'components/Steps';

jest.mock('react-accessible-accordion')

import AccordionWrapper from '..'

const {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} = jest.requireActual('react-accessible-accordion')

describe('Step', () => {
  test('step renders, step length > 1', () => {
    const steps = [
      {
        type: "step_with_options_accordian",
        value: {
          options_description: "Determine how you would like to receive your certificate based on how quickly you need it",
          options: [
            {
              option_name:"3-5 business days by phone",
              option_description: "<ol><li>Call VitalChek, our secure online agent at 1-800-457-7586.</li><li>Verify your identity by answering a series of questions. If VitalChek cannot verify your identity with their standard questions, you will be instructed to upload a copy of your current government-issued identification and proof of shipping address before your application can be processed. This will delay the processing and delivery time.</li><li>Use a credit or debit card (Visa, MasterCard, American Express, or Discover) to pay for your certificate(s). Processing and UPS shipping fees will be added.</li></ol>"
            },
            {
              option_name: "2-3 weeks by mail",
              option_description: "<p>Mail the following items to Office of Vital Records, PO Box 1088, Austin, TX 78767-1088:</p>\
              <ol><li>If your home address is different than the address on your ID, also include a proof of residence like a utility bill, voter registration card, etc...</li><li>A self-addressed envelope with a stamp. You may use an express mail envelope for faster return delivery. If this is not included, you will not receive the certificate.</li></ol><p>If you need the certificate quickly through the mail, use an Express form of delivery, such as FedEx, USPS, or UPS, and send your application to: Office of Vital Records, 7201 Levander Loop, Bldg. C, Austin, TX 78702.</p>"
            }]
          },
        id:"f601e59c-9e52-46f3-947e-399120fa604a"
      },
      {
        type: "basic_step",
        value: "<p>Make sure you have enough money for the certificate(s) you need.</p><ul><li>The cost for each birth certificate is $23.</li><li>The cost for one death certificate is $21.</li></ul>",
        id:"2a910f7a-2063-4cb8-9f06-2d9b96c9f5cd"
      }
    ];
    const component = renderer.create(
      <BrowserRouter>
      	<Steps
          steps={steps}
      	/>
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('step renders, step length equals 1', () => {
    const step = [
      {
        type: "basic_step",
        value: "<p>Make sure you have enough money for the certificate(s) you need.</p><ul><li>The cost for each birth certificate is $23.</li><li>The cost for one death certificate is $21.</li></ul>",
        id:"2a910f7a-2063-4cb8-9f06-2d9b96c9f5cd"
      }
    ];
    const component = renderer.create(
      <BrowserRouter>
        <Steps
          steps={step}
        />
      </BrowserRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});


