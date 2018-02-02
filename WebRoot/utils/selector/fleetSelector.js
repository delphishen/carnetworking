Ext.namespace("Ext.fleetSelector");

Ext.fleetSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选平台',
										xtype : 'textarea',
										id : 'fleet',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.fleetSelector.form.superclass.constructor.call(this, {
							region : 'south',
							height : 75,
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

Ext.fleetSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.app = app;
		// 数据源
		this.ds = new Ext.data.JsonStore({
					url : path + '/system/queryEmployee.do',
					idProperty : 'id',
					root : 'rows',
					totalProperty : 'results',
					fields : ['id', 'name', 'type', 'phone', 'remark'],
					autoDestroy : true,
					autoLoad : true,
					baseParams : {
						start : 0,
						limit : 20
					},
					listeners : {
						'beforeload' : function() {
							var params = {
								'empName' : Ext.getCmp('queryEmpName')
										.getValue()
							};
							Ext.apply(this.baseParams, params);
						}
					}
				});
		// 选择框
		this.sm = new Ext.grid.CheckboxSelectionModel({
					singleSelect : this.app.app.isSingle,
					listeners : {
						'rowselect' : function(sm, index, record) {
							var win = this.app;
							if (win.app.isSingle) {
								win.fleetId = [];
								win.fleetName = [];
							}
							if (jQuery.inArray(record.get('id'), win.fleetId) < 0) {
								win.fleetId.push(record.get('id'));
								win.fleetName.push(record.get('name'));
							}
							win.form.getForm().findField('emp')
									.setValue(win.fleetName.toString());
						},
						'rowdeselect' : function(sm, index, record) {
							var win = this.app;
							win.fleetId.splice(jQuery.inArray(record.get('id'),
											win.fleetId), 1);
							win.fleetName.splice(jQuery.inArray(record
													.get('name'), win.fleetName),
									1);
							win.form.getForm().findField('fleet')
									.setValue(win.fleetName.toString());
						},
						scope : this
					}
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
								header : '名称',
								dataIndex : 'name'
							}, {
								header : '员工类型',
								dataIndex : 'type',
								renderer : function(val) {
									if (val == 1) {
										return '调度员';
									} else if (val == 2){
										return '业务员';
									}else if (val == 3){
										return '经理';
									}else if (val == 4){
										return '其它';
									}
								}
							}, {
								header : '联系电话',
								dataIndex : 'phone'
							}]
				});
		// 菜单条
		this.tbar = new Ext.Toolbar(['&nbsp;姓名:', {
					id : 'queryEmpName',
					xtype : 'textfield',
					width : 100
				}, '-', {
					text : '查询',
					xtype : 'button',
					iconCls : 'query',
					handler : function() {
						this.getStore().load();
					},
					scope : this
				}, {
					text : '清空',
					xtype : 'button',
					iconCls : 'reset',
					handler : function() {
						Ext.getCmp('queryEmpName').reset();
					}
				}]);
		// 页码条
		this.bbar = new Ext.PagingToolbar({
					pageSize : 20,
					displayInfo : true,
					store : this.ds
				});
		// 构造
		Ext.fleetSelector.grid.superclass.constructor.call(this, {
					region : 'center',
					loadMask : 'loading...',
					columnLines : true,
					stripeRows : true,
					style : 'padding-right:1px',
					viewConfig : {
						forceFit : true
					}
				});
	}
});

Ext.fleetSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.empId = new Array();
				this.empName = new Array();
				this.form = new Ext.fleetSelector.form(this);
				this.grid = new Ext.fleetSelector.grid(this);
				Ext.fleetSelector.win.superclass.constructor.call(this, {
							title : '平台选择器',
							width : 500,
							height : 400,
							plain : true,
							showLock : true,
							modal : true,
							resizable : false,
							buttonAlign : 'center',
							layout : 'border',
							items : [this.form, this.grid],
							buttons : [{
										text : '确定所选',
										iconCls : 'tick',
										handler : this.onSure,
										scope : this
									}, {
										text : '清空所选',
										iconCls : 'reset',
										handler : this.onReset,
										scope : this
									}, {
										text : '取消',
										iconCls : 'cancel',
										handler : this.onClose,
										scope : this
									}]
						});
			},
			onSure : function(btn) {
				this.app.callback.call(this.app.scope, this.empId.toString(),
						this.empName.toString());
				this.close();
			},
			onReset : function(btn) {
				this.form.getForm().reset();
				this.empId = [];
				this.empName = [];
			},
			onClose : function() {
				this.close();
			}
		});

var fleetSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.fleetSelector.win(this);
	win.show();
}