'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.INPUT_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('antd/lib/index');

var _antd = require('antd');

var _index2 = require('./index.css');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by shenyicheng on 2018/4/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RangePicker = _index.DatePicker.RangePicker;

// import Location from "../../components/location";

var INPUT_TYPES = exports.INPUT_TYPES = {
    BUTTON: 'BUTTON', // 按钮
    TEXT: 'TEXT', // 仅展示
    INPUT_AREA: 'TEXT_AREA', // 大量输入
    INPUT: 'INPUT', // 输入
    SELECT: 'SELECT', // 选择
    DATE_SELECT: 'DATE_SELECT', // 日期选择
    PLACEHOLDER: 'PLACEHOLDER', // 占位
    CASCADER: 'CASCADER', // 级联选择(省市区)
    NUMBER: 'NUMBER', // 数字
    IMAGE: 'IMAGE',
    IMAGE_SELECTOR: 'IMAGE_SELECTOR'
};

var threeColLayout = {
    sm: {
        span: 24
    },
    md: {
        span: 8
    }
};
var twoColLayout = {
    sm: {
        span: 24
    },
    lg: { span: 12 },
    style: {
        height: 52
    }
};

var oneColLayout = {
    span: 24
};
var oneColformItemLayout = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 18
    }
};
var formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 19
    }
};

var imageFormItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
};
var THREE_CLO = 3;

var BaseForm = function (_React$Component) {
    _inherits(BaseForm, _React$Component);

    function BaseForm() {
        _classCallCheck(this, BaseForm);

        var _this = _possibleConstructorReturn(this, (BaseForm.__proto__ || Object.getPrototypeOf(BaseForm)).call(this));

        _this.getValue = function () {
            var getFieldsValue = _this.props.form.getFieldsValue;

            var fields = getFieldsValue();
            return fields;
        };

        _this.showImageDetail = function (title, src) {
            _index.Modal.success({
                width: 800,
                iconType: null,
                title: title,
                wrapClassName: _index3.default.imageModal,
                okText: '关闭',
                content: _react2.default.createElement('img', { alt: '', src: src, style: { width: 640 } })
            });
        };

        _this.getInitialValue = function (item) {
            if (item && item.getInitialValue) {
                return item.getInitialValue(_this.props.dataSource);
            } else {
                return _this.props.dataSource && ![null, undefined].includes(_this.props.dataSource[item.key]) ? String(_this.props.dataSource[item.key]) : undefined;
            }
        };

        _this.renderModalForm = function (formColumns) {
            return formColumns.map(function (item, index) {
                if (item.groupTitle) {
                    // 如果组内的都不显示，不再渲染组
                    var visibleArr = item.children.filter(function (child) {
                        if (child.underControl) {
                            for (var i = 0; i < child.underControl.length; i++) {
                                if (_this.state[child.underControl[i].key] === String(child.underControl[i].value)) {
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
                    return _react2.default.createElement(
                        _antd.Col,
                        { key: item.groupTitle, span: 24, style: _extends({ borderRadius: 5, borderColor: 'black' }, item.style || { marginTop: 16 }) },
                        _react2.default.createElement(
                            _antd.Collapse,
                            { defaultActiveKey: '1' },
                            _react2.default.createElement(
                                _antd.Collapse.Panel,
                                { header: item.groupTitle, key: '1', style: { padding: 0 } },
                                _this.renderModalForm(item.children)
                            )
                        )
                    );
                } else {
                    if (item.underControl) {
                        for (var i = 0; i < item.underControl.length; i++) {
                            if (_this.state[item.underControl[i].key] !== String(item.underControl[i].value)) {
                                return null;
                            }
                        }
                    }
                    var fLayout = item.type === INPUT_TYPES.IMAGE ? imageFormItemLayout : item.type === INPUT_TYPES.INPUT_AREA ? oneColformItemLayout : formItemLayout;
                    var colLayout = item.type === INPUT_TYPES.INPUT_AREA ? oneColLayout : _this.props.filterCol === THREE_CLO ? threeColLayout : twoColLayout;
                    if (item.type === INPUT_TYPES.PLACEHOLDER) {
                        // 只是占位
                        return _react2.default.createElement(_antd.Col, _extends({ key: index }, colLayout));
                    }
                    if (item.render) {
                        return _react2.default.createElement(
                            _antd.Col,
                            _extends({ key: index }, colLayout, { style: _this.props.rowStyle }),
                            _react2.default.createElement(
                                _index.Form.Item,
                                _extends({ label: item.type === INPUT_TYPES.BUTTON ? '' : item.title }, fLayout),
                                _this.props.form.getFieldDecorator(item.key, {
                                    initialValue: _this.getInitialValue(item),
                                    rules: item.rules
                                })(item.render())
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            _antd.Col,
                            _extends({ key: index }, colLayout, { style: _this.props.rowStyle }),
                            _react2.default.createElement(
                                _index.Form.Item,
                                _extends({ label: item.type === INPUT_TYPES.BUTTON ? '' : item.title }, fLayout),
                                _this.props.form.getFieldDecorator(item.key, {
                                    initialValue: _this.getInitialValue(item),
                                    rules: item.rules
                                })(_this.renderFormItemInput(item))
                            )
                        );
                    }
                }
            });
        };

        _this.state = {};
        return _this;
    }

    _createClass(BaseForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var initialState = {};
            for (var i = 0; i < this.props.formColumns.length; i++) {
                var item = this.props.formColumns[i];
                initialState[item.key] = this.getInitialValue(item);
            }
            this.setState(_extends({}, initialState));
        }
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

    }, {
        key: 'renderFormItemInput',
        value: function renderFormItemInput(data) {
            var _this2 = this;

            switch (data.type) {
                case INPUT_TYPES.PLACEHOLDER:
                    return null;
                case INPUT_TYPES.TEXT:
                    return _react2.default.createElement(_antd.Input, { disabled: true, placeholder: data.placeholder });
                case INPUT_TYPES.BUTTON:
                    return _react2.default.createElement(
                        'div',
                        { style: {
                                whiteSpace: 'nowrap',
                                textAlign: 'right'
                            } },
                        _react2.default.createElement(
                            _index.Button,
                            { type: 'primary', onClick: function onClick() {
                                    return data && data.onClick();
                                } },
                            data.title
                        )
                    );
                case INPUT_TYPES.INPUT:
                    return _react2.default.createElement(_antd.Input, { disabled: data.disabled || false, placeholder: data.placeholder });
                case INPUT_TYPES.INPUT_AREA:
                    return _react2.default.createElement(_antd.Input.TextArea, { rows: 4, disabled: data.disabled, placeholder: data.placeholder });
                case INPUT_TYPES.DATE_SELECT:
                    return _react2.default.createElement(RangePicker, {
                        style: { width: '100%' }
                    });
                case INPUT_TYPES.SELECT:
                    if (!data.dict) {
                        console.error('使用INPUT_TYPES.SELECT类型，必须带有dict字典配置');
                    }
                    return _react2.default.createElement(
                        _antd.Select,
                        { allowClear: data.allowClear, placeholder: data.placeholder, disabled: data.disabled, onSelect: function onSelect(value) {
                                if (data.isSelectControl) {
                                    _this2.setState(_defineProperty({}, data.key, value));
                                }
                            } },
                        data.dict.map(function (item, i) {
                            return _react2.default.createElement(
                                _antd.Select.Option,
                                { key: i, value: String(item.key), disabled: item.disabled },
                                item.label
                            );
                        })
                    );
                case INPUT_TYPES.NUMBER:
                    return _react2.default.createElement(_antd.Input, { disabled: data.disabled, type: 'number', placeholder: data.placeholder });
                // case INPUT_TYPES.CASCADER:
                //     return <Location level={data.level || 2} placeholder={data.placeholder} cityCode={data.cityCode} provinceCode={data.provinceCode}/>;
                case INPUT_TYPES.IMAGE:
                    // let imgSrc = 'data:image/png;base64,' + this.props.dataSource[data.key];
                    return _react2.default.createElement('img', { alt: '', src: 'data:image/png;base64,' + this.props.dataSource[data.key], width: '60', onClick: function onClick() {
                            return _this2.showImageDetail(data.title, 'data:image/png;base64,' + _this2.props.dataSource[data.key]);
                        }, style: { cursor: 'pointer', height: 42 } });
                case INPUT_TYPES.IMAGE_SELECTOR:
                    return _react2.default.createElement(
                        _index.Upload,
                        {
                            listType: 'text',
                            beforeUpload: function beforeUpload() {
                                return false;
                            } },
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                _index.Button,
                                null,
                                _react2.default.createElement(_antd.Icon, { type: 'upload' }),
                                '\u9009\u62E9\u56FE\u7247'
                            )
                        )
                    );
                default:
                    return _react2.default.createElement(_antd.Input, { disabled: true, placeholder: data.placeholder });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _index.Form,
                { layout: 'inline', className: 'filterForm', style: this.props.style },
                _react2.default.createElement(
                    _antd.Row,
                    null,
                    this.renderModalForm(this.props.formColumns)
                )
            );
        }
    }]);

    return BaseForm;
}(_react2.default.Component);

BaseForm.PropTypes = {
    dataSource: _propTypes2.default.object.isRequired,
    formColumns: _propTypes2.default.array.isRequired,
    style: _propTypes2.default.object,
    rowStyle: _propTypes2.default.object
};

exports.default = _index.Form.create({ wrappedComponentRef: true })(BaseForm);