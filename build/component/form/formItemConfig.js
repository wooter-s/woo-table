"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dateSelectFormItem = exports.imageSelectFormItem = exports.buttonFormItem = exports.inputAreaFormItem = exports.textFormItem = exports.inputFormItem = exports.selectFormItem = exports.statusFormItem = exports.locationFormItem = exports.passwordFormItem = exports.emailFormItem = exports.mobileFormItem = exports.nameFormItem = undefined;

var _index = require("./index");

var _modalConfig = require("../modalConfig");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getRules = function getRules(rules, title) {
    // 空数组 不校验
    // undefine 校验必须输入
    // 数据 必须输入 && 自定义校验
    if (rules) {
        if (rules.length > 0) {
            return [{ required: true, message: "\u8BF7\u8F93\u5165" + title + "!" }].concat(_toConsumableArray(rules));
        } else {
            return [];
        }
    } else {
        return [{ required: true, message: "\u8BF7\u8F93\u5165" + title + "!" }];
    }
};

var nameFormItem = exports.nameFormItem = function nameFormItem(_ref) {
    var key = _ref.key,
        title = _ref.title,
        type = _ref.type,
        placeholder = _ref.placeholder,
        rules = _ref.rules,
        _ref$disabled = _ref.disabled,
        disabled = _ref$disabled === undefined ? false : _ref$disabled,
        underControl = _ref.underControl;
    return {
        key: key || 'user_name',
        title: title || '登录账号',
        type: type || _index.INPUT_TYPES.INPUT,
        disabled: disabled,
        placeholder: placeholder || '请输入登录账号',
        rules: rules || [{ required: true, message: "\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u53F7" }, { validator: _modalConfig.validatorName }],
        underControl: underControl
    };
};

var mobileFormItem = exports.mobileFormItem = function mobileFormItem(_ref2) {
    var key = _ref2.key,
        title = _ref2.title,
        type = _ref2.type,
        placeholder = _ref2.placeholder,
        _ref2$disabled = _ref2.disabled,
        disabled = _ref2$disabled === undefined ? false : _ref2$disabled,
        underControl = _ref2.underControl;
    return {
        key: key || 'mobile',
        title: title || '手机号',
        type: type || _index.INPUT_TYPES.INPUT,
        disabled: disabled,
        placeholder: placeholder || '请输入手机号',
        rules: [{ required: true, message: '请输入手机号' }, { validator: _modalConfig.validatorMobilePhone }],
        underControl: underControl
    };
};

var emailFormItem = exports.emailFormItem = function emailFormItem(_ref3) {
    var key = _ref3.key,
        title = _ref3.title,
        type = _ref3.type,
        placeholder = _ref3.placeholder,
        rules = _ref3.rules,
        _ref3$disabled = _ref3.disabled,
        disabled = _ref3$disabled === undefined ? false : _ref3$disabled,
        underControl = _ref3.underControl;
    return {
        key: key || 'email',
        title: title || '电子邮箱',
        type: type || _index.INPUT_TYPES.INPUT,
        disabled: disabled,
        placeholder: placeholder || '请输入电子邮箱',
        rules: rules || [{ required: true, message: '请输入邮箱' }, {
            validator: function validator(rule, value, callBack) {
                if (value && !value.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)) {
                    callBack('邮箱格式错误');
                }
                callBack();
            }
        }],
        underControl: underControl
    };
};

var passwordFormItem = exports.passwordFormItem = function passwordFormItem(_ref4) {
    var key = _ref4.key,
        title = _ref4.title,
        type = _ref4.type,
        placeholder = _ref4.placeholder,
        rules = _ref4.rules,
        _ref4$disabled = _ref4.disabled,
        disabled = _ref4$disabled === undefined ? false : _ref4$disabled,
        underControl = _ref4.underControl;
    return {
        key: key || 'password',
        title: title || '登录密码',
        type: type || _index.INPUT_TYPES.INPUT,
        disabled: disabled,
        placeholder: placeholder || '请输入登录密码',
        rules: rules || [{ required: true, message: '请输入登录密码' }, { validator: _modalConfig.validatorName }],
        underControl: underControl
    };
};

var locationFormItem = exports.locationFormItem = function locationFormItem(_ref5) {
    var key = _ref5.key,
        title = _ref5.title,
        type = _ref5.type,
        level = _ref5.level,
        placeholder = _ref5.placeholder,
        rules = _ref5.rules,
        _ref5$disabled = _ref5.disabled,
        disabled = _ref5$disabled === undefined ? false : _ref5$disabled,
        underControl = _ref5.underControl,
        cityCode = _ref5.cityCode,
        provinceCode = _ref5.provinceCode;
    return {
        key: key || 'location',
        title: title || '地区',
        type: type || _index.INPUT_TYPES.CASCADER,
        disabled: disabled,
        level: level || 2,
        placeholder: placeholder || '请选择地区',
        rules: rules || [{ required: true, message: '请输入地区' }],
        underControl: underControl,
        cityCode: cityCode,
        provinceCode: provinceCode
    };
};
var statusFormItem = exports.statusFormItem = function statusFormItem(_ref6) {
    var key = _ref6.key,
        title = _ref6.title,
        type = _ref6.type,
        placeholder = _ref6.placeholder,
        rules = _ref6.rules,
        _ref6$disabled = _ref6.disabled,
        disabled = _ref6$disabled === undefined ? false : _ref6$disabled,
        dict = _ref6.dict,
        underControl = _ref6.underControl;
    return {
        key: key || 'status',
        title: title || '状态',
        type: type || _index.INPUT_TYPES.SELECT,
        dict: dict || [],
        disabled: disabled,
        placeholder: placeholder || '请选择状态',
        rules: rules || [{ required: true, message: "\u8BF7\u9009\u62E9" + title }],
        underControl: underControl
    };
};

// 标准的select类型
var selectFormItem = exports.selectFormItem = function selectFormItem(_ref7) {
    var key = _ref7.key,
        title = _ref7.title,
        allowClear = _ref7.allowClear,
        placeholder = _ref7.placeholder,
        rules = _ref7.rules,
        _ref7$disabled = _ref7.disabled,
        disabled = _ref7$disabled === undefined ? false : _ref7$disabled,
        dict = _ref7.dict,
        _ref7$isSelectControl = _ref7.isSelectControl,
        isSelectControl = _ref7$isSelectControl === undefined ? false : _ref7$isSelectControl,
        underControl = _ref7.underControl,
        getInitialValue = _ref7.getInitialValue;
    return {
        key: key || 'status',
        title: title || '状态',
        type: _index.INPUT_TYPES.SELECT,
        dict: dict || [],
        disabled: disabled,
        isSelectControl: isSelectControl, // 是否用来判断其他组件是否渲染
        placeholder: placeholder || '请选择状态',
        rules: rules || [{ required: true, message: '请选择状态' }],
        underControl: underControl,
        getInitialValue: getInitialValue,
        allowClear: allowClear
    };
};

var inputFormItem = exports.inputFormItem = function inputFormItem(_ref8) {
    var key = _ref8.key,
        title = _ref8.title,
        type = _ref8.type,
        placeholder = _ref8.placeholder,
        rules = _ref8.rules,
        _ref8$disabled = _ref8.disabled,
        disabled = _ref8$disabled === undefined ? false : _ref8$disabled,
        underControl = _ref8.underControl,
        getInitialValue = _ref8.getInitialValue,
        _ref8$require = _ref8.require,
        require = _ref8$require === undefined ? true : _ref8$require;

    return {
        key: key || 'input',
        title: title || '',
        type: disabled ? _index.INPUT_TYPES.TEXT : type || _index.INPUT_TYPES.INPUT,
        disabled: disabled,
        placeholder: placeholder || "\u8BF7\u8F93\u5165" + title,
        rules: disabled ? [] : getRules(rules, title, require),
        underControl: underControl,
        getInitialValue: getInitialValue
    };
};

var textFormItem = exports.textFormItem = function textFormItem(_ref9) {
    var key = _ref9.key,
        title = _ref9.title,
        type = _ref9.type,
        disabled = _ref9.disabled,
        underControl = _ref9.underControl,
        getInitialValue = _ref9.getInitialValue;
    return {
        key: key || 'text',
        title: title || '',
        type: type || _index.INPUT_TYPES.TEXT,
        disabled: disabled,
        underControl: underControl,
        getInitialValue: getInitialValue
    };
};

var inputAreaFormItem = exports.inputAreaFormItem = function inputAreaFormItem(_ref10) {
    var key = _ref10.key,
        title = _ref10.title,
        type = _ref10.type,
        disabled = _ref10.disabled,
        underControl = _ref10.underControl,
        rules = _ref10.rules,
        getInitialValue = _ref10.getInitialValue;
    return {
        key: key || 'introduce',
        title: title || '',
        type: type || _index.INPUT_TYPES.INPUT_AREA,
        disabled: disabled,
        underControl: underControl,
        rules: rules || [{ required: true, message: '请输入!' }],
        getInitialValue: getInitialValue
    };
};

var buttonFormItem = exports.buttonFormItem = function buttonFormItem(_ref11) {
    var key = _ref11.key,
        title = _ref11.title,
        type = _ref11.type,
        disabled = _ref11.disabled,
        underControl = _ref11.underControl,
        onClick = _ref11.onClick;
    return {
        key: key || 'button',
        title: title || '按钮',
        type: type || _index.INPUT_TYPES.BUTTON,
        underControl: underControl,
        onClick: onClick
    };
};
var imageSelectFormItem = exports.imageSelectFormItem = function imageSelectFormItem(_ref12) {
    var key = _ref12.key,
        title = _ref12.title,
        underControl = _ref12.underControl,
        rules = _ref12.rules;
    return {
        key: key || 'introduce',
        title: title || '',
        type: _index.INPUT_TYPES.IMAGE_SELECTOR,
        underControl: underControl,
        rules: rules || [{ required: true, message: '请选择图片!' }, {
            validator: _modalConfig.validatorImg
        }]
    };
};
var dateSelectFormItem = exports.dateSelectFormItem = function dateSelectFormItem(_ref13) {
    var key = _ref13.key,
        title = _ref13.title,
        underControl = _ref13.underControl,
        rules = _ref13.rules;
    return {
        key: key || 'date',
        title: title || '',
        type: _index.INPUT_TYPES.DATE_SELECT,
        underControl: underControl,
        rules: rules || [{ required: true, message: '请输入!' }]
    };
};