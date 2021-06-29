import { readdirSync } from 'fs';
import chalk from 'chalk';
import { join } from 'path';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
  pre[`@loners/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
  .map((path) => [join('packages', path, 'src'), join('packages', path, 'src', 'components')])
  .reduce((acc, val) => acc.concat(val), []);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  title: 'ProComponents',
  mode: 'site',
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  metas: [
    {
      property: 'og:site_name',
      content: 'ProComponents',
    },
    {
      'data-rh': 'keywords',
      property: 'og:image',
      content: 'https://procomponents.ant.design/icon.png',
    },
    {
      property: 'og:description',
      content: '🏆 Use Ant Design like a Pro!',
    },
    {
      name: 'keywords',
      content: '中后台,admin,Ant Design,ant design,Table,react,alibaba',
    },
    {
      name: 'description',
      content: '🏆 Use Ant Design like a Pro! 包含 table form 等多个组件。',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style"',
      content: 'black-translucent',
    },
  ],
  alias,
  // 用于切换 antd 暗黑模式
  // antd: {
  //   dark: true,
  // },
  resolve: {
    includes: [...tailPkgList, 'docs'],
  },
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  navs: {
    'en-US': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
    'zh-CN': [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/ant-design/pro-components',
      },
    ],
  },
  analytics: isProduction
    ? {
        ga: 'UA-173569162-1',
      }
    : false,
  hash: true,
  ssr: {
    devServerRender: false,
  },
  exportStatic: {},
  targets: {
    chrome: 80,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  theme: {
    '@s-site-menu-width': '258px',
  },
  links:
    process.env.NODE_ENV === 'development'
      ? ['https://gw.alipayobjects.com/os/lib/antd/4.6.6/dist/antd.css']
      : [],
  menus: {
    '/components': [
      {
        title: '架构设计',
        children: ['components.md'],
      },
      {
        title: '布局',
        children: [
          'layout',
          'PageContainer/index',
          'card',
          'WaterMark/index',
          'StatisticCard/index',
        ],
      },
      {
        title: '数据录入',
        children: [
          'form',
          'FieldSet/index',
          'Group/index',
          'QueryFilter/index',
          'StepsForm/index',
          'ModalForm/index',
        ],
      },
      {
        title: '数据展示',
        children: ['table', 'EditableTable/index', 'list', 'description'],
      },
      {
        title: '通用',
        children: ['skeleton', 'field'],
      },
    ],
    '/en-US/components': [
      {
        title: 'Architecture Design',
        children: ['components.en-US.md'],
      },
      {
        title: 'Layout',
        children: ['layout', 'PageContainer/index', 'card'],
      },
      {
        title: 'Data entry',
        children: [
          'form',
          'FieldSet/index',
          'Group/index',
          'QueryFilter/index',
          'StepsForm/index',
          'ModalForm/index',
        ],
      },
      {
        title: 'Data Display',
        children: ['table', 'EditableTable/index', 'list', 'description'],
      },
      {
        title: 'General',
        children: ['skeleton', 'field'],
      },
    ],
  },
  webpack5: {},
};
