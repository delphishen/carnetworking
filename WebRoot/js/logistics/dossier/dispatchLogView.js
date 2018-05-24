Ext.namespace('Ext.dispatchLog');


Ext.dispatchLog.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/querydispatchLog.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id',  'driverId','plateNoId','employeeId','fleetId','carApplyNo','dispatchDatetime', 'fleetName','plateNo','loginName','driverName','dispatchType'],
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
										header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									},{
										header : '用户名',
										dataIndex : 'loginName'
									}, {
										header : '订单编号',
										dataIndex : 'carApplyNo'
									}, {
										header : '调度司机',
										dataIndex : 'driverName'
									}, {
										header : '调度车辆',
										dataIndex : 'plateNo'
									},{
										header : '调度时间',
										dataIndex : 'dispatchDatetime'
									},{
                                header : '调度原因',
                                dataIndex : 'dispatchType'
                            }, {
										header : '所属机构',
										dataIndex : 'fleetName'
									}]
						});
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 80,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.dispatchLog.grid.superclass.constructor.call(this, {
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

		});

Ext.dispatchLog.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;



                this.userTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/system/getUserByFleetId.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'loginName'}]),
                    baseParams : {
                        fleetId:fleedId
                    }
                });
                this.userTypeDS.load();



                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
                    width : 180,
                    items : [{
                        id:'dispathLogTypeDS',
                        fieldLabel : '用户',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'userId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.userTypeDS,
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
				Ext.dispatchLog.queryPanel.superclass.constructor.call(this, {
							id : 'dispatchLogQueryPanel',
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
var dispatchLogView = function(params) {
	this.queryPanel = new Ext.dispatchLog.queryPanel(this);
	this.grid = new Ext.dispatchLog.grid(this);



	
	return new Ext.Panel({
				id : 'dispatchLogView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '调度记录查询',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
