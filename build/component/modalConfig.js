'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getModalInstance = exports.validatorURL = exports.validatorAmount = exports.validatorBankNo = exports.validatorImg = exports.validatorName = exports.validatorMobilePhone = exports.validatorIntZeroToHundred = exports.validatorPositiveNumber = exports.validatorNumberField = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./index');

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var validatorNumberField = exports.validatorNumberField = function validatorNumberField(rule, value, callback) {
    if (value !== '0' && (Number(value) < 1 || Number(value) % 1 !== 0)) {
        callback('请输入不小于0的整数');
    }
    callback();
};

var validatorPositiveNumber = exports.validatorPositiveNumber = function validatorPositiveNumber(rule, value, callback) {
    if (value && Number(value) <= 0) {
        callback('请输入大于0的数字');
    }
    callback();
};
var validatorIntZeroToHundred = exports.validatorIntZeroToHundred = function validatorIntZeroToHundred(rule, value, callback) {
    var numberValue = Number(value);
    if (numberValue < 0 || numberValue > 100 || numberValue % 1 !== 0) {
        callback('必须输入0~100之间的整数');
    } else {
        callback();
    }
};

var validatorMobilePhone = exports.validatorMobilePhone = function validatorMobilePhone(rule, value, callBack) {
    if (value && !value.match(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)) {
        callBack('请检查手机号是否正确');
        return;
    }
    callBack();
};
var validatorName = exports.validatorName = function validatorName(rule, value, callBack) {
    if (value && !value.match(/^\w{6,15}$/)) {
        callBack('请输入6至15位的数字、字母或下划线');
        return;
    }
    callBack();
};

var validatorImg = exports.validatorImg = function validatorImg(rule, value, callBack) {
    if (value !== undefined) {
        if (value.fileList.length <= 0) {
            callBack('请选择图片');
            return;
        }
    }
    callBack();
};
var validatorBankNo = exports.validatorBankNo = function validatorBankNo(rule, value, callBack) {
    if (value && !value.match(/^\d{8,24}$/)) {
        callBack('请检查银行卡号');
        return;
    }
    callBack();
};

var validatorAmount = exports.validatorAmount = function validatorAmount(rule, value, callback) {
    var HUNDRED = 100;
    if (Number(value) % HUNDRED !== 0) {
        callback('请输入能被100整除的数');
        return;
    }
    callback();
};

var urlRegex = '(https?|ftp|file|rtsp|mms)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
var validatorURL = exports.validatorURL = function validatorURL(rule, value, callBack) {
    if (value && !value.match(new RegExp(urlRegex))) {
        callBack('请输入正确格式的链接');
        return;
    }
    callBack();
};

// getDataWhenClick 没有时 interactionType = INTERACTION_TYPE.MODAL 是必须的
var getModalInstance = exports.getModalInstance = function getModalInstance(_ref) {
    var Form = _ref.Form,
        _ref$key = _ref.key,
        key = _ref$key === undefined ? 'audit' : _ref$key,
        _ref$label = _ref.label,
        label = _ref$label === undefined ? '编辑' : _ref$label,
        _ref$okText = _ref.okText,
        okText = _ref$okText === undefined ? '确定' : _ref$okText,
        _ref$cancelText = _ref.cancelText,
        cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText,
        _ref$modalTitle = _ref.modalTitle,
        modalTitle = _ref$modalTitle === undefined ? '编辑' : _ref$modalTitle,
        _ref$showSpin = _ref.showSpin,
        showSpin = _ref$showSpin === undefined ? true : _ref$showSpin,
        getDataWhenClick = _ref.getDataWhenClick,
        _ref$interactionType = _ref.interactionType,
        interactionType = _ref$interactionType === undefined ? _index.INTERACTION_TYPE.MODAL : _ref$interactionType,
        _ref$onOk = _ref.onOk,
        onOk = _ref$onOk === undefined ? function () {} : _ref$onOk,
        _ref$needSave = _ref.needSave,
        needSave = _ref$needSave === undefined ? function () {
        return true;
    } : _ref$needSave,
        formColumns = _ref.formColumns,
        _ref$notRefresh = _ref.notRefresh,
        notRefresh = _ref$notRefresh === undefined ? false : _ref$notRefresh;

    var modalModifyContentRef = {};
    return {
        key: key,
        label: label,
        okText: okText,
        cancelText: cancelText,
        modalTitle: modalTitle,
        getDataWhenClick: getDataWhenClick,
        showSpin: showSpin,
        interactionType: interactionType,
        validate: function validate() {
            return new Promise(function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(res) {
                    var result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!Form) {
                                        _context.next = 7;
                                        break;
                                    }

                                    _context.next = 3;
                                    return modalModifyContentRef.refs.wrappedComponent.refs.formWrappedComponent.validateFields();

                                case 3:
                                    result = _context.sent;

                                    res(result);
                                    _context.next = 8;
                                    break;

                                case 7:
                                    modalModifyContentRef.validateFields(function (err, values) {
                                        if (!err) {
                                            res(values);
                                        } else {
                                            res(false);
                                        }
                                    });

                                case 8:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, undefined);
                }));

                return function (_x) {
                    return _ref2.apply(this, arguments);
                };
            }());
        },
        onOk: onOk,
        needSave: needSave,
        modalContent: function modalContent(dataSource) {
            if (Form) {
                return _react2.default.createElement(Form, {
                    ref: function ref(_ref3) {
                        modalModifyContentRef = _ref3;
                    },
                    dataSource: dataSource && dataSource.data });
            } else if (formColumns) {
                return _react2.default.createElement(_form2.default, {
                    ref: function ref(_ref4) {
                        modalModifyContentRef = _ref4;
                    },
                    dataSource: dataSource && dataSource.data,
                    formColumns: formColumns
                });
            } else {
                return null;
            }
        },
        notRefresh: notRefresh, // 保存点击后是否刷新
        getValue: function getValue() {
            return modalModifyContentRef.getFieldsValue();
        }
    };
};