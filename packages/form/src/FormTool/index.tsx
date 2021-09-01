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
          show = true,
          fieldProps,
          colProps,
          disabled,
          renderFormItem,
          render,
          renderText,
          ...formItemProps
        } = omit(child, ['syncToQuery']);

        const { name } = formItemProps || {};

        return (
          <Form.Item key={`${name}_${componentType}`} noStyle shouldUpdate>
            {(fm: FormInstance) => {
              const visible = typeof show === 'function' ? show(fm, action) : show;
              if (!visible) return null;

              const record = fm.getFieldsValue(true) || {};
              const text = record[`${name}`];

              if (isReadOnly && renderText) return renderText(text, record, fm);

              if (componentType === 'Customize')
                return render ? (
                  render?.(fm, action, formItemProps)
                ) : (
                  <Form.Item {...formItemProps}>{renderFormItem?.(fm, action)}</Form.Item>
                );

              const itemFieldProps = {
                disabled: disabled?.(action) ?? isReadOnly,
                ...fieldProps,
              };

              return (
                <Col {...colProps}>
                  <FormItem type={componentType} fieldProps={itemFieldProps} {...formItemProps} />
                </Col>
              );
            }}
          </Form.Item>
        );
      })}
      {children}
    </Row>
  );
}

export default FormTool;
