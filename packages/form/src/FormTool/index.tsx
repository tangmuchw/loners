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
          fieldProps,
          colProps,
          disabled,
          renderFormItem,
          render,
          ...formItemProps
        } = omit(child, ['syncToQuery']);

        const { name, show = true } = formItemProps || {};

        return (
          <Col key={`${name}_${componentType}`} {...colProps}>
            <Form.Item noStyle shouldUpdate>
              {(fm: FormInstance) => {
                const visible = typeof show === 'function' ? show(fm, action) : show;
                if (!visible) return null;

                if (componentType === 'Customize')
                  return render ? (
                    render?.(fm, action)
                  ) : (
                    <Form.Item {...formItemProps}>{renderFormItem?.(fm, action)}</Form.Item>
                  );

                const itemFieldProps = {
                  disabled: disabled?.(action) ?? isReadOnly,
                  ...fieldProps,
                };

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
