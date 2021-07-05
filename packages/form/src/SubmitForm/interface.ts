import type { FormWidgetProps } from '../FormWidget/interface';
import type { FormToolProps, ShowFunc } from '../FormTool/interface';
import type { ReactNode } from 'react';

export type FormGroup = {
  /** 一个 FormGroup 的标题，例如：基础设置 */
  title?: ReactNode;

  /** 多个 FormItem 的配置 */
  items: FormToolProps['items'];

  show?: ShowFunc;
};

export interface SubmitFormProps extends Omit<FormWidgetProps, 'form'> {
  action: FormToolProps['action'];

  groups: FormGroup[];

  footerRender?: React.ReactNode;
}
