Ext.namespace('Ext.vehicleMaintenanceInfo');

var flag = '1';

Ext.vehicleMaintenanceInfo.form = Ext.extend(Ext.FormPanel, {
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


        this.truckSelector = new Ext.form.TriggerField({
            fieldLabel: '车辆',
            name: 'vehicleName',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: true,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if (val == null && val == undefined) {
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                } else {
                    new truckSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('vehicleId').setValue(id);


                    }, true, this);
                }

            },
            scope: this
        });


        this.maintenanceInfoSelector = new Ext.form.TriggerField({
            fieldLabel: '维修厂名称',
            name: 'maintenanceName',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: true,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if (val == null && val == undefined) {
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                } else {
                    new maintenanceInfoSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('maintenanceId').setValue(id);


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
            xtype: 'hidden',
            id: 'vehicleId'
        }, {
            xtype: 'hidden',
            id: 'maintenanceId'
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
            items: [this.truckSelector]

        }, {
            columnWidth: 1,
            items: [this.maintenanceInfoSelector]

        },  {
            columnWidth: 1,
            items: [{
                fieldLabel: '车牌号码',
                xtype: 'textfield',
                name: 'plateNo',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '送修人',
                xtype: 'textfield',
                name: 'contactPerson',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: true
            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '联系方式',
                xtype: 'textfield',
                name: 'contactNumber',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '送修时间',
                xtype: 'datefield',
                name: 'maintenanceTime',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '送修公里数',
                xtype: 'textfield',
                name: 'kilometers',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '送修项目或故障现象',
                xtype: 'textfield',
                name: 'maintenanceDesc',
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
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '材料金额合计(元)',
                xtype: 'numberfield',
                name: 'materialCostTotal',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '工时费用合计(元)',
                xtype: 'numberfield',
                name: 'workingHoursTotal',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '金额总计(元)',
                xtype: 'numberfield',
                name: 'maintenanceTotal',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批单位名称',
                xtype: 'textfield',
                name: 'approveOrgn',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批人',
                xtype: 'textfield',
                name: 'approvePerson',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '审批日期',
                xtype: 'datefield',
                name: 'approveDate',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批状态',
                xtype: 'textfield',
                name: 'approveStatus',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批说明',
                xtype: 'textfield',
                name: 'approveDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },];

        Ext.vehicleMaintenanceInfo.form.superclass.constructor.call(this, {
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

Ext.vehicleMaintenanceInfo.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.vehicleMaintenanceInfo.form(this);
        Ext.vehicleMaintenanceInfo.win.superclass.constructor.call(this, {
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
            var vehicleMaintenanceInfo = form.getValues();
            console.log(vehicleMaintenanceInfo);
            /*		vehicleMaintenanceInfo.isAdmin = vehicleMaintenanceInfo.isAdmin == 'true' ? 1 : 0;*/
            Ext.eu.ajax(path + '/api/saveVehicleMaintenanceInfo.do', {
                vehicleMaintenanceInfo: Ext.encode(vehicleMaintenanceInfo)
            }, function (resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '该信息已存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose: function () {
        this.close();
    }
});

Ext.vehicleMaintenanceInfo.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/api/queryVehicleMaintenanceInfo.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'vehicleId', 'vehicleName', 'plateNo', 'contactPerson', 'contactNumber', 'maintenanceTime', 'kilometers', 'maintenanceId', 'maintenanceName','maintenanceDesc',
                'fleetId', 'fleetName', 'company', 'orgnId', 'remark', 'materialCostTotal', 'workingHoursTotal','maintenanceTotal', 'approveOrgn', 'approvePerson', 'approveDate', 'approveStatus', 'approveDesc'],
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
                header: 'vehicleId',
                dataIndex: 'vehicleId',
                hidden: true
            }, {
                header: 'maintenanceId',
                dataIndex: 'maintenanceId',
                hidden: true
            },{
                header: '车辆',
                dataIndex: 'vehicleName'
            }, {
                header: '维修厂名称',
                dataIndex: 'maintenanceName'
            }, {
                header: '送修人',
                dataIndex: 'contactPerson'
            }, {
                header: '联系方式',
                dataIndex: 'contactNumber'
            }, {
                header: '送修时间',
                dataIndex: 'maintenanceTime'
            }, {
                header: '送修公里数',
                dataIndex: 'kilometers'
            }, {
                header: '送修项目或故障现象',
                dataIndex: 'maintenanceDesc'
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
        Ext.vehicleMaintenanceInfo.grid.superclass.constructor.call(this, {
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
        var win = new Ext.vehicleMaintenanceInfo.win(this);
        win.setTitle('添加车辆维修记录审批信息', 'add');
        win.show();
    },
    onModify: function (btn) {


        console.log("========================================");
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
        console.log("========================================" + JSON.stringify(select));
        var win = new Ext.vehicleMaintenanceInfo.win(this);
        var form = win.form.getForm();
        win.setTitle('修改车辆维修记录审批信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('plateNo').setValue(select.plateNo);
        form.findField('contactPerson').setValue(select.contactPerson);
        form.findField('contactNumber').setValue(select.contactNumber);
        form.findField('maintenanceTime').setValue(select.maintenanceTime);
        form.findField('kilometers').setValue(select.kilometers);
        form.findField('maintenanceDesc').setValue(select.maintenanceDesc);
        form.findField('remark').setValue(select.remark);
        form.findField('materialCostTotal').setValue(select.materialCostTotal);
        form.findField('workingHoursTotal').setValue(select.workingHoursTotal);
        form.findField('maintenanceTotal').setValue(select.maintenanceTotal);


        form.findField('approveOrgn').setValue(select.approveOrgn);
        form.findField('approvePerson').setValue(select.approvePerson);
        form.findField('approveDate').setValue(select.approveDate);
        form.findField('approveStatus').setValue(select.approveStatus);
        form.findField('approveDesc').setValue(select.approveDesc);


        form.findField('fleetId').setValue(select.fleetId);
        form.findField('fleetName').setValue(select.fleetName);
        form.findField('orgnId').setValue(select.orgnId);
        form.findField('company').setValue(select.company);
        form.findField('vehicleId').setValue(select.vehicleId);
        form.findField('vehicleName').setValue(select.vehicleName);
        form.findField('maintenanceId').setValue(select.maintenanceId);
        form.findField('maintenanceName').setValue(select.maintenanceName);
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
            var vehicleMaintenanceInfo = {
                id: selects[i].data.id
            }
            employees.push(vehicleMaintenanceInfo);
        }
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/api/deleteVehicleMaintenanceInfo.do',
                    {
                        vehicleMaintenanceInfos: Ext.encode(employees)
                    }, function (resp) {
                        var res = Ext.decode(resp.responseText);
                        console.log(res.success);
                        if (res.success) {
                            Ext.ux.Toast.msg('信息', '删除成功');
                        } else {
                            Ext.ux.Toast.msg('信息', '删除失败');
                        }

                        this.getStore().reload();
                    }, this);
            }
        }, this);
    }
});

Ext.vehicleMaintenanceInfo.queryPanel = Ext.extend(Ext.FormPanel, {
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
        Ext.vehicleMaintenanceInfo.queryPanel.superclass.constructor.call(this, {
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
var vehicleMaintenanceInfoView = function (params) {
    this.queryPanel = new Ext.vehicleMaintenanceInfo.queryPanel(this);
    this.grid = new Ext.vehicleMaintenanceInfo.grid(this);

    Ext.getCmp('buttonAddEmployeeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifyEmployeeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDelEmployeeView').hidden = !params[0].isDel;

    Ext.getCmp('queryfleetId').hidden = loginName != 'root';

    return new Ext.Panel({
        id: 'vehicleMaintenanceInfoView',
        title: '车辆维修记录审批信息',
        layout: 'border',
        items: [this.grid, this.queryPanel]
    })
}