import type { ReactNode } from 'react';
import type { FormToolItem, FormItemType } from '../FormTool/interface';
import type { FormInstance } from 'antd';
import type { DescriptionsProps } from 'antd/lib/descriptions';

export type TextToolType = FormItemType;

export interface TextToolItem extends FormToolItem {
  renderText?: (text: any, record: any, fm: FormInstance) => ReactNode;
}

export interface TextToolProps extends DescriptionsProps {
  items?: TextToolItem[];

  className?: string;

  children?: ReactNode;
}
