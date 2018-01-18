Ext.namespace('Ext.insanitydriver');





Ext.insanitydriver.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/queryDriverRota.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields : ['id', 'fleetId', 'driverId','clockIn','clockOut','orderBy','fleetName','driverName'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 80,
                fleetId: fleedId,
                statuesId:1
            },
            listeners: {
                'beforeload': function () {
                    Ext.apply(this.getStore().baseParams,
                        this.app.queryPanel.getQueryParams());

                },
                scope: this
            }
        });
        // 选择框
        this.sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: false
        });
        // 列
        this.cm = new Ext.grid.ColumnModel({
            defaults : {
                width : 150,
                sortable : true
            },
            columns : [new Ext.grid.RowNumberer(), this.sm, {
                header : 'id',
                dataIndex : 'id',
                hidden : true
            }, {
                header : 'fleetId',
                dataIndex : 'fleetId',
                hidden : true
            },{
                header : 'driverId',
                dataIndex : 'driverId',
                hidden : true
            },{
                header : '司机姓名',
                dataIndex : 'driverName'
            }, {
                header : '上班时间',
                dataIndex : 'clockIn'
            }, {
                header : '下班时间',
                dataIndex : 'clockOut'
            }, {
                header : '所属平台',
                dataIndex : 'fleetName'
            },{
                header : '排序',
                dataIndex : 'orderBy'
            }]
        });

        // 页码条
        this.bbar = new Ext.PagingToolbar({
            pageSize: 80,
            displayInfo: true,
            store: this.ds
        });
        // 构造
        Ext.insanitydriver.grid.superclass.constructor.call(this, {
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



Ext.insanitydriver.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width: 180,
            items: [{
                xtype: 'combo',
                width: 60,
                fieldLabel: '价格类型',
                hiddenName: 'statuesId2',
                anchor: '98%',
                typeAhead: true,
                editable: false,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                value: '1',
                store: new Ext.data.ArrayStore({
                    fields: ['key', 'val'],
                    data: [['常规价格设置', '0'],
                        ['包车价格设置', '1']]
                }),
                valueField: 'val',
                displayField: 'key'
            }]
        }, {
            width: 65,
            items: [{
                xtype: 'button',
                id: 'userQuery',
                text: '查询',
                iconCls: 'query',
                handler: function () {
                    this.app.grid.getStore().load();
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
        Ext.insanitydriver.queryPanel.superclass.constructor.call(this, {
            id: 'driverTypeQueryPanel',
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