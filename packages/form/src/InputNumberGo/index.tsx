import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd/lib/input-number';
import { WIDTH_SIZE_ENUM } from '../constants';

export interface InputNumberGoProps extends InputNumberProps {
  fixedWidth?: boolean;
}

const InputNumberGo: React.FC<InputNumberGoProps> = (props) => {
  const { fixedWidth = false, style, placeholder = '请输入', ...rawProps } = props;
  const ownStyle = fixedWidth ? { width: WIDTH_SIZE_ENUM.s } : style;

  return <InputNumber placeholder={placeholder} style={ownStyle} {...rawProps} />;
};

export default InputNumberGo;
