/** 提交表单-编辑/新增/只读 */
import React from 'react';
import { Form, Card, Button, Space } from 'antd';
import { useHistory } from 'umi';
import cx from 'classnames';
import { throttle } from 'lodash';
import FormWidget from '../FormWidget';
import FormTool from '../FormTool';
import { FORM_WIDGET_LAYOUT, FORM_ITEM_LAYOUT, SUBMIT_FORM_CLASS_NAME } from './constants';
import type { FormInstance } from 'antd';
import type { SubmitFormProps, FormGroup } from './interface';
import './index.less';

const { Item: FormItem } = Form;

function SubmitForm({
  className,
  action,
  groups,
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

  const submitFormClassName = SUBMIT_FORM_CLASS_NAME;
  const isReadonly = action && action === 'readonly';

  return (
    <Card className={cx(submitFormClassName, className)}>
      <FormWidget form={form} onFinish={handleFinish} {...FORM_WIDGET_LAYOUT} {...rawProps}>
        {groups &&
          groups.map((grp: FormGroup, idx) => {
            const { title, items, show } = grp;
            const key = `${title}_${idx}`;

            if (show) {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <FormItem noStyle shouldUpdate={grp?.shouldUpdate} key={key}>
                  {(fm: FormInstance) => {
                    const visible = show(fm, action);

                    if (!visible) return null;

                    return (
                      <div>
                        {title && <div className={`${submitFormClassName}-title`}>{title}</div>}
                        <FormTool action={action} items={items} />
                      </div>
                    );
                  }}
                </FormItem>
              );
            }

            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={key}>
                {title && <div className={`${submitFormClassName}-title`}>{title}</div>}
                <FormTool action={action} items={items} />
              </div>
            );
          })}
        {footerRender ?? (
          <Form.Item {...FORM_ITEM_LAYOUT} className={`${submitFormClassName}-footer`}>
            <Space>
              <Button htmlType="button" onClick={onCancel}>
                返回
              </Button>
              {!isReadonly && (
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              )}
            </Space>
          </Form.Item>
        )}
      </FormWidget>
    </Card>
  );
}

export default SubmitForm;
