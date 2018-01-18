Ext.namespace('Ext.carApply');





Ext.carApply.cargrid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/querycarApply.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId','privateOrPublic', 'departureTime'
                , 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId','budgetCost','budgetKilometres', 'content'
                , 'remark','businessType', 'statuesId', 'activityId','orderFrom','carApplyNo', 'fleetName', 'loginName'
                ,'company','driverName','modelName','plateNoId','plateNo'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 80,
                fleetId: fleedId
            },
            listeners: {
                'beforeload' : function() {
                    console.log(this.getStore().baseParams);
                    Ext.apply(this.getStore().baseParams,
                        this.app.queryPanel.getQueryParams());

                },

                scope: this
            }
        });
        // 选择框
        this.sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect: true
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
                header: 'plateNoId',
                dataIndex: 'plateNoId',
                hidden: true
            },{
                header: '用乘车用户',
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
            }, {
                header: '车牌号',
                dataIndex: 'plateNo'
            }
            ]
        });
        // 菜单条
        this.tbar = new Ext.Toolbar([ {
            id: 'buttonDelcarApplyView',
            xtype: 'button',
            iconCls: 'delete',
            text: '审核',
            handler: this.onDelete,
            scope: this
        }]);
        // 页码条
        this.bbar = new Ext.PagingToolbar({
            pageSize: 80,
            displayInfo: true,
            store: this.ds
        });
        // 构造
        Ext.carApply.cargrid.superclass.constructor.call(this, {
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


    onDelete: function () {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        // var ary = Array();
        // for (var i = 0; i < selects.length; i++) {
        //     // var user = {
        //     //     carApplyNo: selects[i].data.carApplyNo
        //     // }
        //     var user = selects[i].data;
        //     ary.push(user);
        // }

        var  user = selects[0].data;


        // Ext.ux.Toast.msg("信息", Ext.encode(ary));
        Ext.Msg.confirm('删除操作', '核对信息后，确认审核', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/logistics/updatearApply.do', {
                    carApply: Ext.encode(user)
                }, function (resp) {
                    Ext.ux.Toast.msg('信息', '审核成功');
                    this.getStore().reload();
                }, this);
            }
        }, this);
    }
});

Ext.carApply.carqueryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width : 180,
            items : [{
                xtype : 'hidden',
                id : 'statuesId',
                value:'0'
            }]
        },{
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
                value: '0',
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
        Ext.carApply.carqueryPanel.superclass.constructor.call(this, {
            id: 'carApplyQueryPanel',
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
    getQueryParams : function() {
        //	Ext.ux.Toast.msg('ccc', this.getForm().getValues());
        return this.getForm().getValues();
    }

});


/**
 * 入口方法，用于定位动态加载文件
 *
 * @return {}
 */
var carApplyView = function (params) {
    this.queryPanel = new Ext.carApply.carqueryPanel(this);
    this.cargrid = new Ext.carApply.cargrid(this);

    this.busqueryPanel = new Ext.insanity.queryPanel(this);
    this.cqEvaRateGrid = new Ext.insanity.grid(this);

    this.insanitydriverPanel = new Ext.insanitydriver.queryPanel(this);
    this.insanitydriverGrid = new Ext.insanitydriver.grid(this);




    this.tabs = new Ext.TabPanel({
        region : 'center',
        deferredRender : true,
        enableTabScroll : true,
        tabPosition : 'top',
        activeTab : 0, // first tab initially active,
        defaults : {
            autoScroll : true,
            closable : false
        },
        items : [{
            title : '未审核订单',
            layout : 'border',
            items : [this.queryPanel,this.cargrid]
        }, {
            title : '已审核订单',
            layout : 'border',
            items : [this.busqueryPanel, this.cqEvaRateGrid]
        }, {
            title : '查看司机排班',
            layout : 'border',
            items : [this.insanitydriverPanel, this.insanitydriverGrid]
        }]
    })






    return new Ext.Panel({
        id: 'carApplyView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
        title: '用车申请审核管理',
        layout: 'border',
        items: [this.tabs]
    })
}
