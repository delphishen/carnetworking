Ext.namespace('Ext.driverRota');

var flag  ;

Ext.driverRota.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;





        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '选择司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                basefleedId = Ext.getCmp('fleetId').getValue();
                var val = Ext.getCmp("fleetName").value;

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new driverSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('driverId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);
				}
                
            },
            scope : this
        });



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
            xtype : 'hidden',
            id : 'driverId'
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
                allowBlank : false,
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
                        this.getForm().findField('driverName').setValue(null);
                        this.getForm().findField('driverId').setValue(null);
                        basefleedId = record.data.id;
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
            items : [this.driverSelector]
        },{
            columnWidth : 1,
            items : [{

                id:'clockindate',
                fieldLabel : '上班日期',
                xtype : 'datefield',
                format : 'Y-m-d',
                allowBlank : false,
                name : 'clockindate',
                anchor : '98%',
                selectOnFocus : true,


            }]
        },{
					columnWidth : 1,
					items : [{

								id:'clockin',
								fieldLabel : '上班时间',
								xtype : 'timefield',
								allowBlank : false,
                        		format:'G:i:s',
								name : 'clockIn',
								anchor : '98%',
								selectOnFocus : true
							}]
				},{
            columnWidth : 1,
            items : [{

                id:'clockOutdate',
                fieldLabel : '下班日期',
                xtype : 'datefield',
                format : 'Y-m-d',
                allowBlank : false,
                name : 'clockOutdate',
                anchor : '98%',
                selectOnFocus : true,


            }]
        },{
            columnWidth : 1,
            items : [{
            	id:'clockOut',
                fieldLabel : '下班时间',
                xtype : 'timefield',
                allowBlank : false,
                format:'G:i:s',
                name : 'clockOut',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                id:'orderBy',
                fieldLabel : '排班顺序',
                xtype : 'textfield',
                allowBlank : true,
                name : 'orderBy',
                anchor : '98%',
                selectOnFocus : true
            }]
        }]

		Ext.driverRota.form.superclass.constructor.call(this, {
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

Ext.driverRota.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.driverRota.form(this);
				Ext.driverRota.win.superclass.constructor.call(this, {
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

                    user.clockIn = user.clockindate+" "+user.clockIn;
                    user.clockOut = user.clockOutdate+" "+user.clockOut;

					console.log(user.clockindate);
                    console.log(user.clockOutdate);
                    console.log(user.clockIn);
                    console.log(user.clockOut);
                    if (flag == 1){
                        Ext.eu.ajax(path + '/logistics/saveDriverRota.do', {
                            driverRota : Ext.encode(user)
                        }, function(resp) {
                            var res = Ext.decode(resp.responseText);
                            if (res.label) {
                                Ext.ux.Toast.msg('信息', '保存成功');
                                this.app.getStore().reload();
                                this.close();
                            } else {
                                Ext.ux.Toast.msg('提示', '该司机已设置排班日期！！！');
                                btn.setDisabled(false);
                            }
                        }, this);
					}else {
                        Ext.eu.ajax(path + '/logistics/updateDriverRota.do', {
                            driverRota : Ext.encode(user)
                        }, function(resp) {
                            var res = Ext.decode(resp.responseText);
                            if (res.label) {
                                Ext.ux.Toast.msg('信息', '修改成功');
                                this.app.getStore().reload();
                                this.close();
                            } else {
                                Ext.ux.Toast.msg('提示', '该司机已设置排班日期！！！');
                                btn.setDisabled(false);
                            }
                        }, this);
					}

				}
			},
			onClose : function() {

				//console.log("========================"+flag)
				this.close();
			}
		});

Ext.driverRota.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryDriverRota.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id', 'fleetId', 'driverId','clockIn','clockOut','orderBy','fleetName','driverName'],
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
										header : 'driverId',
										dataIndex : 'driverId',
										hidden : true
									},{
										header : '司机姓名',
										dataIndex : 'driverName'
									}, {
										header : '上班时间',
										dataIndex : 'clockIn'
									}, {
										header : '下班时间',
										dataIndex : 'clockOut'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									},{
                                header : '排序',
                                dataIndex : 'orderBy'
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
				Ext.driverRota.grid.superclass.constructor.call(this, {
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
				 flag = 1;
				var win = new Ext.driverRota.win(this);
				win.setTitle('添加司机排班', 'add');
				win.show();
			},
			onModify : function(btn) {
				flag =2;
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
                var clockindate = select.clockIn.substring(0,10);
                var clockOutdate = select.clockOut.substring(0,10);

                var datein = select.clockIn.substring(11,19);
                var dateout = select.clockOut.substring(11,19);

                console.log(datein);
				var win = new Ext.driverRota.win(this);
				var form = win.form.getForm();
				win.setTitle('修改司机排班信息', 'modify');
				form.findField('id').setValue(select.id);
				form.findField('fleetId').setValue(select.fleetId);
                form.findField('driverId').setValue(select.driverId);
                form.findField('fleetName').setValue(select.fleetName);
                form.findField('driverName').setValue(select.driverName);

                form.findField('clockindate').setValue(clockindate);
                form.findField('clockOutdate').setValue(clockOutdate);

                form.findField('clockin').setValue(datein);
                form.findField('clockOut').setValue(dateout);
                form.findField('orderBy').setValue(select.orderBy);

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
								Ext.eu.ajax(path + '/logistics/deleteDriverRota.do', {
                                    	driverRotas : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.driverRota.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;



                this.driverDS = new Ext.data.Store({
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
                this.driverDS.load();




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 250,
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : '司机姓名',
                        id : 'driverNameRota',
						name:'driverName',
                        anchor : '90%'
                    }]
                },{
                    width : 280,
                    items : [{
                        id:'clockIn',
                        fieldLabel : '上班时间',
                        width : 100,
                        xtype : 'datefield',
                        hiddenName : 'clockIn',
                        format : 'Y-m-d',
                        editable : false,
                        submitValue : true,
                        anchor : '90%',

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
				Ext.driverRota.queryPanel.superclass.constructor.call(this, {
							id : 'driverRotaQueryPanel',
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
var driverRotaView = function(params) {
	this.queryPanel = new Ext.driverRota.queryPanel(this);
	this.grid = new Ext.driverRota.grid(this);

	Ext.getCmp('buttonAdddriverTypeView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'driverRotaView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '司机排班',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
