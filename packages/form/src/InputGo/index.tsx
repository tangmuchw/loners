import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import QA from '../QA';
import { WIDTH_SIZE_ENUM, FORM_ITEM_CLASS_NAME } from '../constants';
import type { InputProps } from 'antd/lib/input/Input';
import type { ShowQA } from '../interface';
import '../index.less';

export interface InputGoProps extends InputProps {
  fixedWidth?: boolean;

  /** 是否显示 QA, 默认 false */
  showQA?: ShowQA;
}

const InputGo: React.FC<InputGoProps> = (props) => {
  const { fixedWidth = false, style, placeholder = '请输入', showQA, ...rawProps } = props;
  const ownStyle = fixedWidth ? { maxWidth: WIDTH_SIZE_ENUM.s } : style;

  const formItemClassName = FORM_ITEM_CLASS_NAME;

  return (
    <div
      className={cx(`${formItemClassName}-box`, {
        [`${formItemClassName}-mg-r`]: showQA && fixedWidth,
      })}
    >
      <Input placeholder={placeholder} style={ownStyle} {...rawProps} />
      {showQA && (
        <QA
          className={`${formItemClassName}-qa`}
          title={typeof showQA === 'boolean' ? '' : showQA.title}
        />
      )}
    </div>
  );
};

export default InputGo;
