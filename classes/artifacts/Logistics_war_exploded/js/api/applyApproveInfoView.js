Ext.namespace('Ext.applyApproveInfo');

var flag = '1';

Ext.applyApproveInfo.form = Ext.extend(Ext.FormPanel, {
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
                fieldLabel: '申请日期',
                xtype: 'datefield',
                name: 'applyDate',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '车辆类型',
                xtype: 'textfield',
                name: 'vehicleType',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '厂牌名称',
                xtype: 'textfield',
                name: 'brandName',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: true
            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '车辆型号',
                xtype: 'textfield',
                name: 'vehicleModel',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '排量',
                xtype: 'textfield',
                name: 'displacement',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '申请数量',
                xtype: 'numberfield',
                name: 'applyNum',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '车辆来源',
                xtype: 'textfield',
                name: 'vehicleOrigin',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '购置价(万元)',
                xtype: 'textfield',
                name: 'price',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '车辆用途',
                xtype: 'textfield',
                name: 'vehicleUse',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '配备或更新理由',
                xtype: 'textfield',
                name: 'reason',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批单位名称',
                xtype: 'textfield',
                name: 'approveOrgn',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批人',
                xtype: 'textfield',
                name: 'approvePerson',
                anchor: '98%',
                allowBlank: true

            }]
        },{
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
        },{
            columnWidth: 1,
            labelWidth: 60,
            items: [{
                fieldLabel: '审批状态',
                xtype: 'textfield',
                name: 'approveStatus',
                anchor: '98%',
                allowBlank: true

            }]
        },{
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

        Ext.applyApproveInfo.form.superclass.constructor.call(this, {
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

Ext.applyApproveInfo.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.applyApproveInfo.form(this);
        Ext.applyApproveInfo.win.superclass.constructor.call(this, {
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
            var applyApproveInfo = form.getValues();
            console.log(applyApproveInfo);
            /*		applyApproveInfo.isAdmin = applyApproveInfo.isAdmin == 'true' ? 1 : 0;*/
            Ext.eu.ajax(path + '/api/saveApplyApproveInfo.do', {
                applyApproveInfo: Ext.encode(applyApproveInfo)
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

Ext.applyApproveInfo.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/api/queryApplyApproveInfo.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'applyDate', 'vehicleType', 'brandName', 'vehicleModel', 'displacement', 'applyNum', 'vehicleOrigin',
                'fleetId', 'fleetName', 'company', 'price', 'vehicleUse', 'orgnId','reason','approveOrgn', 'approvePerson', 'approveDate','approveStatus','approveDesc'],
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
                header: '申请日期',
                dataIndex: 'applyDate'
            },{
                header: '车辆类型',
                dataIndex: 'vehicleType'
            }, {
                header: '厂牌名称',
                dataIndex: 'brandName'
            }, {
                header: '车辆型号',
                dataIndex: 'vehicleModel'
            }, {
                header: '排量',
                dataIndex: 'displacement'
            }, {
                header: '申请数量',
                dataIndex: 'applyNum'
            },{
                header: '车辆来源',
                dataIndex: 'vehicleOrigin'
            },{
                header: '购置价(万元)',
                dataIndex: 'price'
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
        Ext.applyApproveInfo.grid.superclass.constructor.call(this, {
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
        var win = new Ext.applyApproveInfo.win(this);
        win.setTitle('添加车辆申购审批信息', 'add');
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
        console.log("========================================"+JSON.stringify(select));
        var win = new Ext.applyApproveInfo.win(this);
        var form = win.form.getForm();
        win.setTitle('修改车辆申购审批信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('applyDate').setValue(select.applyDate);
        form.findField('vehicleType').setValue(select.vehicleType);
        form.findField('brandName').setValue(select.brandName);
        form.findField('vehicleModel').setValue(select.vehicleModel);
        form.findField('displacement').setValue(select.displacement);
        form.findField('applyNum').setValue(select.applyNum);
        form.findField('vehicleOrigin').setValue(select.vehicleOrigin);
        form.findField('price').setValue(select.price);
        form.findField('vehicleUse').setValue(select.vehicleUse);
        form.findField('reason').setValue(select.reason);


        form.findField('approveOrgn').setValue(select.approveOrgn);
        form.findField('approvePerson').setValue(select.approvePerson);
        form.findField('approveDate').setValue(select.approveDate);
        form.findField('approveStatus').setValue(select.approveStatus);
        form.findField('approveDesc').setValue(select.approveDesc);


        form.findField('fleetId').setValue(select.fleetId);
        form.findField('fleetName').setValue(select.fleetName);
        form.findField('orgnId').setValue(select.orgnId);
        form.findField('company').setValue(select.company);
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
            var applyApproveInfo = {
                id: selects[i].data.id
            }
            employees.push(applyApproveInfo);
        }
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/api/deleteApplyApproveInfo.do',
                    {
                        applyApproveInfos: Ext.encode(employees)
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

Ext.applyApproveInfo.queryPanel = Ext.extend(Ext.FormPanel, {
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
        Ext.applyApproveInfo.queryPanel.superclass.constructor.call(this, {
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
var applyApproveInfoView = function (params) {
    this.queryPanel = new Ext.applyApproveInfo.queryPanel(this);
    this.grid = new Ext.applyApproveInfo.grid(this);

    Ext.getCmp('buttonAddEmployeeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifyEmployeeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDelEmployeeView').hidden = !params[0].isDel;

    Ext.getCmp('queryfleetId').hidden = loginName != 'root';

    return new Ext.Panel({
        id: 'applyApproveInfoView',
        title: '车辆申购审批信息',
        layout: 'border',
        items: [this.grid, this.queryPanel]
    })
}