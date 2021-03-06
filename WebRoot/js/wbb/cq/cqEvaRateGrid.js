Ext.namespace('Ext.cqEvaRate');


Ext.cqEvaRate.form = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel: '单位机构',
            name: 'company',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: false,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new kqSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('companyId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}


                    }, true, this);
                }

            },
            scope: this
        });


        this.truckTypeSelector = new Ext.form.TriggerField({
            fieldLabel: '车辆类型',
            name: 'modelName',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: false,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new truckTypeSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('carTtypeId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}


                    }, true, this);
                }
            },
            scope: this
        });

        this.busTypeSelector = new Ext.form.TriggerField({
            fieldLabel: '业务类型',
            name: 'charteredBusTypeName',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: false,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                        new busTypeSelector(function (id, name) {

                        console.log(id + "==============" + name);
                        this.setValue(name);
                        Ext.getCmp('charteredBusTypeId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}


                    }, true, this);
                }
            },
            scope: this
        });


        this.items = [{
            xtype: 'hidden',
            id: 'id'
        }, {
            xtype: 'hidden',
            id: 'fleetId'
        }, {
            xtype: 'hidden',
            id: 'companyId'
        }, {
            xtype: 'hidden',
            id: 'carTtypeId'
        }, {
            xtype: 'hidden',
            id: 'charteredBusTypeId'
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                id: 'fleetName',
                fieldLabel: '所属平台',
                width: 60,
                xtype: 'combo',
                hiddenName: 'fleetName',
                submitValue: false,
                anchor: '98%',
                editable: false,
                autoLoad: true,
                allowBlank: false,
                triggerAction: 'all',
                mode: 'local',
                store: new Ext.data.Store({
                    proxy: new Ext.data.HttpProxy({
                        url: path + '/system/getTreeAllFleetList.do',
                        method: 'POST'
                    }),
                    reader: new Ext.data.JsonReader({},
                        [{name: 'id'}, {name: 'fleetName'}]),
                    baseParams: {
                        fleetId: fleedId
                    },
                    autoLoad: true
                }),
                valueField: 'fleetName',
                displayField: 'fleetName',
                listeners: {
                    'select': function (combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                        basefleedId = record.data.id;

                        this.getForm().findField('company').setValue(null);
                        this.getForm().findField('companyId').setValue(null);
                        this.getForm().findField('modelName').setValue(null);
                        this.getForm().findField('carTtypeId').setValue(null);
                        this.getForm().findField('charteredBusTypeName').setValue(null);
                        this.getForm().findField('charteredBusTypeId').setValue(null);


                    },
                    'render' : function(combo) {//渲染
                        combo.getStore().on("load", function(s, r, o) {
                            combo.setValue(r[0].get('fleetName'));//第一个值
                            Ext.getCmp('fleetId').setValue(r[0].get('id'));
                            basefleedId = r[0].get('id');


                        });
                    },
                    scope: this
                }
            }]
        }, {
            columnWidth: 1,
            items: [this.kqSelector]
        }, {
            columnWidth: 1,
            items: [this.truckTypeSelector]
        }, {
            columnWidth: 1,
            items: [this.busTypeSelector]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                xtype: 'combo',
                fieldLabel: '车辆归属',
                hiddenName: 'ascription',
                anchor: '98%',
                typeAhead: true,
                editable: false,
                allowBlank: false,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                value: '自有',
                store: new Ext.data.ArrayStore({
                    fields: ['key', 'val'],
                    data: [['自有', '自有'],
                        ['委托', '委托']]
                }),
                valueField: 'val',
                displayField: 'key'
            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '取消费用(元)',
                xtype: 'textfield',
                name: 'cancelPrice',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '套餐价格(元)',
                xtype: 'textfield',
                name: 'setMealPrice',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '套餐里程(公里)',
                xtype: 'textfield',
                name: 'setMealKilometres',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '套餐时间(分钟)',
                xtype: 'textfield',
                name: 'setMealTime',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '超里程费用(元)',
                xtype: 'textfield',
                name: 'excessPrice',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '超时费用(元)',
                xtype: 'textfield',
                name: 'overtimePrice',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '最大里程数(公里)',
                xtype: 'textfield',
                name: 'maxMealKilometres',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '加费用(元)',
                xtype: 'textfield',
                name: 'maxExcessPrice',
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }];

        Ext.cqEvaRate.form.superclass.constructor.call(this, {
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



Ext.cqEvaRate.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.cqEvaRate.form(this);
        Ext.cqEvaRate.win.superclass.constructor.call(this, {
            width: 300,
            plain: true,
            showLock: true,
            modal: true,
            resizable: false,
            buttonAlign: 'center',
            items: this.form,
            buttons: [{
                text: '保存',
                iconCls: 'save',
                handler: this.onSave,
                scope: this
            }, {
                text: '取消',
                iconCls: 'cancel',
                handler: this.onClose,
                scope: this
            }]
        });
    },
    onSave: function (btn) {
        var form = this.form.getForm();

        console.log(form.isValid());

        if (form.isValid()) {
            btn.setDisabled(true);
            var user = form.getValues();
            Ext.eu.ajax(path + '/logistics/savebusTypePrice.do', {
                busTypePrice: Ext.encode(user)
            }, function (resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '该信息已经存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose: function () {
        this.close();
    }
});



Ext.cqEvaRate.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/queryBusTypePrice.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'fleetId', 'companyId', 'carTtypeId', 'charteredBusTypeId', 'ascription', 'cancelPrice', 'setMealPrice', 'setMealKilometres', 'setMealTime','excessPrice'
                ,'overtimePrice', 'maxMealKilometres', 'maxExcessPrice','company','modelName','fleetName','charteredBusType'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 80,
                fleetId: fleedId
            },
            listeners: {
                'beforeload': function () {
                    // Ext.apply(this.getStore().baseParams,
                    //     this.app.queryPanel.getQueryParams());

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
            defaults: {
                width: 80,
                sortable: true
            },
            columns: [new Ext.grid.RowNumberer(), this.sm, {
                header: 'id',
                dataIndex: 'id',
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
                header: 'carTtypeId',
                dataIndex: 'carTtypeId',
                hidden: true
            },{
                header: 'charteredBusTypeId',
                dataIndex: 'charteredBusTypeId',
                hidden: true
            },{
                header: '所属平台',
                dataIndex: 'fleetName'
            }, {
                header: '所属机构',
                dataIndex: 'company'
            },{
                header: '车辆归属',
                dataIndex: 'ascription'
            }, {
                header: '车型',
                dataIndex: 'modelName'
            }, {
                header: '业务类型',
                dataIndex: 'charteredBusType'
            },{
                header: '取消订单费用',
                dataIndex: 'cancelPrice'
            }, {
                header: '套餐价格',
                dataIndex: 'setMealPrice'
            }, {
                header: '套餐里程',
                dataIndex: 'setMealKilometres'
            },{
                header: '套餐时间',
                dataIndex: 'setMealTime'
            }, {
                header: '超里程费用',
                dataIndex: 'excessPrice'
            }, {
                header: '超时费用',
                dataIndex: 'overtimePrice'
            }, {
                header: '最大里程数',
                dataIndex: 'maxMealKilometres'
            }, {
                header: '超最大里程数加收费用',
                dataIndex: 'maxExcessPrice'
            }]
        });
        // 菜单条
        this.tbar = new Ext.Toolbar([{
            id: 'buttonAdddriverTypeView',
            xtype: 'button',
            iconCls: 'add',
            text: '新增',
            handler: this.onAdd,
            scope: this
        }, {
            id: 'buttonModifydriverTypeView',
            xtype: 'button',
            iconCls: 'modify',
            text: '修改',
            handler: this.onModify,
            scope: this
        }, {
            id: 'buttonDeldriverTypeView',
            xtype: 'button',
            iconCls: 'delete',
            text: '删除',
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
        Ext.cqEvaRate.grid.superclass.constructor.call(this, {
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
        var win = new Ext.cqEvaRate.win(this);
        win.setTitle('添加包车价格', 'add');
        win.show();
    },
    onModify: function (btn) {
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
        var win = new Ext.cqEvaRate.win(this);
        var form = win.form.getForm();
        win.setTitle('修改价格信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('fleetId').setValue(select.fleetId);
        form.findField('companyId').setValue(select.companyId);
        form.findField('charteredBusTypeId').setValue(select.charteredBusTypeId);

        form.findField('carTtypeId').setValue(select.carTtypeId);
        form.findField('ascription').setValue(select.ascription);
        form.findField('cancelPrice').setValue(select.cancelPrice);
        form.findField('setMealPrice').setValue(select.setMealPrice);

        form.findField('setMealKilometres').setValue(select.setMealKilometres);
        form.findField('setMealTime').setValue(select.setMealTime);
        form.findField('excessPrice').setValue(select.excessPrice);
        form.findField('overtimePrice').setValue(select.overtimePrice);

        form.findField('maxMealKilometres').setValue(select.maxMealKilometres);
        form.findField('maxExcessPrice').setValue(select.maxExcessPrice);
        form.findField('company').setValue(select.company);
        form.findField('modelName').setValue(select.modelName);

        form.findField('charteredBusTypeName').setValue(select.charteredBusType);



        form.findField('fleetName').setValue(select.fleetName);



        win.show();
    },
    onDelete: function () {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        var ary = Array();
        for (var i = 0; i < selects.length; i++) {
            var user = {
                id: selects[i].data.id
            }
            ary.push(user);
        }

        // Ext.ux.Toast.msg("信息", Ext.encode(ary));
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/logistics/deleteBusTypePrice.do', {
                    busTypePrices: Ext.encode(ary)
                }, function (resp) {
                    Ext.ux.Toast.msg('信息', '删除成功');
                    this.getStore().reload();
                }, this);
            }
        }, this);
    }
});



Ext.cqEvaRate.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;

        this.truckTypeDS = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/logistics/getAllTruckType.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'id'}, {name : 'modelName'}]),
            baseParams : {
                fleetId:fleedId
            }
        });
        this.truckTypeDS.load();


        this.busTypeDS = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/logistics/getAllBusType.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'id'}, {name : 'charteredBusType'}]),
            baseParams : {
                fleetId:fleedId
            }
        });
        this.busTypeDS.load();


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width : 180,
            items : [{
                id:'cqEvaRatebusTtype',
                fieldLabel : '业务类型',
                width : 60,
                xtype : 'combo',
                hiddenName : 'charteredBusTypeId',
                submitValue : false,
                anchor : '90%',
                editable : true,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                store : this.busTypeDS,
                valueField : 'id',
                displayField : 'charteredBusType',
                listeners : {
                    'select' : function(combo, record) {
                        //	this.getForm().findField('linesName').setValue(record.data.id);
                    },
                    scope : this
                }
            }]

        },{
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
        Ext.cqEvaRate.queryPanel.superclass.constructor.call(this, {
            id: 'busTypeQueryPanel',
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