Ext.namespace('Ext.order');


Ext.order.detailsform = Ext.extend(Ext.FormPanel, {
    constructor : function(app) {
        this.app = app;


        this.items = [{
            columnWidth : 1,
            items : [{
                id:'carApplyNo1',
                fieldLabel : '订单编号',
                xtype : 'textfield',
                name : 'carApplyNo',
                editable : false,
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'fleetName',
                fieldLabel : '所属平台',
                xtype : 'textfield',
                name : 'fleetName',
                editable : false,
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'company',
                fieldLabel : '所属机构',
                xtype : 'textfield',
                name : 'company',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'loginName',
                fieldLabel : '乘车用户',
                xtype : 'textfield',
                name : 'passengerName',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'departureTime1',
                fieldLabel : '出发时间',
                xtype : 'textfield',
                name : 'departureTime',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'driverName2',
                fieldLabel : '司机',
                xtype : 'textfield',
                name : 'driverName',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'plateNo2',
                fieldLabel : '车辆',
                xtype : 'textfield',
                name : 'plateNo',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'rideDatetime1',
                fieldLabel : '上车时间',
                xtype : 'textfield',
                name : 'rideDatetime',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'endDatetime1',
                fieldLabel : '下车时间',
                xtype : 'textfield',
                name : 'endDatetime',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'startLocale',
                fieldLabel : '出发地',
                xtype : 'textfield',
                name : 'startLocale',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'localeName',
                fieldLabel : '途径地',
                xtype : 'textfield',
                name : 'localeName',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'endLocale',
                fieldLabel : '目的地',
                xtype : 'textfield',
                name : 'endLocale',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'carpoolYN',
                fieldLabel : '是否拼车',
                xtype : 'textfield',
                name : 'carpoolYN',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true,

            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'modelName2',
                fieldLabel : '车型',
                xtype : 'textfield',
                name : 'modelName',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'businessType2',
                fieldLabel : '业务类型',
                xtype : 'textfield',
                name : 'businessType',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'budgetCost',
                fieldLabel : '预算费用',
                xtype : 'textfield',
                name : 'budgetCost',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'budgetKilometres',
                fieldLabel : '预算公里',
                xtype : 'textfield',
                name : 'budgetKilometres',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'cost',
                fieldLabel : '实际费用',
                xtype : 'textfield',
                name : 'cost',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'kilometres',
                fieldLabel : '实际公里',
                xtype : 'textfield',
                name : 'kilometres',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'content',
                fieldLabel : '出行事由',
                xtype : 'textfield',
                name : 'content',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        },{
            columnWidth : 0.5,
            items : [{
                id:'remark',
                fieldLabel : '用车备注',
                xtype : 'textfield',
                name : 'remark',
                anchor : '98%',
                readOnly:true,
                selectOnFocus : true
            }]
        }];

        Ext.order.detailsform.superclass.constructor.call(this, {
            labelWidth : 60,
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


Ext.order.detailswin = Ext.extend(Ext.Window, {
    constructor : function(app) {
        this.app = app;
        this.form = new Ext.order.detailsform(this);
        Ext.order.detailswin.superclass.constructor.call(this, {
            width : 500,
            plain : true,
            showLock : true,
            modal : true,
            resizable : false,
            buttonAlign : 'center',
            items : this.form,
            buttons : [ {
                id:'cancelButton',
                xtype: 'button',
                text : '取消',
                iconCls : 'cancel',
                handler : this.onClosecar,
                scope : this
            }]
        });
    },



    onClosecar : function() {
        this.close();
    }
});


Ext.order.form = Ext.extend(Ext.FormPanel, {
	constructor : function(app) {
		this.app = app;


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
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
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
            allowBlank : true,
            editable : false,
            onTriggerClick : function(e) {
                new truckSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('plateNoId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });






        this.items = [{
            xtype : 'hidden',
            id : 'carApplyNo'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            xtype : 'hidden',
            id : 'userId'
        },{
            xtype : 'hidden',
            id : 'plateNoId'
        },  {
            columnWidth : 1,
            items : [{

                id:'privateOrPublic',
                fieldLabel : '付款方式',
                xtype : 'textfield',
                readOnly : true,
                name : 'privateOrPublic',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'startLocale',
                fieldLabel : '出发点',
                xtype : 'textfield',
                readOnly : true,
                name : 'startLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'endLocale',
                fieldLabel : '终点站',
                xtype : 'textfield',
                readOnly : true,
                name : 'endLocale',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'carTypeId',
                fieldLabel : '申请车型',
                xtype : 'textfield',
                readOnly : true,
                name : 'carTypeId',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetCost',
                fieldLabel : '预算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetCost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'budgetKilometres',
                fieldLabel : '预算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'budgetKilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'cost',
                fieldLabel : '结算费用',
                xtype : 'textfield',
                readOnly : true,
                name : 'cost',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'kilometres',
                fieldLabel : '结算公里数',
                xtype : 'textfield',
                readOnly : true,
                name : 'kilometres',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'content',
                fieldLabel : '出行事由',
                xtype : 'textfield',
                readOnly : true,
                name : 'content',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'remark',
                fieldLabel : '用车备注',
                xtype : 'textfield',
                readOnly : true,
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'businessType1',
                fieldLabel : '业务类型',
                xtype : 'textfield',
                readOnly : true,
                name : 'businessTypebusinessType',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [this.truckSelector]
        },{
            columnWidth : 1,
            items : [this.driverSelector]
        },{
            columnWidth : 1,
            items : [{
                id:'departureTime',
                fieldLabel : '出发时间',
                xtype : 'textfield',
                readOnly : true,
                name : 'departureTime',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

		Ext.order.form.superclass.constructor.call(this, {
					labelWidth : 60,
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

Ext.order.ordersform = Ext.extend(Ext.FormPanel, {
    constructor : function(app) {
        this.app = app;




        this.ds = new Ext.data.Store({
            proxy : new Ext.data.HttpProxy({
                url : path + '/system/queryLocale.do',
                method : 'POST'
            }),
            reader : new Ext.data.JsonReader({},
                [{name : 'location'}, {name : 'name'}]),


        });

        this.kqSelector = new Ext.form.TriggerField({
            fieldLabel : '单位机构',
            name : 'company',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;
                console.log("=================="+val);

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new kqSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('companyId').setValue(id);
                        companyId = id;
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}



                    }, true, this);

                }

            },
            scope : this
        });

        this.passengerSelector = new Ext.form.TriggerField({
            fieldLabel : '乘客',
            name : 'passengerName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                var val = Ext.getCmp("fleetName").value;

                if(val ==null && val == undefined){
                    Ext.ux.Toast.msg("信息", "请先选择所属平台");
                }else {
                    new passengerSelector(function(id, name) {
                        this.setValue(name);
                        Ext.getCmp('userId').setValue(id);
                        //	if(Ext.getCmp('loginName').getValue != ''){
                        //		Ext.getCmp('loginName').setValue(name);
                        //	}

                    }, false, this);

                }

            },
            scope : this
        });


        this.driverSelector1 = new Ext.form.TriggerField({
            fieldLabel : '司机',
            name : 'driverName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                new driverSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('driverId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });

        this.truckSelector1 = new Ext.form.TriggerField({
            fieldLabel : '车牌号',
            name : 'plateNo',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                new truckSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('plateNoId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });


        this.truckTypeSelector = new Ext.form.TriggerField({
            fieldLabel : '车辆类型',
            name : 'modelName',
            anchor : '98%',
            triggerClass : 'x-form-search-trigger',
            selectOnFocus : true,
            submitValue : false,
            allowBlank : false,
            editable : false,
            onTriggerClick : function(e) {
                new truckTypeSelector(function(id, name) {
                    this.setValue(name);
                    Ext.getCmp('carTypeId').setValue(id);
                    //	if(Ext.getCmp('loginName').getValue != ''){
                    //		Ext.getCmp('loginName').setValue(name);
                    //	}



                }, true, this);
            },
            scope : this
        });






        this.items = [{
            xtype : 'hidden',
            id : 'carApplyNo'
        },{
            xtype : 'hidden',
            id : 'fleetId'
        },{
            xtype : 'hidden',
            id : 'companyId'
        },{
            xtype : 'hidden',
            id : 'userId'
        },{
            xtype : 'hidden',
            id : 'driverId'
        }, {
            xtype : 'hidden',
            id : 'plateNoId'
        }, {
            xtype : 'hidden',
            id : 'carTypeId'
        }, {
            xtype : 'hidden',
            id : 'startLongitude'
        }, {
            xtype : 'hidden',
            id : 'startLatitude'
        }, {
            xtype : 'hidden',
            id : 'wayLongitude'
        },{
            xtype : 'hidden',
            id : 'wayLatitude'
        },{
            xtype : 'hidden',
            id : 'endLongitude'
        },{
            xtype : 'hidden',
            id : 'endLatitude'
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
                allowBlank : false,
                editable : false,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                selectOnFocus : true,
                store : new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy( {
                        url : path + '/system/getTreeAllFleetList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'fleetName'}]),
                    baseParams : {
                        fleetId:fleedId
                    },
                    autoLoad : true
                }),
                valueField : 'fleetName',
                displayField : 'fleetName',
                listeners : {
                    'select' : function(combo, record) {
                        this.getForm().findField('fleetId').setValue(record.data.id);
                       // this.getForm().findField('driverId').setValue(null);
                       // this.getForm().findField('driverName').setValue(null);
                        //this.getForm().findField('plateNoId').setValue(null);
                        //this.getForm().findField('plateNo').setValue(null);

                        this.getForm().findField('companyId').setValue(null);
                        this.getForm().findField('company').setValue(null);

                        basefleedId = record.data.id;


                    },
                    'render' : function(combo) {//渲染
                        combo.getStore().on("load", function(s, r, o) {
                                combo.setValue(r[0].get('fleetName'));//第一个值
                                Ext.getCmp('fleetId').setValue(r[0].get('id'));
                                basefleedId = r[0].get('id');




                        });
                    },
                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            items : [this.kqSelector]
        },{
            columnWidth : 1,
            items : [this.truckTypeSelector]
        },{
            columnWidth : 1,
            items : [this.passengerSelector]
        }, {
                columnWidth : 1,
                items : [{
                    xtype : 'combo',
                    fieldLabel : '业务类型',
                    hiddenName : 'businessType',
                    anchor : '98%',
                    typeAhead : true,
                    editable : false,
                    triggerAction : 'all',
                    lazyRender : true,
                    allowBlank : false,
                    mode : 'local',
                    store : new Ext.data.ArrayStore({
                        fields : ['key', 'val'],
                        data : [['单程', '单程'],
                            ['往返', '往返'],
                            ['包车', '包车']
                        ]
                    }),
                    valueField : 'val',
                    displayField : 'key',
                    listeners : {
                        'select' : function(combo, record) {
                            console.log("========"+record.data.val);
                            if(record.data.val == '包车'){
                                Ext.getCmp("charteredBusTypeId").show();
                            }else {
                                Ext.getCmp("charteredBusTypeId").hide();
                                this.getForm().findField('charteredBusTypeId').setValue(null);
                            }



                        },

                        scope : this
                    }
                }]
            },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                id:'charteredBusTypeId',
                fieldLabel : '包车类型',
                width : 60,
                xtype : 'combo',
                hidden:true,
                hiddenName : 'charteredBusTypeId',
                submitValue : false,
                anchor : '98%',
                allowBlank : true,
                editable : false,
                autoLoad : true,
                triggerAction : 'all',
                mode : 'local',
                selectOnFocus : true,
                store : new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy( {
                        url : path + '/logistics/queryBusTypePriceList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'charteredBusType'}]),
                    baseParams : {
                        fleetId:fleedId
                    },
                    autoLoad : true
                }),
                valueField : 'id',
                displayField : 'charteredBusType',
                listeners : {
                    'select' : function(combo, record) {
                    },

                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            items : [{
                xtype : 'combo',
                fieldLabel : '付款方式',
                hiddenName : 'privateOrPublic',
                anchor : '98%',
                typeAhead : true,
                allowBlank : false,
                editable : false,
                triggerAction : 'all',
                lazyRender : true,
                mode : 'local',
                store : new Ext.data.ArrayStore({
                    fields : ['key', 'val'],
                    data : [['自费', '自费'],
                        ['公费', '公费']
                    ]
                }),
                valueField : 'val',
                displayField : 'key'
            }]
        },{
            columnWidth : 1,
            items : [{

                id:'departuredate',
                fieldLabel : '选择日期',
                xtype : 'datefield',
                format : 'Y-m-d',
                allowBlank : false,
                name : 'departuredate',
                anchor : '98%',
                selectOnFocus : true,


            }]
        },{
            columnWidth : 1,
            items : [{

                id:'departureTime',
                fieldLabel : '选择时间',
                xtype : 'timefield',
                allowBlank : false,
                format:'G:i:s',
                name : 'departureTime',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                id:'startlocal',
                mode : 'remote',
                minChars:2,
                queryParam: 'userinput',
                fieldLabel : '出发点',
                width : 60,
                xtype : 'combo',
                hiddenName : 'startLocale',
                submitValue : false,
                allowBlank : false,
                anchor : '98%',
                editable : true,
                triggerAction : 'all',
                store : this.ds,
                valueField : 'name',
                displayField : 'name',
                listeners : {
                    'select' : function(combo, record) {
                        //console.log(record.data.location);
                        var startLocation = new Array();
                        startLocation = record.data.location.split(",");
                        console.log(startLocation[0]);
                        console.log(startLocation[1]);
                        this.getForm().findField('startLongitude').setValue(startLocation[0]);
                        this.getForm().findField('startLatitude').setValue(startLocation[1]);



                    },
                    'beforequery':function(qe){
                        var para  =  qe.query ;
                    },


                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                id:'wayLocale',
                mode : 'remote',
                minChars:2,
                queryParam: 'userinput',
                fieldLabel : '途径点',
                width : 60,
                xtype : 'combo',
                hiddenName : 'wayLocale',
                submitValue : false,
                allowBlank : true,
                anchor : '98%',
                editable : true,
                triggerAction : 'all',
                store : this.ds,
                valueField : 'name',
                displayField : 'name',
                listeners : {
                    'select' : function(combo, record) {
                        // console.log(record.data.location);
                        var wayLocation = new Array();
                        wayLocation = record.data.location.split(",");


                        this.getForm().findField('wayLongitude').setValue(wayLocation[0]);
                        this.getForm().findField('wayLatitude').setValue(wayLocation[1]);
                    },
                    'beforequery':function(qe){
                        var para  =  qe.query ;
                    },


                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            labelWidth : 60,
            items : [{
                id:'endlocal',
                mode : 'remote',
                minChars:2,
                queryParam: 'userinput',
                fieldLabel : '终点站',
                width : 60,
                xtype : 'combo',
                hiddenName : 'endLocale',
                submitValue : false,
                allowBlank : false,
                anchor : '98%',
                editable : true,
                triggerAction : 'all',
                store : this.ds,
                valueField : 'name',
                displayField : 'name',
                listeners : {
                    'select' : function(combo, record) {
                       // console.log(record.data.location);
                        var endLocation = new Array();
                        endLocation = record.data.location.split(",");

                        console.log(endLocation[0]);
                        console.log(endLocation[1]);
                        this.getForm().findField('endLongitude').setValue(endLocation[0]);
                        this.getForm().findField('endLatitude').setValue(endLocation[1]);
                    },
                    'beforequery':function(qe){
                        var para  =  qe.query ;
                    },


                    scope : this
                }
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '出行事由',
                xtype : 'textfield',
                name : 'content',
                anchor : '98%',
                selectOnFocus : true
            }]
        },{
            columnWidth : 1,
            items : [{
                fieldLabel : '用车备注',
                xtype : 'textfield',
                name : 'remark',
                anchor : '98%',
                selectOnFocus : true
            }]
        }];

        //Ext.getCmp('charteredBusTypeId').setVisible(true);
       // Ext.getCmp('charteredBusTypeId').setvalue("11111");

        Ext.order.ordersform.superclass.constructor.call(this, {
            labelWidth : 60,
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



Ext.order.win = Ext.extend(Ext.Window, {
			constructor : function(app) {
				this.app = app;
				this.form = new Ext.order.form(this);
				Ext.order.win.superclass.constructor.call(this, {
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




            Ext.eu.ajax(path + '/logistics/reassignmentcarApply.do', {
                carApply : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '改派成功！请短信通知司机和乘客');
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

Ext.order.orderswin = Ext.extend(Ext.Window, {
    constructor : function(app) {
        this.app = app;
        this.form = new Ext.order.ordersform(this);
        Ext.order.orderswin.superclass.constructor.call(this, {
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
            //btn.setDisabled(true);
            var user = form.getValues();
            var departureTime = user.departureTime;
            console.log("===时间==="+departureTime.length);
            if (departureTime.length == '7'){
                departureTime = "0"+departureTime;
            }
            user.departureTime = user.departuredate+" "+departureTime;
            console.log(user.departureTime);


            var startLongitude = Ext.getCmp("startLongitude").value;
            var wayLocale = Ext.getCmp("wayLocale").value;
            var wayLongitude = Ext.getCmp("wayLongitude").value;
            var endLongitude = Ext.getCmp("endLongitude").value;

            // console.log("出发点经纬度"+user.startLongitude);
            // console.log("途经点地址"+user.wayLocale);
            // console.log("途经点经纬度"+user.wayLongitude);
            // console.log("终点经纬度"+user.endLongitude);


            if (startLongitude == null && startLongitude == undefined){
                Ext.ux.Toast.msg('提示', '出发地点有误，请重新填写！！！');
                return;
            }
            if (endLongitude == null && endLongitude == undefined){
                Ext.ux.Toast.msg('提示', '到达地点有误，请重新填写！！！');
                return;
            }

            if (wayLocale != null && wayLocale != undefined && wayLocale != ""){
                if (wayLongitude == null && wayLongitude == undefined){
                    Ext.ux.Toast.msg('提示', '途径地点有误，请重新填写！！！');
                    return;
                }

            }





            Ext.eu.ajax(path + '/logistics/insertcarApply.do', {
                carApply : Ext.encode(user)
            }, function(resp) {
                var res = Ext.decode(resp.responseText);
                if (res.label) {
                    Ext.ux.Toast.msg('信息', '下单成功！请通知审核员和调度员');
                    this.app.getStore().reload();
                    this.close();
                } else {
                    Ext.ux.Toast.msg('提示', '下单失败！！！');
                    //btn.setDisabled(false);
                }
            }, this);
        }
    },
    onClose : function() {
        this.close();
    }
});


Ext.order.grid = Ext.extend(Ext.grid.GridPanel, {
			constructor : function(app) {
				this.app = app;
				// 数据源
                this.ds = new Ext.data.JsonStore({
                    url: path + '/logistics/queryAllCarApply.do',
                    idProperty: 'id',
                    root: 'rows',
                    totalProperty: 'results',
                    fields: ['carApplyNo', 'fleetId', 'companyId', 'userId', 'driverId','privateOrPublic', 'departureTime'
                        , 'startLocale', 'endLocale', 'carpoolYN', 'carTypeId','budgetCost','budgetKilometres', 'content'
                        , 'remark','businessType', 'statuesId', 'activityId','orderFrom','driverApplyNo', 'fleetName', 'passengerName'
                        ,'company','driverName','modelName','plateNoId','plateNo','cost','kilometres','localeName','applyDatetime','rideDatetime','endDatetime','name','passengerTel','GPSFrom','mobile'],
                    autoDestroy: true,
                    autoLoad: true,
                    baseParams: {
                        isPaging: true,
                        start: 0,
                        limit: 50,
                        fleetId: fleedId,
                        statuesId:'2'
                    },
                    listeners: {
                        'beforeload' : function() {
                            console.log(this.getStore().baseParams);
                            Ext.apply(this.getStore().baseParams,
                                this.app.queryPanel.getQueryParams());

                        },

                        scope: this
                    }
                });
				// 选择框
				this.sm = new Ext.grid.CheckboxSelectionModel({
							singleSelect : false
						});
				// 列
                this.cm = new Ext.grid.ColumnModel({
                    defaults: {
                        width: 200,
                        sortable: true,
                    },
                    columns: [new Ext.grid.RowNumberer(), this.sm, {
                        header: 'carApplyNo',
                        dataIndex: 'carApplyNo',
                        hidden: true
                    }, {
                        header: 'fleetId',
                        dataIndex: 'fleetId',
                        hidden: true
                    },{
                        header: 'companyId',
                        dataIndex: 'companyId',
                        hidden: true
                    },{
                        header: 'userId',
                        dataIndex: 'userId',
                        hidden: true
                    },{
                        header: 'driverId',
                        dataIndex: 'driverId',
                        hidden: true
                    }, {
                        header: 'plateNoId',
                        dataIndex: 'plateNoId',
                        hidden: true
                    },{
                        header: '订单申请时间',
                        dataIndex: 'applyDatetime'
                    },{
                        header: '乘车用户',
                        dataIndex: 'name'
                    },{
                        header: '乘客电话',
                        dataIndex: 'passengerTel'
                    },{
                        header: '业务类型',
                        dataIndex: 'businessType'
                    }, {
                        header: '付费方式',
                        dataIndex: 'privateOrPublic'
                    }, {
                        header: '出发时间',
                        dataIndex: 'departureTime'
                    }, {
                        header: '上车时间',
                        dataIndex: 'rideDatetime'
                    },{
                        header: '下车时间',
                        dataIndex: 'endDatetime'
                    },{
                        header: '出发地',
                        dataIndex: 'startLocale'
                    },{
                        header: '途径地',
                        dataIndex: 'localeName'
                    },{
                        header: '目的地',
                        dataIndex: 'endLocale'
                    },{
                        header: '实际费用',
                        dataIndex: 'cost'
                    }, {
                        header: '实际公里数',
                        dataIndex: 'kilometres'
                    }, {
                        header: '订单来源',
                        dataIndex: 'orderFrom'
                    },  {
                        header: '司机',
                        dataIndex: 'driverName'
                    },{
                        header: '司机电话',
                        dataIndex: 'mobile'
                    },  {
                        header: '车型',
                        dataIndex: 'modelName'
                    }, {
                        header: '车牌号',
                        dataIndex: 'plateNo'
                    },{
                        header: '订单状态',
                        dataIndex: 'statuesId',
                        renderer : function(val) {
                            if (val == '-1') {
                                return '乘客取消';
                            } else if (val == '-2'){
                                return '司机改派';
                            }else if (val == '-3'){
                                return '后台取消';
                            }else if (val == '-4'){
                                return '其他取消';
                            }else if (val == '0'){
                                return '审核未通过';
                            }else if (val == '10'){
                                return '审核中';
                            }else if (val == '20'){
                                return '审核通过';
                            }else if (val == '30'){
                                return '已分配';
                            }else if (val == '40'){
                                return '车辆到达出发点';
                            }else if (val == '50'){
                                return '乘客已上车';
                            }else if (val == '60'){
                                return '乘客已下车';
                            }else if (val == '70'){
                                return '乘客已确认费用';
                            }else if (val == '80'){
                                return '系统确认费用';
                            }else if (val == '90'){
                                return '已评价';
                            }
                        }
                    }, {
                        header: '定位来源',
                        dataIndex: 'GPSFrom'
                    },{
                        header: '所属机构',
                        dataIndex: 'company'
                    },{
                        header: '所属平台',
                        dataIndex: 'fleetName'
                    }]
                });
				// 菜单条
				this.tbar = new Ext.Toolbar([ {
                    id:'buttonAdddriverTypeView',
                    xtype : 'button',
                    iconCls : 'add',
                    text : '查看订单详情',
                    handler : this.onAdd,
                    scope : this
                },{
                            id:'buttonAdddriverOrderView',
                            xtype : 'button',
                            iconCls : 'add',
                            text : '后台下单',
                            handler : this.onOrders,
                            scope : this
                        },{
							id:'buttonModifydriverTypeView',
							xtype : 'button',
							iconCls : 'modify',
							text : '改派',
							handler : this.onModify,
							scope : this
						}, {
							id:'buttonDeldriverTypeView',
							xtype : 'button',
							iconCls : 'delete',
							text : '后台取消',
							handler : this.onDelete,
							scope : this
						}, {
                    id:'buttonLocusView',
                    xtype : 'button',
                    iconCls : 'modify',
                    text : '查看轨迹',
                    handler : this.onLocus,
                    scope : this
                }]);
				// 页码条
				this.bbar = new Ext.PagingToolbar({
							pageSize : 50,
							displayInfo : true,
							store : this.ds
						});
				// 构造
				Ext.order.grid.superclass.constructor.call(this, {
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

        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要查看的记录！");
            return;
        }
        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }



        var select = selects[0].data;
        console.log(select);
        var win = new Ext.order.detailswin(this);
        var form = win.form.getForm();
        win.setTitle('查看订单详情', 'modify');
        if(select.carpoolYN ==false){
            select.carpoolYN = '否';
        }
        if (select.carpoolYN == true){
            select.carpoolYN = '是';
        }

        form.findField('fleetName').setValue(select.fleetName);
        form.findField('loginName').setValue(select.name);
        form.findField('company').setValue(select.company);
        form.findField('departureTime').setValue(select.departureTime);
        form.findField('startLocale').setValue(select.startLocale);
        form.findField('endLocale').setValue(select.endLocale);
        form.findField('carpoolYN').setValue(select.carpoolYN);
        form.findField('budgetCost').setValue(select.budgetCost);
        form.findField('budgetKilometres').setValue(select.budgetKilometres);
        form.findField('content').setValue(select.content);
        form.findField('remark').setValue(select.remark);
        form.findField('carApplyNo1').setValue(select.carApplyNo);
        //form.findField('carApplyNo1').setValues("1111");
        form.findField('modelName2').setValue(select.modelName)
        form.findField('localeName').setValue(select.localeName);

        form.findField('rideDatetime1').setValue(select.rideDatetime);
        form.findField('endDatetime1').setValue(select.endDatetime);
        form.findField('businessType2').setValue(select.businessType);

        form.findField('cost').setValue(select.cost);
        form.findField('kilometres').setValue(select.kilometres);

        form.findField('driverName2').setValue(select.driverName);
        form.findField('plateNo2').setValue(select.plateNo);

        win.show();

    },


    onOrders : function(btn) {
        var win = new Ext.order.orderswin(this);
        win.setTitle('后台下单', 'add');
        win.show();
    },
    onModify : function(btn) {
        var selects = Ext.eu.getSelects(this);
        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要修改的信息！");
            return;
        }
        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }
        var select = selects[0].data;
        var statuesId = selects[0].data.statuesId;
        if (statuesId == '30' || statuesId =='40' || statuesId == '-2'){
            var win = new Ext.order.win(this);
            var form = win.form.getForm();
            win.setTitle('修改订单信息', 'modify');
            form.findField('carApplyNo').setValue(select.carApplyNo);
            form.findField('fleetId').setValue(select.fleetId);
            form.findField('driverId').setValue(select.driverId);
            form.findField('plateNoId').setValue(select.plateNoId);
            form.findField('userId').setValue(select.userId);


            form.findField('privateOrPublic').setValue(select.privateOrPublic);
            form.findField('departureTime').setValue(select.departureTime);
            form.findField('startLocale').setValue(select.startLocale);
            form.findField('endLocale').setValue(select.endLocale);
            form.findField('carTypeId').setValue(select.carTypeId);
            form.findField('budgetCost').setValue(select.budgetCost);
            form.findField('budgetKilometres').setValue(select.budgetKilometres);
            form.findField('cost').setValue(select.cost);
            form.findField('kilometres').setValue(select.kilometres);
            form.findField('content').setValue(select.content);
            form.findField('remark').setValue(select.remark);
            form.findField('businessType1').setValue(select.businessType);

            form.findField('driverName').setValue(select.driverName);
            form.findField('plateNo').setValue(select.plateNo);
            win.show();
        }else {
            Ext.ux.Toast.msg("信息", "改订单不在改派范围内！");
            return;

        }

        console.log("========="+statuesId)

    },
			onDelete : function() {
				var selects = Ext.eu.getSelects(this);
				if (selects.length == 0) {
					Ext.ux.Toast.msg("信息", "请选择要取消的记录！");
					return;
				}

                if (selects.length > 1) {
                    Ext.ux.Toast.msg("信息", "只能选择一条记录！");
                    return;
                }
				var ary = Array();
				for (var i = 0; i < selects.length; i++) {
					var user = {
                        carApplyNo : selects[i].data.carApplyNo
					}
					ary.push(user);
				}

                var statuesId = selects[0].data.statuesId;
                if (statuesId == '30' || statuesId =='40' || statuesId == '20'|| statuesId == '10'){
                    // Ext.ux.Toast.msg("信息", Ext.encode(ary));
                    Ext.Msg.confirm('取消操作', '确定要取消所选记录吗?', function(btn) {
                        if (btn == 'yes') {
                            Ext.eu.ajax(path + '/logistics/deletecarApply.do', {
                                carApplies : Ext.encode(ary)
                            }, function(resp) {
                                Ext.ux.Toast.msg('信息', '取消成功');
                                this.getStore().reload();
                            }, this);
                        }
                    }, this);
                }else {
                    Ext.ux.Toast.msg("信息", "改订单无法后台取消！");
                    return;

                }
				 

			},
    onLocus : function() {

        var selects = Ext.eu.getSelects(this);

        if (selects.length == 0) {
            Ext.ux.Toast.msg("信息", "请选择要查看的记录！");
            return;
        }

        if (selects.length > 1) {
            Ext.ux.Toast.msg("信息", "只能选择一条记录！");
            return;
        }


        var statuesId = selects[0].data.statuesId;

        if(statuesId == '60' || statuesId =='70' || statuesId == '80'|| statuesId == '90' ){
            var  carApplyNo = selects[0].data.carApplyNo;

            window.open(path+'/mapLocus.jsp?carApplyNo='+carApplyNo, 'mywindow1', 'width=400, height=300, menubar=no, toolbar=no, scrollbars=yes');
        }else {
            Ext.ux.Toast.msg("信息", "该订单还未完成，无法查看轨迹！！！！");
        }



    },
		});

Ext.order.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;

                this.companyTypeDS = new Ext.data.Store({
                    proxy : new Ext.data.HttpProxy({
                        url : path + '/system/getTreeAllCompanyList.do',
                        method : 'POST'
                    }),
                    reader : new Ext.data.JsonReader({},
                        [{name : 'id'}, {name : 'company'}]),

                    baseParams : {
                        fleetId:fleedId
                    }

                });
                this.companyTypeDS.load();

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
                        fieldLabel : '订单编号',
                        id : 'carApplyNo',
                        anchor : '90%'
                    }]
                },{
                    width : 250,
                    items : [{
                        id:'querystatuesId',
                        fieldLabel : '订单状态',
                        width : 60,
                        xtype : 'combo',
                        hiddenName : 'statuesId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : new Ext.data.ArrayStore({
                            fields : ['key', 'val'],
                            data : [['审核未通过', '0'],
                                ['审核中', '10'],
                                ['审核通过', '20'],
                                ['已分配', '30'],
                                ['车辆到达出发点', '40'],
                                ['乘客已上车', '50'],
                                ['乘客已下车', '60'],
                                ['乘客已确认费用', '70'],
                                ['系统确认费用', '80'],
                                ['已评价', '90'],
                                ['乘客取消', '-1'],
                                ['司机改派', '-2'],
                                ['后台取消', '-3'],

                            ]
                        }),
                        valueField : 'val',
                        displayField : 'key'

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'querycompanyId',
                        fieldLabel : '按机构筛选',
                        width : 80,
                        xtype : 'combo',
                        hiddenName : 'companyId',
                        submitValue : false,
                        anchor : '90%',
                        editable : true,
                        autoLoad : true,
                        triggerAction : 'all',
                        mode : 'local',
                        store : this.companyTypeDS,
                        valueField : 'id',
                        displayField : 'company'

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'orderclockIn',
                        fieldLabel : '开始时间',
                        width : 100,
                        xtype : 'datefield',
                        name : 'clockIn',
                        format : 'Y-m-d',
                        editable : false,
                        submitValue : true,
                        anchor : '90%',

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'orderclockOut',
                        fieldLabel : '结束时间',
                        name:'clockOut',
                        width : 100,
                        xtype : 'datefield',
                        hiddenName : 'clockOut',
                        format : 'Y-m-d',
                        editable : false,
                        submitValue : true,
                        anchor : '90%',

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'querydepartureTimebegin',
                        fieldLabel : '出发时间开始',
                        width : 100,
                        xtype : 'datefield',
                        name : 'departureTimebegin',
                        format : 'Y-m-d',
                        editable : false,
                        submitValue : true,
                        anchor : '90%',

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'querydepartureTimeend',
                        fieldLabel : '出发时间截止',
                        width : 100,
                        xtype : 'datefield',
                        name : 'departureTimeend',
                        format : 'Y-m-d',
                        editable : false,
                        submitValue : true,
                        anchor : '90%',

                    }]

                },{
                    width : 250,
                    items : [{
                        id:'queryorderfleetId',
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
						}, {
                            width : 100,
                            items : [{
                                xtype : 'button',
                                id : 'exportExcel',
                                text : '导出excel',
                                iconCls : 'reset',
                                handler : function() {
                                    var companyId = Ext.getCmp("querycompanyId").value;
                                    var clockIn = Ext.getCmp("orderclockIn").value;
                                    var clockOut = Ext.getCmp("orderclockOut").value;
                                    var queryfleetId = Ext.getCmp("queryorderfleetId").value;
                                    var departureTimebegin = Ext.getCmp("querydepartureTimebegin").value;
                                    var departureTimeend = Ext.getCmp("querydepartureTimeend").value;

                                    if (companyId == undefined){
                                        companyId = '';
                                    }
                                    if (clockIn == undefined){
                                        clockIn = '';
                                    }
                                    if (clockOut == undefined){
                                        clockOut = '';
                                    }
                                    if (queryfleetId == undefined){
                                        queryfleetId = '';
                                    }
                                    if (departureTimebegin == undefined){
                                        departureTimebegin = '';
                                    }
                                    if (departureTimeend == undefined){
                                        departureTimeend = '';
                                    }


                                    window.location.href = path + '/logistics/exportCarApply.do?fleetId=' +fleedId+'&companyId='
                                        +companyId+'&clockIn='+clockIn+'&clockOut='+clockOut+'&queryfleetId='+queryfleetId+
                                        '&departureTimebegin='+departureTimebegin+'&departureTimeend='+departureTimeend;
                                },
                                scope : this
                            }]
                        }];
				// panel定义
				Ext.order.queryPanel.superclass.constructor.call(this, {
							id : 'applyTypeViewQueryPanel',
							region : 'north',
							height : 80,
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
			//	Ext.ux.Toast.msg('ccc', this.getForm().getValues());
				return this.getForm().getValues();
			}
		});


/**
 * 入口方法，用于定位动态加载文件
 * 
 * @return {}
 */
var orderView = function(params) {
	this.queryPanel = new Ext.order.queryPanel(this);
	this.grid = new Ext.order.grid(this);

	Ext.getCmp('buttonModifydriverTypeView').hidden=!params[0].isModify;
	Ext.getCmp('buttonDeldriverTypeView').hidden=!params[0].isDel;

    Ext.getCmp('queryorderfleetId').hidden= loginName != 'root';


	
	return new Ext.Panel({
				id : 'orderView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '订单管理',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
