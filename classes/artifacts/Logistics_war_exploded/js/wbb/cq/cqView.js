Ext.namespace('Ext.cq');

Ext.cq.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.sortNode = null;
		this.app = app;
		// 数据源
		this.ds = new Ext.data.JsonStore({
					url : path + '/logistics/queryapproveAuditor.do',
					idProperty : 'id',
					root : 'rows',
					totalProperty : 'results',
					fields : ['id',  'userId','companyId','loginName','company','fleetId','fleetName'],
					autoDestroy : true,
					autoLoad : true,
					baseParams : {
                        isPaging: true,
						start : 0,
						limit : 40,
						roleId :40,
					},
					listeners : {
						'beforeload' : function() {
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
                                        'fleetId' : fleedId,
                                    });
                                }
                            }

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
                header : 'userId',
                dataIndex : 'userId',
                hidden : true
            }, {
                header : 'companyId',
                dataIndex : 'companyId',
                hidden : true
            },{
                header : '用户名',
                dataIndex : 'loginName'
            }, {
                header : '单位机构',
                dataIndex : 'company'
            }, {
                header : '所属平台',
                dataIndex : 'fleetName'
            }]
        });
		// 菜单条
		this.tbar = new Ext.Toolbar([{
					xtype : 'button',
					iconCls : 'add',
					id : 'addCq',
					text : '新增',
					handler : this.onAdd,
					scope : this
				}, {
					xtype : 'button',
					iconCls : 'modify',
					id : 'modifyCq',
					text : '修改',
					handler : this.onModify,
					scope : this
				}, {
					xtype : 'button',
					iconCls : 'delete',
					id : 'deleteCq',
					text : '删除',
					handler : this.onDelete,
					scope : this
				}]);
		// 页码条
		this.bbar = new Ext.PagingToolbar({
					pageSize : 40,
					displayInfo : true,
					store : this.ds
				});
		// 构造
		Ext.cq.grid.superclass.constructor.call(this, {
					region : 'center',
					loadMask : 'loading...',
					columnLines : true,
					stripeRows : true,
					viewConfig : {
						forceFit : true
					},
					listeners : {
						'rowdblclick' : function(grid, index) {
							this.onModify();
						}
					}
				});
	},
	onAdd : function(btn) {

		if(this.sortNode == null){
            Ext.ux.Toast.msg("信息", "请先选择用户！！！");
            return;
		}

		if(!this.sortNode.leaf){
            Ext.ux.Toast.msg("信息", "请先选择用户！！！");
            return;

		}



		var win = new Ext.cq.win(this);
        // console.log(this.sortNode.id);
        // console.log("==1111111111=="+this.sortNode.fleetId);
        // console.log("==1111111111=="+this.sortNode.fleetName);
        // console.log("==1111111111=="+this.sortNode.loginName);
         win.form.getForm().findField('userId').setValue(this.sortNode.id);
         win.form.getForm().findField('userName').setValue(this.sortNode.loginName);

         win.form.getForm().findField('fleetId').setValue(this.sortNode.fleetId);
         win.form.getForm().findField('fleetName').setValue(this.sortNode.fleetName);
		win.setTitle('添加审核员权限', 'add');
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
		this.cq = selects[0].data;
		var win = new Ext.cq.win(this);
		win.form.getForm().findField('id').setValue(this.cq.id);
		win.form.getForm().findField('userId').setValue(this.cq.userId);
		win.form.getForm().findField('companyId').setValue(this.cq.companyId);
		win.form.getForm().findField('userName').setValue(this.cq.loginName);
		win.form.getForm().findField('company').setValue(this.cq.company);

        win.form.getForm().findField('fleetId').setValue(this.cq.fleetId);
        win.form.getForm().findField('fleetName').setValue(this.cq.fleetName);

		win.setTitle('修改权限管理', 'modify');
		win.show();
	},
	onDelete : function() {
		var selects = Ext.eu.getSelects(this);
		if (selects.length == 0) {
			Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
			return;
		}
		var cqs = Array();
		for (var i = 0; i < selects.length; i++) {
			var cq = {
				id : selects[i].data.id
			}
			cqs.push(cq);
		}
		Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
					if (btn == 'yes') {
						Ext.eu.ajax(path + '/logistics/deleteapproveCompany.do', {
                            approveCompanies : Ext.encode(cqs)
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
						arr.concat(scope.getChildrenIds(arr, child, scope));
					});
		}
		return arr;
	}
});

Ext.cq.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 200,
							labelWidth : 60,
							items : [{
										xtype : 'textfield',
										fieldLabel : '指标名称',
										name : 'name',
										anchor : '90%'
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
										},
										scope : this
									}]
						}];
				// panel定义
				Ext.cq.queryPanel.superclass.constructor.call(this, {
							id : 'cqQueryPanel',
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
				return this.getForm().getValues();
			}
		});

/**
 * 入口方法，用于定位动态加载文件
 * 
 * @return {}
 */
var cqView = function() {
	this.queryPanel = new Ext.cq.queryPanel(this);
	this.sortTree = new Ext.cqTree.tree(this);
	this.grid = new Ext.cq.grid(this);
	return new Ext.Panel({
				id : 'cqView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '机构审核员权限管理',
				layout : 'border',
				items : [this.sortTree, {
					region : 'center',
					layout : 'border',
					items : [ this.grid]
				}]
			})


}
