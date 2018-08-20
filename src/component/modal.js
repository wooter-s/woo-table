import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
export default class SimpleModal extends React.Component {
    static  PropTypes = {
        visible:PropTypes.bool.isRequired,
        toggle:PropTypes.func.isRequired,
        onSave:PropTypes.func.isRequired,
    }

    render() {
        return (
            <Modal
                {...this.props}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={ this.props.width || "70%" }
                maskClosable={false}
                confirmLoading={this.props.confirmLoading}
                footer={this._getFooter()}
            >
                {this.props.children}
            </Modal>
        );
    }

    handleOk = async () => {
        this.props.onSave();
    };

    handleCancel = () => {
        this.props.toggle();
    };

    _getFooter = () => {
        let footer = [<Button key="back" size="large" onClick={this.handleCancel}>{ this.props.cancelText || '取消'}</Button>];
        if (this.props.onSave) {
            footer = [
                ...footer,
                <Button key="submit" type="primary" size="large" loading={this.props.buttonLoading} onClick={this.handleOk}>
                    { this.props.okText || '保存'}
                </Button>,
            ];
        } else {
            footer = null;
        }
        return footer;
    }
}
