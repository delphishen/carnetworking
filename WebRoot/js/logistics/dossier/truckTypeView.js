Ext.namespace('Ext.truckType');

Ext.truckType.form = Ext.extend(Ext.FormPanel, {
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
                },  {
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
								console.log(record);
                                this.getForm().findField('fleetId').setValue(record.data.id);
								//this.getForm().findField('fleetId').setValue(record.data.id);
							},
							scope : this
						}
					}]
				},{
						columnWidth : 1,
						labelWidth : 60,
						items : [{
							xtype : 'combo',
							fieldLabel : '车型名称',
							hiddenName : 'modelName',
							anchor : '98%',
							typeAhead : true,
							editable : false,
							triggerAction : 'all',
							lazyRender : true,
                            allowBlank : false,
							mode : 'local',
							value:'舒适型',
							store : new Ext.data.ArrayStore({
								fields : ['key', 'val'],
								data : [['舒适型', '舒适型'],
									['商务型', '商务型']]
							}),
							valueField : 'val',
							displayField : 'key'
						}]
					},{
					columnWidth : 1,
					items : [{
								fieldLabel : '车座数',
								xtype : 'numberfield',
								name : 'seatNumber',
								anchor : '98%',
                        		allowBlank : false,
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
					items : [{
								fieldLabel : '核载人数',
								xtype : 'numberfield',
								name : 'approvedPassengersCapacity',
								anchor : '98%',
                       		 	allowBlank : false,
								selectOnFocus : true
							}]
				},{
						columnWidth : 1,
						items : [{
							fieldLabel : '规格',
							xtype : 'textfield',
							name : 'type',
							anchor : '98%',
							selectOnFocus : true
						}]
					},{
						columnWidth : 1,
						items : [{
							fieldLabel : '说明',
							xtype : 'textfield',
							name : 'remark',
							anchor : '98%',
							selectOnFocus : true
						}]
					}
				];

		Ext.truckType.form.superclass.constructor.call(this, {
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

Ext.truckType.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.truckType.form(this);
				Ext.truckType.win.superclass.constructor.call(this, {
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
					console.log(user);
					user.isAdmin = user.isAdmin == 1 ? 1 : 0;
					Ext.eu.ajax(path + '/logistics/saveTruckType.do', {
								truckType : Ext.encode(user)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '车辆类型名称已经存在！！！');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.truckType.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryTruckType.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id','fleetId', 'fleetName', 'modelName','seatNumber','approvedPassengersCapacity', 'type','remark'],
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
									},{
										header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									}, {
										header : '车型名称',
										dataIndex : 'modelName'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									}, {
										header : '车座数',
										dataIndex : 'seatNumber'
									}, {
										header : '荷载人数',
										dataIndex : 'approvedPassengersCapacity'
									}, {
										header : '规格',
										dataIndex : 'type'
									}, {
										header : '说明',
										dataIndex : 'remark'
									}
									]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id:'buttonAddTruckTypeView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id:'buttonModifyTruckTypeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDelTruckTypeView',
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
				Ext.truckType.grid.superclass.constructor.call(this, {
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
				var win = new Ext.truckType.win(this);
				win.setTitle('添加车辆类型', 'add');
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
				var win = new Ext.truckType.win(this);
				var form = win.form.getForm();
				win.setTitle('修改车辆类型信息', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);
				form.findField('modelName').setValue(select.modelName);
				form.findField('seatNumber').setValue(select.seatNumber);
				form.findField('approvedPassengersCapacity').setValue(select.approvedPassengersCapacity);
                form.findField('type').setValue(select.type);
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
					var user = {
						id : selects[i].data.id
					}
					ary.push(user);
				}
				 
				// Ext.ux.Toast.msg("信息", Ext.encode(ary));
				Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/logistics/deleteTruckType.do', {
											truckTypes : Ext.encode(ary)
										}, function(resp) {
                                    		var res = Ext.decode(resp.responseText);
                                    		if(res.success){
                                                Ext.ux.Toast.msg('信息', '删除成功');
											}else {
                                                Ext.ux.Toast.msg('信息', '删除失败,该记录已被引用');
											}


											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.truckType.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;				 
			
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
					width : 180,
					items : [{
								xtype : 'textfield',
								fieldLabel : '车辆类别',
								id : 'modelName',
								anchor : '90%'
							}]
				},{
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
				Ext.truckType.queryPanel.superclass.constructor.call(this, {
							id : 'truckTypeQueryPanel',
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
var truckTypeView = function(params) {
	this.queryPanel = new Ext.truckType.queryPanel(this);
	this.grid = new Ext.truckType.grid(this);

	Ext.getCmp('buttonAddTruckTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifyTruckTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelTruckTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'truckTypeView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '车辆类型管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
