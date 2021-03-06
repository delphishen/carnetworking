Ext.namespace('Ext.dispatcherPlateNo');

Ext.dispatcherPlateNo.form = Ext.extend(Ext.FormPanel, {
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


        this.truckSelector = new Ext.form.TriggerField({
            fieldLabel : '车牌号',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new truckSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('plateNoId').setValue(id);




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
            id : 'plateNoId'
        }, {
            columnWidth : 1,
            items : [this.userSelector]
        },{
            columnWidth : 1,
            items : [this.truckSelector]
        }];

		Ext.dispatcherPlateNo.form.superclass.constructor.call(this, {
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

Ext.dispatcherPlateNo.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.dispatcherPlateNo.form(this);
				Ext.dispatcherPlateNo.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savedispatcherPlateNo.do', {

                        dispatcherPlateNo : Ext.encode(user)
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

Ext.dispatcherPlateNo.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryispatcherPlateNo.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id',  'userId','plateNoId','loginName','plateNo'],
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
										header : 'plateNoId',
										dataIndex : 'plateNoId',
										hidden : true
									},{
										header : '用户名',
										dataIndex : 'loginName'
									}, {
										header : '车牌号',
										dataIndex : 'plateNo'
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
				Ext.dispatcherPlateNo.grid.superclass.constructor.call(this, {
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
				var win = new Ext.dispatcherPlateNo.win(this);
				win.setTitle('添加结算类型', 'add');
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
				var win = new Ext.dispatcherPlateNo.win(this);
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
								Ext.eu.ajax(path + '/logistics/deletedispatcherPlateNo.do', {
                                    		dispatcherPlateNos : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.dispatcherPlateNo.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;

                this.userDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/system/getAllUser.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'loginName'}]),

                    baseParams : {
                        fleetId:fleedId
                    }
                });
                this.userDS.load();



                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 280,
                    items : [{
                        id:'dispatcherPlateNouserName',
                        fieldLabel : '调度员姓名',
                        width : 100,
                        xtype : 'combo',
                        hiddenName : 'userId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.userDS,
                        valueField : 'id',
                        displayField : 'loginName',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
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
				Ext.dispatcherPlateNo.queryPanel.superclass.constructor.call(this, {
							id : 'dispatcherPlateNoQueryPanel',
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 80
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
var dispatcherplateNoView = function(params) {
	this.queryPanel = new Ext.dispatcherPlateNo.queryPanel(this);
	this.grid = new Ext.dispatcherPlateNo.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'dispatcherplateNoView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '车辆调度',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
