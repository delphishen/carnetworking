Ext.namespace('Ext.map');




Ext.map.mapPanel = Ext.extend(Ext.panel,{
    constructor:function(app){
    	this.app = app;


        Ext.map.mapPanel.superclass.constructor.call(this, {
            id : 'mapPanel',
            region : 'center',
            height : 600,
            layout : 'fit',
            xtype : 'tabpanel',
            items : [{
                title : '首  页',
                //随便插入一张地图，通过iframe方式，目前只知道这种方式在EXTJS4中插入百度地图
                html : "<iframe width=100% height=100% id='myframe'name='myframe' src='baiduMap.jsp'/>"
            }]
        });




	}
})

Ext.map.queryPanel = Ext.extend(Ext.FormPanel, {
			constructor : function(app) {
				this.app = app;




                // 在column布局的制约下，从左至右每个元素依次进行form布局
				this.items = [{
					width:180,
                    items : [{
                        xtype : 'combo',
						width:60,
                        fieldLabel : '价格类型',
                        hiddenName : 'charteredBusType',
                        anchor : '98%',
                        typeAhead : true,
                        editable : false,
                        triggerAction : 'all',
                        lazyRender : true,
                        mode : 'local',
                        store : new Ext.data.ArrayStore({
                            fields : ['key', 'val'],
                            data : [['常规价格设置', '0'],
                                ['包车价格设置', '1']]
                        }),
                        valueField : 'val',
                        displayField : 'key'
                    }]
                },
					{
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
						}];
				// panel定义
				Ext.map.queryPanel.superclass.constructor.call(this, {
							id : 'applyTypeViewQueryPanel',
							region : 'north',
							height : 40,
							frame : true,
							split : true,
							collapseMode : 'mini',
							layout : 'column',
							labelAlign : 'right',
							defaults : {
								layout : 'form',
								labelWidth : 60
							}
						});
			}
		});


/**
 * 入口方法，用于定位动态加载文件
 * 
 * @return {}
 */
var mapView = function(params) {
	this.queryPanel = new Ext.map.queryPanel(this);
	this.grid = new Ext.map.mapPanel(this);

	console.log(params);
	
	return new Ext.Panel({
				id : 'mapView',// 标签页ID，必须与入口方法一致，用于判断标签页是否已经打开
				title : '百度地图控件',
				layout : 'border',
				items : [this.queryPanel, this.grid]
			})
}
