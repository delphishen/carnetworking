Ext.namespace("Ext.driverDispatcherSelector");

Ext.driverDispatcherSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选司机',
										xtype : 'textarea',
										id : 'driverName2',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.driverDispatcherSelector.form.superclass.constructor.call(this, {
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

Ext.driverDispatcherSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.app = app;
		// 数据源



        this.ds = new Ext.data.JsonStore({
            url : path + '/logistics/queryDriverDispatcher.do',
            idProperty : 'id',
            root : 'rows',
            totalProperty : 'results',
            fields : ['id', 'fleetId', 'driverName','fleetName','driverId'],
            autoDestroy : true,
            autoLoad : true,
            baseParams : {
                isPaging : true,
                start : 0,
                limit : 80,
                fleetId:basefleedId,
				userId:userId,
                remark:remark
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
							}
							if (jQuery.inArray(record.get('driverId'), win.empId) < 0) {
								win.empId.push(record.get('driverId'));
								win.empName.push(record.get('driverName'));
							}
							win.form.getForm().findField('driverName2')
									.setValue(win.empName.toString());
						},
						'rowdeselect' : function(sm, index, record) {
							var win = this.app;
							win.empId.splice(jQuery.inArray(record.get('driverId'),
											win.empId), 1);
							win.empName.splice(jQuery.inArray(record
													.get('driverName'), win.empName),
									1);
							win.form.getForm().findField('driverName2')
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
                    		}, {
								header : 'driverId',
								dataIndex : 'driverId',
								hidden : true
							},{
								header : '所属机构',
								dataIndex : 'fleetName'
							}, {
								header : '司机名称',
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
		Ext.driverDispatcherSelector.grid.superclass.constructor.call(this, {
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

Ext.driverDispatcherSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.empId = new Array();
				this.empName = new Array();
				this.form = new Ext.driverDispatcherSelector.form(this);
				this.grid = new Ext.driverDispatcherSelector.grid(this);
				Ext.driverDispatcherSelector.win.superclass.constructor.call(this, {
							title : '司机调度',
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
                var selects = Ext.eu.getSelects(this.grid);
                var select = selects[0].data;
                console.log(select.driverId);
                var params = {
                    driverId : select.driverId,
                    departureTime : departureTime
                };


                Ext.eu.ajax(path + '/logistics/querydispatcherRota.do', params, function(
                    resp) {
                    var res = Ext.decode(resp.responseText);
                    if (res.label) {
                        this.app.callback.call(this.app.scope, this.empId.toString(),
                            this.empName.toString());
                        this.close();
                    } else {
                        Ext.ux.Toast.msg('提示', '改司机今天没有排班！！！');
                        btn.setDisabled(false);
                    }
                }, this);


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

var driverDispatcherSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.driverDispatcherSelector.win(this);
	win.show();
}