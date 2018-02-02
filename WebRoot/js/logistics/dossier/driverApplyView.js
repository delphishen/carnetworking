Ext.namespace('Ext.driverApply');


Ext.driverApply.form = Ext.extend(Ext.FormPanel, {
    constructor : function(app) {
        this.app = app;


        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new driverSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('driverId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });



        this.truckSelector = new Ext.form.TriggerField({
            fieldLabel : '车牌号',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new truckSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('plateNoId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });



        this.items = [{
            xtype : 'hidden',
            id : 'carApplyNo'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            xtype : 'hidden',
            id : 'plateNoId'
        },  {
            columnWidth : 1,
            items : [{

                id:'privateOrPublic',
                fieldLabel : '付款方式',
                xtype : 'textfield',
                readOnly : true,
                name : 'privateOrPublic',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'startLocale',
                fieldLabel : '出发点',
                xtype : 'textfield',
                readOnly : true,
                name : 'startLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'endLocale',
                fieldLabel : '终点站',
                xtype : 'textfield',
                readOnly : true,
                name : 'endLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'carTypeId',
                fieldLabel : '申请车型',
                xtype : 'textfield',
                readOnly : true,
                name : 'carTypeId',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetCost',
                fieldLabel : '预算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetCost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetKilometres',
                fieldLabel : '预算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetKilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'cost',
                fieldLabel : '结算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'cost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'kilometres',
                fieldLabel : '结算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'kilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'content',
                fieldLabel : '出行事由',
                xtype : 'textfield',
                readOnly : true,
                name : 'content',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'remark',
                fieldLabel : '用车备注',
                xtype : 'textfield',
                readOnly : true,
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'businessType',
                fieldLabel : '业务类型',
                xtype : 'textfield',
                readOnly : true,
                name : 'businessType',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [this.truckSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        },{
            columnWidth : 1,
            items : [{
                id:'departureTime',
                fieldLabel : '出发时间',
                xtype : 'textfield',
                readOnly : true,
                name : 'departureTime',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

        Ext.driverApply.form.superclass.constructor.call(this, {
            labelWidth : 60,
            baseCls : 'x-plain',
            layout : 'column',
            style : 'padding : 5',
            defaults : {
                baseCls : 'x-plain',
                layout : 'form'
            },
            listeners : {
                'render' : function(form) {
                    // form.roleCombo.getStore().reload();
                }
            }
        });
    }

});




Ext.driverApply.win = Ext.extend(Ext.Window, {
    constructor : function(app) {
        this.app = app;
        this.form = new Ext.driverApply.form(this);
        Ext.driverApply.win.superclass.constructor.call(this, {
            width : 300,
            plain : true,
            showLock : true,
            modal : true,
            resizable : false,
            buttonAlign : 'center',
            items : this.form,
            buttons : [{
                text : '保存',
                iconCls : 'save',
                handler : this.onSave,
                scope : this
            }, {
                text : '取消',
                iconCls : 'cancel',
                handler : this.onClose,
                scope : this
            }]
        });
    },
    onSave : function(btn) {
        var form = this.form.getForm();
        if (form.isValid()) {
            btn.setDisabled(true);
            var user = form.getValues();
            Ext.eu.ajax(path + '/logistics/savecarApply.do', {
                carApply : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '调度成功！请通知乘客和司机');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '类型名称已经存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose : function() {
        this.close();
    }
});




Ext.driverApply.cargrid = Ext.extend(Ext.grid.GridPanel, {
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
                , 'remark','businessType', 'statuesId', 'activityId','orderFrom','driverApplyNo', 'fleetName', 'loginName'
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
            id: 'buttonDeldriverApplyView',
            xtype: 'button',
            iconCls: 'modify',
            text: '调度',
            handler: this.onModify,
            scope: this
        }]);
        // 页码条
        this.bbar = new Ext.PagingToolbar({
            pageSize: 80,
            displayInfo: true,
            store: this.ds
        });
        // 构造
        Ext.driverApply.cargrid.superclass.constructor.call(this, {
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



    onModify : function(btn) {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要修改的记录！");
            return;
        }
        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }
        var select = selects[0].data;
        var win = new Ext.driverApply.win(this);
        var form = win.form.getForm();
        win.setTitle('修改调度信息', 'modify');
        form.findField('carApplyNo').setValue(select.carApplyNo);
        form.findField('fleetId').setValue(select.fleetId);
        form.findField('driverId').setValue(select.driverId);
        form.findField('plateNoId').setValue(select.plateNoId);


        form.findField('privateOrPublic').setValue(select.privateOrPublic);
        form.findField('departureTime').setValue(select.departureTime);
        form.findField('startLocale').setValue(select.startLocale);
        form.findField('endLocale').setValue(select.endLocale);
        form.findField('carTypeId').setValue(select.carTypeId);
        form.findField('budgetCost').setValue(select.budgetCost);
        form.findField('budgetKilometres').setValue(select.budgetKilometres);
        form.findField('cost').setValue(select.cost);
        form.findField('kilometres').setValue(select.kilometres);
        form.findField('content').setValue(select.content);
        form.findField('remark').setValue(select.remark);
        form.findField('businessType').setValue(select.businessType);

        form.findField('driverName').setValue(select.driverName);
        form.findField('plateNo').setValue(select.plateNo);
        win.show();
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
        //     //     driverApplyNo: selects[i].data.driverApplyNo
        //     // }
        //     var user = selects[i].data;
        //     ary.push(user);
        // }

        var  user = selects[0].data;


        // Ext.ux.Toast.msg("信息", Ext.encode(ary));
        Ext.Msg.confirm('删除操作', '核对信息后，确认审核', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/logistics/updatearApply.do', {
                    driverApply: Ext.encode(user)
                }, function (resp) {
                    Ext.ux.Toast.msg('信息', '审核成功');
                    this.getStore().reload();
                }, this);
            }
        }, this);
    }
});

Ext.driverApply.carqueryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width : 180,
            items : [{
                xtype : 'hidden',
                id : 'statuesId',
                value:'1'
            }]
        },{
            width: 180,
            items: [{
                xtype: 'combo',
                width: 60,
                fieldLabel: '价格类型',
                hiddenName: 'dgs',
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
        Ext.driverApply.carqueryPanel.superclass.constructor.call(this, {
            id: 'driverApplyQueryPanel',
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
var driverApplyView = function (params) {
    this.queryPanel = new Ext.driverApply.carqueryPanel(this);
    this.cargrid = new Ext.driverApply.cargrid(this);

    this.busqueryPanel = new Ext.dispatch.queryPanel(this);
    this.cqEvaRateGrid = new Ext.dispatch.grid(this);

    this.insanitydriverPanel = new Ext.insanitydriver.queryPanel(this);
    this.insanitydriverGrid = new Ext.insanitydriver.insanitydrivergrid(this);




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
            title : '未调度订单',
            layout : 'border',
            items : [this.queryPanel,this.cargrid]
        }, {
            title : '已调度订单',
            layout : 'border',
            items : [this.busqueryPanel, this.cqEvaRateGrid]
        }, {
            title : '查看司机排班',
            layout : 'border',
            items : [this.insanitydriverPanel, this.insanitydriverGrid]
        }]
    })






    return new Ext.Panel({
        id: 'driverApplyView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
        title: '调度管理',
        layout: 'border',
        items: [this.tabs]
    })
}
