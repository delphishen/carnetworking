Ext.namespace("Ext.kqSelector");

Ext.kqSelector.tree = Ext.extend(Ext.tree.TreePanel, {
			constructor : function(app) {
				this.app = app;
				// 菜单根节点
				this.root = new Ext.tree.AsyncTreeNode({
							id : '0',
							text : '平台名称',
							draggable : false
						});

				Ext.kqSelector.tree.superclass.constructor.call(this, {
							region : 'west',
							width : 150,
							animate : true,
							autoScroll : true,
							enableDD : false,// 是否支持拖拽效果
							containerScroll : true,// 是否支持滚动条
							rootVisible : false,// 是否显示根节点
							loader : new Ext.tree.TreeLoader({
										dataUrl : path
												+ '/system/getTreeAllCompanyList.do',
										baseParams : {
											fleetId: basefleedId}
									}),
							listeners : {
								contextmenu : {
									fn : function(node, event) {
										// 必须写，使用preventDefault方法可防止浏览器的默认事件操作发生。
										event.preventDefault();
										node.select();
										this.menu.showAt(event.getXY());
									},
									scope : this
								},
								click : function(node, event) {
									console.log(node);
									this.app.grid.sortNode = node;
									this.app.grid.getStore().load();
								},
								scope : this
							}
						});
				this.expandAll();
			}
		});

Ext.kqSelector.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				this.items = [{
							columnWidth : 1,
							items : [{
										fieldLabel : '已选机构',
										xtype : 'textarea',
										name : 'company',
										anchor : '100%',
										readOnly : true,
										style : 'background:#E6E6E6'
									}]
						}];

				Ext.kqSelector.form.superclass.constructor.call(this, {
							region : 'south',
							height : 75,
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

Ext.kqSelector.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;
				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 200,
							labelWidth : 60,
							items : [{
										xtype : 'textfield',
										fieldLabel : '中文名称',
										name : 'kqChName',
										anchor : '90%'
									}]
						}, {
							width : 200,
							labelWidth : 60,
							items : [{
										xtype : 'textfield',
										fieldLabel : '英文名称',
										name : 'kqEnName',
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
				Ext.kqSelector.queryPanel.superclass.constructor.call(this, {
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

Ext.kqSelector.grid = Ext.extend(Ext.grid.GridPanel, {
	constructor : function(app) {
		this.sortNode = null;
		this.app = app;
		// 数据源
		this.ds = new Ext.data.JsonStore({
					url : path + '/system/getTreechild.do',
					idProperty : 'id',
					root : 'rows',
					totalProperty : 'results',
					fields : ['id', 'fleetId', 'fleetName', 'fatherId','company','companyNo'],
					autoDestroy : true,
					autoLoad : true,
					baseParams : {
						start : 0,
						limit : 20
					},
					listeners : {
						'beforeload' : function() {
							var sortIds = new Array();
							console.log("点击事件id"+this.sortNode.id);
							if (this.sortNode != null) {
								if (this.sortNode.id != 0) {
									sortIds.push(this.sortNode.id);
									sortIds = this.getChildrenIds(sortIds,
											this.sortNode, this);
								}
								var str = "";
								for (var i = 0; i < sortIds.length; i++) {
									str += "'" + sortIds[i] + "',"
								}
								str = str.substring(0, str.lastIndexOf(','));
								Ext.apply(this.getStore().baseParams, {
											'fatherId' : this.sortNode.id
										});
								Ext.apply(this.getStore().baseParams,
										this.app.queryPanel.getQueryParams());
							}
						},
						scope : this
					}
				});
		// 选择框

		////////////////////////////////////////////////////////////
        this.sm = new Ext.grid.CheckboxSelectionModel({
            singleSelect : this.app.app.isSingle,
            listeners : {
                'rowselect' : function(sm, index, record) {
                    var win = this.app;
                    if (win.app.isSingle) {
                        win.companyId = [];
                        win.companyName = [];
                    }
                    if (jQuery.inArray(record.get('id'), win.companyId) < 0) {
                        win.companyId.push(record.get('id'));
                        win.companyName.push(record.get('company'));
                    }
                    win.form.getForm().findField('company')
                        .setValue(win.companyName.toString());
                },
                'rowdeselect' : function(sm, index, record) {
                    var win = this.app;
                    win.companyId.splice(jQuery.inArray(record.get('id'),
                        win.companyId), 1);
                    win.companyName.splice(jQuery.inArray(record
                            .get('name'), win.companyName),
                        1);
                    win.form.getForm().findField('company')
                        .setValue(win.companyName.toString());
                },
                scope : this
            }
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
								header : '机构编号',
								dataIndex : 'companyNo'
							}, {
								header : '机构名称',
								dataIndex : 'company'
							}]
				});
		// 页码条
		this.bbar = new Ext.PagingToolbar({
					pageSize : 20,
					displayInfo : true,
					store : this.ds
				});
		// 构造
		Ext.kqSelector.grid.superclass.constructor.call(this, {
					region : 'center',
					loadMask : 'loading...',
					columnLines : true,
					stripeRows : true,
					viewConfig : {
						forceFit : true
					}
				});
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

Ext.kqSelector.toString = function(ary) {
	var str = '';
	for (var i = 0; i < ary.length; i++) {
		str += ary[i].company + ',';
	}
	str = str.substring(0, str.lastIndexOf(','));
	return str;
}

Ext.kqSelector.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.kq = new mapContainer();
				this.form = new Ext.kqSelector.form(this);
				this.grid = new Ext.kqSelector.grid(this);
				this.tree = new Ext.kqSelector.tree(this);
				this.queryPanel = new Ext.kqSelector.queryPanel(this);
				Ext.kqSelector.win.superclass.constructor.call(this, {
							title : '单位机构选择器',
							width : 600,
							height : 400,
							plain : true,
							showLock : true,
							modal : true,
							resizable : false,
							buttonAlign : 'center',
							layout : 'border',
							items : [this.form, this.grid, this.tree,
									this.queryPanel],
							buttons : [{
										text : '确定所选',
										iconCls : 'tick',
										handler : this.onSure,
										scope : this
									}, {
										text : '清空所选',
										iconCls : 'reset',
										handler : this.onReset,
										scope : this
									}, {
										text : '取消',
										iconCls : 'cancel',
										handler : this.onClose,
										scope : this
									}]
						});
			},


			onSure : function(btn) {
				this.app.callback.call(this.app.scope, this.companyId.toString(),
					this.companyName.toString());
				this.close();
			},



			onReset : function(btn) {
				this.form.getForm().reset();
				this.companyId = [];
				this.companyName = [];
			},


			onClose : function() {
				this.close();
			}
		});

var kqSelector = function(callback, isSingle, scope) {
	this.callback = callback;
	this.isSingle = isSingle;
	this.scope = scope;
	var win = new Ext.kqSelector.win(this);
	win.show();
}