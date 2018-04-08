Ext.namespace("Ext.managerSelector");

Ext.managerSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选人员',
										xtype : 'textarea',
										id : 'user',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.managerSelector.form.superclass.constructor.call(this, {
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

Ext.managerSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.app = app;
		// 数据源
		this.ds = new Ext.data.JsonStore({
					url : path + '/system/queryManager.do',
					idProperty : 'id',
					root : 'rows',
					totalProperty : 'results',
					fields : ['id','fleetId', 'empId', 'empName', 'loginName',
                        'password', 'isAdmin', 'email', 'remark', 'roleName'],
					autoDestroy : true,
					autoLoad : true,
					baseParams : {
						start : 0,
						limit : 20,
						fleetId:basefleedId,

					},
					listeners : {
						'beforeload' : function() {
							var params = {
								'Q_u.name_S_LK' : Ext.getCmp('queryUserName')
										.getValue(),
								'Q_a.loginName_S_LK' : Ext
										.getCmp('queryLoginName').getValue()
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
								win.userId = [];
								win.userName = [];

							}
							if (jQuery.inArray(record.get('id'), win.userId) < 0) {
								win.userId.push(record.get('id'));
								win.userName.push(record.get('loginName'));


							}
							win.form.getForm().findField('user')
									.setValue(win.userName.toString());
						},
						'rowdeselect' : function(sm, index, record) {
							var win = this.app;
							win.userId.splice(jQuery.inArray(record.get('id'),
											win.userId), 1);
							win.userName.splice(jQuery.inArray(record
													.get('loginName'),
											win.userName), 1);

							win.form.getForm().findField('user')
									.setValue(win.userName.toString());
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
					columns : [new Ext.grid.RowNumberer(), this.sm,{
                        header : 'id',
                        dataIndex : 'id',
                        hidden : true
                    }, {
                        header : 'fleetId',
                        dataIndex : 'fleetId',
						hidden:true
                    }, {
                        header : '登录用户名',
                        dataIndex : 'loginName'
                    },{
                        header : '管理员',
                        dataIndex : 'isAdmin',
                        renderer : function(val) {
                            if (val == 0) {
                                return '否';
                            } else if (val == 1){
                                return '是';
                            }
                        }
                    }, {
                        header : '备注',
                        dataIndex : 'remark'
                    }, {
                        header : '角色',
                        dataIndex : 'roleName'
                    }]
				});
		// 菜单条
		this.tbar = new Ext.Toolbar(['&nbsp;姓名:', {
					id : 'queryUserName',
					xtype : 'textfield',
					width : 100
				}, '&nbsp;账号:', {
					id : 'queryLoginName',
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
						Ext.getCmp('queryUserName').reset();
						Ext.getCmp('queryLoginName').reset();
					}
				}]);
		// 页码条
		this.bbar = new Ext.PagingToolbar({
					pageSize : 20,
					displayInfo : true,
					store : this.ds
				});
		// 构造
		Ext.managerSelector.grid.superclass.constructor.call(this, {
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

Ext.managerSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.userId = new Array();
				this.userName = new Array();
                this.userFleetId = new Array();
				this.form = new Ext.managerSelector.form(this);
				this.grid = new Ext.managerSelector.grid(this);
				Ext.managerSelector.win.superclass.constructor.call(this, {
							title : '机构管理员选择器',
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
				this.app.callback.call(this.app.scope, this.userId.toString(),
						this.userName.toString());
				this.close();
			},
			onReset : function(btn) {
				this.form.getForm().reset();
				this.userId = [];
				this.userName = [];
			},
			onClose : function() {
				this.close();
			}
		});

var managerSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.managerSelector.win(this);
	win.show();
}