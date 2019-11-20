import React from 'react';
import { storiesOf } from '@storybook/react';

import LocationPage from 'components/Pages/Location';

export default {
  title: 'Pages|LocationPage',
};

export const locationPage = () => {
  const locationPage = {
    title: "Neighborhood Housing and Community Development location",
    contact: {
      phone: {
        "name": "Office",
        "value": "(512) 972-4942",
      },
      email: {
        "name": "Email Address",
        "value": "Address@austintexas.gov",
      },
    },
    location: {
      "Physical address": {
        "street": "405 W Stassney Ln",
        "city": "Austin",
        "state": "TX",
        "zip": 78745,
      },
      "Mailing address": {
        "street": "P.O. Box 1088",
        "city": "Austin",
        "state": "TX",
        "zip": 78767,
      },
    },
    image: {
      filename: "Screen_Shot_2019-10-21_at_12.02.01_PM.png",
      id: "VHJhbnNsYXRlZEltYWdlTm9kZToxOQ==",
      title: "Aerial photo of the Austin skyline looking over from Town Lake",
    },
    hours: {
      "Monday": "7:30 am–noon, 1 pm–7 pm",
      "Tuesday": "7:30 am–noon, 1 pm–7 pm",
      "Wednesday": "7:30 am–noon, 1 pm–7 pm",
      "Thursday": "7:30 am–noon, 1 pm–7 pm",
      "Friday": "7:30 am–noon, 1 pm–7 pm",
      "Saturday": "Closed",
      "Sunday": "Closed",
    },
    services: [
      {
        title: "Get a Birth Certificate",
        phone: "(512) 000-0000",
        hours: {
          "Monday": "7:30 am–noon, 1 pm–7 pm",
        }
      },
      {
        title: "Adopt a baby tarantula",
        phone: "(512) 000-0000",
        hours: {
          "Monday": "7:30 am–noon, 1 pm–7 pm",
          "Tuesday": "7:30 am–noon, 1 pm–7 pm",
          "Wednesday": "7:30 am–noon, 1 pm–7 pm",
          "Thursday": "7:30 am–noon, 1 pm–7 pm",
          "Friday": "7:30 am–noon, 1 pm–7 pm",
          "Saturday": "Closed",
          "Sunday": "Closed",
        }
      }
    ],
    gettingHere: {
      buses: ["90", "180", "360"]
    }
  };

  return (
    <LocationPage
      locationPage={locationPage}
    />
  );
}

locationPage.story = {
  name: "Default"
}
