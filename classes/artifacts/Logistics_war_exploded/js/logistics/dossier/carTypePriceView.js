Ext.namespace('Ext.driverType');

Ext.driverType.form = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel: '单位机构',
            name: 'company',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: false,
            allowBlank: true,
            editable: false,
            onTriggerClick: function (e) {
                new kqSelector(function (id, name) {
                    this.setValue(name);
                    Ext.getCmp('companyId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}


                }, true, this);
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
            allowBlank: true,
            editable: false,
            onTriggerClick: function (e) {
                new truckTypeSelector(function (id, name) {
                    this.setValue(name);
                    Ext.getCmp('carTtypeId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}


                }, true, this);
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
            labelWidth: 60,
            items: [{
                xtype: 'combo',
                fieldLabel: '业务类型',
                hiddenName: 'businessType',
                anchor: '98%',
                typeAhead: true,
                editable: false,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                value: '单程',
                store: new Ext.data.ArrayStore({
                    fields: ['key', 'val'],
                    data: [['单程', '单程'],
                        ['往返', '往返']]
                }),
                valueField: 'val',
                displayField: 'key'
            }]
        },  {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                xtype: 'combo',
                fieldLabel: '车辆归属',
                hiddenName: 'ascription',
                anchor: '98%',
                typeAhead: true,
                editable: false,
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
                fieldLabel: '起步价格',
                xtype: 'textfield',
                name: 'startPrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '起步里程',
                xtype: 'textfield',
                name: 'startKilometres',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '起步时间',
                xtype: 'textfield',
                name: 'startTime',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '里程费用',
                xtype: 'textfield',
                name: 'KilometresPrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '时间费用',
                xtype: 'textfield',
                name: 'timePrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '反空费用',
                xtype: 'textfield',
                name: 'emptyPrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '夜间费用',
                xtype: 'textfield',
                name: 'nighttimePrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '夜间费用起始',
                xtype : 'timefield',
                format : 'H:i:s',
                editable : false,
                name: 'nighttimeBegin',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '夜间费用截止',
                xtype : 'timefield',
                format : 'H:i:s',
                editable : false,
                name: 'nighttimeEnd',
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '取消订单费用',
                xtype: 'textfield',
                name: 'cancelPrice',
                anchor: '98%',
                selectOnFocus: true
            }]
        },];

        Ext.driverType.form.superclass.constructor.call(this, {
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

Ext.driverType.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.driverType.form(this);
        Ext.driverType.win.superclass.constructor.call(this, {
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
        if (form.isValid()) {
            btn.setDisabled(true);
            var user = form.getValues();
            Ext.eu.ajax(path + '/logistics/saveCarTypePrice.do', {
                carTypePrice: Ext.encode(user)
            }, function (resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '类型名称已经存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose: function () {
        this.close();
    }
});

Ext.driverType.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/logistics/queryCarTypePrice.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'fleetId', 'companyId', 'businessType', 'carTtypeId', 'ascription', 'startPrice', 'startKilometres', 'startTime', 'KilometresPrice','timePrice'
                ,'emptyPrice', 'nighttimePrice', 'nighttimeBegin','nighttimeEnd', 'cancelPrice', 'company','modelName'],
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
            }, {
                header: '业务类型',
                dataIndex: 'businessType'
            }, {
                header: '车辆归属',
                dataIndex: 'ascription'
            }, {
                header: '起步价格',
                dataIndex: 'startPrice'
            }, {
                header: '起步里程',
                dataIndex: 'startKilometres'
            },{
                header: '起步时间',
                dataIndex: 'startTime'
            }, {
                header: '里程费用',
                dataIndex: 'KilometresPrice'
            }, {
                header: '时间费用',
                dataIndex: 'timePrice'
            }, {
                header: '反空费用',
                dataIndex: 'emptyPrice'
            }, {
                header: '夜间费用',
                dataIndex: 'nighttimePrice'
            },{
                header: '取消订单费用',
                dataIndex: 'cancelPrice'
            }, {
                header: '所属公司',
                dataIndex: 'company'
            }, {
                header: '车型',
                dataIndex: 'modelName'
            }
            ]
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
        Ext.driverType.grid.superclass.constructor.call(this, {
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
        var win = new Ext.driverType.win(this);
        win.setTitle('添加车辆类别', 'add');
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
        var win = new Ext.driverType.win(this);
        var form = win.form.getForm();
        win.setTitle('修改车辆信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('fleetId').setValue(select.fleetId);
        form.findField('fleetName').setValue(select.fleetName);

        form.findField('driverType').setValue(select.driverType);
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
                Ext.eu.ajax(path + '/logistics/deletedriverType.do', {
                    driverTypes: Ext.encode(ary)
                }, function (resp) {
                    Ext.ux.Toast.msg('信息', '删除成功');
                    this.getStore().reload();
                }, this);
            }
        }, this);
    }
});

Ext.driverType.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width: 180,
            items: [{
                xtype: 'combo',
                width: 60,
                fieldLabel: '价格类型',
                hiddenName: 'statuesId',
                anchor: '98%',
                typeAhead: true,
                editable: false,
                triggerAction: 'all',
                lazyRender: true,
                mode: 'local',
                value: '常规价格设置',
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
        Ext.driverType.queryPanel.superclass.constructor.call(this, {
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


/**
 * 入口方法，用于定位动态加载文件
 *
 * @return {}
 */
var carTypePriceView = function (params) {
    this.queryPanel = new Ext.driverType.queryPanel(this);
    this.grid = new Ext.driverType.grid(this);

    Ext.getCmp('buttonAdddriverTypeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifydriverTypeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDeldriverTypeView').hidden = !params[0].isDel;

    return new Ext.Panel({
        id: 'carTypePriceView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
        title: '价格管理',
        layout: 'border',
        items: [this.queryPanel, this.grid]
    })
}
