const contact = [{
  email: 'help@austintexas.gov',
  phone: {edges: [{
    default: '512-974-2000',
    phoneNummber: 311,
    tty: '512-972-9848',
    phoneDescription: 'Main office'
  }]},
  phone: {
    edges: [
      {
        node: {
          id: "Q29udGFjdFBob25lTnVtYmVyczo1",
          phoneDescription:"Main office",
          phoneNumber:"+15129749090"}
        },
      {
        node: {
          id:"Q29udGFjdFBob25lTnVtYmVyczo2",
          phoneDescription:"Complaint and thank you hotline",
          phoneNumber:"+15129722676"
        }
      }
      ]
    },
  hours: [
    {
      dayOfWeek: 'MONDAY',
      dayOfWeekNumeric: 1,
      startTime: 403797600000,
      endTime: 403826400000,
    },
    {
      dayOfWeek: 'TUESDAY',
      dayOfWeekNumeric: 2,
      startTime: 403797600000,
      endTime: 403826400000,
    },
    {
      dayOfWeek: 'WEDNESDAY',
      dayOfWeekNumeric: 3,
      startTime: 403797600000,
      endTime: 403826400000,
    },
    {
      dayOfWeek: 'THURSDAY',
      dayOfWeekNumeric: 4,
      startTime: 403797600000,
      endTime: 403826400000,
    },
    {
      dayOfWeek: 'FRIDAY',
      dayOfWeekNumeric: 5,
      startTime: 403797600000,
      endTime: 403826400000,
    },
    {
      dayOfWeek: 'SATURDAY',
      dayOfWeekNumeric: 6,
      startTime: 403790400000,
      endTime: 403808400000,
    },
    {
      dayOfWeek: 'SUNDAY',
      dayOfWeekNumeric: 7,
      startTime: 403790400000,
      endTime: 403808400000,
    },
  ],
  location: {
    name: 'Recycle & Reuse Drop-off Center',
    street: '2514 Business Center Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78744',
    country: 'UNITED_STATES',
  },
}];

export default contact;
