Ext.namespace('Ext.order');

Ext.order.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;


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
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



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
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });






        this.items = [{
            xtype : 'hidden',
            id : 'carApplyNo'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            xtype : 'hidden',
            id : 'plateNoId'
        },  {
            columnWidth : 1,
            items : [{

                id:'privateOrPublic',
                fieldLabel : '付款方式',
                xtype : 'textfield',
                readOnly : true,
                name : 'privateOrPublic',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'startLocale',
                fieldLabel : '出发点',
                xtype : 'textfield',
                readOnly : true,
                name : 'startLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'endLocale',
                fieldLabel : '终点站',
                xtype : 'textfield',
                readOnly : true,
                name : 'endLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'carTypeId',
                fieldLabel : '申请车型',
                xtype : 'textfield',
                readOnly : true,
                name : 'carTypeId',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetCost',
                fieldLabel : '预算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetCost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetKilometres',
                fieldLabel : '预算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetKilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'cost',
                fieldLabel : '结算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'cost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'kilometres',
                fieldLabel : '结算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'kilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'content',
                fieldLabel : '出行事由',
                xtype : 'textfield',
                readOnly : true,
                name : 'content',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'remark',
                fieldLabel : '用车备注',
                xtype : 'textfield',
                readOnly : true,
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'businessType1',
                fieldLabel : '业务类型',
                xtype : 'textfield',
                readOnly : true,
                name : 'businessTypebusinessType',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [this.truckSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        },{
            columnWidth : 1,
            items : [{
                id:'departureTime',
                fieldLabel : '出发时间',
                xtype : 'textfield',
                readOnly : true,
                name : 'departureTime',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

		Ext.order.form.superclass.constructor.call(this, {
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

Ext.order.ordersform = Ext.extend(Ext.FormPanel, {
    constructor : function(app) {
        this.app = app;


        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel : '单位机构',
            name : 'company',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                console.log("=================="+val);

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new kqSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('companyId').setValue(id);
                        companyId = id;
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);

                }

            },
            scope : this
        });

        this.passengerSelector = new Ext.form.TriggerField({
            fieldLabel : '乘客',
            name : 'passengerName',
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
                    new passengerSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('userId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}

                    }, true, this);

                }

            },
            scope : this
        });


        this.driverSelector1 = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
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

        this.truckSelector1 = new Ext.form.TriggerField({
            fieldLabel : '车牌号',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                new truckSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('plateNoId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });






        this.items = [{
            xtype : 'hidden',
            id : 'carApplyNo'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'companyId'
        },{
            xtype : 'hidden',
            id : 'userId'
        },{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            xtype : 'hidden',
            id : 'plateNoId'
        },  {
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
                selectOnFocus : true,
                store : new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy( {
                        url : path + '/system/getTreeAllFleetList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'fleetName'}]),
                    baseParams : {
                        fleetId:fleedId
                    },
                    autoLoad : true
                }),
                valueField : 'fleetName',
                displayField : 'fleetName',
                listeners : {
                    'select' : function(combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                       // this.getForm().findField('driverId').setValue(null);
                       // this.getForm().findField('driverName').setValue(null);
                        //this.getForm().findField('plateNoId').setValue(null);
                        //this.getForm().findField('plateNo').setValue(null);

                        this.getForm().findField('companyId').setValue(null);
                        this.getForm().findField('company').setValue(null);

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
            items : [this.passengerSelector]
        }, {
                columnWidth : 1,
                items : [{
                    xtype : 'combo',
                    fieldLabel : '业务类型',
                    hiddenName : 'businessType',
                    anchor : '98%',
                    typeAhead : true,
                    editable : false,
                    triggerAction : 'all',
                    lazyRender : true,
                    mode : 'local',
                    store : new Ext.data.ArrayStore({
                        fields : ['key', 'val'],
                        data : [['单程', '单程'],
                            ['往返', '往返'],
                            ['包车', '包车']
                        ]
                    }),
                    valueField : 'val',
                    displayField : 'key'
                }]
            },{
            columnWidth : 1,
            items : [{
                xtype : 'combo',
                fieldLabel : '付款方式',
                hiddenName : 'privateOrPublic',
                anchor : '98%',
                typeAhead : true,
                editable : false,
                triggerAction : 'all',
                lazyRender : true,
                mode : 'local',
                store : new Ext.data.ArrayStore({
                    fields : ['key', 'val'],
                    data : [['自费', '自费'],
                        ['公费', '公费']
                    ]
                }),
                valueField : 'val',
                displayField : 'key'
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'departuredate',
                fieldLabel : '选择日期',
                xtype : 'datefield',
                format : 'Y-m-d',
                allowBlank : false,
                name : 'departuredate',
                anchor : '98%',
                selectOnFocus : true,


            }]
        },{
            columnWidth : 1,
            items : [{

                id:'departureTime',
                fieldLabel : '选择时间',
                xtype : 'timefield',
                allowBlank : false,
                format:'G:i:s',
                name : 'departureTime',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '出发点',
                xtype : 'textfield',
                name : 'startLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '终点站',
                xtype : 'textfield',
                name : 'endLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '出行事由',
                xtype : 'textfield',
                name : 'content',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '用车备注',
                xtype : 'textfield',
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

        Ext.order.ordersform.superclass.constructor.call(this, {
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



Ext.order.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.order.form(this);
				Ext.order.win.superclass.constructor.call(this, {
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


            Ext.eu.ajax(path + '/logistics/savecarApply.do', {
                carApply : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '下单成功！请通知审核员和调度员');
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

Ext.order.orderswin = Ext.extend(Ext.Window, {
    constructor : function(app) {
        this.app = app;
        this.form = new Ext.order.ordersform(this);
        Ext.order.orderswin.superclass.constructor.call(this, {
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
            user.departureTime = user.departuredate+" "+user.departureTime;
            console.log(user.departureTime);
            Ext.eu.ajax(path + '/logistics/savecarApply.do', {
                carApply : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '调度成功！请通知乘客和司机');
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


Ext.order.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
                this.ds = new Ext.data.JsonStore({
                    url: path + '/logistics/queryAllCarApply.do',
                    idProperty: 'id',
                    root: 'rows',
                    totalProperty: 'results',
                    fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId','privateOrPublic', 'departureTime'
                        , 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId','budgetCost','budgetKilometres', 'content'
                        , 'remark','businessType', 'statuesId', 'activityId','orderFrom','driverApplyNo', 'fleetName', 'passengerName'
                        ,'company','driverName','modelName','plateNoId','plateNo'],
                    autoDestroy: true,
                    autoLoad: true,
                    baseParams: {
                        isPaging: true,
                        start: 0,
                        limit: 80,
                        fleetId: fleedId,
                        statuesId:'2'
                    },
                    listeners: {
                        'beforeload' : function() {
                            console.log(this.getStore().baseParams);
                            Ext.apply(this.getStore().baseParams,
                                this.app.queryPanel.getQueryParams());

                        },

                        scope: this
                    }
                });
				// 选择框
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false
						});
				// 列
                this.cm = new Ext.grid.ColumnModel({
                    defaults: {
                        width: 80,
                        sortable: true
                    },
                    columns: [new Ext.grid.RowNumberer(), this.sm, {
                        header: 'carApplyNo',
                        dataIndex: 'carApplyNo',
                        hidden: true
                    }, {
                        header: 'fleetId',
                        dataIndex: 'fleetId',
                        hidden: true
                    },{
                        header: 'companyId',
                        dataIndex: 'companyId',
                        hidden: true
                    },{
                        header: 'userId',
                        dataIndex: 'userId',
                        hidden: true
                    },{
                        header: 'driverId',
                        dataIndex: 'driverId',
                        hidden: true
                    }, {
                        header: 'statuesId',
                        dataIndex: 'statuesId',
                        hidden: true
                    },{
                        header: 'plateNoId',
                        dataIndex: 'plateNoId',
                        hidden: true
                    },{
                        header: '乘车用户',
                        dataIndex: 'passengerName'
                    },{
                        header: '业务类型',
                        dataIndex: 'businessType'
                    }, {
                        header: '付费方式',
                        dataIndex: 'privateOrPublic'
                    }, {
                        header: '出发时间',
                        dataIndex: 'departureTime'
                    }, {
                        header: '出发地',
                        dataIndex: 'startLocale'
                    },{
                        header: '目的地',
                        dataIndex: 'endLocale'
                    }, {
                        header: '预算费用',
                        dataIndex: 'budgetCost'
                    }, {
                        header: '预算公里数',
                        dataIndex: 'budgetKilometres'
                    }, {
                        header: '出现事由',
                        dataIndex: 'content'
                    }, {
                        header: '用车备注',
                        dataIndex: 'remark'
                    },{
                        header: '订单来源',
                        dataIndex: 'orderFrom'
                    }, {
                        header: '所属平台',
                        dataIndex: 'fleetName'
                    }, {
                        header: '所属机构',
                        dataIndex: 'company'
                    }, {
                        header: '司机',
                        dataIndex: 'driverName'
                    }, {
                        header: '车型',
                        dataIndex: 'modelName'
                    }, {
                        header: '车牌号',
                        dataIndex: 'plateNo'
                    }
                    ]
                });
				// 菜单条
				this.tbar = new Ext.Toolbar([ {
                            id:'buttonAdddriverOrderView',
                            xtype : 'button',
                            iconCls : 'add',
                            text : '后台下单',
                            handler : this.onOrders,
                            scope : this
                        },{
							id:'buttonModifydriverTypeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '改派',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDeldriverTypeView',
							xtype : 'button',
							iconCls : 'delete',
							text : '消单',
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
				Ext.order.grid.superclass.constructor.call(this, {
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


    onOrders : function(btn) {
        var win = new Ext.order.orderswin(this);
        win.setTitle('后台下单', 'add');
        win.show();
    },
    onModify : function(btn) {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要修改的信息！");
            return;
        }
        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }
        var select = selects[0].data;
        var win = new Ext.order.win(this);
        var form = win.form.getForm();
        win.setTitle('修改订单信息', 'modify');
        form.findField('carApplyNo').setValue(select.carApplyNo);
        form.findField('fleetId').setValue(select.fleetId);
        form.findField('driverId').setValue(select.driverId);
        form.findField('plateNoId').setValue(select.plateNoId);


        form.findField('privateOrPublic').setValue(select.privateOrPublic);
        form.findField('departureTime').setValue(select.departureTime);
        form.findField('startLocale').setValue(select.startLocale);
        form.findField('endLocale').setValue(select.endLocale);
        form.findField('carTypeId').setValue(select.carTypeId);
        form.findField('budgetCost').setValue(select.budgetCost);
        form.findField('budgetKilometres').setValue(select.budgetKilometres);
        form.findField('cost').setValue(select.cost);
        form.findField('kilometres').setValue(select.kilometres);
        form.findField('content').setValue(select.content);
        form.findField('remark').setValue(select.remark);
        form.findField('businessType1').setValue(select.businessType);

        form.findField('driverName').setValue(select.driverName);
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
								Ext.eu.ajax(path + '/logistics/deleteApplyType.do', {
											applyTypes : Ext.encode(ary)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '删除成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			}
		});

Ext.order.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 250,
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : '订单编号',
                        id : 'carApplyNo',
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
				Ext.order.queryPanel.superclass.constructor.call(this, {
							id : 'applyTypeViewQueryPanel',
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
var orderView = function(params) {
	this.queryPanel = new Ext.order.queryPanel(this);
	this.grid = new Ext.order.grid(this);

	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;	
	
	return new Ext.Panel({
				id : 'orderView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '订单管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
