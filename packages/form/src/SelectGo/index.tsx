import React from 'react';
import { Select, Tooltip } from 'antd';
import cx from 'classnames';
import QA from '../QA';
import Multi from './Multi';
import { WIDTH_SIZE_ENUM } from '../constants';
import { fromValueEnum } from './utils';
import type { ShowQA } from '../interface';
import type { SelectValue, SelectProps } from 'antd/lib/select';
import type { AbstractTooltipProps } from 'antd/lib/tooltip';
import styles from '../index.less';

const { Option } = Select;

type ValueEnum = Record<string, string | number>;

export interface SelectGoProps extends Omit<SelectProps<SelectValue>, 'children'> {
  valueEnum?: ValueEnum;

  /** 是否显示 QA, 默认 false */
  showQA?: ShowQA;

  /** 是否开启文字提示, 默认 false */
  tooltip?: boolean | AbstractTooltipProps;

  /** 按照标准固定宽度，默认 false */
  fixedWidth?: boolean;
}

export interface CommonSelectGoProps extends SelectGoProps {
  addedDefaultOption?: boolean;
}

const SelectGo: React.FC<SelectGoProps> = (props) => {
  const {
    mode,
    showQA,
    fixedWidth = false,
    tooltip = false,
    style,
    valueEnum,
    options,
    allowClear = true,
    placeholder = '请选择',
    ...rawProps
  } = props;
  const ownStyle = fixedWidth ? { minWidth: WIDTH_SIZE_ENUM.s } : style;

  const opts: SelectGoProps['options'] = valueEnum ? fromValueEnum(valueEnum) : options;

  const ownProps = {
    placeholder,
    allowClear,
    optionFilterProp: 'label',
    style: ownStyle,
    ...rawProps,
  };

  const competent = tooltip ? (
    <Select
      mode={mode}
      filterOption={(inputValue, option) => option?.children?.props?.title?.includes(inputValue)}
      {...ownProps}
    >
      {opts?.map(({ label, value }) => {
        return (
          <Option key={value} value={value}>
            <Tooltip title={label} placement="left" {...tooltip}>
              <div className="text-ellipsis">{label}</div>
            </Tooltip>
          </Option>
        );
      })}
    </Select>
  ) : (
    <Select mode={mode} options={opts} {...ownProps} />
  );

  return (
    <div className={cx(styles.box, { [styles.mgR]: showQA && fixedWidth })}>
      {mode === 'multiple' ? <Multi options={opts} tooltip={tooltip} {...ownProps} /> : competent}
      {showQA && (
        <QA className={styles.qa} title={typeof showQA === 'boolean' ? '' : showQA.title} />
      )}
    </div>
  );
};

export default SelectGo;
