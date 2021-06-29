/** 业务型 Form Widget */
import React, { useRef, useImperativeHandle } from 'react';
import { Form } from 'antd';
import { throttle, isString, isArray } from 'lodash';
import FormTool from '../FormTool';
import type { FormInstance } from 'antd';

import type { FormWidgetProps, ClearRule } from './interface';

function FormWidget({
  form: userForm,
  formRef: propsFormRef,
  clearRules,
  items,
  formToolProps,
  onFinish,
  children,
  ...rawProps
}: FormWidgetProps) {
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance>(userForm || form);

  // 初始化给一个默认的 form
  useImperativeHandle(propsFormRef, () => formRef.current, []);

  const handleFinish = throttle(
    (values: any) => {
      onFinish?.(values);
    },
    300,
    { trailing: false },
  );

  const handleValuesChange = (changedValues: Record<string, any>) => {
    if (!clearRules || !clearRules.length) return;

    const fieldNames = Object.keys(changedValues);

    const rules = clearRules.filter(({ changedName }: ClearRule) => {
      if (isArray(changedName)) return changedName?.some((name) => fieldNames.includes(name));

      return fieldNames.includes(changedName);
    });

    if (!rules?.length) return;

    rules.forEach(({ clearedName }) => {
      if (isString(clearedName) && formRef.current.getFieldValue(clearedName) !== undefined) {
        formRef.current.setFieldsValue({ [clearedName]: undefined });
        return;
      }

      if (isArray(clearedName)) {
        clearedName?.forEach((name: string) => {
          if (formRef.current.getFieldValue(name) === undefined) return;

          formRef.current.setFieldsValue({ [name]: undefined });
        });
      }
    });
  };

  return (
    <Form
      form={userForm || form}
      layout="horizontal"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}
      {...rawProps}
    >
      {items && <FormTool items={items} {...formToolProps} />}
      {children}
    </Form>
  );
}

export default FormWidget;
