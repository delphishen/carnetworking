Ext.namespace('Ext.fleet');

Ext.fleet.menuForm = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;

                this.empSelector = new Ext.form.TriggerField({
                    fieldLabel : '负责人',
                    name : 'contacts',
					id:'contacts',
                    anchor : '98%',
                    triggerClass : 'x-form-search-trigger',
                    selectOnFocus : true,
                    submitValue : true,
                    allowBlank : true,
                    editable : false,
                    onTriggerClick : function(e) {
                        new empSelector(function(id, name) {
                            this.setValue(name);
                            //	if(Ext.getCmp('loginName').getValue != ''){
                            //		Ext.getCmp('loginName').setValue(name);
                            //	}



                        }, true, this);
                    },
                    scope : this
                });

				this.items = [{
							xtype : 'hidden',
							fieldLabel : 'Id',
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
										id : 'fatherText',
										anchor : '100%',
										readOnly : true,
										submitValue : false,
										style : 'background:#E6E6E6',
										value : 'root'
									}]
						}, {
							columnWidth : 1,
							items : [{
										fieldLabel : '<font color="red">名称</font>',
										xtype : 'textfield',
										id : 'fleetName',
										maxLength : 18,
										maxLengthText : '名称不能大于18个字符',
										anchor : '100%',
										selectOnFocus : true,
										allowBlank : false
									}]
						}, {
                    columnWidth : 1,
                    items : [{
                        fieldLabel : '负责人',
                        xtype : 'textfield',
                        id : 'contacts',
                        anchor : '100%',
                        selectOnFocus : true
                    }]
                },{
							columnWidth : 1,
							items : [{
										fieldLabel : '负责人电话',
										xtype : 'numberfield',
										id : 'mobile',
										anchor : '100%',
										selectOnFocus : true,
                                		regex:/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
                                		regexText:'请输入正确的手机号码',
                                		allowBlank : false
									}]
						}, {
                    columnWidth : 1,
                    items : [{
                        fieldLabel : '服务热线',
                        xtype : 'numberfield',
                        id : 'fleettel',
						name:'tel',
                        anchor : '100%',
                        selectOnFocus : true
                    }]
                }, {
                    columnWidth : 1,
                    items : [{
                        fieldLabel : '车数量',
                        xtype : 'numberfield',
                        id : 'carCount',
                        anchor : '100%',
                        selectOnFocus : true
                    }]
                }, {
                    columnWidth : 1,
                    items : [{
                        fieldLabel : '乘客数量',
                        xtype : 'numberfield',
                        id : 'passengerCount',
                        anchor : '100%',
                        selectOnFocus : true
                    }]
                }];

				Ext.fleet.menuForm.superclass.constructor.call(this, {
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



Ext.fleet.menuWin = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.fleet.menuForm(this);
				Ext.fleet.menuWin.superclass.constructor.call(this, {
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
					var params = {
						fleet : Ext.encode(form.getValues())
					};
					Ext.eu.ajax(path + '/system/saveFleet.do', params, function(
									resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getRootNode().reload();
									refreshSysMenu();
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


Ext.fleet.tree = Ext.extend(Ext.ux.tree.TreeGrid, {
			constructor : function(app) {
				this.app = app;
				// 父级目录
				// this.fatherMenu = new Ext.menu.Menu({
				// 			items : [{
				// 						text : '添加平台',
				// 						iconCls : 'add',
				// 						handler : this.onAdd,
				// 						scope : this
				// 					}, {
				// 						text : '修改平台',
				// 						iconCls : 'modify',
				// 						handler : this.onModify,
				// 						scope : this
				// 					}, {
				// 						text : '删除平台',
				// 						iconCls : 'delete',
				// 						handler : this.onDelete,
				// 						scope : this
				// 					}]
				// 		});
				// 叶子目录
				// this.leafMenu = new Ext.menu.Menu({
				// 			items : [{
				// 						text : '修改平台',
				// 						iconCls : 'modify',
				// 						handler : this.onModify,
				// 						scope : this
				// 					}, {
				// 						text : '删除平台',
				// 						iconCls : 'delete',
				// 						handler : this.onDelete,
				// 						scope : this
				// 					}]
				// 		});

				// 工具条
				this.tbar = ['-', {
							text : '刷新',
							iconCls : 'refresh',
							id : 'menusRefreshBtn',
							handler : function() {
								this.getRootNode().reload()
							},
							scope : this
						},{
							text : '新增',
							iconCls : 'add',
							id : 'buttonAddFleetView',
							xtype : 'button',
							handler : this.onAdd,
							scope : this
						},{
							text : '修改',
							iconCls : 'modify',
							id : 'buttonModifyFleetView',
							xtype : 'button',
							handler : this.onModify,
							scope : this
						},{
							text : '删除',
							iconCls : 'delete',
							id : 'buttonDelFleetView',
							xtype : 'button',
							handler : this.onDelete,
							scope : this
						}];
				// 列
				this.columns = [{
							header : '服务平台名称',
							width : 300,
							dataIndex : 'fleetName'
						}, {
							header : '负责人',
							width : 200,
							dataIndex : 'contacts'
						}, {
							header : '负责人电话',
							width : 200,
							dataIndex : 'mobile'
						}, {
							header : '服务热线',
							width : 400,
							dataIndex : 'tel'
						}, {
							header : '车数量',
							width : 400,
							dataIndex : 'carCount'
						}, {
							header : '乘客数量',
							width : 400,
							dataIndex : 'passengerCount'
						}];
				this.root = new Ext.tree.AsyncTreeNode({
							text : 'Root',
							id : '0'
						});
				Ext.fleet.tree.superclass.constructor.call(this, {
							enableDD : true,
							region : 'center',
							enableSort : false,// 禁用排序，不然的话咧，管你后台排序多正常，前台都要按照名称再排一遍，乱序了吧，吃瘪了吧
							loader : new Ext.tree.TreeLoader({
										url : path + '/system/getTreeAllFleetList.do',
										baseParams: {
											fleetId: fleedId
										}}),

							listeners : {
								contextmenu : {
									fn : function(node, event) {
										// 必须写，使用preventDefault方法可防止浏览器的默认事件操作发生。
										console.log(node);
										event.preventDefault();
										node.select();
										if (node.attributes.isBtn) {
											if(fleedId == 'root'){
                                                this.btnMenu.showAt(event.getXY());
											}

										} else {
											if (node.attributes.fatherId !='0') {
												if (fleedId =='root'){
                                                    this.leafMenu.showAt(event
                                                        .getXY());
												}

											} else {
												if(fleedId =='root'){
                                                    this.fatherMenu.showAt(event
                                                        .getXY());
												}


											}
										}
									},
									scope : this
								}
							}
						});
			},
			onAdd : function() {
                var node = this.getSelectionModel().getSelectedNode();
                console.log(node);
				var win = new Ext.fleet.menuWin(this);
				var form = win.form.getForm();
				win.show();
				win.setTitle('添加平台', 'add');
				form.findField('fatherText').setValue('Root');
				form.findField('fatherId').setValue(0);
			},
			onAddChild : function() {
				var node = this.getSelectionModel().getSelectedNode();
				if (node) {
					if (!node.attributes.menuLeaf) {
						var win = new Ext.fleet.menuWin(this);
						var form = win.form.getForm();
						win.show();
						win.setTitle('添加子平台', 'plugin_add');
						form.findField('fatherText').setValue(node.attributes.fleetName);
						form.findField('fatherId').setValue(node.attributes.id);
					} else {
						Ext.ux.Toast.msg('信息', '叶子节点不允许添加子节点，请先修改当前节点为非叶子属性');
					}
				}
			},
			onModify : function() {
				var node = this.getSelectionModel().getSelectedNode();
				if (node == null){
                    Ext.ux.Toast.msg('信息', '请先选择记录');
                    return;
				}
				if (node) {
					var win = new Ext.fleet.menuWin(this);
					var form = win.form.getForm();
					win.show();
					win.setTitle('修改平台', 'modify');
					form.findField('id').setValue(node.id);
					form.findField('fleetName').setValue(node.attributes.fleetName);
					form.findField('mobile').setValue(node.attributes.mobile);
					form.findField('contacts').setValue(node.attributes.contacts);
					form.findField('fleettel').setValue(node.attributes.tel);
                    form.findField('carCount').setValue(node.attributes.carCount);
                    form.findField('passengerCount').setValue(node.attributes.passengerCount);
					if (node.attributes.fatherId == 0) {
						form.findField('fatherId').setValue(0);
						form.findField('fatherText').setValue('Root');
					} else {
						form.findField('fatherId').setValue(node.parentNode.attributes.id);
						form.findField('fatherText')
								.setValue(node.parentNode.attributes.fleetName);
					}

				}
			},
			onDelete : function() {
				var node = this.getSelectionModel().getSelectedNode();
                if (node == null){
                    Ext.ux.Toast.msg('信息', '请先选择记录');
                    return;
                }
				if (node.childNodes != '') {
					Ext.ux.Toast.msg('信息', '请先删除子平台');
					return;
				}
				Ext.Msg.confirm('删除操作', '确定要删除选中平台吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/system/deleteFleet.do', {
											fleet : Ext.encode({
														id : node.id
													})
										}, function(resp) {
                                    		var res = Ext.decode(resp.responseText);
                                    		if(res.success){
                                                Ext.ux.Toast.msg('信息', '删除成功');
                                                this.getRootNode().reload();// 刷新当前树
                                                refreshSysMenu();
											}else{
                                                Ext.ux.Toast.msg('信息', '该记录已被引用，无法删除！！！');
											}
										}, this);
							}
						}, this);
			},
			onAddBtn : function() {
				var node = this.getSelectionModel().getSelectedNode();
				var win = new Ext.fleet.btnWin(this);
				var form = win.form.getForm();
				win.show();
				win.setTitle('添加按钮', 'add');
				form.findField('menuId').setValue(node.id);
				form.findField('menuText').setValue(node.text);
			},
			onModifyBtn : function() {
				var node = this.getSelectionModel().getSelectedNode();
				if (node) {
					var win = new Ext.fleet.btnWin(this);
					var form = win.form.getForm();
					win.show();
					win.setTitle('修改按钮', 'modify');
					form.findField('id').setValue(node.id);
					form.findField('text').setValue(node.text);
					form.findField('iconCls').setValue(node.attributes.iconCls);
					form.findField('seq').setValue(node.attributes.seq);
					form.findField('menuId').setValue(node.parentNode.id);
					form.findField('menuText').setValue(node.parentNode.text);
					form.findField('btnKey').setValue(node.attributes.btnKey);
				}
			},

		});

/**
 * 刷新系统目录
 */
var refreshSysMenu = function() {
	var leftPanel = Ext.getCmp('west_panel');
	leftPanel.removeAll(true);
	menuRefresh(leftPanel);
}

/**
 * 初始化界面
 * 
 * @return {}
 */
var fleetView = function(params) {
    Ext.getCmp('buttonAddFleetView').hidden=!params[0].isAdd;
    Ext.getCmp('buttonModifyFleetView').hidden=!params[0].isModify;
    Ext.getCmp('buttonDelFleetView').hidden=!params[0].isDel;
	return new Ext.Panel({
				id : 'fleetView',// 灰蚕重要,一定要跟方法名称一样
				title : '服务平台管理',
				layout : 'border',
				items : new Ext.fleet.tree(this)
			});
}