import React, { useState } from 'react';
import { Spin } from 'antd';
import cx from 'classnames';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'antd/lib/form';
import QA from '../QA';
import InputNumberGo from '../InputNumberGo';
import { FORM_ITEM_CLASS_NAME } from '../constants';
import type { ShowQA } from '../interface';
import type { InputNumberGoProps } from '../InputNumberGo';
import '../index.less';

type FetchFuncReturn = {
  url: string;
  data: any;
  method: 'post' | 'put' | string;
};

export interface InputLoadingGoProps extends InputNumberGoProps {
  fm?: FormInstance;
  showQA?: ShowQA;
  request?: {
    fetchFunc: (params: any) => FetchFuncReturn;
    formatResult: (resData: any) => any;
    formatParams: (params: any) => any;
    formatTips: (resData: any) => string;
    loadingText: string;
  };
}

const InputLoadingGo: React.FC<InputLoadingGoProps> = (props) => {
  const { request, fm, showQA, ...rawProps } = props;

  const [inputState, setInputState] = useState({});
  const [tips, setTips] = useState('');
  const [visibleTips, setVisibleTips] = useState(false);

  const { run, loading } = useRequest(request?.fetchFunc || { url: '' }, {
    manual: true,
    onSuccess(data) {
      const result = request?.formatResult?.(data) || data;
      const txt = request?.formatTips?.(data) || '';
      setInputState(result);
      setVisibleTips(true);
      setTips(txt);
    },
  });

  const handleFocus = (event: any) => {
    if (event?.target?.value) {
      setVisibleTips(true);
      return;
    }

    const data = fm?.getFieldsValue();
    const params = request?.formatParams?.(data) || data;
    setTips('');
    setVisibleTips(false);
    run(params);
  };

  const handleBlur = () => {
    setVisibleTips(false);
  };

  const formItemClassName = FORM_ITEM_CLASS_NAME;

  return (
    <div className={`${formItemClassName}-box`}>
      <InputNumberGo onFocus={handleFocus} onBlur={handleBlur} {...rawProps} {...inputState} />
      <div className={`${formItemClassName}-input-loading`}>
        {loading && (
          <>
            <Spin />
            <span className={`${formItemClassName}-loading-txt`}>
              {request?.loadingText || '正在查询中'}
            </span>
          </>
        )}
        {visibleTips && <span className={`${formItemClassName}-tips`}>{tips}</span>}
        {!visibleTips && !loading && showQA && (
          <QA title={typeof showQA === 'boolean' ? '' : showQA.title} />
        )}
      </div>
    </div>
  );
};

export default InputLoadingGo;
