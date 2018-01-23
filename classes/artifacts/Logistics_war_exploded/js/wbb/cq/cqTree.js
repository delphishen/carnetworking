Ext.namespace('Ext.cqTree');

Ext.cqTree.tree = Ext.extend(Ext.tree.TreePanel, {
			constructor : function(app) {
				this.app = app;
				// 菜单根节点
				this.root = new Ext.tree.AsyncTreeNode({
							id : 'root',
							text : '审核员列表',
							draggable : false
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							text : '刷新',
							iconCls : 'refresh',
							handler : this.onRefresh,
							scope : this
						}]);

				Ext.cqTree.tree.superclass.constructor.call(this, {
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
			}
		});