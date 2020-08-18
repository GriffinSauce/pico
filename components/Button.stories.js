import * as React from 'react';
import Button from './Button';

export default {
  title: 'Button',
};

export const Default = () => <Button>Hello Button</Button>;

export const Disabled = () => <Button disabled>Hello Button</Button>;

export const Small = () => <Button small>Hello small Button</Button>;

export const SmallDisabled = () => (
  <Button disabled small>
    Hello small Button
  </Button>
);
