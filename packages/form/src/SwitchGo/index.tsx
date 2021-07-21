import React from 'react';
import { Switch } from 'antd';
import cx from 'classnames';
import QA from '../QA';
import { FORM_ITEM_CLASS_NAME } from '../constants';
import type { ShowQA } from '../interface';
import type { SwitchProps } from 'antd/lib/switch';
import '../index.less';

export interface SwitchGoProps extends SwitchProps {
  showQA?: ShowQA;
}

const SwitchGo: React.FC<SwitchGoProps> = (props) => {
  const formItemClassName = FORM_ITEM_CLASS_NAME;

  const { showQA, ...rawProps } = props;

  return (
    <div className={cx(`${formItemClassName}-box`, { [`${formItemClassName}-mg-r`]: showQA })}>
      <Switch {...rawProps} />
      {showQA && (
        <QA
          className={cx(`${formItemClassName}-qa`, `${formItemClassName}-textarea-qa`)}
          title={typeof showQA === 'boolean' ? '' : showQA.title}
        />
      )}
    </div>
  );
};

export default SwitchGo;
