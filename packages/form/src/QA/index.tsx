/** 问号提示圆形按钮 */
import React from 'react';
import { QuestionCircleFilled } from '@ant-design/icons';
import cx from 'classnames';
import { Tooltip } from 'antd';
import type { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import styles from './index.less';

const QA = ({ title, className }: TooltipPropsWithTitle) => {
  return (
    <div className={cx(styles.qa, className)}>
      <Tooltip title={title}>
        <QuestionCircleFilled />
      </Tooltip>
    </div>
  );
};

export default QA;
