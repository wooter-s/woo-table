import React from 'react';
import {INTERACTION_TYPE} from "./index";
import BaseForm from './form';

export const validatorNumberField = (rule, value, callback) => {
    if (value !== '0' && (Number(value) < 1 || Number(value) % 1 !== 0)) {
        callback('请输入不小于0的整数');
    }
    callback();
};

export const validatorPositiveNumber = (rule, value, callback) => {
    if (value && Number(value) <= 0) {
        callback('请输入大于0的数字');
    }
    callback();
};
export const validatorIntZeroToHundred = (rule, value, callback) => {
    const numberValue = Number(value);
    if ((numberValue < 0 || numberValue > 100) || numberValue % 1 !== 0) {
        callback('必须输入0~100之间的整数');
    } else {
        callback();
    }
};


export const validatorMobilePhone = (rule, value, callBack) => {
    if (value && !value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        callBack('请检查手机号是否正确');
        return;
    }
    callBack();
};
export const validatorName = (rule, value, callBack) => {
    if (value && !value.match(/^\w{6,15}$/)) {
        callBack('请输入6至15位的数字、字母或下划线');
        return;
    }
    callBack();
};

export const validatorImg = (rule, value, callBack) => {
    if (value !== undefined) {
        if (value.fileList.length <= 0) {
            callBack('请选择图片');
            return;
        }
    }
    callBack();
};
export const validatorBankNo = (rule, value, callBack) => {
    if (value && !value.match(/^\d{8,24}$/)) {
        callBack('请检查银行卡号');
        return;
    }
    callBack();
};

export const validatorAmount = (rule, value, callback) => {
    const HUNDRED = 100;
    if (Number(value) % HUNDRED !== 0) {
        callback('请输入能被100整除的数');
        return;
    }
    callback();
};

const urlRegex = '(https?|ftp|file|rtsp|mms)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
export const validatorURL = (rule, value, callBack) => {
    if (value && !value.match(new RegExp(urlRegex))) {
        callBack('请输入正确格式的链接');
        return;
    }
    callBack();
};

// getDataWhenClick 没有时 interactionType = INTERACTION_TYPE.MODAL 是必须的
export const getModalInstance = ({
    Form,
    key = 'audit', // 必须
    label = '编辑', // 操作按钮显示的字符
    okText = '确定',
    cancelText = '取消',
    modalTitle = '编辑', // modal标题
    showSpin = true,
    // getDataWhenClick = (params) => getAgentDetail(params.uuid),// 点击时获取数据
    getDataWhenClick, // 必须
    interactionType = INTERACTION_TYPE.MODAL,// 交互方式
    // 点击ok按钮时的交互
    onOk = () => {}, // 必须
    needSave = () => true,
    formColumns,
    notRefresh = false,
}) => {
    let modalModifyContentRef = {};
    return ({
        key,
        label,
        okText,
        cancelText,
        modalTitle,
        getDataWhenClick,
        showSpin,
        interactionType,
        validate: () => new Promise(async (res) => {
            if (Form) {
                const result = await modalModifyContentRef.refs.wrappedComponent.refs.formWrappedComponent.validateFields();
                res(result);
            } else {
                modalModifyContentRef.validateFields((err, values) => {
                    if (!err) {
                        res(values);
                    } else {
                        res(false);
                    }
                });
            }
        }),
        onOk,
        needSave,
        modalContent: (dataSource) => {
            if (Form) {
                return (
                    <Form
                        ref={(ref) => {
                            modalModifyContentRef = ref;
                        }}
                        dataSource={dataSource && dataSource.data}/>
                );
            } else if (formColumns) {
                return (
                    <BaseForm
                        ref={(ref) => {
                            modalModifyContentRef = ref;
                        }}
                        dataSource={dataSource && dataSource.data}
                        formColumns={formColumns}
                    />
                );
            } else {
                return null;
            }
        },
        notRefresh,// 保存点击后是否刷新
        getValue : () => modalModifyContentRef.getFieldsValue(),
    });
};
