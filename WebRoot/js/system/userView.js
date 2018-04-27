Ext.namespace("Ext.user");

 var flag = '1';

Ext.user.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;

        this.fleetTypeDS = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/system/getTreeAllFleetList.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'id'}, {name : 'fleetName'}]),

            baseParams : {
                fleetId:fleedId
            }

        });
        this.fleetTypeDS.load();

        this.roleTypeDS = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/system/getRoleById.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'id'}, {name : 'roleName'}]),

            baseParams : {
                fleetId:fleedId
            }

        });
        this.roleTypeDS.load();


        this.managerSelector = new Ext.form.TriggerField({
            fieldLabel : '所属管理员',
            name : 'fatherName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : true,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new managerSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('fatherId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);

                }

            },
            scope : this
        });
        this.managerSelector.hide();



		this.empSelector = new Ext.form.TriggerField({
			fieldLabel : '员工',
			name : 'empName',
			anchor : '98%',
			triggerClass : 'x-form-search-trigger',
			selectOnFocus : true,
			submitValue : false,
			allowBlank : false,
			editable : false,
			onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                console.log("=================="+val);
                basefleedId = Ext.getCmp('fleetId').getValue();

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new empSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('empId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);
				}


			},
			scope : this
		});






		this.items = [{
					xtype : 'hidden',
					id : 'id'
				}, {
					xtype : 'hidden',
					id : 'empId'
				},{
					xtype : 'hidden',
					id : 'fleetId'
				}, {
					xtype : 'hidden',
					id : 'fatherId'
				},{
					xtype : 'hidden',
					id : 'roleId'
				},{
					xtype : 'hidden',
					id : 'password'
				}, {
					columnWidth : 1,
					labelWidth : 80,
					items : [{
                        id:'fleetName',
						fieldLabel : '所属平台',
						width : 80,
						xtype : 'combo',
						hiddenName : 'fleetName',
						submitValue : false,
						anchor : '98%',
						editable : false,
						autoLoad : true,
						allowBlank : false,
						triggerAction : 'all',
						mode : 'local',
						store : this.fleetTypeDS,
						valueField : 'fleetName',
						displayField : 'fleetName',
                        selectOnFocus : true,
						listeners : {
							'select' : function(combo, record) {
								this.getForm().findField('fleetId').setValue(record.data.id);
                                this.getForm().findField('empId').setValue(null);
                                this.getForm().findField('empName').setValue(null);
                                this.getForm().findField('fatherId').setValue(null);
                                this.getForm().findField('fatherName').setValue(null);

								basefleedId = record.data.id;
							},
                             'render' : function(combo) {//渲染
                                 combo.getStore().on("load", function(s, r, o) {
                                 	if (flag == '1'){
                                        combo.setValue(r[0].get('fleetName'));//第一个值
                                        Ext.getCmp('fleetId').setValue(r[0].get('id'));
                                        basefleedId = r[0].get('id');
									}



                                 });
                             },
                            scope : this
						}
					}]
				},{
            columnWidth : 1,
            labelWidth : 80,
            items : [{
                id:'roleName',
                xtype : 'combo',
                fieldLabel : '分配角色',
                hiddenName : 'remark',
                anchor : '98%',
                typeAhead : true,
                editable : false,
                allowBlank : false,
                triggerAction : 'all',
                lazyRender : true,
                mode : 'local',
                store :this.roleTypeDS,
                valueField : 'roleName',
                displayField : 'roleName',
                listeners : {
                    'select' : function(combo, record) {
                        this.getForm().findField('roleId').setValue(record.data.id);
                        console.log("========"+record.data.id);
                        if (roleID == '30'){
                            this.getForm().findField('fatherId').setValue(userId);
                            this.getForm().findField('fatherName').setValue(loginName);

                        }else {
                            if(record.data.id == '10' ||record.data.id == '20'||record.data.id == '30' ){
                                this.getForm().findField('fatherId').setValue(null);
                                this.getForm().findField('fatherName').setValue(null);
                                this.managerSelector.hide();

                            }else {
                                this.managerSelector.show();
                            }
                        }




                    },
                    scope : this
                }
            }]
        },{
					columnWidth : 1,
					items : [this.managerSelector]
				},{
					columnWidth : 1,
					items : [this.empSelector]
				}, {
					columnWidth : 1,
					labelWidth : 80,
					items : [{
								fieldLabel : '登录用户名',
								xtype : 'textfield',
								id : 'loginName',
								anchor : '98%',
								allowBlank : false,
								selectOnFocus : true
							}]
				}, {
					columnWidth : 1,
            		labelWidth : 80,
					items : [{
								fieldLabel : '邮箱',
								xtype : 'textfield',
								name : 'email',
								anchor : '98%',
								selectOnFocus : true
							}]
				}];

		Ext.user.form.superclass.constructor.call(this, {
					labelWidth : 80,
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

Ext.user.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.user.form(this);
				Ext.user.win.superclass.constructor.call(this, {
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
					var user = form.getValues();
					if ( user.roleId == '40'){
						var val = Ext.getCmp("fatherId").value;
						if (val == null || val == ""){
							Ext.ux.Toast.msg("提示","请选择机构审核员所属的机构管理员！！");
							return;
						}
					}


					console.log(user.roleId);
					//user.isAdmin = user.isAdmin == 1 ? 1 : 0;
				//	alert(Ext.encode(user));
					Ext.eu.ajax(path + '/system/saveUser.do', {
								user : Ext.encode(user)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '用户名已经存在,请重新设置！');
								}
							}, this);
				}
			},
			onClose : function() {
				this.close();
			}
		});

Ext.user.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
				this.ds = new Ext.data.JsonStore({
							url : path + '/system/queryUser.do',
							idProperty : 'id',
							root : 'rows',
							totalProperty : 'results',
							fields : ['id', 'empId', 'empName', 'loginName',
									'password', 'isAdmin', 'email',
									'remark','fleetName', 'fleetId','fatherName', 'fatherId','roleId', 'roleName'],
							autoDestroy : true,
							autoLoad : true,
							baseParams : {
								isPaging : true,
								start : 0,
								limit : 20,
								fleetId:fleedId,
								roleId:roleID

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
							singleSelect : true
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
										header : 'empId',
										dataIndex : 'empId',
										hidden : true
									},{
                                		header : 'fleetId',
										dataIndex : 'fleetId',
										hidden : true
									},{
										header : 'roleId',
										dataIndex : 'roleId',
										hidden : true
									},  {
										header : 'fatherId',
										dataIndex : 'fatherId',
										hidden : true
									},{
										header : '员工',
										dataIndex : 'empName'
									}, {
										header : '登录用户名',
										dataIndex : 'loginName'
									}, {
										header : '密码',
										dataIndex : 'password'
									}, {
										header : '邮箱',
										dataIndex : 'email'
									},  {
										header : '角色',
										dataIndex : 'roleName'
									}, {
										header : '所属平台',
										dataIndex : 'fleetName'
									}, {
										header : '所属管理员',
										dataIndex : 'fatherName'
									}]
						});
				// 菜单条
				this.tbar = new Ext.Toolbar([{
							id : 'buttonAddUserView',
							xtype : 'button',
							iconCls : 'add',
							text : '新增',
							handler : this.onAdd,
							scope : this
						}, {
							id : 'buttonModifyUserView',
							xtype : 'button',
							iconCls : 'modify',
							text : '修改',
							handler : this.onModify,
							scope : this
						}, {
							id : 'buttonDelUserView',
							xtype : 'button',
							iconCls : 'delete',
							text : '删除',
							handler : this.onDelete,
							scope : this
						}, {
							xtype : 'button',
							iconCls : 'arrow_refresh',
							text : '重置密码',
							handler : this.onReset,
							scope : this
						}, '->', {
                    		id : 'buttonauthorizationUserView',
							xtype : 'button',
							iconCls : 'arrow_refresh',
							text : '页面授权',
							handler : this.onPageRight,
							scope : this
						}]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 20,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.user.grid.superclass.constructor.call(this, {
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
			onAdd : function(btn) {
				flag = '1';
				var win = new Ext.user.win(this);
				win.setTitle('添加用户', 'add');
				win.show();
			},
			onModify : function(btn) {
				flag = '2';
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要修改的记录！");
					return;
				}
				if (selects.length > 1) {
					Ext.ux.Toast.msg("信息", "只能选择一条记录！");
					return;
				}
				var select = selects[0].data;
				var win = new Ext.user.win(this);
				var form = win.form.getForm();

				if (select.roleId == '10'){
					if (fleedId != "root"){
                        Ext.ux.Toast.msg("信息", "不能修改平台管理员信息！");
                        return;
					}
				}
				if (select.roleId == '40'){
                    win.form.managerSelector.show();
				}else {
                    win.form.managerSelector.hide();
				}
				win.setTitle('修改用户', 'modify');
				form.findField('id').setValue(select.id);
                form.findField('fleetId').setValue(select.fleetId);
                form.findField('fleetName').setValue(select.fleetName);
				form.findField('empId').setValue(select.empId);
				form.findField('password').setValue(select.password);
				form.findField('empName').setValue(select.empName);
				form.findField('loginName').setValue(select.loginName);
				form.findField('email').setValue(select.email);
				form.findField('remark').setValue(select.remark);

                form.findField('fatherName').setValue(select.fatherName);
                form.findField('fatherId').setValue(select.fatherId);

                form.findField('roleName').setValue(select.roleName);
                form.findField('roleId').setValue(select.roleId);


				win.show();
			},
			onDelete : function() {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要删除的记录！");
					return;
				}
                if (selects[0].data.roleId == '10'){
                    if (fleedId != "root"){
                        Ext.ux.Toast.msg("信息", "不能删除平台管理员信息！");
                        return;
                    }
                }
				var ary = Array();
				for (var i = 0; i < selects.length; i++) {
					var user = {
						id : selects[i].data.id
					}
					ary.push(user);
				}
				Ext.Msg.confirm('删除操作', '确定要删除所选记录吗?', function(btn) {
							if (btn == 'yes') {
								Ext.eu.ajax(path + '/system/deleteUser.do', {
											users : Ext.encode(ary)
										}, function(resp) {
                                    var res = Ext.decode(resp.responseText);
                                    if(res.msg =='999'){
                                        Ext.ux.Toast.msg('信息', '该用户已被引用，无法删除');
									}else {
                                        Ext.ux.Toast.msg('信息', '删除成功');
									}

											this.getStore().reload();
										}, this);
							}
						}, this);
			},
			onReset : function(btn) {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要重置的记录！");
					return;
				}
				if (selects.length > 1) {
					Ext.ux.Toast.msg("信息", "只能选择一条记录！");
					return;
				}
				var user = {
					id : selects[0].data.empId,
					password : '123456'
				}
				Ext.Msg.confirm('重置密码', '确定为所选记录重置密码吗?', function(btn) {
							if (btn == 'yes') {
								//alert(Ext.encode(user));
								Ext.eu.ajax(path + '/system/resetPassword.do', {
											user : Ext.encode(user)
										}, function(resp) {
											Ext.ux.Toast.msg('信息', '重置成功');
											this.getStore().reload();
										}, this);
							}
						}, this);
			},
			onPageRight : function(btn) {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要授权的记录！");
					return;
				}
				if (selects.length > 1) {
					Ext.ux.Toast.msg("信息", "只能选择一条记录！");
					return;
				}
				this.user = {
					id : selects[0].data.empId,
					empName : selects[0].data.empName,
					roleId : selects[0].data.roleId,
				}
				var win = new Ext.userPageRight.win(this);
				win.setTitle('页面授权', 'modify');
				win.show();
			}
		});

Ext.user.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;

                this.fleetTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/system/getTreeAllFleetList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'fleetName'}]),

                    baseParams : {
                        fleetId:fleedId
                    }

                });
                this.fleetTypeDS.load();

				// 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
							width : 250,
							items : [{
										xtype : 'textfield',
										fieldLabel : '登录用户名',
										id : 'userName',
										anchor : '90%'
									}]
						},{
                    width : 300,
                    items : [{
                        id:'queryuserfleetId',
                        fieldLabel : '按平台筛选',
                        width : 80,
                        xtype : 'combo',
                        hiddenName : 'queryfleetId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.fleetTypeDS,
                        valueField : 'id',
                        displayField : 'fleetName',
                        listeners : {
                            'select' : function(combo, record) {
                                //	this.getForm().findField('linesName').setValue(record.data.id);
                            },
                            scope : this
                        }
                    }]

                }, {
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
						}
						];
				// panel定义
				Ext.user.queryPanel.superclass.constructor.call(this, {
							id : 'userQueryPanel',
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 80
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
var userView = function(params) {
	this.queryPanel = new Ext.user.queryPanel(this);
	this.grid = new Ext.user.grid(this);



	console.log(params[0]);
	console.log("=============="+this.roleTypeDS);
	Ext.getCmp('buttonAddUserView').hidden=!params[0].isAdd;
	Ext.getCmp('buttonModifyUserView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDelUserView').hidden=!params[0].isDel;

    Ext.getCmp('queryuserfleetId').hidden= loginName != 'root';

    // var login = loginName == 'root' ? 1 : 0;
    //
    // console.log(login);
    //
    // Ext.getCmp('buttonauthorizationUserView').hidden=!login;
	
	return new Ext.Panel({
				id : 'userView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '系统账号管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
