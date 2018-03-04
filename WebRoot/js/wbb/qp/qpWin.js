Ext.namespace('Ext.qp');

Ext.qp.form = Ext.extend(Ext.FormPanel, {
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
                basefleedId = Ext.getCmp("fleetId").value;
                new userSelector(function(id, name,userFleetId) {
                    this.setValue(name);
                    Ext.getCmp('userId').setValue(id);
                    basefleedId = userFleetId;




                }, true, this);
            },
            scope : this
        });



        this.driverSelector = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new driverSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('driverId').setValue(id);




                }, false, this);
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
            id : 'driverId'
        }, {
            columnWidth : 1,
            items : [this.userSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        }];




		Ext.qp.form.superclass.constructor.call(this, {
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

Ext.qp.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.qp.form(this);
				Ext.qp.win.superclass.constructor.call(this, {
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
            Ext.eu.ajax(path + '/logistics/savedispatcherDriver.do', {

                dispatcherDriver : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '保存成功');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '已添加该司机，不能在添加！！！');
                    btn.setDisabled(false);
                }
            }, this);
        }
    },
			onClose : function() {
				this.close();
			}
		});