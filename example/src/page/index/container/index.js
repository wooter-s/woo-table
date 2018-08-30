import React, { Component } from 'react';
import 'babel-polyfill';
import { Table, inputFormItem } from 'index';
class Main extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
            <Table
                filter={[
                    inputFormItem({key: 'mobile_no', title: '手机号码', rules:[]}),
                ]}
                data={[]}
                columns={[
                    {
                        title: '手机号码',
                        key: 'mobile_no',
                        dataIndex: 'mobile_no',
                    },
                ]}
            />
		);
	}
}

export default Main;
