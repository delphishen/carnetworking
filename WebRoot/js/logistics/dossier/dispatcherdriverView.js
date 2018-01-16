Ext.namespace('Ext.dispatcherdriver');

Ext.dispatcherdriver.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;



        this.userSelector = new Ext.form.TriggerField({
            fieldLabel : '用户',
            name : 'userName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new userSelector(function(id, name,userFleetId) {
                    this.setValue(name);
                    Ext.getCmp('userId').setValue(id);
                    basefleedId = userFleetId;




                }, true, this);
            },
            scope : this
        });


        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new driverSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('driverId').setValue(id);




                }, false, this);
            },
            scope : this
        });







		this.items = [{
					xtype : 'hidden',
					id : 'id'
				},{
					xtype : 'hidden',
					id : 'userId'
				},{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            columnWidth : 1,
            items : [this.userSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        }];

		Ext.dispatcherdriver.form.superclass.constructor.call(this, {
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

Ext.dispatcherdriver.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.dispatcherdriver.form(this);
				Ext.dispatcherdriver.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savedispatcherDriver.do', {

                        dispatcherDriver : Ext.encode(user)
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

Ext.dispatcherdriver.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryispatcherDriver.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id',  'userId','driverId','loginName','driverName'],
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
										header : 'userId',
										dataIndex : 'userId',
										hidden : true
									}, {
										header : 'driverId',
										dataIndex : 'driverId',
										hidden : true
									},{
										header : '用户名',
										dataIndex : 'loginName'
									}, {
										header : '司机姓名',
										dataIndex : 'driverName'
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
				Ext.dispatcherdriver.grid.superclass.constructor.call(this, {
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
				var win = new Ext.dispatcherdriver.win(this);
				win.setTitle('添加司机调度', 'add');
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
				var win = new Ext.dispatcherdriver.win(this);
				var form = win.form.getForm();
				win.setTitle('修改结算信息', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('userId').setValue(select.userId);
                form.findField('plateNoId').setValue(select.plateNoId);

				form.findField('userName').setValue(select.loginName);
                form.findField('plateNo').setValue(select.plateNo);

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
								Ext.eu.ajax(path + '/logistics/deletedispatcherDriver.do', {
                                   		 dispatcherDrivers : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.dispatcherdriver.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
					width:180,
                    items : [{
                        xtype : 'combo',
						width:60,
                        fieldLabel : '价格类型',
                        hiddenName : 'charteredBusType',
                        anchor : '98%',
                        typeAhead : true,
                        editable : false,
                        triggerAction : 'all',
                        lazyRender : true,
                        mode : 'local',
                        store : new Ext.data.ArrayStore({
                            fields : ['key', 'val'],
                            data : [['常规价格设置', '0'],
                                ['包车价格设置', '1']]
                        }),
                        valueField : 'val',
                        displayField : 'key'
                    }]
                },
					{
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
				Ext.dispatcherdriver.queryPanel.superclass.constructor.call(this, {
							id : 'driverTypeQueryPanel',
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
var dispatcherdriverView = function(params) {
	this.queryPanel = new Ext.dispatcherdriver.queryPanel(this);
	this.grid = new Ext.dispatcherdriver.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'dispatcherdriverView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '车辆调度',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
