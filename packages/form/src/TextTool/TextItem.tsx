import React from 'react';
import { Descriptions } from 'antd';
import type { TextToolItem } from './interface';

const { Item: DescItem } = Descriptions;

interface TextItemProps extends TextToolItem {
  text?: any;
}

function TextItem({ label, text, ...rawProps }: TextItemProps) {
  return (
    <DescItem label={label} {...rawProps}>
      {text}
    </DescItem>
  );
}

export default TextItem;
