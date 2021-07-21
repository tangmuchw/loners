import React from 'react';
import { Form, Radio, Switch } from 'antd';
import cx from 'classnames';
import QA from '../QA';
import RangePickerGo from '../RangePickerGo';
import InputGo from '../InputGo';
import TextareaGo from '../TextareaGo';
import InputNumberGo from '../InputNumberGo';
import InputLoadingGo from '../InputLoadingGo';
import SelectGo from '../SelectGo';
import { FORM_ITEM_CLASS_NAME } from '../constants';
import type { ReactNode } from 'react';
import type { FormItemType, FieldProps } from './interface';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import '../index.less';

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
  fieldProps?: FieldProps;
}

function FormItem({ type, fieldProps, ...rawProps }: FormToolItemProps) {
  if (!type) return <></>;

  const formItemMap = FORM_ITEM_MAP;
  const Component: any = formItemMap.get(type);

  if (!Component) return <></>;

  const formItemClassName = FORM_ITEM_CLASS_NAME;
  const { showQA, ...rawFieldProps } = fieldProps || {};

  return (
    <Form.Item
      className={cx({
        [`${formItemClassName}-box`]: showQA,
        [`${formItemClassName}-mg-r`]: showQA,
      })}
      {...rawProps}
    >
      <Component {...rawFieldProps} />
      {showQA && (
        <QA
          className={cx(`${formItemClassName}-qa`, {
            [`${formItemClassName}-textarea-qa`]: type === 'Textarea',
          })}
          title={typeof showQA === 'boolean' ? '' : showQA?.title}
        />
      )}
    </Form.Item>
  );
}

export default FormItem;
