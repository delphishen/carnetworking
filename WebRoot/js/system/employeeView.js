Ext.namespace('Ext.employee');

Ext.employee.form = Ext.extend(Ext.FormPanel, {
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
                    submitValue : true,
                    allowBlank : false,
                    editable : false,
                    onTriggerClick : function(e) {
                    	console.log('平台id值-------'+Ext.getCmp("fleetId").getValue());
                        basefleedId = Ext.getCmp('fleetId').getValue();
                        var val = Ext.getCmp("fleetName").value;

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
						}, {
							xtype : 'hidden',
							id : 'fleetId'
						}, {
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
                                allowBlank : false,
								triggerAction : 'all',
								mode : 'local',
								store : this.fleetTypeDS,
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

						},{
							columnWidth : 1,
							items : [{
										fieldLabel : '名称',
										xtype : 'textfield',
										name : 'name',
										anchor : '98%',
										maxLength : 18,
										maxLengthText : '名称不能大于18个字符',
										selectOnFocus : true,
										allowBlank : false
									}]
						}, {
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
								store : new Ext.data.ArrayStore({
									fields : ['key', 'val'],
									data : [['男', '男'],
										['女', '女']
									]
								}),
								valueField : 'val',
								displayField : 'key'
							}]
						},{
							columnWidth : 1,
							items : [{
								fieldLabel : '备注',
								xtype : 'textfield',
								name : 'remark',
								anchor : '98%',
								selectOnFocus : true,
								allowBlank : true
							}]
						}, {
							columnWidth : 1,
							labelWidth : 60,
							items : [{
										fieldLabel : '联系电话',
										xtype : 'numberfield',
										name : 'phone',
										anchor : '98%',
										selectOnFocus : true,
                                		regex:/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
                                		regexText:'请输入正确的手机号码',
                                		allowBlank : false
                            }]
						}, {
								columnWidth : 1,
								labelWidth : 60,
								items : [{
									fieldLabel : '邮箱地址',
									xtype : 'textfield',
                                    name: 'email',
                                    vtype:'email',
									anchor : '98%',
                                    allowBlank : true

								}]
							}];

				Ext.employee.form.superclass.constructor.call(this, {
							labelWidth : 60,
							baseCls : 'x-plain',
							layout : 'column',
							style : 'padding : 5',
							defaults : {
								baseCls : 'x-plain',
								layout : 'form'
							}
						});
			}

		});

Ext.employee.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.employee.form(this);
				Ext.employee.win.superclass.constructor.call(this, {
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
					var employee = form.getValues();
					console.log(employee);
			/*		employee.isAdmin = employee.isAdmin == 'true' ? 1 : 0;*/
					Ext.eu.ajax(path + '/system/saveEmployee.do', {
								employee : Ext.encode(employee)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '保存的记录存在重名');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.employee.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/system/queryEmployee.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',
							fields : ['id', 'name',  'type', 'phone', 'remark',
								'fleetId', 'fleetName', 'company', 'sex', 'email'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								isPaging : true,
								start : 0,
								limit : 20,
								fleetId:fleedId,
							},
							listeners : {
								'beforeload' : function() {
									Ext.apply(this.getStore().baseParams,
											this.app.queryPanel
													.getQueryParams());
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
                            },  {
										header : '姓名',
										dataIndex : 'name'
									},  {
										header : '联系电话',
										dataIndex : 'phone'
									}, {
										header : '备注',
										dataIndex : 'remark'
											}, {
										header : '性别',
										dataIndex : 'sex'
									}, {
										header : '邮箱',
										dataIndex : 'email'
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
							id : 'buttonAddEmployeeView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id : 'buttonModifyEmployeeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id : 'buttonDelEmployeeView',
							xtype : 'button',
							iconCls : 'delete',
							text : '删除',
							handler : this.onDelete,
							scope : this
						}]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 20,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.employee.grid.superclass.constructor.call(this, {
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
				var win = new Ext.employee.win(this);
				win.setTitle('添加员工', 'add');
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
				var win = new Ext.employee.win(this);
				var form = win.form.getForm();
				win.setTitle('修改员工', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('name').setValue(select.name);
				form.findField('phone').setValue(select.phone);
				form.findField('remark').setValue(select.remark);

                form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);
                form.findField('companyId').setValue(select.companyId);
                form.findField('company').setValue(select.company);
                form.findField('sex').setValue(select.sex);
                form.findField('email').setValue(select.email);
				win.show();
			},
			onDelete : function() {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
				var employees = Array();
				for (var i = 0; i < selects.length; i++) {
					var employee = {
						id : selects[i].data.id
					}
					employees.push(employee);
				}
				Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/system/deleteEmployee.do',
										{
											employees : Ext.encode(employees)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.employee.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 200,
							items : [{
										xtype : 'textfield',
										fieldLabel : '名称',
										id : 'empName',
										anchor : '90%'
									}]
						}, {
							width : 65,
							items : [{
										xtype : 'button',
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
										text : '清空',
										iconCls : 'reset',
										handler : function() {
											this.getForm().reset();
										},
										scope : this
									}]
						}];
				// panel定义
				Ext.employee.queryPanel.superclass.constructor.call(this, {
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 35
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
var employeeView = function(params) {
	this.queryPanel = new Ext.employee.queryPanel(this);
	this.grid = new Ext.employee.grid(this);

	Ext.getCmp('buttonAddEmployeeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifyEmployeeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelEmployeeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'employeeView',
				title : '员工管理',
				layout : 'border',
				items : [this.grid, this.queryPanel]
			})
}