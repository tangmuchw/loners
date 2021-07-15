import React from 'react';
import { Descriptions } from 'antd';
import type { TextToolProps, TextToolItem } from './interface';

const { Item: DescItem } = Descriptions;

function TextTool({ fm, items, className, children, ...rowProps }: TextToolProps) {
  const record = fm?.getFieldsValue(true) || {};

  return (
    <Descriptions column={{ xs: 8, sm: 16, md: 24 }} className={className} {...rowProps}>
      {items?.map((item: TextToolItem) => {
        const { name, renderText, ...textItemProps } = item;
        const text = name ? record?.name : undefined;

        if (renderText) return renderText(text, record, fm);

        return <DescItem {...textItemProps}>{text}</DescItem>;
      })}
    </Descriptions>
  );
}

export default TextTool;
