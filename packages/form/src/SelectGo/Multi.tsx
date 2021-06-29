import React, { useMemo, useState } from 'react';
import { Select, Tooltip } from 'antd';
import type { SelectGoProps } from './index';

const { Option } = Select;

export type MultiProps = SelectGoProps;

const Multi: React.FC<MultiProps> = (props) => {
  const { mode, tooltip = false, valueEnum, options = [], onChange, ...rawProps } = props;
  const [value, setValue] = useState<any[]>([]);

  const dependency = JSON.stringify(options);

  const opts = useMemo(
    () => (options?.length > 0 ? [{ label: '全选', value: -99 }, ...options] : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dependency],
  );

  const selectedAll: any[] = useMemo(
    () => options?.map(({ value: val }) => val) || [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dependency],
  );

  const handleChange = (val: any, option: any) => {
    // 取消全选
    if (val?.length === opts.length) {
      setValue([]);
      onChange?.([], option);
      return;
    }

    // 全选
    if (val.includes(-99)) {
      setValue(selectedAll);
      onChange?.(selectedAll, option);
      return;
    }

    setValue(val);
    onChange?.(val, option);
  };

  return (
    <>
      {tooltip ? (
        <Select
          mode="multiple"
          filterOption={(inputValue, option) =>
            option?.children?.props?.title?.includes(inputValue)
          }
          value={value}
          onChange={handleChange}
          {...rawProps}
        >
          {opts?.map(({ label, value: val }) => {
            return (
              <Option key={val} value={val}>
                <Tooltip title={label} placement="left" {...tooltip}>
                  <div className="text-ellipsis">{label}</div>
                </Tooltip>
              </Option>
            );
          })}
        </Select>
      ) : (
        <Select
          mode="multiple"
          value={value}
          options={opts}
          onChange={handleChange}
          {...rawProps}
        />
      )}
    </>
  );
};

export default Multi;
