Ext.namespace('Ext.approveLog');


Ext.approveLog.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryapproveLog.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',							
							fields : ['id',  'userId','fleetId','carApplyNo','activityId',  'statues','approveDatetime','loginName','fleetName'],
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
										header : '订单状态',
										dataIndex : 'statues'
									}, {
										header : '审核时间',
										dataIndex : 'approveDatetime'
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
				Ext.approveLog.grid.superclass.constructor.call(this, {
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

Ext.approveLog.queryPanel = Ext.extend(Ext.FormPanel, {
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
				Ext.approveLog.queryPanel.superclass.constructor.call(this, {
							id : 'approveLogQueryPanel',
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
var approveLogView = function(params) {
	this.queryPanel = new Ext.approveLog.queryPanel(this);
	this.grid = new Ext.approveLog.grid(this);



	
	return new Ext.Panel({
				id : 'approveLogView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '审核记录查询',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
