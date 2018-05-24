Ext.namespace('Ext.vehicleQuotaInfo');

var flag = '1';

Ext.vehicleQuotaInfo.form = Ext.extend(Ext.FormPanel, {
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

        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '编制核定日期',
                xtype: 'datefield',
                name: 'quotaDate',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '一般公务用车编制数',
                xtype: 'numberfield',
                name: 'count1',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '实物用车保障编制数',
                xtype: 'numberfield',
                name: 'count2',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '机要应急用车编制数',
                xtype: 'numberfield',
                name: 'count3',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '特种专业用车编制数',
                xtype: 'numberfield',
                name: 'count4',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '其他特殊公务用车编制数',
                xtype: 'numberfield',
                name: 'count5',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '离退休干部服务用车编制数',
                xtype: 'numberfield',
                name: 'count6',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '接待用车编制数',
                xtype: 'numberfield',
                name: 'count7',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '一般执法执勤用车编制数',
                xtype: 'numberfield',
                name: 'count8',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '执法执勤特种专业技术用车编制数',
                xtype: 'numberfield',
                name: 'count9',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '编制车辆合计数',
                xtype: 'numberfield',
                name: 'countAll',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        } ];

        Ext.vehicleQuotaInfo.form.superclass.constructor.call(this, {
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

Ext.vehicleQuotaInfo.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.vehicleQuotaInfo.form(this);
        Ext.vehicleQuotaInfo.win.superclass.constructor.call(this, {
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
            var vehicleQuotaInfo = form.getValues();
            console.log(vehicleQuotaInfo);
            /*		vehicleQuotaInfo.isAdmin = vehicleQuotaInfo.isAdmin == 'true' ? 1 : 0;*/
            Ext.eu.ajax(path + '/api/saveVehicleQuotaInfo.do', {
                vehicleQuotaInfo: Ext.encode(vehicleQuotaInfo)
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

Ext.vehicleQuotaInfo.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/api/queryVehicleQuotaInfo.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'quotaDate', 'count1', 'count2', 'count3',
                'fleetId', 'fleetName', 'company', 'count4', 'count5', 'orgnId','count6','count7', 'count8','count9','countAll'],
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
                header: '编制核定日期',
                dataIndex: 'quotaDate'
            },{
                header: '一般公务用车编制数',
                dataIndex: 'count1'
            }, {
                header: '实物用车保障编制数',
                dataIndex: 'count2'
            }, {
                header: '机要应急用车编制数',
                dataIndex: 'count3'
            }, {
                header: '特种专业用车编制数',
                dataIndex: 'count4'
            }, {
                header: '其他特殊公务用车编制数',
                dataIndex: 'count5'
            },{
                header: '离退休干部服务用车编制数',
                dataIndex: 'count6'
            },{
                header: '接待用车编制数',
                dataIndex: 'count7'
            },{
                header: '一般执法执勤用车编制数',
                dataIndex: 'count8'
            },{
                header: '执法执勤特种专业技术用车编制数',
                dataIndex: 'count9'
            },{
                header: '编制车辆合计数',
                dataIndex: 'countAll'
            },  {
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
        Ext.vehicleQuotaInfo.grid.superclass.constructor.call(this, {
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
        var win = new Ext.vehicleQuotaInfo.win(this);
        win.setTitle('添加车辆编制信息', 'add');
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
        var win = new Ext.vehicleQuotaInfo.win(this);
        var form = win.form.getForm();
        win.setTitle('修改车辆编制信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('quotaDate').setValue(select.quotaDate);
        form.findField('count1').setValue(select.count1);
        form.findField('count2').setValue(select.count2);


        form.findField('count3').setValue(select.count3);
        form.findField('count4').setValue(select.count4);
        form.findField('countAll').setValue(select.countAll);

        form.findField('count5').setValue(select.count5);
        form.findField('count6').setValue(select.count6);

        form.findField('count7').setValue(select.count7);
        form.findField('count8').setValue(select.count8);
        form.findField('count9').setValue(select.count9);

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
            var vehicleQuotaInfo = {
                id: selects[i].data.id
            }
            employees.push(vehicleQuotaInfo);
        }
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/api/deleteVehicleQuotaInfo.do',
                    {
                        vehicleQuotaInfos: Ext.encode(employees)
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

Ext.vehicleQuotaInfo.queryPanel = Ext.extend(Ext.FormPanel, {
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
        Ext.vehicleQuotaInfo.queryPanel.superclass.constructor.call(this, {
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
var vehicleQuotaInfoView = function (params) {
    this.queryPanel = new Ext.vehicleQuotaInfo.queryPanel(this);
    this.grid = new Ext.vehicleQuotaInfo.grid(this);

    Ext.getCmp('buttonAddEmployeeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifyEmployeeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDelEmployeeView').hidden = !params[0].isDel;

    Ext.getCmp('queryfleetId').hidden = loginName != 'root';

    return new Ext.Panel({
        id: 'vehicleQuotaInfoView',
        title: '单位车辆编制信息',
        layout: 'border',
        items: [this.grid, this.queryPanel]
    })
}