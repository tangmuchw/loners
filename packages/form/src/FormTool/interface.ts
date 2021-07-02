import type { ReactNode } from 'react';
import type { ColProps } from 'antd/lib/grid/col';
import type { FormInstance } from 'antd/lib/form';
import type { RowProps } from 'antd/lib/row';
import type { SwitchProps } from 'antd/lib/switch';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import type { RadioGroupProps } from 'antd/lib/radio/interface';
import type { CommonSelectGoProps } from '../SelectGo';
import type { RangePickerGoProps } from '../RangePickerGo';
import type { InputGoProps } from '../InputGo';
import type { TextAreaGoProps } from '../TextareaGo';
import type { InputNumberGoProps } from '../InputNumberGo';
import type { InputLoadingGoProps } from '../InputLoadingGo';

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

export type ExtraTool = RadioGroupProps & SwitchProps;

export type RadioTool = RadioGroupProps;

export type FieldProps = InputTool | SelectTool | ExtraTool | RangePickerTool;

export interface FormToolItem extends FormItemProps<any> {
  type?: FormItemType;

  show?: ShowFunc;

  disabled?: (action?: FormToolAction) => boolean;

  fieldProps?: FieldProps;

  colProps?: ColProps;

  /** 仅 type = Customize 生效 */
  renderFormItem?: (fm: FormInstance, action?: FormToolAction) => ReactNode;

  /** 仅 type = Customize 生效 */
  render?: (fm: FormInstance, action?: FormToolAction) => ReactNode;

  /** 单独配置将 urlParams 同步到 query request */
  syncToQuery?: boolean | SyncToQueryFunc;
}

export interface FormToolProps extends RowProps {
  items?: FormToolItem[];

  className?: string;

  action?: FormToolAction;

  children?: ReactNode;
}
