/**
 * Created by shenyicheng on 2018/4/16.
 * @flow
 */
import React  from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Upload, Button, DatePicker} from "antd/lib/index";
import {Col, Input, Row, Select, Icon, Collapse} from "antd";
// import style from './index.css';
const { RangePicker } = DatePicker;

// import Location from "../../components/location";
export const INPUT_TYPES = {
    BUTTON: 'BUTTON', // 按钮
    TEXT: 'TEXT', // 仅展示
    INPUT_AREA: 'TEXT_AREA', // 大量输入
    INPUT: 'INPUT', // 输入
    SELECT: 'SELECT', // 选择
    DATE_SELECT: 'DATE_SELECT', // 日期选择
    PLACEHOLDER: 'PLACEHOLDER', // 占位
    CASCADER: 'CASCADER', // 级联选择(省市区)
    NUMBER: 'NUMBER',   // 数字
    IMAGE: 'IMAGE',
    IMAGE_SELECTOR: 'IMAGE_SELECTOR',
};

const threeColLayout = {
    sm: {
        span: 24,
    },
    md: {
        span: 8,
    },
};
const twoColLayout = {
    sm: {
        span: 24,
    },
    lg: { span: 12 },
    style: {
        height: 52,
    },
};

const oneColLayout = {
    span: 24,
};
const oneColformItemLayout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 18,
    },
};
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 19,
    },
};

const imageFormItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};
const THREE_CLO = 3;
class BaseForm extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    componentDidMount() {
        const initialState = {};
        for (let i = 0; i < this.props.formColumns.length; i++) {
            const item = this.props.formColumns[i];
            initialState[item.key] = this.getInitialValue(item);
        }
        this.setState({
            ...initialState,
        });
    }
    getValue = () => {
        const { getFieldsValue } = this.props.form;
        const fields = getFieldsValue();
        return fields;
    };
    // handleSubmit = () => new Promise( (callback) => {
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //             callback(true) ;
    //         } else {
    //             callback(false) ;
    //         }
    //     });
    // });
    showImageDetail = (title, src) => {
        Modal.success({
            width: 480,
            iconType: null,
            title:title,
            // wrapClassName: style.imageModal,
            okText:'关闭',
            content: <img alt="" src={src} style={{width: 640}}/>,
        });
    }
    renderFormItemInput(data) {
        switch (data.type) {
            case INPUT_TYPES.PLACEHOLDER:
                return null;
            case INPUT_TYPES.TEXT:
                return <Input disabled={true} placeholder={data.placeholder}/>;
            case INPUT_TYPES.BUTTON:
                return (
                    <div className={{
                        whiteSpace: 'nowrap',
                        textAlign: 'right',
                    }}>
                        <Button type='primary' onClick={() => data && data.onClick()}>{data.title}</Button>
                    </div>
                );
            case INPUT_TYPES.INPUT:
                return <Input disabled={data.disabled || false} placeholder={data.placeholder}/>;
            case INPUT_TYPES.INPUT_AREA:
                return <Input.TextArea rows={4} disabled={data.disabled} placeholder={data.placeholder}/>;
            case INPUT_TYPES.DATE_SELECT:
                return (
                    <RangePicker
                        style={{ width: '100%' }}
                    />
                );
            case INPUT_TYPES.SELECT:
                if (!data.dict) {
                    console.error('使用INPUT_TYPES.SELECT类型，必须带有dict字典配置');
                }
                return (
                    <Select allowClear={data.allowClear} placeholder={data.placeholder} disabled={data.disabled} onSelect={(value) => {
                        if (data.isSelectControl) {
                            this.setState({
                                [data.key]: value,
                            });
                        }
                    }}>
                        {
                            data.dict.map((item, i) => <Select.Option key={i} value={String(item.key)} disabled={item.disabled}>{item.label}</Select.Option>)
                        }
                    </Select>
                );
            case INPUT_TYPES.NUMBER:
                return <Input disabled={data.disabled} type='number' placeholder={data.placeholder}/>;
            // case INPUT_TYPES.CASCADER:
            //     return <Location level={data.level || 2} placeholder={data.placeholder} cityCode={data.cityCode} provinceCode={data.provinceCode}/>;
            case INPUT_TYPES.IMAGE:
                // let imgSrc = 'data:image/png;base64,' + this.props.dataSource[data.key];
                return <img alt="" src={'data:image/png;base64,' + this.props.dataSource[data.key]} width={'60'} onClick={() => this.showImageDetail(data.title, 'data:image/png;base64,' + this.props.dataSource[data.key])} style={{cursor:'pointer', height: 42}}/>;
            case INPUT_TYPES.IMAGE_SELECTOR:
                return (
                    <Upload
                        listType={'text'}
                        beforeUpload={() => false }>
                        <span>
                            <Button>
                                <Icon type="upload" />
                                选择图片
                            </Button>
                        </span>
                    </Upload>
                );
            default:
                return <Input disabled={true} placeholder={data.placeholder}/>;
        }
    }
    getInitialValue = (item) => {
        if (item && item.getInitialValue) {
            return item.getInitialValue(this.props.dataSource);
        } else {
            return (this.props.dataSource && ![null, undefined].includes(this.props.dataSource[item.key]))  ? String(this.props.dataSource[item.key]) : undefined;
        }
    };
    renderModalForm = (formColumns) => formColumns.map((item, index) => {
        if (item.groupTitle) {
            // 如果组内的都不显示，不再渲染组
            const visibleArr = item.children.filter((child) => {
                if (child.underControl) {
                    for (let i = 0; i < child.underControl.length; i++) {
                        if (this.state[child.underControl[i].key] === String(child.underControl[i].value)) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            });
            if (visibleArr.length < 1) {
                return null;
            }
            return (
                <Col key={item.groupTitle} span={24} style={{borderRadius: 5, borderColor: 'black', ...(item.style || {marginTop: 16}) }}>
                    <Collapse defaultActiveKey='1' >
                        <Collapse.Panel header={item.groupTitle} key='1' style={{padding: 0}} >
                            {
                                this.renderModalForm(item.children)
                            }
                        </Collapse.Panel>
                    </Collapse>
                </Col>
            );
        } else {
            if (item.underControl) {
                for (let i = 0; i < item.underControl.length; i++) {
                    if (this.state[item.underControl[i].key] !== String(item.underControl[i].value)) {
                        return null;
                    }
                }
            }
            const fLayout = (item.type === INPUT_TYPES.IMAGE) ?  imageFormItemLayout : (item.type === INPUT_TYPES.INPUT_AREA) ? oneColformItemLayout : formItemLayout;
            const colLayout = (item.type === INPUT_TYPES.INPUT_AREA) ? oneColLayout : (this.props.filterCol === THREE_CLO ? threeColLayout : twoColLayout);
            if (item.type === INPUT_TYPES.PLACEHOLDER) { // 只是占位
                return <Col key={index} {...colLayout}/>;
            }
            return (
                <Col key={index} {...colLayout} style={this.props.rowStyle}>
                    <Form.Item label={ item.type === INPUT_TYPES.BUTTON ? '' : item.title} {...fLayout}>
                        {
                            this.props.form.getFieldDecorator(item.key, {
                                initialValue: this.getInitialValue(item),
                                rules: item.rules,
                            })(this.renderFormItemInput(item))
                        }
                    </Form.Item>
                </Col>
            );
        }
    });
    render() {
        return (
            <Form layout={'inline'} className='filterForm' style={this.props.style}>
                <Row>
                    {this.renderModalForm(this.props.formColumns)}
                </Row>
            </Form>
        );
    }
}
BaseForm.PropTypes = {
    dataSource: PropTypes.object.isRequired,
    formColumns: PropTypes.array.isRequired,
    style: PropTypes.object,
    rowStyle: PropTypes.object,
};

export default Form.create({ wrappedComponentRef: true })(BaseForm);


