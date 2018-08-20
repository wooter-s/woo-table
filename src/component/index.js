import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Spin,
    Button,
    Icon,
    Input,
    message,
    Modal as ComfirmModal,
    // InputNumber,
} from 'antd';
// import QueueAnim from 'rc-queue-anim';
import Modal from './modal';
import BaseForm from './form';
// import styles from './index.css';
import DropOption from "./DropOption";
import {buttonFormItem} from "./form/formItemConfig";
const MESSAGE_DURATION = 2;

const Search = Input.Search;
const PAGE_SIZE = 15;
export const INTERACTION_TYPE = {
    MODAL: 'MODAL',
    FETCH: 'FETCH',
};

class SimpleTable extends React.Component {
    static PropTypes = {
        fetchData:PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
        columns: PropTypes.array.isRequired,
        operationEdit: PropTypes.func.isRequired,
        hidePagination: PropTypes.bool,
        // dataTemplate: PropTypes.object.isRequired,
        // fields: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.filter = null;
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            spinning:false,
            showSpin: false,
            modalSpinning: false,
            visible:false,
            showQrcode:false,
            editable:false,
            current:1,
            pageSize: props.pageSize || PAGE_SIZE,
            selectedRows:[],
            searchValue:null,
            searchParams:{},        // 搜索参数
            modalContent:null,
            needSave:true,
            targetOperations:{},
            operationType:'',
        };
    }

    componentDidMount() {
        this._fetchData({page:this.state.current, size:this.state.pageSize, keyword:this.state.searchValue, searchParams: this.state.searchParams});
    }

    getPagination = () => {
        if (this.props.hidePagination) {
            return false;
        } else {
            return {
                current:this.state.current,
                pageSize:this.state.pageSize,
                total:this.props.data && this.props.data.total || null,
            };
        }
    }
    render() {
        const rowSelection = {
            selectedRowKeys:this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                });
            },
        };
        return (
            <Spin tip='加载中' spinning={this.state.spinning} size='large'>
                {this.props.filter ? this.renderFilterForm() : this.renderButtonGroup()}
                {this.props.filterOperate && this.props.filterOperate()}
                {this.renderModal()}
                <Table
                    scroll={this.props.scroll}
                    pagination={this.getPagination()}
                    expandedRowRender={this.props.expandedRowRender}
                    onChange={this._onChange}
                    rowSelection={this.props.isSelected && rowSelection}
                    columns={this.getColumns()}
                    dataSource={this.props.data && this.props.data.datas && this.props.data.datas.map((item, i) => ({...item, key:i })) || null}/>
            </Spin>
        );
    }
    _onChange = (pagination, filters, sorter) => {
        const searchParams = { ...this.state.searchParams, ...filters, ...sorter };
        const { current, pageSize } = pagination;
        this._fetchData({page:current, size:pageSize, searchParams });
        this.setState({
            current,
            pageSize,
            searchParams,
        });
    };

    getColumns = () => {
        if (this.props.operationEditLabel && this.props.operationEditLabel()) {
            return [
                ...this.props.columns,
                {
                    title: '操作',
                    width: 100,
                    render:(data) => <DropOption onMenuClick={(e) => this.handleOperationMenuClick(e, data)} menuOptions={this.props.operationEditLabel(data)}/>,
                },
            ];
        }
        // this.props.columns.map((item, index) => {
        //     if (item.hasOwnProperty('editable')) {
        //         this.props.columns[index] = {
        //             title: item.title,
        //             dataIndex: item.dataIndex,
        //             key: item.key,
        //             render: (item, data) => <InputNumber min={0} max={5000} defaultValue={data.value} style={{ width: 50 }} onChange={(e) => this.onEditValueChange(e, data)}/>,
        //         };
        //     }
        // });

        return this.props.columns;
    }

    // onEditValueChange = (value, data) => {
    //     try {
    //         let total = 0;
    //         if (value !== null && value !== "") {
    //             this.props.data.data.map((item, index) => {
    //                 if (item.role === data.role && item.level === data.level) {
    //                     this.props.data.data[index].value = value;
    //                     total = total + value * 1;
    //                 } else {
    //                     total = total + this.props.data.data[index].value * 1;
    //                 }
    //             });
    //             const result = this.props.checkEditValue(total);
    //             if (result) {
    //                 if (this.props.saveData) {
    //                     this.saveData(this.props.data.data);
    //                 }
    //             }
    //         }
    //     } catch (err) {
    //         console.log('onEditValueChange err', err);
    //     }
    // }

    saveData = async (data) => {
        this.setState({
            spinning:true,
        });
        try {
            await this.props.saveData(data);
            message.info("更新成功", MESSAGE_DURATION);
            await this._fetchData({page:this.state.current, size:this.state.pageSize});
        } catch (err) {
            message.error(err);
            console.log('saveData err', err);
        }
        this.setState({
            spinning:false,
        });
    }

    // viewOperation = (data) => {
    //     let view = false;
    //     this.props.operationEdit.map((item) => {
    //         if (item && item.viewOperation) {
    //             view = item.viewOperation(data);
    //         } else {
    //             view = true;
    //         }
    //     });
    //     return view;
    // }

    // setMenuLabel = (data) => {
    //     this.props.operationEdit.map((item) => {
    //         if (item && item.getMenuLabel) {
    //             item.label = item.getMenuLabel(data);
    //         }
    //     });
    // }

    // 操作点击
    handleOperationMenuClick = async (e, data) => {
        // 找到对应的列
        const targetOperations = this.props.operationEdit.find((item) => item.key === e.key);

        if (targetOperations && targetOperations.openLink) {
            targetOperations.openLink(data);
            return;
        }
        // 如果有getDataWhenClick
        if (targetOperations && targetOperations.getDataWhenClick) {
            try {
                this.setState({
                    spinning:true,
                });
                const result = await targetOperations.getDataWhenClick(data);
                // 如果是一modal的方式交互
                if (result) {
                    if (targetOperations.interactionType === INTERACTION_TYPE.MODAL) {
                        this._modifyItem(result, targetOperations, e);
                    } else if ( targetOperations.interactionType === INTERACTION_TYPE.FETCH) {
                        await this._fetchData({page:this.state.current, size:this.state.pageSize, keyword:this.state.searchValue});
                    }
                }
            } catch (err) {
                console.log('getDataWhenClick err', err);
                message.error(err.msg);
            }
            this.setState({
                spinning:false,
            });
        } else {
            if (targetOperations.interactionType === INTERACTION_TYPE.MODAL) {
                this._modifyItem({data}, targetOperations, e);
            }
        }
    }

    renderModal() {
        if (this.state.visible) {
            return (
                <Modal
                    title={this.state.modalTitle || ''}
                    visible={this.state.visible}
                    cancelText={(this.state.operationType === 'add' ? this.state.addOperation.cancelText : this.state.targetOperations.cancelText ) || '取消'}
                    okText={ (this.state.operationType === 'add' ? this.state.addOperation.okText : this.state.targetOperations.okText) || '保存'}
                    toggle={() => this.setState({ visible: !this.state.visible })}
                    style={{width: 900}}
                    buttonLoading={this.state.modalSpinning}
                    onSave={this.state.needSave ? this._onSave : false}>
                    {this.state.modalContent}
                </Modal>
            );
        }
    }
    renderFilterForm() {
        /**
         this.props.filter
         * */
        if (this.props.filter) {
            return (
                <BaseForm
                    filterCol={this.props.filterCol}
                    rowStyle={{marginBottom: 16}}
                    ref={(ref) => this.filter = ref}
                    formColumns={[
                        ...this.props.filter,
                        buttonFormItem({
                            title: '查询',
                            onClick: () => {
                                this.filter.validateFields((err, value) => {
                                    if (err) {
                                        return;
                                    }
                                    this.setState({
                                        searchParams: {
                                            ...this.state.searchParams,
                                            ...value,
                                        },
                                        pageSize: this.state.pageSize,
                                        current: 1,
                                    });
                                    this._fetchData({
                                        page:1,
                                        size:this.state.pageSize,
                                        keyword: this.state.searchValue,
                                        searchParams: {
                                            ...this.state.searchParams,
                                            ...value,
                                        },
                                    });
                                });
                            }}
                        ),
                    ]}
                />
            );
            // return this.props.filter;
        }
    }
    renderButtonGroup() {
        return (
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:5}}>
                {this._renderAddButton()}
                <div>
                    {
                        this.props.qrcode &&
                        <Button
                            size={'large'} onClick={() => this.setState({showQrcode:!this.state.showQrcode})}>
                            <Icon type="qrcode" />
                        </Button>
                    }
                    {
                        this.props.delete &&
                        <Button
                            size={'large'} onClick={this._confirmDelete}>
                            <Icon type="delete" />
                        </Button>
                    }
                    <Button
                        size={'large'}
                        onClick={() => this._fetchData({page:this.state.current, size:this.state.pageSize, keyword: this.state.searchValue, searchParams: this.state.searchParams})}>
                        <Icon type="reload"/>
                    </Button>
                </div>
            </div>
        );
    }

    // 新增按钮
    _renderAddButton = () => (
        <div>
            {
                this.props.operationAdd &&
                <Button style={{marginRight: 10}} type="primary" size={'large'} onClick={() => this._addItem()} disabled={typeof this.props.operationAdd === 'boolean'}>
                    <Icon type="plus"/>
                    {this.props.operationAddLabel ? this.props.operationAddLabel : '新增'}
                </Button>
            }
            {
                this.props.search &&
                <Search
                    placeholder="请输入手机号查询"
                    size={'large'}
                    value={this.state.searchValue}
                    // className={styles.search}
                    style={{
                        width: 170,
                        marginRight: 20,
                        marginTop: 1,
                    }}
                    onChange={(e) => this.setState({searchValue:e.target.value})}
                    onSearch={this._searchBarOnClick}
                />
            }
        </div>
    );

    // 更新
    _onSave = async () => {
        if (this.state.modalSpinning) {
            message.info("别急，请求处理中");
            return;
        }
        if (this.state.originData || this.state.operationType === 'add') {

            let target;
            // var values;
            if (this.state.operationType === 'add') {
                target = this.props.operationAdd.find((item) => item.key === this.state.operationType);
            } else {
                target = this.props.operationEdit.find((item) => item.key === this.state.originData.key);
            }
            try {
                if (target.onOk) {
                    const value = await target.validate();
                    if (value) {
                        if (this.state.operationType === 'add') {
                            this.setState({
                                modalSpinning: true,
                            });
                            const result = await target.onOk(value);
                            this.setState({
                                modalSpinning: false,
                            });
                            if (!result) {
                                return;
                            }
                        } else {
                            this.setState({
                                modalSpinning: true,
                            });
                            const result = await target.onOk(this.state.itemData, value);
                            this.setState({
                                modalSpinning: false,
                            });
                            if (!result) {
                                return;
                            }
                        }
                    } else {
                        return;
                    }
                    if (!target.notRefresh) {
                        await this._fetchData({page:this.state.current, keyword:this.state.searchValue, size:this.state.pageSize});
                    }
                }
                this.setState({
                    visible:!this.state.visible,
                });
            } catch (err) {
                console.log('_onSaveByUpdate err on table', err);
            }
        }
    }

    // 搜索
    _searchBarOnClick = async () => {
        this.setState({
            spinning: true,
            current:1,
        }, async () => {
            try {
                await this.props.search({keyword:this.state.searchValue, page:this.state.current, size:this.state.pageSize, searchParams:this.state.searchParams});
            } catch (e) {
                //
            }
            this.setState({spinning: false});
        });
    }

    // 刷新
    _fetchData = async ({page, size, keyword, searchParams }) => {
        if (!this.props.fetchData) {
            return;
        }
        this.setState({
            spinning:true,
        });
        try {
            await this.props.fetchData({page, size, keyword, searchParams});
        } catch (err) {
            message.error(err);
            console.log('_fetchData err', this.props.fetchData, err);
        }
        this.setState({
            spinning:false,
        });
    }

    // 确认删除
    _confirmDelete = () => {
        if (this.state.selectedRows.length < 1 ) {
            message.info('请先选择要删除列');
            return;
        }
        ComfirmModal.confirm({
            title: '确认删除吗',
            okText: '确认',
            cancelText: '取消',
            onOk:() => this._delete(),
        });
    }

    // 删除
    _delete = async () => {
        this.setState({
            spinning:true,
        });
        try {
            await this.props.delete(this.state.selectedRows);
            await this._fetchData({page:this.state.current, size:this.state.pageSize});
        } catch (err) {
            message.error(err.msg, MESSAGE_DURATION);
            console.log('_delete err', err);
        }
        this.setState({
            spinning:false,
            selectedRowKeys:[],
            selectedRows:[],
        });
    }

    // 添加
    _addItem = () => {
        const addOperation = this.props.operationAdd.find((item) => item.key === 'add');
        if (addOperation) {
            this.setState({
                visible:true,
                showSpin: addOperation.showSpin,
                itemData:null,
                editable:true,
                modalContent: addOperation.modalContent(),
                needSave:true,
                addOperation,
                modalTitle: addOperation.modalTitle,
                operationType:'add',
            });
        }
    }

    // 修改一列
    _modifyItem = (item, targetOperations, originData) => {
        this.setState({
            visible:true,
            showSpin: targetOperations.showSpin,
            itemData:item,
            editable:true,
            modalContent: targetOperations.modalContent(item),
            modalTitle: targetOperations.modalTitle,
            // needSave: targetOperations.needSave ? targetOperations.needSave(item) : true,
            originData,
            targetOperations,
            operationType:targetOperations.key,
        });
    }

    // 展示一列
    // _showItem = (itemDetailData, content, originData) => {
    //     this.setState({
    //         visible:true,
    //         modalContent: content,
    //         editable:false,
    //         originData,
    //     });
    // }
}
export {
    SimpleTable as Table,
};
export { BaseForm };
export {
    inputFormItem,
    selectFormItem,
    textFormItem,
    buttonFormItem,
    inputAreaFormItem,
    nameFormItem,
    mobileFormItem,
    emailFormItem,
    passwordFormItem,
    imageSelectFormItem,
} from './form/formItemConfig';
// export default SimpleTable;


