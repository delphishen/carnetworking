Ext.namespace('Ext.kq');

Ext.kq.form = Ext.extend(Ext.FormPanel, {
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





        this.userSelector = new Ext.form.TriggerField({
            fieldLabel : '用户',
            name : 'userName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                basefleedId = Ext.getCmp("fleetId").value;
                var val = Ext.getCmp("fleetName").value;

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new userSelector(function(id, name,userFleetId) {
                        this.setValue(name);
                        Ext.getCmp('userId').setValue(id);
                        basefleedId = userFleetId;




                    }, true, this);
                }
            },
            scope : this
        });



        this.truckSelector = new Ext.form.TriggerField({
            fieldLabel : '车牌号',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                basefleedId = Ext.getCmp("fleetId").value;
                var val = Ext.getCmp("fleetName").value;
                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new truckSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('plateNoId').setValue(id);




                    }, false, this);
                }

            },
            scope : this
        });


        this.items = [{
            xtype : 'hidden',
            id : 'id'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'userId'
        },{
            xtype : 'hidden',
            id : 'plateNoId'
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
            	id:'fleetName',
                fieldLabel : '所属平台',
                width : 60,
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
                listeners : {
                    'select' : function(combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                        basefleedId = record.data.id;
                    },
                    scope : this
                }
            }]
        }, {
            columnWidth : 1,
            items : [this.userSelector]
        },{
            columnWidth : 1,
            items : [this.truckSelector]
        }];



		Ext.kq.form.superclass.constructor.call(this, {
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

Ext.kq.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.kq.form(this);
				Ext.kq.win.superclass.constructor.call(this, {
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
							Ext.eu.ajax(path + '/logistics/savedispatcherPlateNo.do', {

								dispatcherPlateNo : Ext.encode(user)
							}, function(resp) {
								var res = Ext.decode(resp.responseText);
								if (res.label) {
									Ext.ux.Toast.msg('信息', '保存成功');
									this.app.getStore().reload();
									this.close();
								} else {
									Ext.ux.Toast.msg('提示', '该信息已经存在！！！');
									btn.setDisabled(false);
								}
							}, this);
						}
					},
			onClose : function() {
				this.close();
			}
		});

