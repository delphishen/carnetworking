Ext.namespace("Ext.maintenanceInfoSelector");

Ext.maintenanceInfoSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选维修厂',
										xtype : 'textarea',
										id : 'maintenanceInfoSelector',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.maintenanceInfoSelector.form.superclass.constructor.call(this, {
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

Ext.maintenanceInfoSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.app = app;
		// 数据源



        this.ds = new Ext.data.JsonStore({
            url : path + '/api/queryMaintenanceInfo.do',
            idProperty : 'id',
            root : 'rows',
            totalProperty : 'results',
            fields : ['id', 'maintenanceName', 'chargePerson', 'contactNumber', 'scale',
                'fleetId', 'fleetName', 'company', 'address', 'remark', 'orgnId'],
            autoDestroy : true,
            autoLoad : true,
            baseParams : {
                isPaging : true,
                start : 0,
                limit : 80,
                fleetId:basefleedId,
            },
            listeners : {
                'beforeload' : function() {
                    var params = {
                        'plateNo' : Ext.getCmp('queryEmpName')
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
								win.empId = [];
								win.empName = [];
							}
							if (jQuery.inArray(record.get('id'), win.empId) < 0) {
								win.empId.push(record.get('id'));
								win.empName.push(record.get('maintenanceName'));
							}
							win.form.getForm().findField('maintenanceInfoSelector')
									.setValue(win.empName.toString());
						},
						'rowdeselect' : function(sm, index, record) {
							var win = this.app;
							win.empId.splice(jQuery.inArray(record.get('id'),
											win.empId), 1);
							win.empName.splice(jQuery.inArray(record
													.get('maintenanceName'), win.empName),
									1);
							win.form.getForm().findField('maintenanceInfoSelector')
									.setValue(win.empName.toString());
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
								header : '所属机构',
								dataIndex : 'company'
							}, {
								header : '维修厂名称',
								dataIndex : 'maintenanceName'
							}]
				});
		// 菜单条
		this.tbar = new Ext.Toolbar(['&nbsp;名称:', {
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
		Ext.maintenanceInfoSelector.grid.superclass.constructor.call(this, {
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

Ext.maintenanceInfoSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.empId = new Array();
				this.empName = new Array();
				this.form = new Ext.maintenanceInfoSelector.form(this);
				this.grid = new Ext.maintenanceInfoSelector.grid(this);
				Ext.maintenanceInfoSelector.win.superclass.constructor.call(this, {
							title : '维修厂选择器',
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

var maintenanceInfoSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.maintenanceInfoSelector.win(this);
	win.show();
}