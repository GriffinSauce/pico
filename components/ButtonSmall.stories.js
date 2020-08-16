import * as React from 'react';
import ButtonSmall from './ButtonSmall';

export default {
  title: 'ButtonSmall',
};

export const Default = () => <ButtonSmall>Hello ButtonSmall</ButtonSmall>;

export const Disabled = () => (
  <ButtonSmall disabled>Hello ButtonSmall</ButtonSmall>
);
