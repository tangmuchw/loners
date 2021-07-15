import React from 'react';
import { Form, Descriptions } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import TextItem from './TextItem';

import type { TextToolProps, TextToolItem } from './interface';

function TextTool({ items, className, children, ...rowProps }: TextToolProps) {
  return (
    <Descriptions column={{ xs: 8, sm: 16, md: 24 }} className={className} {...rowProps}>
      {items?.map((item: TextToolItem) => {
        const { type: componentType, name, show = true, renderText, ...textItemProps } = item;

        return (
          <Form.Item noStyle shouldUpdate>
            {(fm: FormInstance) => {
              const record = fm.getFieldsValue(true);
              const text = name ? record?.name : undefined;

              if (renderText) return renderText(text, record, fm);

              const visible = typeof show === 'function' ? show(fm) : show;
              if (!visible) return null;

              if (componentType === 'Customize') return <></>;

              return <TextItem type={componentType} {...textItemProps} />;
            }}
          </Form.Item>
        );
      })}
    </Descriptions>
  );
}

export default TextTool;
