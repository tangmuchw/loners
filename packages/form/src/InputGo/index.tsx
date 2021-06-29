import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd/lib/input/Input';
import { WIDTH_SIZE_ENUM } from '../constants';

export interface InputGoProps extends InputProps {
  fixedWidth?: boolean;
}

const InputGo: React.FC<InputGoProps> = (props) => {
  const { fixedWidth = false, style, placeholder = '请输入', ...rawProps } = props;
  const ownStyle = fixedWidth ? { width: WIDTH_SIZE_ENUM.s } : style;

  return <Input placeholder={placeholder} style={ownStyle} {...rawProps} />;
};

export default InputGo;
