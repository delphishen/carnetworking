Ext.namespace('Ext.truck');

Ext.truck.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;

        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel : '单位机构',
            name : 'company',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new kqSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('companyId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });

        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '所属司机',
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
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });


        this.truckTypeSelector = new Ext.form.TriggerField({
            fieldLabel : '车辆类型',
            name : 'modelName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new truckTypeSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('carType').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });










		this.items = [{
					xtype : 'hidden',
					id : 'id'
				},{
					xtype : 'hidden',
					id : 'fleetId'
				},{
					xtype : 'hidden',
					id : 'companyId'
                },{
                    xtype : 'hidden',
                    id : 'driverId'
                },{
					xtype : 'hidden',
					id : 'carType'
				}, {
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                fieldLabel : '所属平台',
                width : 60,
                xtype : 'combo',
                hiddenName : 'fleetName',
                submitValue : false,
                anchor : '98%',
                editable : false,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                store : Ext.getCmp('truckViewfleetTypeDS').getStore(),
                valueField : 'fleetName',
                displayField : 'fleetName',
                listeners : {
                    'select' : function(combo, record) {
                        	this.getForm().findField('fleetId').setValue(record.data.id);
                        	basefleedId = record.data.id;
                    },
                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            items : [this.kqSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        },{
            columnWidth : 1,
            items : [this.truckTypeSelector]
        }, {
					columnWidth : 1,
					labelWidth : 60,
					items : [{
								fieldLabel : '车牌号',
								xtype : 'textfield',
								name : 'plateNo',
								anchor : '98%',								
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
					items : [{
								fieldLabel : '车主',
								xtype : 'textfield',
								name : 'vehicleOwner',
								anchor : '98%',
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
					items : [{
								fieldLabel : '车辆所有人电话',
								xtype : 'textfield',
								name : 'tel',
								anchor : '98%',
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
					items : [{
								fieldLabel : '购车时间',
								xtype : 'datefield',
								name : 'buyDatetime',
								format : 'Y-m-d',
								editable : false,
								anchor : '98%',
								selectOnFocus : true
							}]
				}, {
						columnWidth : 1,
						labelWidth : 60,
						items : [{
									xtype : 'combo',
									fieldLabel : '车辆状况',
									hiddenName : 'statues',
									anchor : '98%',
									typeAhead : true,
									editable : false,
									triggerAction : 'all',
									lazyRender : true,
									mode : 'local',
									value:'正常',
									store : new Ext.data.ArrayStore({
												fields : ['key', 'val'],
												data : [['正常', '正常'],
														['不可用', '不可用']]
											}),
									valueField : 'val',
									displayField : 'key'
								}]
					}				
				];

		Ext.truck.form.superclass.constructor.call(this, {
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

Ext.truck.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.truck.form(this);
				Ext.truck.win.superclass.constructor.call(this, {
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
					user.isAdmin = user.isAdmin == 1 ? 1 : 0;
					Ext.eu.ajax(path + '/logistics/saveTruck.do', {
								truck : Ext.encode(user)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '车牌号已经存在！！！');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.truck.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryTruck.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id', 'fleetId', 'plateNo', 'carType',
									'companyId', 'vehicleOwner', 'tel', 'buyDatetime',
									'driverId','statues','company','fleetName','driverName','modelName'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								isPaging : true,
								start : 0,
								limit : 80
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
									},{
										header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									},{
                                header : 'carType',
                                dataIndex : 'carType',
                                hidden : true
                            }, {
                                header : 'companyId',
                                dataIndex : 'companyId',
                                hidden : true
                            },{
                                header : 'driverId',
                                dataIndex : 'driverId',
                                hidden : true
                            },{
										header : '车牌号',
										dataIndex : 'plateNo'
									}, {
										header : '车主',
										dataIndex : 'vehicleOwner'
									}, {
										header : '电话',
										dataIndex : 'tel'
									}, {
										header : '车型',
										dataIndex : 'modelName'
									}, {
										header : '司机',
										dataIndex : 'driverName'
									}, {
										header : '单位机构',
										dataIndex : 'company'
									}, {
										header : '购车时间',
										dataIndex : 'driverId'
									}, {
										header : '服务平台',
										dataIndex : 'fleetName'
									}, {
										header : '状态',
										dataIndex : 'statues'
									}
									
									]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id:'buttonAddTruckView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id:'buttonModifyTruckView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDelTruckView',
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
				Ext.truck.grid.superclass.constructor.call(this, {
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
				var win = new Ext.truck.win(this);
				var form = win.form.getForm();		
				if(isAdmin == 0 ){

					
				}
				win.setTitle('添加车辆', 'add');
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
				console.log(select);
				//Ext.ux.Toast.msg("信息", select.buyingTime);
				var win = new Ext.truck.win(this);
				var form = win.form.getForm();
				win.setTitle('修改车辆信息', 'modify');				
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
				form.findField('companyId').setValue(select.companyId);
				form.findField('carType').setValue(select.carType);
				form.findField('buyDatetime').setValue(select.buyDatetime);
				form.findField('company').setValue(select.company);
				form.findField('driverId').setValue(select.driverId);
				form.findField('driverName').setValue(select.driverName);
				form.findField('fleetName').setValue(select.fleetName);
	
				form.findField('modelName').setValue(select.modelName);
				form.findField('plateNo').setValue(select.plateNo);
				//调度员
				form.findField('statues').setValue(select.statues);
				form.findField('tel').setValue(select.tel);
				form.findField('vehicleOwner').setValue(select.vehicleOwner);
				
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
								Ext.eu.ajax(path + '/logistics/deleteTruck.do', {
											trucks : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.truck.queryPanel = Ext.extend(Ext.FormPanel, {
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



                this.companyTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/system/getTreeAllCompanyList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'company'}]),

                    baseParams : {
                        fleetId:'root'
                    }

                });
                this.companyTypeDS.load();


                this.driverTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/logistics/getAllCustomer.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'driverName'}]),

                    baseParams : {
                        fleetId:'root'
                    }
                });
                this.driverTypeDS.load();





				 
				 
				 this.truckTypeDS = new Ext.data.Store({
						proxy : new Ext.data.HttpProxy({
							url : path + '/logistics/getAllTruckType.do',
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({}, 
						[{name : 'id'}, {name : 'modelName'}])
			});	
				 this.truckTypeDS.load();		



				 
				 
			
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 180,
                    items : [{
                        id:'truckViewfleetTypeDS',
                        fieldLabel : '所属平台',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'fleetId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.fleetTypeDS,
                        valueField : 'id',
                        displayField : 'fleetName',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
                    }]

                },{
                    width : 180,
                    items : [{
                        id:'truckViewcompanyTypeDS',
                        fieldLabel : '所属机构',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'companyId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.companyTypeDS,
                        valueField : 'id',
                        displayField : 'company',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
                    }]

                },{
                    width : 180,
                    items : [{
                        id:'truckViewdriverTypeDS',
                        fieldLabel : '所属司机',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'driverId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.driverTypeDS,
                        valueField : 'id',
                        displayField : 'driverName',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
                    }]

                },{
                    width : 180,
                    items : [{
                        id:'truckViewtruckTypeDS',
                        fieldLabel : '车型',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'carType',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.truckTypeDS,
                        valueField : 'id',
                        displayField : 'modelName',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
                    }]

                }, {
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
				Ext.truck.queryPanel.superclass.constructor.call(this, {
							id : 'truckQueryPanel',
							region : 'north',
							height : 70,
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
var truckView = function(params) {
	this.queryPanel = new Ext.truck.queryPanel(this);
	this.grid = new Ext.truck.grid(this);

	Ext.getCmp('buttonAddTruckView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifyTruckView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelTruckView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'truckView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '车辆档案',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
