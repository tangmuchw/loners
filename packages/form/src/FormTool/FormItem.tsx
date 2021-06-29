import React from 'react';
import { Form, Radio, Switch } from 'antd';
import RangePickerGo from '../RangePickerGo';
import InputGo from '../InputGo';
import TextareaGo from '../TextareaGo';
import InputNumberGo from '../InputNumberGo';
import InputLoadingGo from '../InputLoadingGo';
import SelectGo from '../SelectGo';
import type { ReactNode } from 'react';
import type { FormItemType } from './interface';
import type { FormItemProps } from 'antd/lib/form/FormItem';

const FORM_ITEM_MAP = new Map<string, ReactNode>([
  ['InputText', InputGo],
  ['Textarea', TextareaGo],
  ['InputNumber', InputNumberGo],
  ['InputLoading', InputLoadingGo],
  ['SimpleSelect', SelectGo],
  ['Switch', Switch],
  ['RadioGroup', Radio.Group],
  ['RangePicker', RangePickerGo],
]);

interface FormToolItemProps extends FormItemProps {
  type: FormItemType;
  fieldProps: any;
}

function FormItem({ type, fieldProps, ...rawProps }: FormToolItemProps) {
  if (!type) return <></>;

  const formItemMap = FORM_ITEM_MAP;
  const Component: any = formItemMap.get(type);

  if (!Component) return <></>;

  return (
    <Form.Item {...rawProps}>
      <Component {...fieldProps} />
    </Form.Item>
  );
}

export default FormItem;
