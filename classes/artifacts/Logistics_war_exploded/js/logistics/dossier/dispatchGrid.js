Ext.namespace('Ext.dispatch');





Ext.dispatch.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/querydispatch.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId','privateOrPublic', 'departureTime', 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId','budgetCost'
                ,'budgetKilometres', 'content', 'remark','businessType', 'statuesId', 'activityId','orderFrom','carApplyNo', 'fleetName', 'loginName','company','driverName','modelName'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 80,
                fleetId: fleedId
            },
            // listeners: {
            //     'beforeload': function () {
            //         Ext.apply(this.getStore().baseParams,
            //             this.app.busqueryPanel.getQueryParams());
            //
            //     },
            //     scope: this
            // }
        });
        // 选择框
        this.sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: false
        });
        // 列
        this.cm = new Ext.grid.ColumnModel({
            defaults: {
                width: 80,
                sortable: true
            },
            columns: [new Ext.grid.RowNumberer(), this.sm, {
                header: 'carApplyNo',
                dataIndex: 'carApplyNo',
                hidden: true
            }, {
                header: 'fleetId',
                dataIndex: 'fleetId',
                hidden: true
            },{
                header: 'companyId',
                dataIndex: 'companyId',
                hidden: true
            },{
                header: 'userId',
                dataIndex: 'userId',
                hidden: true
            },{
                header: 'driverId',
                dataIndex: 'driverId',
                hidden: true
            }, {
                header: 'statuesId',
                dataIndex: 'statuesId',
                hidden: true
            },{
                header: '订单编号',
                dataIndex: 'carApplyNo'
            },{
                header: '乘车用户',
                dataIndex: 'loginName'
            },{
                header: '业务类型',
                dataIndex: 'businessType'
            }, {
                header: '付费方式',
                dataIndex: 'privateOrPublic'
            }, {
                header: '出发时间',
                dataIndex: 'departureTime'
            }, {
                header: '出发地',
                dataIndex: 'startLocale'
            },{
                header: '目的地',
                dataIndex: 'endLocale'
            }, {
                header: '预算费用',
                dataIndex: 'budgetCost'
            }, {
                header: '预算公里数',
                dataIndex: 'budgetKilometres'
            }, {
                header: '出现事由',
                dataIndex: 'content'
            }, {
                header: '用车备注',
                dataIndex: 'remark'
            },{
                header: '订单来源',
                dataIndex: 'orderFrom'
            }, {
                header: '所属平台',
                dataIndex: 'fleetName'
            }, {
                header: '所属机构',
                dataIndex: 'company'
            }, {
                header: '司机',
                dataIndex: 'driverName'
            }, {
                header: '车型',
                dataIndex: 'modelName'
            }
            ]
        });

        // 页码条
        this.bbar = new Ext.PagingToolbar({
            pageSize: 80,
            displayInfo: true,
            store: this.ds
        });
        // 构造
        Ext.dispatch.grid.superclass.constructor.call(this, {
            region: 'center',
            loadMask: 'loading...',
            columnLines: true,
            clicksToEdit: 1,
            stripeRows: true,
            viewConfig: {
                forceFit: true
            }
        });
    },


});



Ext.dispatch.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width : 180,
            items : [{
                xtype : 'textfield',
                fieldLabel : '订单编号',
                id : 'carApplyNodispatch',
                name:'carApplyNo',
                anchor : '90%'
            }]
        }, {
            width: 65,
            items: [{
                xtype: 'button',
                id: 'userQuery',
                text: '查询',
                iconCls: 'query',
                handler: function () {
                    Ext.apply(this.app.cqEvaRateGrid.getStore().baseParams,
                                     this.app.busqueryPanel.getQueryParams());
                    this.app.cqEvaRateGrid.getStore().load();
                },
                scope: this
            }]
        }, {
            width: 65,
            items: [{
                xtype: 'button',
                id: 'userReset',
                text: '清空',
                iconCls: 'reset',
                handler: function () {
                    this.getForm().reset();
                },
                scope: this
            }]
        }];
        // panel定义
        Ext.dispatch.queryPanel.superclass.constructor.call(this, {
            id: 'dispatchQueryPanel',
            region: 'north',
            height: 40,
            frame: true,
            split: true,
            collapseMode: 'mini',
            layout: 'column',
            labelAlign: 'right',
            defaults: {
                layout: 'form',
                labelWidth: 60
            }
        });
    },
    getQueryParams: function () {
        //	Ext.ux.Toast.msg('ccc', this.getForm().getValues());
        return this.getForm().getValues();
    }
});