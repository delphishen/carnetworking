Ext.namespace('Ext.cq');

Ext.cq.form = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;



                this.userSelector = new Ext.form.TriggerField({
                    fieldLabel : '用户',
                    name : 'userName',
                    anchor : '98%',
                    triggerClass : 'x-form-search-trigger',
                    selectOnFocus : true,
                    submitValue : false,
                    allowBlank : true,
                    editable : false,
                    onTriggerClick : function(e) {
                        new userSelector(function(id, name,userFleetId) {
                            this.setValue(name);
                            Ext.getCmp('userId').setValue(id);
                            basefleedId = userFleetId;




                        }, true, this);
                    },
                    scope : this
                });


                this.kqSelector = new Ext.form.TriggerField({
                    fieldLabel : '机构',
                    name : 'company',
                    anchor : '98%',
                    triggerClass : 'x-form-search-trigger',
                    selectOnFocus : true,
                    submitValue : false,
                    allowBlank : true,
                    editable : false,
                    onTriggerClick : function(e) {
                        new kqSelector(function(id, name) {
                            this.setValue(name);
                            Ext.getCmp('companyId').setValue(id);




                        }, true, this);
                    },
                    scope : this
                });


                this.items = [{
                    xtype : 'hidden',
                    id : 'id'
                },{
                    xtype : 'hidden',
                    id : 'userId'
                },{
                    xtype : 'hidden',
                    id : 'companyId'
                }, {
                    columnWidth : 1,
                    items : [this.userSelector]
                },{
                    columnWidth : 1,
                    items : [this.kqSelector]
                }];




				Ext.cq.form.superclass.constructor.call(this, {
							region : 'center',
							labelWidth : 60,
							baseCls : 'x-plain',
							autoScroll : true,
							layout : 'column',
							style : 'padding : 5',
							defaults : {
								baseCls : 'x-plain',
								layout : 'form'
							}
						});
			}
		});

Ext.cq.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.cq.form(this);
				Ext.cq.win.superclass.constructor.call(this, {
							width : 300,
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
            var user = form.getValues();
            console.log(user);
            Ext.eu.ajax(path + '/logistics/saveapproveCompany.do', {

                approveCompany : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '类型名称已经存在！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
			onClose : function() {
				this.close();
			}
		});