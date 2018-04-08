Ext.namespace("Ext.truckDispatcherSelector");

Ext.truckDispatcherSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选车辆',
										xtype : 'textarea',
										id : 'truck',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.truckDispatcherSelector.form.superclass.constructor.call(this, {
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

Ext.truckDispatcherSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.app = app;
		// 数据源



        this.ds = new Ext.data.JsonStore({
            url : path + '/logistics/queryTruckDispatcher.do',
            idProperty : 'id',
            root : 'rows',
            totalProperty : 'results',
            fields : ['id', 'fleetId', 'plateNoId','plateNo', 'fleetName', 'modelName', 'driverName', 'driverId'],
            autoDestroy : true,
            autoLoad : true,
            baseParams : {
                isPaging : true,
                start : 0,
                limit : 80,
                fleetId:basefleedId,
                userId:userId,
                remark:remark,
                carTypeId:carTypeID,
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
								win.empId = [];
								win.empName = [];
								win.driverId = [];
								win.driverName = [];
							}
							if (jQuery.inArray(record.get('plateNoId'), win.empId) < 0) {
								win.empId.push(record.get('plateNoId'));
								win.empName.push(record.get('plateNo'));
                                win.driverId.push(record.get('driverId'));
                                win.driverName.push(record.get('driverName'));
							}
							win.form.getForm().findField('truck')
									.setValue(win.empName.toString());
						},
						'rowdeselect' : function(sm, index, record) {
							var win = this.app;
							win.empId.splice(jQuery.inArray(record.get('plateNoId'),
											win.empId), 1);
							win.empName.splice(jQuery.inArray(record
													.get('plateNo'), win.empName),
									1);
							win.form.getForm().findField('truck')
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
                        header : 'fleetId',
                        dataIndex : 'fleetId',
                        hidden : true
                    },{
                        header : 'plateNoId',
                        dataIndex : 'plateNoId',
                        hidden : true
                    },{
						id:'driverId',
                        header : 'driverId',
                        dataIndex : 'driverId',
                        hidden : true
                    },{
								header : '所属平台',
								dataIndex : 'fleetName'
							}, {
								header : '车牌号',
								dataIndex : 'plateNo'
							}, {
								header : '车牌类型',
								dataIndex : 'modelName'
							}, {
								id:'driverName',
								header : '默认司机',
								dataIndex : 'driverName'
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
		Ext.truckDispatcherSelector.grid.superclass.constructor.call(this, {
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

Ext.truckDispatcherSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.empId = new Array();
				this.empName = new Array();
                this.driverId = new Array();
                this.driverName = new Array();
				this.form = new Ext.truckDispatcherSelector.form(this);
				this.grid = new Ext.truckDispatcherSelector.grid(this);
				Ext.truckDispatcherSelector.win.superclass.constructor.call(this, {
							title : '车辆选择器',
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
				//console.log("司机id" +Ext.getCmp("driverId").value);
				//console.log("司机姓名" + Ext.getCmp("driverName").value)
				this.app.callback.call(this.app.scope, this.empId.toString(),
						this.empName.toString(),this.driverId.toString(),this.driverName.toString());
				this.close();
			},
			onReset : function(btn) {
				this.form.getForm().reset();
				this.empId = [];
				this.empName = [];
                this.driverId = [];
                this.driverName = [];
			},
			onClose : function() {
				this.close();
			}
		});

var truckDispatcherSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.truckDispatcherSelector.win(this);
	win.show();
}