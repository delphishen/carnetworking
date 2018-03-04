Ext.namespace('Ext.carPeccancy');

Ext.carPeccancy.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;



        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel: '单位机构',
            name: 'company',
            anchor: '98%',
            triggerClass: 'x-form-search-trigger',
            selectOnFocus: true,
            submitValue: false,
            allowBlank: false,
            editable: false,
            onTriggerClick: function (e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new kqSelector(function (id, name) {
                        this.setValue(name);
                        Ext.getCmp('companyId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}


                    }, true, this);
				}

            },
            scope: this
        });



        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new driverSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('driverId').setValue(id);

                    }, true, this);
				}

            },
            scope : this
        });


        this.truckSelector = new Ext.form.TriggerField({
            fieldLabel : '车辆',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new truckSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('plateNoId').setValue(id);




                    }, true, this);
				}

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
				}, {
					xtype : 'hidden',
					id : 'plateNoId'
				},{
					xtype : 'hidden',
					id : 'driverId'
				},{
					columnWidth: 1,
					labelWidth: 60,
					items: [{
						id: 'fleetName',
						fieldLabel: '所属平台',
						width: 60,
						xtype: 'combo',
						hiddenName: 'fleetName',
						submitValue: false,
						anchor: '98%',
						editable: false,
						autoLoad: true,
                        allowBlank : false,
						triggerAction: 'all',
						mode: 'local',
						store: new Ext.data.Store({
							proxy: new Ext.data.HttpProxy({
								url: path + '/system/getTreeAllFleetList.do',
								method: 'POST'
							}),
							reader: new Ext.data.JsonReader({},
								[{name: 'id'}, {name: 'fleetName'}]),
							baseParams: {
								fleetId: fleedId
							},
							autoLoad: true
						}),
						valueField: 'fleetName',
						displayField: 'fleetName',
						listeners: {
							'select': function (combo, record) {
								this.getForm().findField('fleetId').setValue(record.data.id);
								basefleedId = record.data.id;


                                this.getForm().findField('company').setValue(null);
                                this.getForm().findField('companyId').setValue(null);
                                this.getForm().findField('driverName').setValue(null);
                                this.getForm().findField('driverId').setValue(null);
                                this.getForm().findField('plateNo').setValue(null);
                                this.getForm().findField('plateNoId').setValue(null);


							},
							scope: this
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
					items : [this.truckSelector]
				},{
					columnWidth : 1,
					items : [{
						id:'peccancyDatetime',
						fieldLabel : '违章时间',
						xtype : 'datefield',
						name : 'peccancyDatetime',
						format : 'Y-m-d',
						editable : false,
						anchor : '98%',
						selectOnFocus : true
					}]
				},{
					columnWidth : 1,
					items : [{
						id:'content',
						fieldLabel : '违章内容',
						xtype : 'textfield',
						name : 'content',
						anchor : '98%',
						selectOnFocus : true
					}]
				},{
					columnWidth : 1,
					items : [{
						id:'statues',
						fieldLabel : '处理状态',
						xtype : 'textfield',
						name : 'statues',
						anchor : '98%',
						selectOnFocus : true
					}]
				}];

		Ext.carPeccancy.form.superclass.constructor.call(this, {
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

Ext.carPeccancy.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.carPeccancy.form(this);
				Ext.carPeccancy.win.superclass.constructor.call(this, {
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
					Ext.eu.ajax(path + '/logistics/savecarPeccancy.do', {

                        carPeccancy : Ext.encode(user)
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

Ext.carPeccancy.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryeccancy.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id',  'fleetId','plateNoId','companyId','driverId',
								'peccancyDatetime','content','statues','fleetName','company','driverName','plateNo'],
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
									}, {
										header : 'companyId',
										dataIndex : 'companyId',
										hidden : true
									},{
										header : 'plateNoId',
										dataIndex : 'plateNoId',
										hidden : true
									}, {
										header : 'driverId',
										dataIndex : 'driverId',
										hidden : true
									},{
										header : '所属平台',
										dataIndex : 'fleetName'
									}, {
										header : '单位机构',
										dataIndex : 'company'
									},{
										header : '司机姓名',
										dataIndex : 'driverName'
									}, {
										header : '车牌号',
										dataIndex : 'plateNo'
									},{
										header : '违章时间',
										dataIndex : 'peccancyDatetime'
									}, {
										header : '违章内容',
										dataIndex : 'content'
									},{
										header : '处理状态',
										dataIndex : 'statues'
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
				Ext.carPeccancy.grid.superclass.constructor.call(this, {
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
				var win = new Ext.carPeccancy.win(this);
				win.setTitle('添加司机违章信息', 'add');
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
				var win = new Ext.carPeccancy.win(this);
				var form = win.form.getForm();
				win.setTitle('修改违章信息', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('plateNoId').setValue(select.plateNoId);
                form.findField('companyId').setValue(select.companyId);
                form.findField('driverId').setValue(select.driverId);
                form.findField('fleetName').setValue(select.fleetName);
                form.findField('company').setValue(select.company);
                form.findField('driverName').setValue(select.driverName);
                form.findField('plateNo').setValue(select.plateNo);


				form.findField('peccancyDatetime').setValue(select.peccancyDatetime);
                form.findField('content').setValue(select.content);
                form.findField('statues').setValue(select.statues);

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
								Ext.eu.ajax(path + '/logistics/deletePeccancy.do', {
                                    		carPeccancies : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.carPeccancy.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;

                this.driverTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/logistics/getAllCustomer.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'driverName'}]),

                    baseParams : {
                        fleetId:fleedId
                    }
                });
                this.driverTypeDS.load();




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 180,
                    items : [{
                        id:'carPeccancyViewdriverTypeDS',
                        fieldLabel : '司机姓名',
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
				Ext.carPeccancy.queryPanel.superclass.constructor.call(this, {
							id : 'carPeccancyQueryPanel',
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
var carPeccancyView = function(params) {
	this.queryPanel = new Ext.carPeccancy.queryPanel(this);
	this.grid = new Ext.carPeccancy.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'carPeccancyView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '车辆违章信息管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
