Ext.namespace('Ext.driverType');

Ext.driverType.form = Ext.extend(Ext.FormPanel, {
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
				},{
					xtype : 'hidden',
					id : 'fleetId'
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
                allowBlank : false,
                editable : false,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                store : this.fleetTypeDS,
                valueField : 'fleetName',
                displayField : 'fleetName',
                listeners : {
                    'select' : function(combo, record) {
                        console.log(record);
                        this.getForm().findField('fleetId').setValue(record.data.id);
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
					items : [{
								fieldLabel : '类型名称',
								xtype : 'textfield',
								name : 'driverType',
								anchor : '98%',
                        		allowBlank : false,
								selectOnFocus : true
							}]
				}];

		Ext.driverType.form.superclass.constructor.call(this, {
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

Ext.driverType.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.driverType.form(this);
				Ext.driverType.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savedriverType.do', {
								driverType : Ext.encode(user)
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

Ext.driverType.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryDriverType.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id', 'fleetId', 'driverType','modifier','moTime','fleetName'],
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
										header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									},{
										header : '司机类型',
										dataIndex : 'driverType'
									}, {
										header : '修改人',
										dataIndex : 'modifier'
									}, {
										header : '修改时间',
										dataIndex : 'moTime'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									}
									]
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
				Ext.driverType.grid.superclass.constructor.call(this, {
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
				var win = new Ext.driverType.win(this);
				win.setTitle('添加司机类型', 'add');
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
				var win = new Ext.driverType.win(this);
				var form = win.form.getForm();
				win.setTitle('修改司机类型', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);

				form.findField('driverType').setValue(select.driverType);
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
								Ext.eu.ajax(path + '/logistics/deletedriverType.do', {
											driverTypes : Ext.encode(ary)
										}, function(resp) {

                                    var res = Ext.decode(resp.responseText);
                                    if(res.success){
                                        Ext.ux.Toast.msg('信息', '删除成功');
                                        this.getStore().reload();
									}else{
                                        Ext.ux.Toast.msg('信息', '该记录已被引用，无法删除！！！');
									}

										}, this);
							}
						}, this);
			}
		});

Ext.driverType.queryPanel = Ext.extend(Ext.FormPanel, {
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

                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 180,
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : '类型名称',
                        id : 'driverType',
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
				Ext.driverType.queryPanel.superclass.constructor.call(this, {
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
var driverTypeView = function(params) {
	this.queryPanel = new Ext.driverType.queryPanel(this);
	this.grid = new Ext.driverType.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'driverTypeView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '司机类型管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
