import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import type { RangePickerProps as BaseRangePickerProps } from 'antd/lib/date-picker/generatePicker';
import type { Moment } from 'moment';
import 'moment/locale/zh-cn';

const { RangePicker } = DatePicker;

export type RangePickerGoProps = BaseRangePickerProps<Moment>;

const RangePickerGo: React.FC<RangePickerGoProps> = (props) => {
  const { style, ...rawProps } = props;
  return (
    <RangePicker
      style={style}
      placeholder={['开始时间', '结束时间']}
      ranges={{
        今天: [moment().startOf('day'), moment().endOf('day')],
        当月: [moment().startOf('month'), moment().endOf('month')],
        '3日': [moment().subtract(2, 'day').startOf('day'), moment().endOf('day')],
        '7日': [moment().subtract(6, 'day').startOf('day'), moment().endOf('day')],
        '15日': [moment().subtract(14, 'day').startOf('day'), moment().endOf('day')],
        '30日': [moment().subtract(29, 'day').startOf('day'), moment().endOf('day')],
      }}
      {...rawProps}
    />
  );
};

export default RangePickerGo;
