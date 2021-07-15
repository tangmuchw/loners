import React from 'react';
import { Descriptions } from 'antd';
import type { TextToolProps, TextToolItem } from './interface';

const { Item: DescItem } = Descriptions;

function TextTool({ fm, items, className, children, ...rowProps }: TextToolProps) {
  const record = fm?.getFieldsValue(true) || {};

  return (
    <Descriptions className={className} {...rowProps}>
      {items?.map((item: TextToolItem) => {
        const { name, renderText, ...textItemProps } = item;
        const text = name ? record[`${name}`] : undefined;

        return (
          <DescItem {...textItemProps}>{renderText ? renderText(text, record, fm) : text}</DescItem>
        );
      })}
    </Descriptions>
  );
}

export default TextTool;
