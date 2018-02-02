Ext.namespace('Ext.passenger');

Ext.passenger.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;



        this.fleetTypeDS = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/system/getTreeAllFleetList.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'id'}, {name : 'fleetName'}]),

            baseParams : {
                fleetId:fleedId
            }

        });
        this.fleetTypeDS.load();


        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel : '单位机构',
            name : 'company',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                console.log("=================="+val);

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");

                }else {
                    new kqSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('companyId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);

                }

            },
            scope : this
        });





		this.items = [{
					xtype : 'hidden',
					id : 'id'
				},{
					xtype : 'hidden',
					id : 'fleetId'
				},{
					xtype : 'hidden',
					id : 'companyId'
				},{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                id:'fleetName',
                fieldLabel : '所属平台',
                width : 60,
                xtype : 'combo',
                hiddenName : 'fleetName',
                submitValue : false,
                anchor : '98%',
                editable : false,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                store : new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy( {
                        url : path + '/system/getTreeAllFleetList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'fleetName'}]),
                    baseParams : {
                        fleetId:fleedId
                    },
                    autoLoad : true
                }),
                valueField : 'fleetName',
                displayField : 'fleetName',
                listeners : {
                    'select' : function(combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                        this.getForm().findField('company').setValue(null);
                        this.getForm().findField('companyId').setValue(null);

                        basefleedId = record.data.id;


                    },
                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            items : [this.kqSelector]
        }, {
					columnWidth : 1,
					items : [{

								id:'passengerName1',
								fieldLabel : '乘客姓名',
								xtype : 'textfield',
								name : 'passengerName',
								anchor : '98%',
								selectOnFocus : true
							}]
				},{
            columnWidth : 1,
            items : [{
            	id:'mobile',
                fieldLabel : '手机号码',
                xtype : 'textfield',
                name : 'mobile',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                id:'address',
                fieldLabel : '联系地址',
                xtype : 'textfield',
                name : 'address',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                xtype : 'combo',
                fieldLabel : '状态',
                hiddenName : 'statuesId',
                anchor : '98%',
                typeAhead : true,
                editable : false,
                triggerAction : 'all',
                lazyRender : true,
                mode : 'local',
                store : new Ext.data.ArrayStore({
                    fields : ['key', 'val'],
                    data : [['不可用', '0'],
                        ['可用', '1']]
                }),
                valueField : 'val',
                displayField : 'key'
            }]
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                xtype : 'combo',
                fieldLabel : '性别',
                hiddenName : 'sex',
                anchor : '98%',
                typeAhead : true,
                editable : false,
                triggerAction : 'all',
                lazyRender : true,
                mode : 'local',
                value:'男',
                store : new Ext.data.ArrayStore({
                    fields : ['key', 'val'],
                    data : [['男', '男'],
                        ['女', '女']]
                }),
                valueField : 'val',
                displayField : 'key'
            }]
        }];

		Ext.passenger.form.superclass.constructor.call(this, {
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

Ext.passenger.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.passenger.form(this);
				Ext.passenger.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savePassenger.do', {
                       		 passenger : Ext.encode(user)
							}, function(resp) {
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
			onClose : function() {
				this.close();
			}
		});

Ext.passenger.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryPassenger.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id', 'fleetId', 'passengerName','companyId','sex','mobile','address','statuesId','company','fleetName'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								isPaging : true,
								start : 0,
								limit : 80,
                                fleetId:fleedId
							},
							listeners : {
								'beforeload' : function() {
									Ext.apply(this.getStore().baseParams,
											this.app.queryPanel.getQueryParams());									
									
								},
								scope : this
							}
						});
				// 选择框
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false
						});
				// 列
				this.cm = new Ext.grid.ColumnModel({
							defaults : {
								width : 150,
								sortable : true
							},
							columns : [new Ext.grid.RowNumberer(), this.sm, {
										header : 'id',
										dataIndex : 'id',
										hidden : true
									}, {
										header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									},{
										header : 'companyId',
										dataIndex : 'companyId',
										hidden : true
									},{
										header : '乘客姓名',
										dataIndex : 'passengerName'
									}, {
										header : '性别',
										dataIndex : 'sex'
									}, {
										header : '手机号码',
										dataIndex : 'mobile'
									}, {
										header : '联系地址',
										dataIndex : 'address'
									}, {
										header : '状态',
										dataIndex : 'statuesId'
									}, {
										header : '所属机构',
										dataIndex : 'company'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									}]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id:'buttonAdddriverTypeView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id:'buttonModifydriverTypeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDeldriverTypeView',
							xtype : 'button',
							iconCls : 'delete',
							text : '删除',
							handler : this.onDelete,
							scope : this
						}]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 80,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.passenger.grid.superclass.constructor.call(this, {
							region : 'center',
							loadMask : 'loading...',
							columnLines : true,
							clicksToEdit : 1,
							stripeRows : true,
							viewConfig : {
								forceFit : true
							}
						});
			},
			onAdd : function(btn) {
				var win = new Ext.passenger.win(this);
				win.setTitle('添加乘客端管理信息', 'add');
				win.show();
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
				var win = new Ext.passenger.win(this);
				var form = win.form.getForm();
				win.setTitle('修改乘客端管理信息', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('companyId').setValue(select.companyId);

				form.findField('passengerName').setValue(select.passengerName);
                form.findField('sex').setValue(select.sex);
                form.findField('mobile').setValue(select.mobile);
                form.findField('address').setValue(select.address);
                form.findField('statuesId').setValue(select.statuesId);
                form.findField('company').setValue(select.company);
                form.findField('fleetName').setValue(select.fleetName);

				win.show();
			},
			onDelete : function() {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var ary = Array();
				for (var i = 0; i < selects.length; i++) {
					var user = {
						id : selects[i].data.id
					}
					ary.push(user);
				}
				 
				// Ext.ux.Toast.msg("信息", Ext.encode(ary));
				Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/logistics/deletePassenger.do', {
                                    passengers : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.passenger.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 250,
							items : [{
								xtype : 'textfield',
								fieldLabel : '乘客姓名',
								id : 'passengerName',
								anchor : '90%'
							}]
						}, {
							width : 65,
							items : [{
										xtype : 'button',
										id : 'userQuery',
										text : '查询',
										iconCls : 'query',
										handler : function() {
											this.app.grid.getStore().load();
										},
										scope : this
									}]
						}, {
							width : 65,
							items : [{
										xtype : 'button',
										id : 'userReset',
										text : '清空',
										iconCls : 'reset',
										handler : function() {
											this.getForm().reset();
										},
										scope : this
									}]
						}];
				// panel定义
				Ext.passenger.queryPanel.superclass.constructor.call(this, {
							id : 'applyTypeViewQueryPanel',
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 60
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
var passengerView = function(params) {
	this.queryPanel = new Ext.passenger.queryPanel(this);
	this.grid = new Ext.passenger.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'passengerView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '乘客端管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
