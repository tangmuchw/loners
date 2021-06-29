/** 提交面板-编辑/新增/只读 */
import React from 'react';
import { Form, Card, Button, Space } from 'antd';
import { useHistory } from 'umi';
import cx from 'classnames';
import { throttle } from 'lodash';
import FormWidget from '../FormWidget';
import FormTool from '../FormTool';

import type { SubmitFormProps } from './interface';
import { FORM_WIDGET_LAYOUT, FORM_ITEM_LAYOUT } from './constants';
import styles from './index.less';

function SubmitForm({
  className,
  action,
  groups,
  initialValues,
  footerRender,
  onFinish,
  ...rawProps
}: SubmitFormProps) {
  const hsy = useHistory();
  const [form] = Form.useForm();

  const onCancel = () => {
    hsy.goBack();
  };

  const handleFinish = throttle(
    (values: any) => {
      onFinish?.(values);
    },
    3000,
    { trailing: false },
  );

  return (
    <Card className={cx(styles.submitWidget, className)}>
      <FormWidget
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
        {...FORM_WIDGET_LAYOUT}
        {...rawProps}
      >
        {groups &&
          groups.map((grp: any) => {
            const { title, items } = grp;

            return (
              <div key={title}>
                <div className={cx(styles.formTitle, 'loners-form-title ')}>{title} </div>
                <FormTool action={action} items={items} />
              </div>
            );
          })}
        {footerRender ?? (
          <Form.Item
            {...FORM_ITEM_LAYOUT}
            className={cx(styles.footer, 'loners-submit-panel-footer')}
          >
            <Space>
              <Button htmlType="button" onClick={onCancel}>
                返回
              </Button>
              <Button disabled={action === 'readonly'} type="primary" htmlType="submit">
                提交
              </Button>
            </Space>
          </Form.Item>
        )}
      </FormWidget>
    </Card>
  );
}

export default SubmitForm;
