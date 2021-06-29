import type { MutableRefObject } from 'react';
import type { FormInstance, FormProps } from 'antd/lib/form';
import type { FormToolProps } from '../FormTool/interface';

export interface ClearRule {
  /** 监听值发生变化的字段 */
  changedName: string | string[];

  /** 被清空值的字段集合，默认清空规则: 值重置为 undefined */
  clearedName: string | string[];
}

export interface FormWidgetProps extends FormProps<any> {
  form?: FormInstance;
  formRef?: MutableRefObject<FormInstance<any>>;
  clearRules?: ClearRule[];
  items?: FormToolProps['items'];
  formToolProps?: Omit<FormToolProps, 'items'>;
}
