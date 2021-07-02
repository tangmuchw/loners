import React from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import QA from '../QA';
import { WIDTH_SIZE_ENUM, FORM_ITEM_CLASS_NAME } from '../constants';
import type { ShowQA } from '../interface';
import type { TextAreaProps } from 'antd/lib/input/TextArea';
import '../index.less';

const { TextArea } = Input;

export interface TextAreaGoProps extends TextAreaProps {
  fixedWidth?: boolean;

  showQA?: ShowQA;
}

const TextareaGo: React.FC<TextAreaGoProps> = (props) => {
  const {
    fixedWidth = false,
    style,
    placeholder = '请输入',
    showCount = true,
    maxLength = 300,
    allowClear = true,
    autoSize = {
      minRows: 3,
      maxRows: 6,
    },
    showQA,
    ...rawProps
  } = props;
  const ownStyle = fixedWidth ? { width: WIDTH_SIZE_ENUM.s } : style;

  const formItemClassName = FORM_ITEM_CLASS_NAME;

  return (
    <div className={cx(`${formItemClassName}-box`, { [`${formItemClassName}-mg-r`]: showQA })}>
      <TextArea
        showCount={showCount}
        maxLength={maxLength}
        allowClear={allowClear}
        placeholder={placeholder}
        autoSize={autoSize}
        style={ownStyle}
        {...rawProps}
      />
      {showQA && (
        <QA
          className={cx(`${formItemClassName}-qa`, `${formItemClassName}-textarea-qa`)}
          title={typeof showQA === 'boolean' ? '' : showQA.title}
        />
      )}
    </div>
  );
};

export default TextareaGo;
