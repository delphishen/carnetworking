Ext.namespace('Ext.deployApproveInfo');

var flag = '1';

Ext.deployApproveInfo.form = Ext.extend(Ext.FormPanel, {
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
            items: [{
                id: 'fleetName',
                fieldLabel: '所属平台',
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
                fieldLabel: '申请调配日期',
                xtype: 'datefield',
                name: 'deployDate',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        },{
            columnWidth: 1,
            items: [{
                fieldLabel: '申请调配车辆',
                xtype: 'textfield',
                name: 'deployVehicle',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false
            }]
        }, {
            columnWidth: 1,
            items: [{
                fieldLabel: '调配至单位名称',
                xtype: 'textfield',
                name: 'deployOrgn',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: true
            }]
        }, {
            columnWidth: 0.5,
            items: [{
                fieldLabel: '调配后车牌号',
                xtype: 'textfield',
                name: 'plateNo',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 0.5,
            items: [{
                fieldLabel: '厂牌名称',
                xtype: 'textfield',
                name: 'brandName',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 0.5,
            items: [{
                fieldLabel: '车辆型号',
                xtype: 'textfield',
                name: 'vehicleModel',
                anchor: '98%',
                selectOnFocus: true,
                allowBlank: false,
                allowDecimals: false,
                allowNegative: false,

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '排量',
                xtype: 'textfield',
                name: 'displacement',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '发动机号',
                xtype: 'textfield',
                name: 'engineNo',
                anchor: '98%',
                allowBlank: true

            }]
        }, {
            columnWidth: 0.5,
            items: [{
                fieldLabel: '车辆登记日期',
                xtype: 'datefield',
                name: 'registrationDate',
                format: 'Y-m-d',
                editable: false,
                allowBlank: false,
                anchor: '98%',
                selectOnFocus: true
            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '车架号',
                xtype: 'textfield',
                name: 'identificationNo',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '使用年数',
                xtype: 'textfield',
                name: 'useYears',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '行驶公里',
                xtype: 'numberfield',
                name: 'kilometers',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '报废年限',
                xtype: 'textfield',
                name: 'scrapYears',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '车内设备状况',
                xtype: 'textfield',
                name: 'deviceDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '发动机状况',
                xtype: 'textfield',
                name: 'engineDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '传动系状况',
                xtype: 'textfield',
                name: 'driveDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '转动系状况',
                xtype: 'textfield',
                name: 'rotationDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '电器系状况',
                xtype: 'textfield',
                name: 'electricalDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '随车工具状况',
                xtype: 'textfield',
                name: 'toolsDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '调配金额',
                xtype: 'numberfield',
                name: 'price',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '调配理由',
                xtype: 'textfield',
                name: 'reason',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '审批单位名称',
                xtype: 'textfield',
                name: 'approveOrgn',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '审批人',
                xtype: 'textfield',
                name: 'approvePerson',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
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
            columnWidth: 0.5,
            items: [{
                fieldLabel: '审批状态',
                xtype: 'textfield',
                name: 'approveStatus',
                anchor: '98%',
                allowBlank: true

            }]
        },{
            columnWidth: 0.5,
            items: [{
                fieldLabel: '审批说明',
                xtype: 'textfield',
                name: 'approveDesc',
                anchor: '98%',
                allowBlank: true

            }]
        },];

        Ext.deployApproveInfo.form.superclass.constructor.call(this, {
            labelWidth: 80,
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

Ext.deployApproveInfo.win = Ext.extend(Ext.Window, {
    constructor: function (app) {
        this.app = app;
        this.form = new Ext.deployApproveInfo.form(this);
        Ext.deployApproveInfo.win.superclass.constructor.call(this, {
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
            var deployApproveInfo = form.getValues();
            console.log(deployApproveInfo);
            /*		deployApproveInfo.isAdmin = deployApproveInfo.isAdmin == 'true' ? 1 : 0;*/
            Ext.eu.ajax(path + '/api/saveDeployApproveInfo.do', {
                deployApproveInfo: Ext.encode(deployApproveInfo)
            }, function (resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '改信息已存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose: function () {
        this.close();
    }
});

Ext.deployApproveInfo.grid = Ext.extend(Ext.grid.GridPanel, {
    constructor: function (app) {
        this.app = app;
        // 数据源
        this.ds = new Ext.data.JsonStore({
            url: path + '/api/queryDeployApproveInfo.do',
            idProperty: 'id',
            root: 'rows',
            totalProperty: 'results',
            fields: ['id', 'deployDate', 'deployVehicle', 'deployOrgn', 'plateNo', 'brandName', 'vehicleModel', 'displacement',
                'fleetId', 'fleetName', 'company', 'displacement', 'registrationDate', 'orgnId','identificationNo','useYears', 'useYears', 'scrapYears','deviceDesc','engineDesc',
                'driveDesc', 'rotationDesc', 'electricalDesc', 'toolsDesc', 'price', 'reason','approveOrgn','approvePerson', 'approveDate', 'approveStatus','approveDesc'],
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
                header: '申请调配日期',
                dataIndex: 'deployDate'
            },{
                header: '申请调配车辆',
                dataIndex: 'deployVehicle'
            }, {
                header: '调配至单位名称',
                dataIndex: 'deployOrgn'
            }, {
                header: '调配后车牌号',
                dataIndex: 'plateNo'
            }, {
                header: '厂牌名称',
                dataIndex: 'brandName'
            }, {
                header: '车辆型号',
                dataIndex: 'vehicleModel'
            },{
                header: '排量',
                dataIndex: 'displacement'
            },{
                header: '发动机号',
                dataIndex: 'engineNo'
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
        Ext.deployApproveInfo.grid.superclass.constructor.call(this, {
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
        var win = new Ext.deployApproveInfo.win(this);
        win.setTitle('添加车辆调配审批信息', 'add');
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
        var win = new Ext.deployApproveInfo.win(this);
        var form = win.form.getForm();
        win.setTitle('修改车辆调配审批信息', 'modify');
        form.findField('id').setValue(select.id);
        form.findField('deployDate').setValue(select.deployDate);
        form.findField('deployVehicle').setValue(select.deployVehicle);
        form.findField('deployOrgn').setValue(select.deployOrgn);
        form.findField('plateNo').setValue(select.plateNo);
        form.findField('brandName').setValue(select.brandName);
        form.findField('vehicleModel').setValue(select.vehicleModel);
        form.findField('displacement').setValue(select.displacement);
        form.findField('engineNo').setValue(select.engineNo);
        form.findField('registrationDate').setValue(select.registrationDate);
        form.findField('identificationNo').setValue(select.identificationNo);
        form.findField('useYears').setValue(select.useYears);
        form.findField('kilometers').setValue(select.kilometers);
        form.findField('scrapYears').setValue(select.scrapYears);
        form.findField('deviceDesc').setValue(select.deviceDesc);
        form.findField('engineDesc').setValue(select.engineDesc);
        form.findField('driveDesc').setValue(select.driveDesc);
        form.findField('rotationDesc').setValue(select.rotationDesc);
        form.findField('electricalDesc').setValue(select.electricalDesc);
        form.findField('toolsDesc').setValue(select.toolsDesc);
        form.findField('price').setValue(select.price);
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
            var deployApproveInfo = {
                id: selects[i].data.id
            }
            employees.push(deployApproveInfo);
        }
        Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function (btn) {
            if (btn == 'yes') {
                Ext.eu.ajax(path + '/api/deleteDeployApproveInfo.do',
                    {
                        deployApproveInfos: Ext.encode(employees)
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

Ext.deployApproveInfo.queryPanel = Ext.extend(Ext.FormPanel, {
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
        Ext.deployApproveInfo.queryPanel.superclass.constructor.call(this, {
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
var deployApproveInfoView = function (params) {
    this.queryPanel = new Ext.deployApproveInfo.queryPanel(this);
    this.grid = new Ext.deployApproveInfo.grid(this);

    Ext.getCmp('buttonAddEmployeeView').hidden = !params[0].isAdd;
    Ext.getCmp('buttonModifyEmployeeView').hidden = !params[0].isModify;
    Ext.getCmp('buttonDelEmployeeView').hidden = !params[0].isDel;

    Ext.getCmp('queryfleetId').hidden = loginName != 'root';

    return new Ext.Panel({
        id: 'deployApproveInfoView',
        title: '车辆调配审批信息',
        layout: 'border',
        items: [this.grid, this.queryPanel]
    })
}