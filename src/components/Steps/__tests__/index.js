import React from 'react';
import renderer from 'react-test-renderer';
// BrowserRouter is necessary so the tests know where to find Link
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from 'js/helpers/createComponentWithIntl';
import Steps from 'components/Steps';

describe('Step', () => {
  test('step renders, step length > 1', () => {
    const steps = [
      {
        type: "step_with_options_accordian",
        value: {
          options_description: "Determine how you would like to receive your certificate based on how quickly you need it",
          options: [
            // {
            //   option_name: "15 minutes in person",
            //   option_description:"<ol><li>Bring your current, government-issued photo identification.</li><li>Bring cash, a money order in the exact amount, a personal check, or a credit or debit card in your name for the certificate you need.</li></ol>"},
            // {
            //   option_name: "2-5 business days online",
            //   option_description: "<ol><li>Follow the prompts on VitalChek to select which kind of certificate(s) you need.</li><li>Verify your identity by answering the questions on VitalChek. If they cannot verify your identity with their standard questions, you will be instructed to upload a copy of your current government-issued identification and proof of shipping address before your application can be processed. This will delay the processing and delivery time.</li><li>Use a credit or debit card (Visa, MasterCard, American Express, or Discover) to pay for your certificate(s). Processing and UPS shipping fees will be added.</li></ol>"
            // },
            // {
            //   option_name:"3-5 business days by phone",
            //   option_description: "<ol><li>Call VitalChek, our secure online agent at 1-800-457-7586.</li><li>Verify your identity by answering a series of questions. If VitalChek cannot verify your identity with their standard questions, you will be instructed to upload a copy of your current government-issued identification and proof of shipping address before your application can be processed. This will delay the processing and delivery time.</li><li>Use a credit or debit card (Visa, MasterCard, American Express, or Discover) to pay for your certificate(s). Processing and UPS shipping fees will be added.</li></ol>"
            // },
            {
              option_name: "2-3 weeks by mail",
              option_description: "<p>Mail the following items to Office of Vital Records, PO Box 1088, Austin, TX 78767-1088:</p><ol><li>A copy of one of your acceptable and current <a href=\"https://www.dshs.texas.gov/vs/reqproc/Acceptable-IDs/\">forms of government-issued photo identification</a>. If your home address is different than the address on your ID, also include a proof of residence like a utility bill, voter registration card, etc...</li><li>A self-addressed envelope with a stamp. You may use an express mail envelope for faster return delivery. If this is not included, you will not receive the certificate.</li></ol><p>If you need the certificate quickly through the mail, use an Express form of delivery, such as FedEx, USPS, or UPS, and send your application to: Office of Vital Records, 7201 Levander Loop, Bldg. C, Austin, TX 78702.</p>"
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
});


[
  {
    "type":"step_with_options_accordian",
    "value":
      {
        "options_description": "Determine how you would like to receive your certificate based on how quickly you need it",
        "options":
          [
            {
              "option_name":"15 minutes in person",
              "option_description":"<ol><li>Bring your current, government-issued photo identification.</li><li>Bring cash, a money order in the exact amount, a personal check, or a credit or debit card in your name for the certificate you need.</li><li>Visit the The Office of Vital Records is at 7201 Levander Loop, Building C, Austin, TX, 78702 between 8 am and 4:30 pm Monday through Friday. The last application is accepted until 4:15 p.m. Note that our office is usually busiest between 11:00 am. – 2:00 pm. Customers should expect longer wait times during those hours.</li><li>For faster service, download and print an application in <a href=\"http://austintexas.gov/sites/default/files/files/Health/VitalRecords/2018_OVR_WalkInENGLISH.pdf\">English</a> or <a href=\"http://austintexas.gov/sites/default/files/files/Health/VitalRecords/2018_OVR_WalkInSPANISH.pdf\">Spanish</a> and bring it with you.</li></ol>"
            },
            {
              "option_name":"2-5 business days online",
              "option_description":"<ol><li>Visit <a href=\"https://www.vitalchek.com/\">www.VitalChek.com</a>.</li><li>Follow the prompts on VitalChek to select which kind of certificate(s) you need.</li><li>Verify your identity by answering the questions on VitalChek. If they cannot verify your identity with their standard questions, you will be instructed to upload a copy of your current government-issued identification and proof of shipping address before your application can be processed. This will delay the processing and delivery time.</li><li>Use a credit or debit card (Visa, MasterCard, American Express, or Discover) to pay for your certificate(s). Processing and UPS shipping fees will be added.</li></ol>"},{"option_name":"3-5 business days by phone","option_description":"<ol><li>Call VitalChek, our secure online agent at 1-800-457-7586.</li><li>Verify your identity by answering a series of questions. If VitalChek cannot verify your identity with their standard questions, you will be instructed to upload a copy of your current government-issued identification and proof of shipping address before your application can be processed. This will delay the processing and delivery time.</li><li>Use a credit or debit card (Visa, MasterCard, American Express, or Discover) to pay for your certificate(s). Processing and UPS shipping fees will be added.</li></ol>"
            },
            {
              "option_name":"2-3 weeks by mail","option_description":"<p>Mail the following items to Office of Vital Records, PO Box 1088, Austin, TX 78767-1088:</p><ol><li>A completed and notarized <a href=\"http://austintexas.gov/sites/default/files/files/Health/VitalRecords/2018_OVR_WalkInENGLISH.pdf\">certificate application in English</a> or a <a href=\"http://austintexas.gov/sites/default/files/files/Health/VitalRecords/2018_OVR_WalkInSPANISH.pdf\">certificate application in Spanish</a>.</li><li>A check or money order in the exact amount payable to the Office of Vital Records. Personal checks must be signed by the same person who signs the application</li><li>A copy of one of your acceptable and current <a href=\"https://www.dshs.texas.gov/vs/reqproc/Acceptable-IDs/\">forms of government-issued photo identification</a>. If your home address is different than the address on your ID, also include a proof of residence like a utility bill, voter registration card, etc...</li><li>A self-addressed envelope with a stamp. You may use an express mail envelope for faster return delivery. If this is not included, you will not receive the certificate.</li></ol><p>If you need the certificate quickly through the mail, use an Express form of delivery, such as FedEx, USPS, or UPS, and send your application to: Office of Vital Records, 7201 Levander Loop, Bldg. C, Austin, TX 78702.</p>"
            }]},"id":"f601e59c-9e52-46f3-947e-399120fa604a"},{"type":"basic_step","value":"<p>Make sure you have enough money for the certificate(s) you need.</p><ul><li>The cost for each birth certificate is $23.</li><li>The cost for one death certificate is $21.</li><li>If you order more copies at the same time, the cost for each extra one is $4.</li></ul>",
              "id":"2a910f7a-2063-4cb8-9f06-2d9b96c9f5cd"}]





