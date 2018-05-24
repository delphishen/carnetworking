Ext.namespace('Ext.maintenanceInfo');

var flag = '1';

Ext.maintenanceInfo.form = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;

        this.fleetTypeDS = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: path + '/system/getTreeAllFleetList.do',
                method: 'POST'
            }),
            reader: new Ext.data.JsonReader({},
                [{name: 'id'}, {name: 'fleetName'}]),

            baseParams: {
                fleetId: fleedId
            }

        });
        this.fleetTypeDS.load();


        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel: '单位机构',
            name: 'company',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: true,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                console.log('平台id值-------' + Ext.getCmp("fleetId").getValue());
                basefleedId = Ext.getCmp('fleetId').getValue();
                var val = Ext.getCmp("fleetName").value;

                if (val == null && val == undefined) {
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                } else {
                    new kqSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('orgnId').setValue(id);
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
            id: 'orgnId'
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
                allowBlank: false,
                triggerAction: 'all',
                mode: 'local',
                store: this.fleetTypeDS,
                valueField: 'fleetName',
                displayField: 'fleetName',
                listeners: {
                    'select': function (combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                        this.getForm().findField('company').setValue(null);
                        this.getForm().findField('orgnId').setValue(null);
                        basefleedId = record.data.id;


                    },
                    'render': function (combo) {//渲染
                        combo.getStore().on("load", function (s, r, o) {
                            if (flag == '1') {
                                combo.setValue(r[0].get('fleetName'));//第一个值
                                Ext.getCmp('fleetId').setValue(r[0].get('id'));
                                basefleedId = r[0].get('id');
                            }


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
            items: [{
                fieldLabel: '维修厂名称',
                xtype: 'textfield',
                name: 'maintenanceName',
                anchor: '98%',
                maxLength: 18,
                maxLengthText: '名称不能大于18个字符',
                selectOnFocus: true,
                allowBlank: false
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '负责人',
                xtype: 'textfield',
                name: 'chargePerson',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: true
            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '联系电话',
                xtype: 'numberfield',
                name: 'contactNumber',
                anchor: '98%',
                selectOnFocus: true,
                regex: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
                regexText: '请输入正确的手机号码',
                allowBlank: false
            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '规模',
                xtype: 'textfield',
                name: 'scale',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '地址',
                xtype: 'textfield',
                name: 'address',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '备注',
                xtype: 'textfield',
                name: 'remark',
                anchor: '98%',
                allowBlank: true

            }]
        }];

        Ext.maintenanceInfo.form.superclass.constructor.call(this, {
            labelWidth: 60,
            baseCls: 'x-plain',
            layout: 'column',
            style: 'padding : 5',
            defaults: {
                baseCls: 'x-plain',
                layout: 'form'
            }
        });
    }

});

Ext.maintenanceInfo.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.maintenanceInfo.form(this);
        Ext.maintenanceInfo.win.superclass.constructor.call(this, {
            width: 500,
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
            var maintenanceInfo = form.getValues();
            console.log(maintenanceInfo);
            /*		maintenanceInfo.isAdmin = maintenanceInfo.isAdmin == 'true' ? 1 : 0;*/
            Ext.eu.ajax(path + '/api/saveMaintenanceInfo.do', {
                maintenanceInfo: Ext.encode(maintenanceInfo)
            }, function (resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '手机号已存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose: function () {
        this.close();
    }
});

Ext.maintenanceInfo.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/api/queryMaintenanceInfo.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'maintenanceName', 'chargePerson', 'contactNumber', 'scale',
                'fleetId', 'fleetName', 'company', 'address', 'remark', 'orgnId'],
            autoDestroy: true,
            autoLoad: true,
            baseParams: {
                isPaging: true,
                start: 0,
                limit: 50,
                fleetId: fleedId,
                companyId: companyIdz,
            },
            listeners: {
                'beforeload': function () {
                    Ext.apply(this.getStore().baseParams,
                        this.app.queryPanel
                            .getQueryParams());
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
                width: 150,
                sortable: true
            },
            columns: [new Ext.grid.RowNumberer(), this.sm, {
                header: 'id',
                dataIndex: 'id',
                hidden: true
            }, {
                header: 'orgnId',
                dataIndex: 'orgnId',
                hidden: true
            }, {
                header: 'fleetId',
                dataIndex: 'fleetId',
                hidden: true
            }, {
                header: '维修厂名称',
                dataIndex: 'maintenanceName'
            },{
                header: '负责人',
                dataIndex: 'chargePerson'
            }, {
                header: '联系电话',
                dataIndex: 'contactNumber'
            }, {
                header: '规模',
                dataIndex: 'scale'
            }, {
                header: '地址',
                dataIndex: 'address'
            }, {
                header: '备注',
                dataIndex: 'remark'
            }, {
                header: '所属机构',
                dataIndex: 'company'
            }, {
                header: '所属平台',
                dataIndex: 'fleetName'
            }]
        });
        // 菜单条
        this.tbar = new Ext.Toolbar([{
            id: 'buttonAddEmployeeView',
            xtype: 'button',
            iconCls: 'add',
            text: '新增',
            handler: this.onAdd,
            scope: this
        }, {
            id: 'buttonModifyEmployeeView',
            xtype: 'button',
            iconCls: 'modify',
            text: '修改',
            handler: this.onModify,
            scope: this
        }, {
            id: 'buttonDelEmployeeView',
            xtype: 'button',
            iconCls: 'delete',
            text: '删除',
            handler: this.onDelete,
            scope: this
        }]);
        // 页码条
        this.bbar = new Ext.PagingToolbar({
            pageSize: 50,
            displayInfo: true,
            store: this.ds
        });
        // 构造
        Ext.maintenanceInfo.grid.superclass.constructor.call(this, {
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
        flag = '1';
        var win = new Ext.maintenanceInfo.win(this);
        win.setTitle('添加员工', 'add');
        win.show();
    },
    onModify: function (btn) {
        flag = '2';
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
        var win = new Ext.maintenanceInfo.win(this);
        var form = win.form.getForm();
        win.setTitle('修改维修厂信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('maintenanceName').setValue(select.maintenanceName);
        form.findField('chargePerson').setValue(select.chargePerson);
        form.findField('contactNumber').setValue(select.contactNumber);

        form.findField('fleetId').setValue(select.fleetId);
        form.findField('fleetName').setValue(select.fleetName);
        form.findField('orgnId').setValue(select.orgnId);
        form.findField('company').setValue(select.company);
        form.findField('scale').setValue(select.scale);
        form.findField('address').setValue(select.address);
        form.findField('remark').setValue(select.remark);
        win.show();
    },
    onDelete: function () {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
            return;
        }
        var employees = Array();
        for (var i = 0; i < selects.length; i++) {
            var maintenanceInfo = {
                id: selects[i].data.id
            }
            employees.push(maintenanceInfo);
        }
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/api/deleteMaintenanceInfo.do',
                    {
                        maintenanceInfos: Ext.encode(employees)
                    }, function (resp) {
                        var res = Ext.decode(resp.responseText);
                        console.log(res.success);
                        if (res.success) {
                            Ext.ux.Toast.msg('信息', '删除成功');
                        } else {
                            Ext.ux.Toast.msg('信息', '该用户存在外键引用，不能删除');
                        }

                        this.getStore().reload();
                    }, this);
            }
        }, this);
    }
});

Ext.maintenanceInfo.queryPanel = Ext.extend(Ext.FormPanel, {
    constructor: function (app) {
        this.app = app;

        this.fleetTypeDS = new Ext.data.Store({
            proxy: new Ext.data.HttpProxy({
                url: path + '/system/getTreeAllFleetList.do',
                method: 'POST'
            }),
            reader: new Ext.data.JsonReader({},
                [{name: 'id'}, {name: 'fleetName'}]),

            baseParams: {
                fleetId: fleedId
            }

        });
        this.fleetTypeDS.load();


        // 在column布局的制约下，从左至右每个元素依次进行form布局
        this.items = [{
            width: 200,
            items: [{
                xtype: 'textfield',
                fieldLabel: '名称',
                id: 'empName',
                anchor: '90%'
            }]
        }, {
            width: 200,
            items: [{
                xtype: 'textfield',
                fieldLabel: '联系电话',
                id: 'phone',
                anchor: '90%'
            }]
        }, {
            width: 300,
            items: [{
                id: 'queryfleetId',
                fieldLabel: '按平台筛选',
                width: 80,
                xtype: 'combo',
                hiddenName: 'queryfleetId',
                submitValue: false,
                anchor: '90%',
                editable: true,
                autoLoad: true,
                triggerAction: 'all',
                mode: 'local',
                store: this.fleetTypeDS,
                valueField: 'id',
                displayField: 'fleetName',
                listeners: {
                    'select': function (combo, record) {
                        //	this.getForm().findField('linesName').setValue(record.data.id);
                    },
                    scope: this
                }
            }]

        }, {
            width: 65,
            items: [{
                xtype: 'button',
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
                text: '清空',
                iconCls: 'reset',
                handler: function () {
                    this.getForm().reset();
                },
                scope: this
            }]
        }];
        // panel定义
        Ext.maintenanceInfo.queryPanel.superclass.constructor.call(this, {
            region: 'north',
            height: 40,
            frame: true,
            split: true,
            collapseMode: 'mini',
            layout: 'column',
            labelAlign: 'right',
            defaults: {
                layout: 'form',
                labelWidth: 80
            }
        });
    },
    getQueryParams: function () {
        return this.getForm().getValues();
    }
});

/**
 * 入口方法，用于定位动态加载文件
 *
 * @return {}
 */
var maintenanceInfoView = function (params) {
    this.queryPanel = new Ext.maintenanceInfo.queryPanel(this);
    this.grid = new Ext.maintenanceInfo.grid(this);

    Ext.getCmp('buttonAddEmployeeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifyEmployeeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDelEmployeeView').hidden = !params[0].isDel;

    Ext.getCmp('queryfleetId').hidden = loginName != 'root';

    return new Ext.Panel({
        id: 'maintenanceInfoView',
        title: '维修厂基本信息',
        layout: 'border',
        items: [this.grid, this.queryPanel]
    })
}