/** 问号提示圆形按钮 */
import React from 'react';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import type { TooltipPropsWithTitle } from 'antd/lib/tooltip';
import './index.less';

const QA = ({ title, className }: TooltipPropsWithTitle) => {
  return (
    <div className={className}>
      <Tooltip title={title}>
        <QuestionCircleFilled />
      </Tooltip>
    </div>
  );
};

export default QA;
