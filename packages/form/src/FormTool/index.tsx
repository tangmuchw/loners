import React from 'react';
import { Form, Row, Col } from 'antd';
import { omit } from 'lodash';
import type { FormInstance } from 'antd/lib/form';
import FormItem from './FormItem';

import type { FormToolProps, FormToolItem } from './interface';

function FormTool({ action, items, className, children, ...rowProps }: FormToolProps) {
  const isReadOnly = action === 'readonly';

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={className} {...rowProps}>
      {items?.map((child: FormToolItem) => {
        const {
          type: componentType,
          name,
          show = true,
          fieldProps,
          colProps,
          disabled,
          renderFormItem,
          render,
          renderText,
          ...formItemProps
        } = omit(child, ['syncToQuery']);

        return (
          <Col key={`${name}_${componentType}`} {...colProps}>
            <Form.Item noStyle shouldUpdate>
              {(fm: FormInstance) => {
                const visible = typeof show === 'function' ? show(fm, action) : show;
                if (!visible) return null;

                const itemFieldProps: any = {
                  disabled: disabled?.(action) ?? isReadOnly,
                  ...fieldProps,
                };

                const record = fm.getFieldsValue(true) || {};
                const text = record[`${name}`];

                if (isReadOnly && renderText) return renderText(text, record, fm);

                if (componentType === 'Customize')
                  return render ? (
                    render?.(fm, action)
                  ) : (
                    <Form.Item {...formItemProps}>
                      {renderFormItem?.(fm, action, itemFieldProps)}
                    </Form.Item>
                  );

                return (
                  <FormItem type={componentType} fieldProps={itemFieldProps} {...formItemProps} />
                );
              }}
            </Form.Item>
          </Col>
        );
      })}
      {children}
    </Row>
  );
}

export default FormTool;
