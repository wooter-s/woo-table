# woo-table

​	这是一个高度封装的Table、Form和Modal组件；在实际项目里,主要是将增删改查的逻辑整合到一起，表单的状态控制全部交给组件来处理配，置按钮和对应的接口即可，不需要再处理组件的状态；

### 安装使用

`npm i woo-table`



### example

```
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import QueueAnim from 'rc-queue-anim';
import { Button, Tag } from 'antd';
import {
    Table,
    inputFormItem,
    selectFormItem,
} from 'woo-table';
import { dateSelectFormItem } from 'woo-table/build/component/form/formItemConfig';
import { INPUT_TYPES } from 'woo-table/build/component/form';
import { getModalInstance } from "woo-table/build/component/modalConfig";
import moment from 'moment';
import {downFile} from '../../utils';
import {Badges} from '../../components';
import {exportApplyExcel} from "../../services/apply";
import {APPLY_TYPE_DICT, AUDIT_STATUS_DICT, getDictLabel} from "../../constants/dict";

const workFlow = ({
    dispatch,
    apply,
}) => {
    const columns = [
        {
            title: '客户号',
            key: 'user_id',
            dataIndex: 'user_id',
        }, {
            title: '手机号码',
            key: 'mobile',
            dataIndex: 'mobile',
        },
        {
            title: '姓名',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: '身份证号',
            key: 'id_card',
            dataIndex: 'id_card',
        },
        {
            title: '申请类型',
            key: 'apply_type',
            dataIndex: 'apply_type',
            render: (text) => {
                const target = APPLY_TYPE_DICT.find((item) => item.key === text);
                if (target && target.color && target.label) {
                    return (
                        <Tag color={target.color}>
                            {target.label}
                        </Tag>
                    );
                }
            },
            filters: APPLY_TYPE_DICT.map((item) => ({
                text: item.label,
                value: item.key,
            })),
        }, {
            title: '信审状态',
            key: 'audit_result',
            dataIndex: 'audit_result',
            render: (text) => (
                <Badges status={text} text={getDictLabel(text, AUDIT_STATUS_DICT)} />
            ),
            filters: AUDIT_STATUS_DICT.map((item) => ({
                text: item.label,
                value: item.key,
            })),
        }, {
            title: '信审申请时间',
            key: 'audit_apply_time',
            dataIndex: 'audit_apply_time',
            render: (time) => time && moment(time).format('YYYY/MM/DD HH:MM:SS'),
        }, {
            title: '信审结果时间',
            key: 'audit_end_time',
            dataIndex: 'audit_end_time',
            render: (time) => time && moment(time).format('YYYY/MM/DD HH:MM:SS'),
        }, {
            title: '额度值',
            key: 'limit',
            dataIndex: 'limit',
        }, {
            title: '模型分数',
            key: 'model_score',
            dataIndex: 'model_score',
        },
        {
            title: '渠道',
            key: 'channel',
            dataIndex: 'channel',
        },
    ];
    const { fetchParams, channel } = apply;
    const fetchData = ({keyword, page, size, searchParams}) => {
        dispatch({
            type: 'apply/getApply',
            payload: {
                mobile: keyword,
                page,
                size,
                ...searchParams,
                apply_type: searchParams.apply_type && searchParams.apply_type.join(','),
                audit_result: searchParams.audit_result && searchParams.audit_result.join(','),
                applyStartTime: searchParams.audit_apply_time && searchParams.audit_apply_time[0] && searchParams.audit_apply_time[0].format('YYYY-MM-DD'),
                applyEndTime: searchParams.audit_apply_time && searchParams.audit_apply_time[1] && searchParams.audit_apply_time[1].format('YYYY-MM-DD'),
                audit_apply_time: '',
            },
        });
    };
    const renderOperate = () => (
        <Button
            icon="download"
            type={'primary'}
            onClick={async () => {
                const result = await exportApplyExcel(fetchParams);
                if (result && result.success) {
                    downFile(result.data, result.filename);
                }
            }}
            style={{marginBottom: 16}}>导出</Button>
    );
    const getLabel = (record) => {
        return [
            {
                label: 'label',
                key: 'modalKey',
            },
        ];
    };
    const getOperationEdit = () => {
        return [
            getModalInstance({
                key: 'modalKey',
                onOk: (dataSource, value) => new Promise((resolve, reject) => {
                    console.log('onOk', dataSource, value);
                }),
                formColumns: [
                    inputFormItem({
                        key: 'mobile',
                        title: '模态文本',
                    }),
                ],
            }),
        ];
    };
    return (
        <QueueAnim>
            <div key='title' className='fontPageTitle'>进件管理</div>
            <img src={require('../../assets/icon_apply.png')} style={{height: 16, width: 16}}/>
            <div style={{backgroundColor:'white', padding: 24}}>
                <Table
                    filter={[
                        inputFormItem({key: 'user_id', title: '客户号', rules:[]}),
                        inputFormItem({key: 'mobile', title: '手机号码', rules:[]}),
                        selectFormItem({key: 'channel', title: '渠道', rules:[], dict: channel.map((item) => ({key: item, label: item})), allowClear: true}),
                        dateSelectFormItem({key: 'audit_apply_time', title: '申请时间', rules:[]}),
                        {
                            type: INPUT_TYPES.PLACEHOLDER,
                        },
                    ]}
                    filterOperate={renderOperate}
                    filterCol={3}
                    scroll={{x: 1500}}
                    columns={columns}
                    fetchData={fetchData}
                    data={apply.dataSource}
                    operationEdit={getOperationEdit()}
                    operationEditLabel={(record) => getLabel(record)}
                />
            </div>
        </QueueAnim>
    );
};

workFlow.propTypes = {
    workFlow: PropTypes.object,
    loading: PropTypes.object,
    dispatch: PropTypes.func,
};

export default connect(({apply, loading}) => ({apply, loading}))(workFlow);

```



![](https://raw.githubusercontent.com/wooter-s/images/master/woo-table/labelEdit.png)

![](https://raw.githubusercontent.com/wooter-s/images/master/woo-table/interactModal.png)

### 参数



| 参数               | 说明                                                         | 引用位置 | 类型                                 |
| :----------------- | ------------------------------------------------------------ | -------- | ------------------------------------ |
| filter             | 表单上不的过滤条件组件（客户号...申请时间等）                |          | array[formItem]                      |
| filterOperate      | 表单和过滤组件之前的操作组件（导出）                         |          | array[{key, ReactElement}]           |
| scroll             | 同antd组件中的table                                          |          |                                      |
| filterCol          | filter样式，排3列或2列                                       |          | 2\|3                                 |
| columns            | 同antd组件中的table                                          |          |                                      |
| fetchData          | 获取数据函数，在组件第一次加载时会默认回调一次。以后每次点击查询、改变表单columns中的搜索条件、改变页码，都会回调该函数。<br /> |          | function({page, size, searchParams}) |
|                    | page:页码；size:每页条数，searchParams根据filter和columns的的filters中所有设置的参数回调 |          |                                      |
| data               |                                                              |          | object: {dataSource, total}          |
|                    | dataSource: 同antd组件中的table;total:页码总数               |          |                                      |
| operationEdit      | 详情见operationEdit说明                                      |          |                                      |
| operationEditLabel | 操作栏展示的按钮；key标识，必须能和比配到operationEditItem中的key；lable展示文本 |          | (record) =>[{key, label}]            |
|                    |                                                              |          |                                      |
|                    |                                                              |          |                                      |
|                    |                                                              |          |                                      |



#### operationEdit说明

**getModalInstance 在 woo-table/build/component/modalConfig中引用**

输入array[modalInstance]，下面说明modalInstance;

modalInstance = getModalInstance();

##### getModalInstance说明

| 参数             | 说明                                                         | 类型                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------- |
| key              | 必须有，而且需要operationEditLabel中能找到对应的key          | string                                |
| label            | 操作按钮展示文本                                             | object                                |
| interactionType  | 点击按钮时的交互方式                                         | MODAL\|FETCH                          |
| okText           | 交互为MODAL时，弹框确认按钮文本                              |                                       |
| cancelText       | 交互为MODAL时，弹框取消按钮文本                              |                                       |
| getDataWhenClick | 交互为MODAL时，点击按钮后触发的函数，函数带有该列的数据（record） | function(record)                      |
| onOk             | 交互为MODAL时，点击确认按钮后触发的函数，函数带有该列的数据和modal展示的数据（dataSource， value）;<br />**该函数必须返回Promise对象，当有resolve时弹框才会消失，reject时弹框不消失** | (dataSource, value) = > new Promise() |
| onCancel         | 同onOk                                                       |                                       |
| formColumns      | 交互为MODAL时，弹框展示的内容（和Form二选一）                | array[formItemt]                      |
| Form             | 交互为MODAL时，弹框展示的内容（和formColumns二选一）         | Form                                  |
| notRefresh       | onOk成功resolve后是否不触发fetchData                         | boolean                               |

#### formItem

| 参数         | 说明                                                         |                    |
| ------------ | ------------------------------------------------------------ | ------------------ |
| key          | 会作为fetchData回调的key                                     |                    |
| title        | 在formItem的展示文本                                         |                    |
| type         | 类型INPUT_TYPES（BUTTON: 'BUTTON', // 按钮 TEXT: 'TEXT', // 仅展示 INPUT_AREA: 'TEXT_AREA', // 大量输入 INPUT: 'INPUT', // 输入 SELECT: 'SELECT', // 选择 DATE_SELECT: 'DATE_SELECT', // 日期选择 PLACEHOLDER: 'PLACEHOLDER', // 占位 CASCADER: 'CASCADER', // 级联选择(省市区) NUMBER: 'NUMBER',   // 数字 IMAGE: 'IMAGE', IMAGE_SELECTOR: 'IMAGE_SELECTOR',） | form/index.js      |
| disabled     | 是否可用                                                     |                    |
| underControl | 是否受控，指定另外一个formItem的key，如果他的值为设定的value时才渲染 | array[{key,value}] |
| placeholder  |                                                              |                    |
| rules        | 通antd 中form的校验规则                                      |                    |
|              |                                                              |                    |

