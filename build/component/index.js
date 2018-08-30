'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imageSelectFormItem = exports.passwordFormItem = exports.emailFormItem = exports.mobileFormItem = exports.nameFormItem = exports.inputAreaFormItem = exports.buttonFormItem = exports.textFormItem = exports.selectFormItem = exports.inputFormItem = exports.BaseForm = exports.Table = exports.INTERACTION_TYPE = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _formItemConfig = require('./form/formItemConfig');

Object.defineProperty(exports, 'inputFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.inputFormItem;
    }
});
Object.defineProperty(exports, 'selectFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.selectFormItem;
    }
});
Object.defineProperty(exports, 'textFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.textFormItem;
    }
});
Object.defineProperty(exports, 'buttonFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.buttonFormItem;
    }
});
Object.defineProperty(exports, 'inputAreaFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.inputAreaFormItem;
    }
});
Object.defineProperty(exports, 'nameFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.nameFormItem;
    }
});
Object.defineProperty(exports, 'mobileFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.mobileFormItem;
    }
});
Object.defineProperty(exports, 'emailFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.emailFormItem;
    }
});
Object.defineProperty(exports, 'passwordFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.passwordFormItem;
    }
});
Object.defineProperty(exports, 'imageSelectFormItem', {
    enumerable: true,
    get: function get() {
        return _formItemConfig.imageSelectFormItem;
    }
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

var _DropOption = require('./DropOption');

var _DropOption2 = _interopRequireDefault(_DropOption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import QueueAnim from 'rc-queue-anim';


var MESSAGE_DURATION = 2;

var Search = _antd.Input.Search;
var PAGE_SIZE = 10;
var INTERACTION_TYPE = exports.INTERACTION_TYPE = {
    MODAL: 'MODAL',
    FETCH: 'FETCH'
};

var SimpleTable = function (_React$Component) {
    _inherits(SimpleTable, _React$Component);

    function SimpleTable(props) {
        var _this2 = this;

        _classCallCheck(this, SimpleTable);

        var _this = _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this, props));

        _this.getPagination = function () {
            if (_this.props.hidePagination) {
                return false;
            } else {
                return {
                    current: _this.state.current,
                    pageSize: _this.state.pageSize,
                    total: _this.props.data && _this.props.data.total || null,
                    showSizeChanger: true,
                    showQuickJumper: true
                };
            }
        };

        _this._onChange = function (pagination, filters, sorter) {
            var searchParams = _extends({}, _this.state.searchParams, filters, sorter);
            var current = pagination.current,
                pageSize = pagination.pageSize;
            // 每页条数变化，重置页码为1

            if (_this.state.pageSize !== pageSize) {
                current = 1;
            }
            _this._fetchData({ page: current, size: pageSize, searchParams: searchParams });
            _this.setState({
                current: current,
                pageSize: pageSize,
                searchParams: searchParams
            });
        };

        _this.getColumns = function () {
            if (_this.props.operationEditLabel && _this.props.operationEditLabel()) {
                return [].concat(_toConsumableArray(_this.props.columns), [{
                    title: '操作',
                    width: 100,
                    render: function render(data) {
                        return _react2.default.createElement(_DropOption2.default, { onMenuClick: function onMenuClick(e) {
                                return _this.handleOperationMenuClick(e, data);
                            }, menuOptions: _this.props.operationEditLabel(data) });
                    }
                }]);
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

            return _this.props.columns;
        };

        _this.saveData = function () {
            var _ref = _asyncToGenerator(_regenerator2.default.mark(function _callee(data) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _this.setState({
                                    spinning: true
                                });
                                _context.prev = 1;
                                _context.next = 4;
                                return _this.props.saveData(data);

                            case 4:
                                _antd.message.info("更新成功", MESSAGE_DURATION);
                                _context.next = 7;
                                return _this._fetchData({ page: _this.state.current, size: _this.state.pageSize });

                            case 7:
                                _context.next = 13;
                                break;

                            case 9:
                                _context.prev = 9;
                                _context.t0 = _context['catch'](1);

                                _antd.message.error(_context.t0);
                                console.log('saveData err', _context.t0);

                            case 13:
                                _this.setState({
                                    spinning: false
                                });

                            case 14:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[1, 9]]);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.handleOperationMenuClick = function () {
            var _ref2 = _asyncToGenerator(_regenerator2.default.mark(function _callee2(e, data) {
                var targetOperations, result;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                // 找到对应的列
                                targetOperations = _this.props.operationEdit.find(function (item) {
                                    return item.key === e.key;
                                });

                                if (!(targetOperations && targetOperations.openLink)) {
                                    _context2.next = 4;
                                    break;
                                }

                                targetOperations.openLink(data);
                                return _context2.abrupt('return');

                            case 4:
                                if (!(targetOperations && targetOperations.getDataWhenClick)) {
                                    _context2.next = 27;
                                    break;
                                }

                                _context2.prev = 5;

                                _this.setState({
                                    spinning: true
                                });
                                _context2.next = 9;
                                return targetOperations.getDataWhenClick(data);

                            case 9:
                                result = _context2.sent;

                                if (!result) {
                                    _context2.next = 18;
                                    break;
                                }

                                if (!(targetOperations.interactionType === INTERACTION_TYPE.MODAL)) {
                                    _context2.next = 15;
                                    break;
                                }

                                _this._modifyItem(result, targetOperations, e);
                                _context2.next = 18;
                                break;

                            case 15:
                                if (!(targetOperations.interactionType === INTERACTION_TYPE.FETCH)) {
                                    _context2.next = 18;
                                    break;
                                }

                                _context2.next = 18;
                                return _this._fetchData({ page: _this.state.current, size: _this.state.pageSize, keyword: _this.state.searchValue });

                            case 18:
                                _context2.next = 24;
                                break;

                            case 20:
                                _context2.prev = 20;
                                _context2.t0 = _context2['catch'](5);

                                console.log('getDataWhenClick err', _context2.t0);
                                _antd.message.error(_context2.t0.msg);

                            case 24:
                                _this.setState({
                                    spinning: false
                                });
                                _context2.next = 28;
                                break;

                            case 27:
                                if (targetOperations.interactionType === INTERACTION_TYPE.MODAL) {
                                    _this._modifyItem({ data: data }, targetOperations, e);
                                }

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2, [[5, 20]]);
            }));

            return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
            };
        }();

        _this._renderAddButton = function () {
            return _react2.default.createElement(
                'div',
                null,
                _this.props.operationAdd && _react2.default.createElement(
                    _antd.Button,
                    { style: { marginRight: 10 }, type: 'primary', size: 'large', onClick: function onClick() {
                            return _this._addItem();
                        }, disabled: typeof _this.props.operationAdd === 'boolean' },
                    _react2.default.createElement(_antd.Icon, { type: 'plus' }),
                    _this.props.operationAddLabel ? _this.props.operationAddLabel : '新增'
                ),
                _this.props.search && _react2.default.createElement(Search, {
                    placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u67E5\u8BE2',
                    size: 'large',
                    value: _this.state.searchValue,
                    className: _index2.default.search,
                    onChange: function onChange(e) {
                        return _this.setState({ searchValue: e.target.value });
                    },
                    onSearch: _this._searchBarOnClick
                })
            );
        };

        _this._onSave = _asyncToGenerator(_regenerator2.default.mark(function _callee3() {
            var target, value, result, _result;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!_this.state.modalSpinning) {
                                _context3.next = 3;
                                break;
                            }

                            _antd.message.info("别急，请求处理中");
                            return _context3.abrupt('return');

                        case 3:
                            if (!(_this.state.originData || _this.state.operationType === 'add')) {
                                _context3.next = 41;
                                break;
                            }

                            target = void 0;
                            // var values;

                            if (_this.state.operationType === 'add') {
                                target = _this.props.operationAdd.find(function (item) {
                                    return item.key === _this.state.operationType;
                                });
                            } else {
                                target = _this.props.operationEdit.find(function (item) {
                                    return item.key === _this.state.originData.key;
                                });
                            }
                            _context3.prev = 6;

                            if (!target.onOk) {
                                _context3.next = 35;
                                break;
                            }

                            _context3.next = 10;
                            return target.validate();

                        case 10:
                            value = _context3.sent;

                            if (!value) {
                                _context3.next = 31;
                                break;
                            }

                            if (!(_this.state.operationType === 'add')) {
                                _context3.next = 22;
                                break;
                            }

                            _this.setState({
                                modalSpinning: true
                            });
                            _context3.next = 16;
                            return target.onOk(value);

                        case 16:
                            result = _context3.sent;

                            _this.setState({
                                modalSpinning: false
                            });

                            if (result) {
                                _context3.next = 20;
                                break;
                            }

                            return _context3.abrupt('return');

                        case 20:
                            _context3.next = 29;
                            break;

                        case 22:
                            _this.setState({
                                modalSpinning: true
                            });
                            _context3.next = 25;
                            return target.onOk(_this.state.itemData, value);

                        case 25:
                            _result = _context3.sent;

                            _this.setState({
                                modalSpinning: false
                            });

                            if (_result) {
                                _context3.next = 29;
                                break;
                            }

                            return _context3.abrupt('return');

                        case 29:
                            _context3.next = 32;
                            break;

                        case 31:
                            return _context3.abrupt('return');

                        case 32:
                            if (target.notRefresh) {
                                _context3.next = 35;
                                break;
                            }

                            _context3.next = 35;
                            return _this._fetchData({ page: _this.state.current, keyword: _this.state.searchValue, size: _this.state.pageSize });

                        case 35:
                            _this.setState({
                                visible: !_this.state.visible
                            });
                            _context3.next = 41;
                            break;

                        case 38:
                            _context3.prev = 38;
                            _context3.t0 = _context3['catch'](6);

                            console.log('_onSaveByUpdate err on table', _context3.t0);

                        case 41:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2, [[6, 38]]);
        }));
        _this._searchBarOnClick = _asyncToGenerator(_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _this.setState({
                                spinning: true,
                                current: 1
                            }, _asyncToGenerator(_regenerator2.default.mark(function _callee4() {
                                return _regenerator2.default.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                _context4.prev = 0;
                                                _context4.next = 3;
                                                return _this.props.search({ keyword: _this.state.searchValue, page: _this.state.current, size: _this.state.pageSize, searchParams: _this.state.searchParams });

                                            case 3:
                                                _context4.next = 7;
                                                break;

                                            case 5:
                                                _context4.prev = 5;
                                                _context4.t0 = _context4['catch'](0);

                                            case 7:
                                                _this.setState({ spinning: false });

                                            case 8:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, _this2, [[0, 5]]);
                            })));

                        case 1:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2);
        }));

        _this._fetchData = function () {
            var _ref6 = _asyncToGenerator(_regenerator2.default.mark(function _callee6(_ref7) {
                var page = _ref7.page,
                    size = _ref7.size,
                    keyword = _ref7.keyword,
                    searchParams = _ref7.searchParams;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (_this.props.fetchData) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return');

                            case 2:
                                _this.setState({
                                    spinning: true
                                });
                                _context6.prev = 3;
                                _context6.next = 6;
                                return _this.props.fetchData({ page: page, size: size, keyword: keyword, searchParams: searchParams });

                            case 6:
                                _context6.next = 12;
                                break;

                            case 8:
                                _context6.prev = 8;
                                _context6.t0 = _context6['catch'](3);

                                _antd.message.error(_context6.t0);
                                console.log('_fetchData err', _this.props.fetchData, _context6.t0);

                            case 12:
                                _this.setState({
                                    spinning: false
                                });

                            case 13:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this2, [[3, 8]]);
            }));

            return function (_x4) {
                return _ref6.apply(this, arguments);
            };
        }();

        _this._confirmDelete = function () {
            if (_this.state.selectedRows.length < 1) {
                _antd.message.info('请先选择要删除列');
                return;
            }
            _antd.Modal.confirm({
                title: '确认删除吗',
                okText: '确认',
                cancelText: '取消',
                onOk: function onOk() {
                    return _this._delete();
                }
            });
        };

        _this._delete = _asyncToGenerator(_regenerator2.default.mark(function _callee7() {
            return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _this.setState({
                                spinning: true
                            });
                            _context7.prev = 1;
                            _context7.next = 4;
                            return _this.props.delete(_this.state.selectedRows);

                        case 4:
                            _context7.next = 6;
                            return _this._fetchData({ page: _this.state.current, size: _this.state.pageSize });

                        case 6:
                            _context7.next = 12;
                            break;

                        case 8:
                            _context7.prev = 8;
                            _context7.t0 = _context7['catch'](1);

                            _antd.message.error(_context7.t0.msg, MESSAGE_DURATION);
                            console.log('_delete err', _context7.t0);

                        case 12:
                            _this.setState({
                                spinning: false,
                                selectedRowKeys: [],
                                selectedRows: []
                            });

                        case 13:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, _this2, [[1, 8]]);
        }));

        _this._addItem = function () {
            var addOperation = _this.props.operationAdd.find(function (item) {
                return item.key === 'add';
            });
            if (addOperation) {
                _this.setState({
                    visible: true,
                    showSpin: addOperation.showSpin,
                    itemData: null,
                    editable: true,
                    modalContent: addOperation.modalContent(),
                    needSave: true,
                    addOperation: addOperation,
                    modalTitle: addOperation.modalTitle,
                    operationType: 'add'
                });
            }
        };

        _this._modifyItem = function (item, targetOperations, originData) {
            _this.setState({
                visible: true,
                showSpin: targetOperations.showSpin,
                itemData: item,
                editable: true,
                modalContent: targetOperations.modalContent(item),
                modalTitle: targetOperations.modalTitle,
                // needSave: targetOperations.needSave ? targetOperations.needSave(item) : true,
                originData: originData,
                targetOperations: targetOperations,
                operationType: targetOperations.key
            });
        };

        _this.filter = null;
        _this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            spinning: false,
            showSpin: false,
            modalSpinning: false,
            visible: false,
            showQrcode: false,
            editable: false,
            current: 1,
            pageSize: props.pageSize || PAGE_SIZE,
            selectedRows: [],
            searchValue: null,
            searchParams: {}, // 搜索参数
            modalContent: null,
            needSave: true,
            targetOperations: {},
            operationType: ''
        };
        return _this;
    }

    _createClass(SimpleTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._fetchData({ page: this.state.current, size: this.state.pageSize, keyword: this.state.searchValue, searchParams: this.state.searchParams });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var rowSelection = {
                selectedRowKeys: this.state.selectedRowKeys,
                onChange: function onChange(selectedRowKeys, selectedRows) {
                    _this3.setState({
                        selectedRowKeys: selectedRowKeys,
                        selectedRows: selectedRows
                    });
                }
            };
            return _react2.default.createElement(
                _antd.Spin,
                { tip: '\u52A0\u8F7D\u4E2D', spinning: this.state.spinning, size: 'large' },
                this.props.filter ? this.renderFilterForm() : this.renderButtonGroup(),
                this.props.filterOperate && this.props.filterOperate(),
                this.renderModal(),
                _react2.default.createElement(_antd.Table, {
                    scroll: this.props.scroll,
                    pagination: this.getPagination(),
                    expandedRowRender: this.props.expandedRowRender,
                    onChange: this._onChange,
                    rowSelection: this.props.isSelected && rowSelection,
                    columns: this.getColumns(),
                    dataSource: this.props.data && this.props.data.datas && this.props.data.datas.map(function (item, i) {
                        return _extends({}, item, { key: i });
                    }) || null })
            );
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

    }, {
        key: 'renderModal',
        value: function renderModal() {
            var _this4 = this;

            if (this.state.visible) {
                return _react2.default.createElement(
                    _modal2.default,
                    {
                        title: this.state.modalTitle || '',
                        visible: this.state.visible,
                        cancelText: (this.state.operationType === 'add' ? this.state.addOperation.cancelText : this.state.targetOperations.cancelText) || '取消',
                        okText: (this.state.operationType === 'add' ? this.state.addOperation.okText : this.state.targetOperations.okText) || '保存',
                        toggle: function toggle() {
                            return _this4.setState({ visible: !_this4.state.visible });
                        },
                        style: { width: 900 },
                        buttonLoading: this.state.modalSpinning,
                        onSave: this.state.needSave ? this._onSave : false },
                    this.state.modalContent
                );
            }
        }
    }, {
        key: 'renderFilterForm',
        value: function renderFilterForm() {
            var _this5 = this;

            /**
             this.props.filter
             * */
            if (this.props.filter) {
                return _react2.default.createElement(_form2.default, {
                    filterCol: this.props.filterCol,
                    rowStyle: { marginBottom: 16 },
                    ref: function ref(_ref9) {
                        return _this5.filter = _ref9;
                    },
                    dataSource: this.props.filterDataSource || {},
                    formColumns: [].concat(_toConsumableArray(this.props.filter), [(0, _formItemConfig.buttonFormItem)({
                        title: '查询',
                        onClick: function onClick() {
                            _this5.filter.validateFields(function (err, value) {
                                if (err) {
                                    return;
                                }
                                _this5.setState({
                                    searchParams: _extends({}, _this5.state.searchParams, value),
                                    pageSize: _this5.state.pageSize,
                                    current: 1
                                });
                                _this5._fetchData({
                                    page: 1,
                                    size: _this5.state.pageSize,
                                    keyword: _this5.state.searchValue,
                                    searchParams: _extends({}, _this5.state.searchParams, value)
                                });
                            });
                        } })])
                });
                // return this.props.filter;
            }
        }
    }, {
        key: 'renderButtonGroup',


        // 展示一列
        // _showItem = (itemDetailData, content, originData) => {
        //     this.setState({
        //         visible:true,
        //         modalContent: content,
        //         editable:false,
        //         originData,
        //     });
        // }
        value: function renderButtonGroup() {
            var _this6 = this;

            return _react2.default.createElement(
                'div',
                { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 5 } },
                this._renderAddButton(),
                _react2.default.createElement(
                    'div',
                    null,
                    this.props.qrcode && _react2.default.createElement(
                        _antd.Button,
                        {
                            size: 'large', onClick: function onClick() {
                                return _this6.setState({ showQrcode: !_this6.state.showQrcode });
                            } },
                        _react2.default.createElement(_antd.Icon, { type: 'qrcode' })
                    ),
                    this.props.delete && _react2.default.createElement(
                        _antd.Button,
                        {
                            size: 'large', onClick: this._confirmDelete },
                        _react2.default.createElement(_antd.Icon, { type: 'delete' })
                    ),
                    this.props.refresh && _react2.default.createElement(
                        _antd.Button,
                        {
                            size: 'large',
                            onClick: function onClick() {
                                return _this6._fetchData({ page: _this6.state.current, size: _this6.state.pageSize, keyword: _this6.state.searchValue, searchParams: _this6.state.searchParams });
                            } },
                        _react2.default.createElement(_antd.Icon, { type: 'reload' })
                    )
                )
            );
        }

        // 新增按钮


        // 更新


        // 搜索


        // 刷新


        // 确认删除


        // 删除


        // 添加


        // 修改一列

    }]);

    return SimpleTable;
}(_react2.default.Component);

SimpleTable.PropTypes = {
    fetchData: _propTypes2.default.func.isRequired,
    data: _propTypes2.default.object.isRequired,
    columns: _propTypes2.default.array.isRequired,
    operationEdit: _propTypes2.default.func.isRequired,
    hidePagination: _propTypes2.default.bool
    // dataTemplate: PropTypes.object.isRequired,
    // fields: PropTypes.object.isRequired,
};
exports.Table = SimpleTable;
exports.BaseForm = _form2.default;