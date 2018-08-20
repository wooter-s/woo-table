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
import moment from 'moment';
import {
	Table,
	inputFormItem,
    selectFormItem,
} from 'woo-table';
import {Badges} from '../../components';
import {

} from '../../components/woo-table';
import {dateSelectFormItem} from "../../components/woo-table/form/formItemConfig";
import {INPUT_TYPES} from "../../components/woo-table/form";
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
    const fetchData = ({keyword, page, size, searchParams}) => {
        // 每次函数
    };
    const renderOperate = () => (
        <Button
            icon="download"
            type={'primary'}
            onClick={async () => {
                // 触发点击事件
            }}
            style={{marginBottom: 16}}>导出</Button>
    );
    return (
        <QueueAnim>
            <div key='title' className='fontPageTitle'>进件管理</div>
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
                    operationEdit={() => {
                    }}
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

![](https://raw.githubusercontent.com/wooter-s/images/master/woo-table/WX20180820-165225.png)