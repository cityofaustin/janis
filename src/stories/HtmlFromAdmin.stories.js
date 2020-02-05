import React from 'react';

import HtmlFromRichText from 'components/HtmlFromRichText';

const content = `
  <h1>h1: In vel volutpat mi</h1>
  <h2>h2: Aenean odio ex, elementum a pretium eget, lacinia vel odio.</h2>
  <h3>h3: Cras mattis ipsum a efficitur commodo.</h3>
  <p><a href="https://www.lipsum.com/feed/html">Lorem ipsum dolor sit amet</a>, consectetur adipiscing elit. Phasellus eget malesuada neque. Maecenas sodales odio vel quam gravida, id euismod mi bibendum. Suspendisse potenti.  Aenean laoreet mauris eget consequat mollis. Nulla at tellus nisl. Sed placerat ac urna nec lacinia. Morbi vitae dui ligula. </p>
  <ul>
    <li>Aenean tellus dui, ultricies sit amet elit efficitur, ultricies blandit sem.</li>
    <li>Curabitur arcu magna, molestie sit amet scelerisque vel, condimentum ac libero. Nullam luctus consequat fermentum.</li>
    <li>Nulla fringilla sit amet urna vitae vehicula.</li>
  </ul>
  <ol>
    <li>Aenean tellus dui, ultricies sit amet elit efficitur, ultricies blandit sem.</li>
    <li>Curabitur arcu magna, molestie sit amet scelerisque vel, condimentum ac libero. Nullam luctus consequat fermentum.</li>
    <li>Nulla fringilla sit amet urna vitae vehicula.</li>
  </ol>
  <p>
    Cras eu <b>lectus pellentesque</b>, <i>posuere lectus vel</i>, scelerisque nisi. Donec eget pellentesque eros. Nam nec dui sed mauris posuere volutpat. Aliquam aliquet tortor sed ligula malesuada dictum. Maecenas consequat molestie tortor ac volutpat. Cras felis augue, lobortis at dignissim et, sodales eleifend ex. Morbi et ullamcorper leo.
  </p>
`;

export default {
  title: 'HtmlFromRichText',
};

export const HtmlFromRichText = () => (
  <div className="wrapper container-fluid">
    <HtmlFromRichText
      title="Lorem ipsum dolor sit amet cume"
      content={content}
    />
  </div>
);

HtmlFromRichText.story = {
  name: 'HtmlFromRichText',
};
