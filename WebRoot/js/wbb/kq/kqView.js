Ext.namespace('Ext.kq');

Ext.kq.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.sortNode = null;
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/logistics/queryispatcherPlateNo.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',
							fields : ['id',  'userId','plateNoId','loginName','plateNo','fleetId','fleetName'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								start : 0,
								limit : 20
							},
							listeners : {
								'beforeload' : function() {
									// var sortIds = new Array();
									// if (this.sortNode != null) {
									// 	if (this.sortNode.id != 0) {
									// 		sortIds.push(this.sortNode.id);
									// 		sortIds = this.getChildrenIds(
									// 				sortIds, this.sortNode,
									// 				this);
									// 	}
									// }
									// var str = "";
									// for (var i = 0; i < sortIds.length; i++) {
									// 	str += "'" + sortIds[i] + "',"
									// }
									// str = str.substring(0, str.lastIndexOf(','));
									// Ext.apply(this.getStore().baseParams, {
									// 			'kqSortId' : str
									// 		});
									// Ext.apply(this.getStore().baseParams,
									// 		this.app.queryPanel
									// 				.getQueryParams());

									var bfleetId = null;
									var userId  = null;


									if (this.sortNode == null){
                                        bfleetId = fleedId;
                                        Ext.apply(this.getStore().baseParams, {
                                             			'fleetId' : bfleetId
                                             		});
									}else {
										if(!this.sortNode.leaf){
                                            bfleetId = this.sortNode.id;
                                            Ext.apply(this.getStore().baseParams, {
                                                'fleetId' : bfleetId,
                                                'userId' : null
                                            });
										}else {
											userId = this.sortNode.id
                                            Ext.apply(this.getStore().baseParams, {
                                                'userId' : userId,
                                                'fleetId' : 'root',
                                            });
										}
									}


									// var userinfo = Ext.encode(this.sortNode);
                                    //
									// console.log("=========="+userinfo);
								},
								scope : this
							}
						});
				// 选择框
                this.sm = new Ext.grid.CheckboxSelectionModel({
                    singleSelect : false
                });


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
                    }, {
                        header : '所属平台',
                        dataIndex : 'fleetName'
                    }]
                });

				// 菜单条
				this.tbar = new Ext.Toolbar([{
							xtype : 'button',
							iconCls : 'add',
							id : 'addKq',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							id : 'modifyKq',
							handler : this.onModify,
							scope : this
						}, {
							xtype : 'button',
							iconCls : 'delete',
							id : 'deleteKq',
							text : '删除',
							handler : this.onDelete,
							scope : this
						}]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 20,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.kq.grid.superclass.constructor.call(this, {
							region : 'center',
							loadMask : 'loading...',
							columnLines : true,
							stripeRows : true,
							viewConfig : {
								forceFit : true
							}
						});
			},
			onAdd : function(btn) {

				var win = new Ext.kq.win(this);
				win.setTitle('添加车辆调度', 'add');
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
				this.kq = selects[0].data;
				var win = new Ext.kq.win(this);
                var form = win.form.getForm();
                form.findField('id').setValue(this.kq.id);
                form.findField('userId').setValue(this.kq.userId);
                form.findField('plateNoId').setValue(this.kq.plateNoId);

                form.findField('userName').setValue(this.kq.loginName);
                form.findField('plateNo').setValue(this.kq.plateNo);
                win.form.getForm().findField('fleetId').setValue(this.kq.fleetId);
                win.form.getForm().findField('fleetName').setValue(this.kq.fleetName);
				win.setTitle('修改调度信息', 'modify');
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
			},
			getChildrenIds : function(arr, node, scope) {
				if (node.hasChildNodes()) {
					node.eachChild(function(child) {
								arr.push(child.id);
								arr.concat(scope.getChildrenIds(arr, child,
										scope));
							});
				}
				return arr;
			}
		});

Ext.kq.queryPanel = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;


		// 在column布局的制约下，从左至右每个元素依次进行form布局
		this.items = [ {
					width : 200,
					labelWidth : 60,
					items : [{
								xtype : 'combo',
								fieldLabel : '归属类别',
								id : 'kqType',
								anchor : '98%',
								typeAhead : true,
								editable : false,
								triggerAction : 'all',
								lazyRender : true,
								mode : 'local',
								store : new Ext.data.ArrayStore({
											fields : ['key', 'val'],
											data : [['进出口关系', 1], ['进出口固定值', 2]]
										}),
								valueField : 'val',
								displayField : 'key'
							}]
				}, {
					width : 65,
					items : [{
								xtype : 'button',
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
								text : '清空',
								iconCls : 'reset',
								handler : function() {
									this.getForm().reset();
									this.app.grid.getStore().reload();
								},
								scope : this
							}]
				}];
		// panel定义
		Ext.kq.queryPanel.superclass.constructor.call(this, {
					id : 'kqQueryPanel',
					region : 'north',
					height : 40,
					frame : true,
					split : true,
					collapseMode : 'mini',
					layout : 'column',
					labelAlign : 'right',
					defaults : {
						layout : 'form',
						labelWidth : 35
					}
				});
	},
	getQueryParams : function() {
		var queryParams = this.getForm().getValues();
		queryParams.kqType = this.getForm().findField('kqType').getValue();
		return queryParams;
	}
});

/**
 * 入口方法，用于定位动态加载文件
 * 
 * @return {}
 */
var kqView = function() {
	this.queryPanel = new Ext.kq.queryPanel(this);
	this.sortTree = new Ext.kqTree.tree(this);
	this.grid = new Ext.kq.grid(this);
	return new Ext.Panel({
				id : 'kqView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '调度员调度车辆',
				layout : 'border',
				items : [this.sortTree, {
							region : 'center',
							layout : 'border',
							items : [this.grid]
						}]
			})
}
