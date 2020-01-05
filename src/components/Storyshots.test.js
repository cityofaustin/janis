import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

initStoryshots({
  suite: 'Storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:5000',
  }),
});