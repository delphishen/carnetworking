Ext.namespace('Ext.qpTree');

Ext.qpTree.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							xtype : 'hidden',
							id : 'id'
						}, {
							xtype : 'hidden',
							fieldLabel : 'fatherId',
							id : 'fatherId'
						}, {
							columnWidth : 1,
							items : [{
										fieldLabel : '父节点',
										xtype : 'textfield',
										name : 'fatherName',
										anchor : '100%',
										readOnly : true,
										submitValue : false,
										style : 'background:#E6E6E6'
									}]
						}, {
							columnWidth : 1,
							items : [{
										fieldLabel : '名称',
										xtype : 'textfield',
										name : 'text',
										anchor : '100%',
										allowBlank : false
									}]
						}, {
							columnWidth : 1,
							items : [{
										fieldLabel : '备注',
										xtype : 'textarea',
										name : 'remark',
										anchor : '100%'
									}]
						}];
				Ext.qpTree.form.superclass.constructor.call(this, {
							labelWidth : 60,
							baseCls : 'x-plain',
							layout : 'column',
							style : 'padding : 5',
							defaults : {
								baseCls : 'x-plain',
								layout : 'form'
							}
						});
			}
		});


Ext.qpTree.tree = Ext.extend(Ext.tree.TreePanel, {
	constructor : function(app) {
		this.app = app;
		// 菜单根节点
		this.root = new Ext.tree.AsyncTreeNode({
					id : 'root',
					text : '调度员列表',
					draggable : false
				});
		// 菜单条
		this.tbar = new Ext.Toolbar([{
					text : '刷新',
					iconCls : 'refresh',
					handler : this.onRefresh,
					scope : this
				}]);



		Ext.qpTree.tree.superclass.constructor.call(this, {
					region : 'west',
					width : '20%',
					animate : true,
					autoScroll : true,
					enableDD : false,// 是否支持拖拽效果
					containerScroll : true,// 是否支持滚动条
					rootVisible : true,// 是否显示根节点
					loader : new Ext.tree.TreeLoader({
                        dataUrl : path + '/logistics/getTreeFleetList.do',
                        baseParams : {
                            fleetId:fleedId,
                        }
                    }),
					listeners : {
						click : function(node, event) {
							this.app.grid.sortNode = node.attributes;
							this.app.grid.getStore().load();
						},
						scope : this
					}
				});
		this.expandAll();
	},
	onRefresh : function() {
		this.getRootNode().reload();
		this.expandAll();
	},

});