import * as React from 'react';
import { MdCameraAlt } from 'react-icons/md';
import Button from './Button';

export default {
  title: 'Button',
};

export const Default = () => <Button>Hello Button</Button>;

export const WithIcon = () => (
  <Button>
    <MdCameraAlt className="-ml-1 text-2xl" />
    <span>Hello icon Button</span>
  </Button>
);

export const Disabled = () => <Button disabled>Hello Button</Button>;

export const Small = () => <Button size="sm">Hello small Button</Button>;

export const SmallDisabled = () => (
  <Button disabled size="sm">
    Hello small Button
  </Button>
);
