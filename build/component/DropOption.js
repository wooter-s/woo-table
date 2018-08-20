'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DropOption = function DropOption(_ref) {
    var onMenuClick = _ref.onMenuClick,
        _ref$menuOptions = _ref.menuOptions,
        menuOptions = _ref$menuOptions === undefined ? [] : _ref$menuOptions,
        buttonStyle = _ref.buttonStyle,
        dropdownProps = _ref.dropdownProps;

    var menu = menuOptions.map(function (item) {
        return _react2.default.createElement(
            _antd.Menu.Item,
            { key: item.key },
            item.label
        );
    });
    return _react2.default.createElement(
        _antd.Dropdown,
        _extends({
            overlay: _react2.default.createElement(
                _antd.Menu,
                { onClick: onMenuClick },
                menu
            )
        }, dropdownProps),
        _react2.default.createElement(
            _antd.Button,
            { style: _extends({ border: 'none' }, buttonStyle) },
            _react2.default.createElement(_antd.Icon, { style: { marginRight: 2 }, type: 'bars' }),
            _react2.default.createElement(_antd.Icon, { type: 'down' })
        )
    );
};

DropOption.propTypes = {
    onMenuClick: _propTypes2.default.func,
    menuOptions: _propTypes2.default.array.isRequired,
    buttonStyle: _propTypes2.default.object,
    dropdownProps: _propTypes2.default.object
};

exports.default = DropOption;