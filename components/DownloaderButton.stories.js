import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import DownloaderButton from './DownloaderButton';

const stories = storiesOf('DownloaderButton', module);
stories.addDecorator(withKnobs);

stories.add('initial', () => {
  return (
    <DownloaderButton
      downloading={false}
      disabled={false}
      progress={0}
      onClick={action('onClick')}
    />
  );
});

stories.add('downloading', () => {
  return (
    <DownloaderButton
      downloading
      disabled={false}
      progress={40}
      onClick={action('onClick')}
    />
  );
});
