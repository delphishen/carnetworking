Ext.namespace("Ext.role");

Ext.role.form = Ext.extend(Ext.FormPanel, {
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






		this.items = [{
					xtype : 'hidden',
					id : 'id'
				}, {
					xtype : 'hidden',
					id : 'fleetId'
				}, {
					columnWidth : 1,
					labelWidth : 80,
					items : [{
                        id:'fleetName',
						fieldLabel : '平台名称',
						width : 80,
						xtype : 'combo',
						hiddenName : 'fleetName',
						submitValue : false,
						anchor : '98%',
						editable : false,
						autoLoad : true,
						allowBlank : false,
						triggerAction : 'all',
						mode : 'local',
						store : this.fleetTypeDS,
						valueField : 'fleetName',
						displayField : 'fleetName',
                        selectOnFocus : true,
						listeners : {
							'select' : function(combo, record) {
								this.getForm().findField('fleetId').setValue(record.data.id);
								basefleedId = record.data.id;
							},
                            'render' : function(combo) {//渲染
                                combo.getStore().on("load", function(s, r, o) {
                                    combo.setValue(r[0].get('fleetName'));//第一个值
                                    Ext.getCmp('fleetId').setValue(r[0].get('id'));
                                    basefleedId = r[0].get('id');


                                });
                            },
							scope : this
						}
					}]
				}, {
					columnWidth : 1,
            		labelWidth : 80,
					items : [{
								fieldLabel : '角色名称',
								xtype : 'textfield',
								name : 'roleName',
                        		allowBlank : false,
								anchor : '98%',
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
					labelWidth : 80,
					items : [{
						fieldLabel : '备注',
						xtype : 'textfield',
						name : 'remark',
						anchor : '98%',
						selectOnFocus : true
					}]
				}];

		Ext.role.form.superclass.constructor.call(this, {
					labelWidth : 80,
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

Ext.role.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.role.form(this);
				Ext.role.win.superclass.constructor.call(this, {
							width : 500,
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
					var role = form.getValues();
					//role.isAdmin = role.isAdmin == 1 ? 1 : 0;
				//	alert(Ext.encode(role));
					Ext.eu.ajax(path + '/system/saveRole.do', {
								role : Ext.encode(role)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '用户名已经存在,请重新设置！');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.role.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/system/queryRole.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',
							fields : ['id', 'fleetId', 'roleName', 'remark', 'fleetName'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								isPaging : true,
								start : 0,
								limit : 20,
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
							singleSelect : true
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
									},  {
										header : '角色名称',
										dataIndex : 'roleName'
									},  {
										header : '备注',
										dataIndex : 'remark'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									}]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id : 'buttonAddRoleView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id : 'buttonModifyRoleView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id : 'buttonDelRoleView',
							xtype : 'button',
							iconCls : 'delete',
							text : '删除',
							handler : this.onDelete,
							scope : this
						},  '->', {
                    		id : 'buttonauthorizationUserView',
							xtype : 'button',
							iconCls : 'arrow_refresh',
							text : '页面授权',
							handler : this.onPageRight,
							scope : this
						}]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 20,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.role.grid.superclass.constructor.call(this, {
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
				var win = new Ext.role.win(this);
				win.setTitle('添加用户', 'add');
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
				var win = new Ext.role.win(this);
				var form = win.form.getForm();
				win.setTitle('修改用户', 'modify');
				form.findField('id').setValue(select.id);
                form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);
				form.findField('empId').setValue(select.empId);
				form.findField('password').setValue(select.password);
				form.findField('empName').setValue(select.empName);
				form.findField('loginName').setValue(select.loginName);
				form.findField('email').setValue(select.email);
				form.findField('remark').setValue(select.remark);
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
					var role = {
						id : selects[i].data.id
					}
					ary.push(role);
				}
				Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/system/deleteUser.do', {
											users : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			},
			onReset : function(btn) {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要重置的记录！");
					return;
				}
				if (selects.length > 1) {
					Ext.ux.Toast.msg("信息", "只能选择一条记录！");
					return;
				}
				var role = {
					id : selects[0].data.empId,
					password : '123456'
				}
				Ext.Msg.confirm('重置密码', '确定为所选记录重置密码吗?', function(btn) {
							if (btn == 'yes') {
								//alert(Ext.encode(role));
								Ext.eu.ajax(path + '/system/resetPassword.do', {
											role : Ext.encode(role)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '重置成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			},
			onPageRight : function(btn) {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要授权的记录！");
					return;
				}
				if (selects.length > 1) {
					Ext.ux.Toast.msg("信息", "只能选择一条记录！");
					return;
				}
				this.user = {
					id : selects[0].data.id,
					empName : selects[0].data.roleName
				}
				var win = new Ext.rolePageRight.win(this);
				win.setTitle('页面授权', 'modify');
				win.show();
			}
		});

Ext.role.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 250,
							items : [{
										xtype : 'textfield',
										fieldLabel : '登录用户名',
										id : 'userName',
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
						}
						];
				// panel定义
				Ext.role.queryPanel.superclass.constructor.call(this, {
							id : 'userQueryPanel',
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 70
							}
						});
			},
			getQueryParams : function() {
				return this.getForm().getValues();
			}
		});

/**
 * 入口方法，用于定位动态加载文件
 * 
 * @return {}
 */
var roleView = function(params) {
	this.queryPanel = new Ext.role.queryPanel(this);
	this.grid = new Ext.role.grid(this);



	console.log(params[0]);
	Ext.getCmp('buttonAddRoleView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifyRoleView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelRoleView').hidden=!params[0].isDel;

    // var login = loginName == 'root' ? 1 : 0;
    //
    // console.log(login);
    //
    // Ext.getCmp('buttonauthorizationUserView').hidden=!login;
	
	return new Ext.Panel({
				id : 'roleView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '角色菜单权限管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
