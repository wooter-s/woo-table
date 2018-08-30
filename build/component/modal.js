'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleModal = function (_React$Component) {
    _inherits(SimpleModal, _React$Component);

    function SimpleModal() {
        var _ref,
            _this2 = this;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleModal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleModal.__proto__ || Object.getPrototypeOf(SimpleModal)).call.apply(_ref, [this].concat(args))), _this), _this.handleOk = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.props.onSave();

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        })), _this.handleCancel = function () {
            _this.props.toggle();
        }, _this._getFooter = function () {
            var footer = [_react2.default.createElement(
                _antd.Button,
                { key: 'back', size: 'large', onClick: _this.handleCancel },
                _this.props.cancelText || '取消'
            )];
            if (_this.props.onSave) {
                footer = [].concat(_toConsumableArray(footer), [_react2.default.createElement(
                    _antd.Button,
                    { key: 'submit', type: 'primary', size: 'large', loading: _this.props.buttonLoading, onClick: _this.handleOk },
                    _this.props.okText || '保存'
                )]);
            } else {
                footer = null;
            }
            return footer;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SimpleModal, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _antd.Modal,
                _extends({}, this.props, {
                    onOk: this.handleOk,
                    onCancel: this.handleCancel,
                    width: this.props.width || "70%",
                    maskClosable: false,
                    confirmLoading: this.props.confirmLoading,
                    footer: this._getFooter()
                }),
                this.props.children
            );
        }
    }]);

    return SimpleModal;
}(_react2.default.Component);

SimpleModal.PropTypes = {
    visible: _propTypes2.default.bool.isRequired,
    toggle: _propTypes2.default.func.isRequired,
    onSave: _propTypes2.default.func.isRequired
};
exports.default = SimpleModal;