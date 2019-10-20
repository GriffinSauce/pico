import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';
import ProgressCircle from './ProgressCircle';

const stories = storiesOf('ProgressCircle', module);
stories.addDecorator(withKnobs);

stories.add('animated', () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let index = 0;
    setInterval(() => {
      index += 1;
      setProgress((index * 20) % 100);
    }, 1000);
  }, []);
  return <ProgressCircle radius={20} stroke={4} progress={progress} />;
});

stories.add('with knobs', () => {
  const progress = number('Progress', 10, {
    range: true,
    min: 0,
    max: 100,
    step: 10,
  });
  const progresColor = color('Color', '#fff');
  return (
    <ProgressCircle
      radius={20}
      stroke={4}
      progress={progress}
      color={progresColor}
    />
  );
});
