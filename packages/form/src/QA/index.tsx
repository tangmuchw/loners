/** 问号提示圆形按钮 */
import React from 'react';
import { QuestionCircleFilled } from '@ant-design/icons';
import cx from 'classnames';
import { Tooltip } from 'antd';
import { FORM_ITEM_CLASS_NAME } from '../constants';
import type { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import './index.less';

const QA = ({ title, className }: TooltipPropsWithTitle) => {
  return (
    <div className={cx(`${FORM_ITEM_CLASS_NAME}-qa`, className)}>
      <Tooltip title={title}>
        <QuestionCircleFilled />
      </Tooltip>
    </div>
  );
};

export default QA;
