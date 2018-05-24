Ext.namespace('Ext.carApply');


var selectdata = null;


Ext.carApply.form = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        this.items = [{
            columnWidth: 1,
            items: [{
                id: 'carApplyNo1',
                fieldLabel: '订单编号',
                xtype: 'textfield',
                name: 'carApplyNo',
                editable: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'fleetName',
                fieldLabel: '所属平台',
                xtype: 'textfield',
                name: 'fleetName',
                editable: false,
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'company',
                fieldLabel: '所属机构',
                xtype: 'textfield',
                name: 'company',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'loginName',
                fieldLabel: '乘车用户',
                xtype: 'textfield',
                name: 'passengerName',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'departureTime1',
                fieldLabel: '出发时间',
                xtype: 'textfield',
                name: 'departureTime',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'startLocale',
                fieldLabel: '出发地',
                xtype: 'textfield',
                name: 'startLocale',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'localeName',
                fieldLabel: '途径地',
                xtype: 'textfield',
                name: 'localeName',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'endLocale',
                fieldLabel: '目的地',
                xtype: 'textfield',
                name: 'endLocale',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'carpoolYN',
                fieldLabel: '是否拼车',
                xtype: 'textfield',
                name: 'carpoolYN',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true,

            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'modelName3',
                fieldLabel: '车型',
                xtype: 'textfield',
                name: 'modelName',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'businessType3',
                fieldLabel: '业务类型',
                xtype: 'textfield',
                name: 'businessType',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'budgetCost',
                fieldLabel: '预算费用',
                xtype: 'textfield',
                name: 'budgetCost',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'budgetKilometres',
                fieldLabel: '预算公里数',
                xtype: 'textfield',
                name: 'budgetKilometres',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'content',
                fieldLabel: '出行事由',
                xtype: 'textfield',
                name: 'content',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                id: 'remark',
                fieldLabel: '用车备注',
                xtype: 'textfield',
                name: 'remark',
                anchor: '98%',
                readOnly: true,
                selectOnFocus: true
            }]
        }];

        Ext.carApply.form.superclass.constructor.call(this, {
            labelWidth: 60,
            baseCls: 'x-plain',
            layout: 'column',
            style: 'padding : 5',
            defaults: {
                baseCls: 'x-plain',
                layout: 'form'
            },
            listeners: {
                'render': function (form) {
                    // form.roleCombo.getStore().reload();
                }
            }
        });
    }

});


Ext.carApply.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.carApply.form(this);
        Ext.carApply.win.superclass.constructor.call(this, {
            width: 500,
            plain: true,
            showLock: true,
            modal: true,
            resizable: false,
            buttonAlign: 'center',
            items: this.form,
            buttons: [{
                id: 'carApplyButton',
                xtype: 'button',
                text: '审核通过',
                iconCls: 'add',
                handler: this.onAddcar,
                scope: this
            }, {
                id: 'cancelCarApplyButton',
                xtype: 'button',
                text: '审核不通过',
                iconCls: 'modify',
                handler: this.onModifycar,
                scope: this
            }, {
                id: 'cancelButton',
                xtype: 'button',
                text: '取消',
                iconCls: 'cancel',
                handler: this.onClosecar,
                scope: this
            }]
        });
    },
    onAddcar: function () {


        console.log("============" + selectdata);
        var carApply = {
            fleetId: selectdata.fleetId,
            carApplyNo: selectdata.carApplyNo,
            carTypeId: selectdata.carTypeId,
            activityId: selectdata.activityId,
            userId: selectdata.userId,

        }


        Ext.eu.ajax(path + '/logistics/updatearApply.do', {
            carApply: Ext.encode(carApply)
        }, function (resp) {
            Ext.ux.Toast.msg('信息', '审核成功');
            this.app.getStore().reload();
        }, this);
        // this.app.getStore().reload();
        this.close();

    },
    onModifycar: function () {
        var carApply = {
            fleetId: selectdata.fleetId,
            carApplyNo: selectdata.carApplyNo,
            carTypeId: selectdata.carTypeId,
            activityId: selectdata.activityId,
            userId: selectdata.userId,

        }

        Ext.eu.ajax(path + '/logistics/cancelcarApply.do', {
            carApply: Ext.encode(carApply)
        }, function (resp) {
            Ext.ux.Toast.msg('信息', '取消成功');
            this.app.getStore().reload();
        }, this);


        //this.app.getStore().reload();
        this.close();
    },

    onClosecar: function () {
        this.close();
    }
});


Ext.carApply.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/queryinsanity.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId', 'privateOrPublic', 'departureTime', 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId', 'budgetCost'
                , 'budgetKilometres', 'content', 'remark', 'businessType', 'statuesId', 'activityId', 'orderFrom', 'carApplyNo', 'fleetName', 'passengerName', 'company', 'driverName', 'modelName', 'localeName'],
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
            }, {
                header: 'companyId',
                dataIndex: 'companyId',
                hidden: true
            }, {
                header: 'userId',
                dataIndex: 'userId',
                hidden: true
            }, {
                header: 'driverId',
                dataIndex: 'driverId',
                hidden: true
            }, {
                header: 'statuesId',
                dataIndex: 'statuesId',
                hidden: true
            }, {
                header: '订单编号',
                dataIndex: 'carApplyNo'
            }, {
                header: '乘车用户',
                dataIndex: 'passengerName'
            }, {
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
            }, {
                header: '途径地',
                dataIndex: 'localeName'
            }, {
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
            }, {
                header: '订单来源',
                dataIndex: 'orderFrom'
            }, {
                header: '是否拼车',
                dataIndex: 'carpoolYN',
                // renderer : function(val) {
                //     if (val == false) {
                //         return '否';
                //     } else if (val == true){
                //         return '是';
                //     }
                // }
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
        Ext.carApply.grid.superclass.constructor.call(this, {
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

Ext.carApply.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width: 180,
            items: [{
                xtype: 'textfield',
                fieldLabel: '订单编号',
                id: 'insanitycarApplyNo',
                anchor: '90%'
            }]
        }, {
            width: 65,
            items: [{
                xtype: 'button',
                id: 'userQuery',
                text: '查询',
                iconCls: 'query',
                handler: function () {
                    //this.insanity.grid.getStore().load();
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
        Ext.carApply.queryPanel.superclass.constructor.call(this, {
            id: 'insanityQueryPanel',
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


Ext.carApply.carApplygrid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/querycarApply.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId', 'privateOrPublic', 'departureTime'
                , 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId', 'budgetCost', 'budgetKilometres', 'content'
                , 'remark', 'businessType', 'statuesId', 'activityId', 'orderFrom', 'carApplyNo', 'fleetName', 'passengerName'
                , 'company', 'driverName', 'modelName', 'plateNoId', 'plateNo', 'carApplyNo', 'localeName', 'applyDatetime', 'name', 'passengerTel'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 80,
                fleetId: fleedId,
                statuesId: '10'
            },
            listeners: {
                'beforeload': function () {
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
            }, {
                header: 'companyId',
                dataIndex: 'companyId',
                hidden: true
            }, {
                header: 'userId',
                dataIndex: 'userId',
                hidden: true
            }, {
                header: 'driverId',
                dataIndex: 'driverId',
                hidden: true
            }, {
                header: 'statuesId',
                dataIndex: 'statuesId',
                hidden: true
            }, {
                header: 'plateNoId',
                dataIndex: 'plateNoId',
                hidden: true
            }, {
                header: '订单编号',
                dataIndex: 'carApplyNo'
            }, {
                header: '订单申请时间',
                dataIndex: 'applyDatetime'
            }, {
                header: '乘车用户',
                dataIndex: 'name'
            }, {
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
            }, {
                header: '途径地',
                dataIndex: 'localeName'
            }, {
                header: '目的地',
                dataIndex: 'endLocale'
            }, {
                header: '预算费用',
                dataIndex: 'budgetCost'
            }, {
                header: '预算公里数',
                dataIndex: 'budgetKilometres'
            }, {
                header: '出行事由',
                dataIndex: 'content'
            }, {
                header: '用车备注',
                dataIndex: 'remark'
            }, {
                header: '订单来源',
                dataIndex: 'orderFrom'
            }, {
                header: '是否拼车',
                dataIndex: 'carpoolYN',
                renderer: function (val) {
                    if (val == false) {
                        return '否';
                    } else if (val == true) {
                        return '是';
                    }
                }
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
        this.tbar = new Ext.Toolbar([{
            id: 'buttonAdddriverTypeView',
            xtype: 'button',
            iconCls: 'add',
            text: '查看订单详情',
            handler: this.onAdd,
            scope: this
        }, {
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
        Ext.carApply.carApplygrid.superclass.constructor.call(this, {
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


    onAdd: function (btn) {

        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要查看的记录！");
            return;
        }
        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }


        var select = selects[0].data;
        console.log(select);
        var win = new Ext.carApply.win(this);
        var form = win.form.getForm();
        win.setTitle('查看订单详情', 'modify');
        if (select.carpoolYN == false) {
            select.carpoolYN = '否';
        }
        if (select.carpoolYN == true) {
            select.carpoolYN = '是';
        }

        form.findField('fleetName').setValue(select.fleetName);
        form.findField('loginName').setValue(select.name);
        form.findField('company').setValue(select.company);
        form.findField('departureTime').setValue(select.departureTime);
        form.findField('startLocale').setValue(select.startLocale);
        form.findField('endLocale').setValue(select.endLocale);
        form.findField('carpoolYN').setValue(select.carpoolYN);
        form.findField('budgetCost').setValue(select.budgetCost);
        form.findField('budgetKilometres').setValue(select.budgetKilometres);
        form.findField('content').setValue(select.content);
        form.findField('remark').setValue(select.remark);
        form.findField('carApplyNo1').setValue(select.carApplyNo);
        //form.findField('carApplyNo1').setValues("1111");
        form.findField('modelName3').setValue(select.modelName)
        form.findField('localeName').setValue(select.localeName);
        form.findField('businessType3').setValue(select.businessType);
        win.show();
        Ext.getCmp('carApplyButton').setVisible(false);
        Ext.getCmp('cancelCarApplyButton').setVisible(false);
        Ext.getCmp('cancelButton').setVisible(true);

    },

    onDelete: function () {

        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要审核的记录！");
            return;
        }
        var select = selects[0].data;
        selectdata = selects[0].data;
        console.log(select);
        if (select.carpoolYN == false) {
            select.carpoolYN = '否';
        }
        if (select.carpoolYN == true) {
            select.carpoolYN = '是';
        }
        var win = new Ext.carApply.win(this);
        var form = win.form.getForm();
        win.setTitle('查看订单详情', 'modify');


        form.findField('fleetName').setValue(select.fleetName);
        form.findField('passengerName').setValue(select.name);
        form.findField('company').setValue(select.company);

        form.findField('departureTime1').setValue(select.departureTime);
        form.findField('startLocale').setValue(select.startLocale);
        form.findField('endLocale').setValue(select.endLocale);
        form.findField('carpoolYN').setValue(select.carpoolYN);
        form.findField('budgetCost').setValue(select.budgetCost);
        form.findField('budgetKilometres').setValue(select.budgetKilometres);
        form.findField('content').setValue(select.content);
        form.findField('remark').setValue(select.remark);
        form.findField('carApplyNo1').setValue(select.carApplyNo);
        form.findField('localeName').setValue(select.localeName);

        win.show();
        Ext.getCmp('carApplyButton').setVisible(true);
        Ext.getCmp('cancelCarApplyButton').setVisible(true);
        Ext.getCmp('cancelButton').setVisible(false);


        // var ary = Array();
        // for (var i = 0; i < selects.length; i++) {
        //     // var user = {
        //     //     carApplyNo: selects[i].data.carApplyNo
        //     // }
        //     var user = selects[i].data;
        //     ary.push(user);
        // }

        // var  user = selects[0].data;
        //
        //
        // // Ext.ux.Toast.msg("信息", Ext.encode(ary));
        // Ext.Msg.confirm('删除操作', '核对信息后，确认审核', function (btn) {
        //     if (btn == 'yes') {
        //         Ext.eu.ajax(path + '/logistics/updatearApply.do', {
        //             carApply: Ext.encode(user)
        //         }, function (resp) {
        //             Ext.ux.Toast.msg('信息', '审核成功');
        //             this.getStore().reload();
        //         }, this);
        //     }
        // }, this);
    }
});

Ext.carApply.carApplyqueryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width: 180,
            items: [{
                xtype: 'textfield',
                fieldLabel: '订单编号',
                id: 'carApplyNo2',
                name: 'carApplyNo',
                anchor: '90%'
            }]
        }, {
            width: 65,
            items: [{
                xtype: 'button',
                id: 'userQuery',
                text: '查询',
                iconCls: 'query',
                handler: function () {
                    this.app.carxxgrid.getStore().load();
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
        Ext.carApply.carApplyqueryPanel.superclass.constructor.call(this, {
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
    getQueryParams: function () {
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
    this.queryPanel = new Ext.carApply.carApplyqueryPanel(this);
    this.carxxgrid = new Ext.carApply.carApplygrid(this);


    //this.busqueryPanel = new Ext.insanity.queryPanel(this);
    //this.cqEvaRateGrid = new Ext.insanity.grid(this);

    this.busqueryPanel = new Ext.carApply.queryPanel(this);
    this.cqEvaRateGrid = new Ext.carApply.grid(this);


    var re = remark != '调度员' ? 1 : 0;


    Ext.getCmp('buttonDelcarApplyView').hidden = !re;


    this.tabs = new Ext.TabPanel({
        region: 'center',
        deferredRender: true,
        enableTabScroll: true,
        tabPosition: 'top',
        activeTab: 0, // first tab initially active,
        defaults: {
            autoScroll: true,
            closable: false
        },
        items: [{
            title: '未审核订单',
            layout: 'border',
            items: [this.queryPanel, this.carxxgrid]
        }, {
            title: '已审核订单',
            layout: 'border',
            items: [this.busqueryPanel, this.cqEvaRateGrid]
        }],
        listeners: {
            'tabchange': function (t, n) {
                this.carxxgrid.getStore().reload();
                this.cqEvaRateGrid.getStore().reload();
            },
            scope: this
        },
    })


    return new Ext.Panel({
        id: 'carApplyView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
        title: '用车申请审核管理',
        layout: 'border',
        items: [this.tabs]
    })
}
