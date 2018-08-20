import {INPUT_TYPES} from "./index";
import {validatorImg, validatorMobilePhone, validatorName} from "../modalConfig";

const getRules = (rules, title) => {
    // 空数组 不校验
    // undefine 校验必须输入
    // 数据 必须输入 && 自定义校验
    if (rules) {
        if (rules.length > 0) {
            return [
                { required: true, message: `请输入${title}!` },
                ...rules,
            ];
        } else {
            return [];
        }
    } else {
        return [{ required: true, message: `请输入${title}!` }];
    }
};

export const nameFormItem = ({key, title, type, placeholder, rules, disabled = false, underControl}) => ({
    key: key || 'user_name',
    title: title || '登录账号',
    type: type || INPUT_TYPES.INPUT,
    disabled,
    placeholder: placeholder || '请输入登录账号',
    rules: rules || [
        { required: true, message:`请输入登录账号`},
        {validator: validatorName},
    ],
    underControl,
});

export const mobileFormItem = ({key, title, type, placeholder, disabled = false, underControl}) => ({
    key: key || 'mobile',
    title: title || '手机号',
    type: type || INPUT_TYPES.INPUT,
    disabled,
    placeholder: placeholder || '请输入手机号',
    rules: [
        { required: true, message:'请输入手机号'},
        { validator: validatorMobilePhone },
    ],
    underControl,
});

export const emailFormItem = ({key, title, type, placeholder, rules, disabled = false, underControl}) => ({
    key: key || 'email',
    title: title || '电子邮箱',
    type: type || INPUT_TYPES.INPUT,
    disabled,
    placeholder: placeholder || '请输入电子邮箱',
    rules: rules || [
        { required: true, message:'请输入邮箱'},
        {
            validator: (rule, value, callBack) => {
                if (value && !value.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/)) {
                    callBack('邮箱格式错误');
                }
                callBack();
            },
        },
    ],
    underControl,
});

export const passwordFormItem = ({key, title, type, placeholder, rules, disabled = false, underControl}) => ({
    key: key || 'password',
    title: title || '登录密码',
    type: type || INPUT_TYPES.INPUT,
    disabled,
    placeholder: placeholder || '请输入登录密码',
    rules: rules || [
        { required: true, message:'请输入登录密码'},
        {validator: validatorName},
    ],
    underControl,
});

export const locationFormItem = ({key, title, type, level, placeholder, rules, disabled = false, underControl, cityCode, provinceCode}) => ({
    key: key || 'location',
    title: title || '地区',
    type: type || INPUT_TYPES.CASCADER,
    disabled,
    level: level || 2,
    placeholder: placeholder || '请选择地区',
    rules: rules || [
        { required: true, message:'请输入地区'},
    ],
    underControl,
    cityCode,
    provinceCode,
});
export const statusFormItem = ({key, title, type, placeholder, rules, disabled = false, dict, underControl}) => ({
    key: key || 'status',
    title: title || '状态',
    type: type || INPUT_TYPES.SELECT,
    dict: dict || [],
    disabled,
    placeholder: placeholder || '请选择状态',
    rules: rules || [
        { required: true, message:`请选择${title}`},
    ],
    underControl,
});

// 标准的select类型
export const selectFormItem = ({key, title, allowClear, placeholder, rules, disabled = false, dict, isSelectControl = false, underControl, getInitialValue}) => ({
    key: key || 'status',
    title: title || '状态',
    type: INPUT_TYPES.SELECT,
    dict: dict || [],
    disabled,
    isSelectControl, // 是否用来判断其他组件是否渲染
    placeholder: placeholder || '请选择状态',
    rules: rules || [
        { required: true, message:'请选择状态'},
    ],
    underControl,
    getInitialValue,
    allowClear,
});

export const inputFormItem = ({key, title, type, placeholder, rules, disabled = false, underControl, getInitialValue, require = true}) => ({
    key: key || 'input',
    title: title || '',
    type: disabled ? INPUT_TYPES.TEXT : (type || INPUT_TYPES.INPUT),
    disabled,
    placeholder: placeholder || `请输入${title}`,
    rules: disabled ? [] : getRules(rules, title, require),
    underControl,
    getInitialValue,
});

export const textFormItem = ({key, title, type, disabled, underControl, getInitialValue}) => ({
    key: key || 'text',
    title: title || '',
    type: type || INPUT_TYPES.TEXT,
    disabled,
    underControl,
    getInitialValue,
});

export const inputAreaFormItem = ({key, title, type, disabled, underControl, rules, getInitialValue}) => ({
    key: key || 'introduce',
    title: title || '',
    type: type || INPUT_TYPES.INPUT_AREA,
    disabled,
    underControl,
    rules: rules || [
        { required: true, message: '请输入!' },
    ],
    getInitialValue,
});

export const buttonFormItem = ({key, title, type, disabled, underControl, onClick}) => ({
    key: key || 'button',
    title: title || '按钮',
    type: type || INPUT_TYPES.BUTTON,
    underControl,
    onClick,
});
export const imageSelectFormItem = ({key, title, underControl, rules}) => ({
    key: key || 'introduce',
    title: title || '',
    type: INPUT_TYPES.IMAGE_SELECTOR,
    underControl,
    rules: rules || [
        { required: true, message: '请选择图片!' },
        {
            validator: validatorImg,
        },
    ],
});
export const dateSelectFormItem = ({key, title, underControl, rules}) => ({
    key: key || 'date',
    title: title || '',
    type: INPUT_TYPES.DATE_SELECT,
    underControl,
    rules: rules || [{ required: true, message: '请输入!' }],
});

