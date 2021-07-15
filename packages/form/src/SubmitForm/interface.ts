import type { FormWidgetProps } from '../FormWidget/interface';
import type { FormToolProps, ShowFunc } from '../FormTool/interface';
import type { TextToolProps } from '../TextTool/interface';
import type { ReactNode } from 'react';
import type { FormItemProps } from 'antd/lib/form/FormItem';

export type FormGroup = {
  /** 一个 FormGroup 的标题，例如：基础设置 */
  title?: ReactNode;

  /** 多个 FormItem 的配置 */
  items: FormToolProps['items'] | TextToolProps['items'];

  /** Show 与 shouldUpdate 需同时配置使用 */
  show?: ShowFunc;

  shouldUpdate?: FormItemProps<any>['shouldUpdate'];
};

export interface SubmitFormProps extends Omit<FormWidgetProps, 'form'> {
  action: FormToolProps['action'];

  groups: FormGroup[];

  footerRender?: React.ReactNode;
}
