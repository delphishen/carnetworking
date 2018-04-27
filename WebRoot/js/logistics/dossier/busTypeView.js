Ext.namespace('Ext.busType');
var flag = '1';


Ext.busType.form = Ext.extend(Ext.FormPanel, {
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
                    },
                    'render' : function(combo) {//渲染
                        combo.getStore().on("load", function(s, r, o) {
                        	if( flag == '1'){
                                combo.setValue(r[0].get('fleetName'));//第一个值
                                Ext.getCmp('fleetId').setValue(r[0].get('id'));
							}



                        });
                    },
                    scope : this
                }
            }]
        }, {
					columnWidth : 1,
					items : [{

								id:'charteredBusType',
								fieldLabel : '类型名称',
								xtype : 'textfield',
								name : 'charteredBusType',
								anchor : '98%',
                        		allowBlank : false,
								selectOnFocus : true
							}]
				},{
            columnWidth : 1,
            items : [{
            	id:'remark',
                fieldLabel : '备注',
                xtype : 'textfield',
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

		Ext.busType.form.superclass.constructor.call(this, {
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

Ext.busType.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.busType.form(this);
				Ext.busType.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savebusType.do', {
								busType : Ext.encode(user)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '该信息已经存在！！！');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.busType.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryBusType.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id', 'fleetId', 'charteredBusType','modifier','moTime','remark','fleetName'],
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
										header : '业务类型',
										dataIndex : 'charteredBusType'
									}, {
										header : '修改人',
										dataIndex : 'modifier'
									}, {
										header : '修改时间',
										dataIndex : 'moTime'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									},{
                                header : '备注',
                                dataIndex : 'remark'
                            }]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id:'buttonAddbusTypeView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id:'buttonModifybusTypeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDelbusTypeView',
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
				Ext.busType.grid.superclass.constructor.call(this, {
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
				flag = '1';
				var win = new Ext.busType.win(this);
				win.setTitle('添加包车业务类型', 'add');
				win.show();
			},
			onModify : function(btn) {
				flag = '2';
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
				var win = new Ext.busType.win(this);
				var form = win.form.getForm();
				win.setTitle('修改包车业务类型', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);

				form.findField('charteredBusType').setValue(select.charteredBusType);
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
								Ext.eu.ajax(path + '/logistics/deleteBusType.do', {
											busTypes : Ext.encode(ary)
										}, function(resp) {
                                    var res = Ext.decode(resp.responseText);
                                    if(res.success) {
                                        Ext.ux.Toast.msg('信息', '删除成功');
                                    }else {
                                        Ext.ux.Toast.msg('信息', '该记录已被引用，无法删除！！！');
									}
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.busType.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 180,
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : '业务类型',
                        id : 'charteredBustype',
                        name : 'charteredBusType',
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
				Ext.busType.queryPanel.superclass.constructor.call(this, {
							id : 'busTypeViewQueryPanel',
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
var busTypeView = function(params) {
	this.queryPanel = new Ext.busType.queryPanel(this);
	this.grid = new Ext.busType.grid(this);

	Ext.getCmp('buttonAddbusTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifybusTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelbusTypeView').hidden=!params[0].isDel;
	
	return new Ext.Panel({
				id : 'busTypeView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '包车业务类型管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
