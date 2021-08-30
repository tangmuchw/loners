[toc]

## FormTool

> FormItem 的配置化工具

## FormWidget

> 可传入 items 到达表单配置化，类似 table 的 columns

- 新增 clearRules，表单项里的各项可以根据指定清除规则来达到清空 value 的功能

## SubmitForm

> 提交表单，底部默认配置「返回」与「提交」按钮

## 常用的 items 配置

> 详见 [FormToolItem Interface](./FormTool/interface.ts)

```JavaScript
 const items = [
     {
         type: 'InputText',
         label: '姓名',
         name: 'name',
     },
     {
         type: 'RadioGroup',
         label: '性别',
         name: 'sex',
         fieldProps: {
             options: [
                 {
                     label: '男',
                     value: 'man',
                 },
                 {
                     label: '女',
                     value: 'woman'
                 }
             ],
         },
     },
     {
         type: 'SimpleSelect',
         label: '喜欢的动物',
         name: 'favorite_animals',
          fieldProps: {
             options: [
                 {
                     label: '胖猫咪',
                     value: 'fat_cat',
                 },
                 {
                     label: '柯基',
                     value: 'corgi'
                 }
             ],
         },
     },
 ]

```
