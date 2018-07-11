import getRevisionQuery from 'js/queries/getRevisionQuery';
import getContactQuery from 'js/queries/getContactQuery';

const getRevision = async (client, id, locale) => {
  debugger;
  const revisionData = await client.request(getRevisionQuery, { id: id });

  const serviceRevisionData = JSON.parse(
    revisionData.allPageRevisions.edges[0].node.contentJson,
  );

  // TODO: use actual contacts here, for some reason the contentJson is returning a blank array
  const contactData = await client.request(getContactQuery, {
    id: 'Q29udGFjdE5vZGU6MQ==',
  });

  return {
    title: serviceRevisionData[`title_${locale}`],
    topic: serviceRevisionData.topic,
    image: {
      id: 1,
      filename: 'blarg',
      title: 'blarg',
    },
    related: [{ url: 'blarg', text: 'blarg' }],
    slug: serviceRevisionData.slug,
    steps: serviceRevisionData[`steps_${locale}`],
    dynamicContent: JSON.parse(serviceRevisionData.dynamic_content),
  };
};

export default getRevision;
