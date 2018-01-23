Ext.namespace('Ext.kqTree');

Ext.kqTree.form = Ext.extend(Ext.FormPanel, {
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
										fieldLabel : '父节点444',
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
										fieldLabel : '名称4444',
										xtype : 'textfield',
										name : 'text',
										anchor : '100%',
										allowBlank : false
									}]
						}, {
							columnWidth : 1,
							items : [{
										fieldLabel : '备注4444',
										xtype : 'textarea',
										name : 'remark',
										anchor : '100%'
									}]
						}];
				Ext.kqTree.form.superclass.constructor.call(this, {
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

Ext.kqTree.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.kqTree.form(this);
				Ext.kqTree.win.superclass.constructor.call(this, {
							width : 500,
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
					Ext.eu.ajax(path + '/wbb/saveKqSort.do', {
								kqSort : Ext.encode(form.getValues())
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getRootNode().reload();
									this.app.expandAll();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '保存的记录存在重名');
									btn.setDisabled(false);
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.kqTree.tree = Ext.extend(Ext.tree.TreePanel, {
	constructor : function(app) {
		this.app = app;
		// 菜单根节点
		this.root = new Ext.tree.AsyncTreeNode({
					id : 'root',
					text : '调度员列表',
					draggable : false,

				});


		Ext.kqTree.tree.superclass.constructor.call(this, {
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
							//console.log(node.attributes);

							this.app.grid.sortNode = node.attributes;
							this.app.grid.getStore().load();
						},
						scope : this
					}
				});
		this.expandAll();
	},



});