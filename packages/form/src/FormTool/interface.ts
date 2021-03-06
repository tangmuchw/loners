import type { ReactNode } from 'react';
import type { ColProps } from 'antd/lib/grid/col';
import type { FormInstance } from 'antd/lib/form';
import type { RowProps } from 'antd/lib/row';

import type { FormItemProps } from 'antd/lib/form/FormItem';
import type { RadioGroupProps } from 'antd/lib/radio/interface';
import type { CommonSelectGoProps } from '../SelectGo';
import type { RangePickerGoProps } from '../RangePickerGo';
import type { InputGoProps } from '../InputGo';
import type { TextAreaGoProps } from '../TextareaGo';
import type { InputNumberGoProps } from '../InputNumberGo';
import type { InputLoadingGoProps } from '../InputLoadingGo';
import type { SwitchGoProps } from '../SwitchGo';
import type { ShowQA } from '../interface';

export type FormToolAction = 'edit' | 'add' | 'readonly';

export type ShowFunc = (fm: FormInstance, action?: FormToolAction) => boolean;

export type FormItemType =
  | 'InputText'
  | 'SimpleSelect'
  | 'RadioGroup'
  | 'RangePicker'
  | 'InputNumber'
  | 'Switch'
  | 'InputLoading'
  | 'Textarea'
  | 'Customize'
  | string
  | undefined;

export type SyncToQueryFunc = (
  queryValue: string | number,
  urlParams: Record<string, string | number>,
) => any;

export type SelectTool = CommonSelectGoProps;

export type InputTool = InputGoProps & InputNumberGoProps & InputLoadingGoProps & TextAreaGoProps;

export type RangePickerTool = RangePickerGoProps;

export type ExtraTool = RadioGroupProps & SwitchGoProps;

export type RadioTool = RadioGroupProps;

export type FieldProps = { showQA?: ShowQA } & (
  | InputTool
  | SelectTool
  | ExtraTool
  | RangePickerTool
);

export type RenderFormItemProps = FormItemProps<any>;

export interface FormToolItem extends FormItemProps<any> {
  type?: FormItemType;

  show?: ShowFunc;

  disabled?: (action?: FormToolAction) => boolean;

  fieldProps?: FieldProps;

  colProps?: ColProps;

  /** ไป type = Customize ็ๆ */
  renderFormItem?: (
    fm: FormInstance,
    action?: FormToolAction,
    fieldProps?: { disabled: boolean; [key: string]: any },
  ) => ReactNode;

  /** ไป type = Customize ็ๆ */
  render?: (
    fm: FormInstance,
    action?: FormToolAction,
    formItemProps?: RenderFormItemProps,
  ) => ReactNode;

  renderText?: (text: any, record: any, fm: FormInstance) => ReactNode;

  /** ๅ็ฌ้็ฝฎๅฐ urlParams ๅๆญฅๅฐ query request */
  syncToQuery?: boolean | SyncToQueryFunc;
}

export interface FormToolProps extends RowProps {
  items?: FormToolItem[];

  className?: string;

  action?: FormToolAction;

  children?: ReactNode;
}
