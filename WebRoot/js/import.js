Ext.namespace('App');

/**
 * 动态加载JS库。 1.根据页面入口名称在importJs中定位需要加载的js
 * 2.根据与入口方法名称相同的组件id在主页面中定位标签页，用于判断标签页是否已经打开
 * 
 * @type
 */
App.importJs = {
	/** *************************基础管理*************************** */
	infoView : [path + '/js/info/infoView.js'],



    /** *************************车辆监控*************************** */
    carLocationView : [path + '/carLocation.jsp'],


    mapView : [path + '/js/logistics/dossier/mapView.js'],

	iconView : [path + '/jsLib/ext3/ux/uploadDialog/UploadDialog.js',
			path + '/js/basic/iconView.js'],
	/** *************************水平衡基础管理*************************** */
	kqView : [path + '/utils/expansion/treeCombo.js',
			path + '/js/wbb/kq/quotaImportWin.js',
			path + '/utils/kqNameUtil.js',
            path + '/js/wbb/kq/kqWin.js',
			path + '/js/wbb/kq/kqTree.js',
            path + '/js/wbb/kq/kqView.js',
            path + '/utils/selector/userSelector.js',
            path + '/utils/selector/truckSelector.js',],
	standardView : [path + '/utils/expansion/treeCombo.js',
			path + '/utils/selector/standardKqSelector.js',
			path + '/js/wbb/standard/standardTree.js',
			path + '/js/wbb/standard/standardWin.js',
			path + '/js/wbb/standard/standardSettingWin.js',
			path + '/js/wbb/standard/standardView.js'],
	muwView : [path + '/js/wbb/muwView.js'],
	qpView : [path + '/utils/expansion/treeCombo.js',
			path + '/utils/selector/kqSelector.js',
			path + '/utils/selector/kqEvolveSelector.js',
			path + '/utils/selector/qpSelector.js',
			path + '/utils/calculator/calculator.js',
			path + '/js/wbb/qp/qpTree.js',
            path + '/js/wbb/qp/qpWin.js',
			path + '/js/wbb/qp/qpView.js',
            path + '/utils/selector/userSelector.js',
            path + '/utils/selector/driverSelector.js',],
	cqView : [path + '/utils/expansion/treeCombo.js',
			path + '/utils/selector/userSelector.js',
			path + '/utils/selector/kqSelector.js',
			path + '/utils/selector/qpSelector.js',
			path + '/utils/calculator/calculator.js',
			path + '/js/wbb/cq/cqEvaRateGrid.js',
			path + '/js/wbb/cq/cqTree.js',
            path + '/js/wbb/cq/cqWin.js',
			path + '/js/wbb/cq/cqView.js'],

    zqView : [path + '/utils/expansion/treeCombo.js',
        path + '/utils/selector/userSelector.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/qpSelector.js',
        path + '/utils/calculator/calculator.js',
        path + '/js/wbb/zq/zqTree.js',
        path + '/js/wbb/zq/zqWin.js',
        path + '/js/wbb/zq/zqView.js'],



    jqView : [path + '/utils/expansion/treeCombo.js',
        path + '/utils/selector/userSelector.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/qpSelector.js',
        path + '/utils/calculator/calculator.js',
        path + '/js/wbb/cq/cqEvaRateGrid.js',
        path + '/js/wbb/jq/jqTree.js',
        path + '/js/wbb/jq/jqWin.js',
        path + '/js/wbb/jq/jqView.js'],


	algorithmView : [path + '/js/wbb/algorithmView.js'],
	assistView : [path + '/js/wbb/assistView.js'],

    /** *************************合同管理*************************** */	
	contractView : [                  
	
				path + '/jsLib/ext3/ux/uploadDialog/UploadDialog.js',
				path + '/js/system/attachView.js',  
	             path + '/js/logistics/contractView.js'
	             ],

    empSelectorView : [path + '/js/system/empSelectorView.js'],


    /** *************************车辆调度管理*************************** */	
	vehicleSchedulingView : [                  
	        path + '/jsLib/extensible-1.0.2/lib/extensible-all-debug.js',  
	        
//	        path + '/jsLib/extensible-1.0.2/examples/calendar/data/events.js', 
//	        path + '/jsLib/extensible-1.0.2/examples/calendar/MemoryEventStore.js', 	        
	        
	 // 2017.08.08加载这个是因为对EventEditWindow 做了修改，所以不能用extensible-all-debug.js 里面的EventEditWindow
	             path + '/jsLib/extensible-1.0.2/src/calendar/EventEditWindow.js',    
	             path + '/jsLib/extensible-1.0.2/src/locale/extensible-lang-zh_CN.js',	   	                         
             
	             path + '/utils/selector/truckSelector.js', 
	             path + '/js/logistics/vehicleSchedulingView.js'
	            
	             ],		
    /** *************************车辆调度跟踪管理*************************** */	
	dispatchListView : [path + '/js/logistics/dispatchListAmendedPetitionWin.js',
	                    path + '/js/logistics/dispatchListView.js',	
	                    path + '/js/logistics/dispatchListTree.js',
	                    path + '/utils/selector/empSelector.js',
	             path + '/utils/expansion/treeCombo.js'],



    /** *************************服务平台管理*************************** */

    fleetListView : [path + '/js/logistics/dispatchListAmendedPetitionWin.js',
        path + '/js/logistics/fleetListView.js',
        path + '/js/logistics/fleetListTree.js',
        path + '/utils/selector/empSelector.js',
        path + '/utils/expansion/treeCombo.js'],



    /** *************************任务列表管理*************************** */	
	taskListView : [path + '/js/logistics/taskListView.js',	               
	             path + '/utils/selector/empSelector.js'],

	             
    /** *************************车辆类别管理*************************** */	
	truckTypeView : [path + '/js/logistics/dossier/truckTypeView.js',
	             ],



    /** ***********************司机排班管理*************************** */
    driverRotaView : [path + '/js/logistics/dossier/driverRotaView.js',
        path + '/utils/selector/driverSelector.js'

    ],



    /** ***********************审核员权限管理*************************** */
    approveCompanyView : [path + '/js/logistics/dossier/approveCompanyView.js',
        path + '/utils/selector/userSelector.js',
        path + '/utils/selector/kqSelector.js',

    ],


    /** ***********************车辆违章信息管理*************************** */
    carPeccancyView : [path + '/js/logistics/dossier/carPeccancyView.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',

    ],

    /** *************************司机类别管理*************************** */
    driverTypeView : [path + '/js/logistics/dossier/driverTypeView.js',
    ],

    /** *************************司机调度************************** */
    dispatcherdriverView : [path + '/js/logistics/dossier/dispatcherdriverView.js',
        path + '/utils/selector/userSelector.js',
        path + '/utils/selector/driverSelector.js',
    ],


    /** *************************车辆调度************************** */
    dispatcherplateNoView : [path + '/js/logistics/dossier/dispatcherplateNoView.js',
        path + '/utils/selector/userSelector.js',
        path + '/utils/selector/truckSelector.js',
    ],


    /** *************************审核记录管理************************** */
    approveLogView : [path + '/js/logistics/dossier/approveLogView.js'],


    /** *************************调度记录管理************************** */
    dispatchLogView : [path + '/js/logistics/dossier/dispatchLogView.js'],

    /** *************************价格管理*************************** */
    carTypePriceView : [path + '/js/logistics/dossier/carTypePriceView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckTypeSelector.js',
        path + '/utils/selector/busTypeSelector.js',
        path + '/js/wbb/cq/cqEvaRateGrid.js',
        path + '/utils/expansion/treeCombo.js',
        path + '/js/wbb/cq/cqTree.js',

    ],





    /** *************************用车审核管理*************************** */
    carApplyView : [path + '/js/logistics/dossier/carApplyView.js',
        path + '/js/logistics/dossier/driverRotaView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckTypeSelector.js',
        path + '/utils/selector/busTypeSelector.js',
        path + '/js/logistics/dossier/insanityGrid.js',
        path + '/js/logistics/dossier/insanitydriverGrid.js',
        path + '/utils/expansion/treeCombo.js',
        path + '/js/wbb/cq/cqTree.js',

    ],

    /** *************************调度管理*************************** */
    driverApplyView : [path + '/js/logistics/dossier/driverApplyView.js',
        path + '/js/logistics/dossier/driverRotaView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverDispatcherSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckDispatcherSelector.js',
        path + '/utils/selector/truckSelector.js',
        path + '/utils/selector/busTypeSelector.js',
        path + '/js/logistics/dossier/dispatchGrid.js',
        path + '/js/logistics/dossier/insanitydriverGrid.js',
        path + '/utils/expansion/treeCombo.js',
        path + '/js/wbb/cq/cqTree.js',


    ],



    /** *************************包车价格设置*************************** */
    busTypePriceView : [path + '/js/logistics/dossier/busTypePriceView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckTypeSelector.js',
        path + '/utils/selector/busTypeSelector.js',

    ],


    /** *************************业务类型管理*************************** */
    busTypeView : [path + '/js/logistics/dossier/busTypeView.js',
    ],


    /** *************************结算类型管理*************************** */
    applyTypeView : [path + '/js/logistics/dossier/applyTypeView.js',
    ],


    /** *************************订单管理*************************** */
    orderView : [path + '/js/logistics/dossier/orderView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckSelector.js',
        path + '/utils/selector/passengerSelector.js',
        path + '/utils/selector/truckTypeSelector.js',

    ],

    /** *************************乘客端管理*************************** */
    passengerView : [path + '/js/logistics/dossier/passengerView.js',
        path + '/utils/selector/kqSelector.js',
    ],


    /** *************************乘客点评管理*************************** */
    passengerCommentView : [path + '/js/logistics/dossier/passengerCommentView.js',
    ],

    /** *************************调度员调度车辆*************************** */









    /** *************************车辆档案管理*************************** */	
	truckView : [path + '/js/logistics/dossier/truckView.js',
	             path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverSelector.js',
        path + '/utils/selector/truckTypeSelector.js',
	],
	
    /** *************************线路档案管理*************************** */		             
	linesView : [path + '/js/logistics/dossier/linesView.js'],	
	
    /** *************************车辆等级案管理*************************** */		             
	gradeView : [path + '/js/logistics/dossier/gradeView.js'],	
	
    /** *************************客户档案管理*************************** */
    driverView : [path + '/js/logistics/dossier/driverView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/driverTypeSelector.js',
	],
	
    /** *************************拓扑管理*************************** */
    resultView : [path + '/js/result/resultView.js'],

    /** *************************系统服务平台管理*************************** */
    fleetView : [path + '/utils/selector/empSelector.js',
		path + '/jsLib/ext3/ux/treegrid/TreeGridSorter.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridColumnResizer.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridNodeUI.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridLoader.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridColumns.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGrid.js',
        path + '/utils/expansion/iconCombo.js',
        path + '/js/system/fleetView.js'],


    /** *************************单位机构管理*************************** */

    companyView : [path + '/utils/selector/empSelector.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridSorter.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridColumnResizer.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridNodeUI.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridLoader.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGridColumns.js',
        path + '/jsLib/ext3/ux/treegrid/TreeGrid.js',
        path + '/utils/expansion/iconCombo.js',
        path + '/js/system/companyView.js'],


	/** *************************系统管理*************************** */
	menuView : [path + '/jsLib/ext3/ux/treegrid/TreeGridSorter.js',
			path + '/jsLib/ext3/ux/treegrid/TreeGridColumnResizer.js',
			path + '/jsLib/ext3/ux/treegrid/TreeGridNodeUI.js',
			path + '/jsLib/ext3/ux/treegrid/TreeGridLoader.js',
			path + '/jsLib/ext3/ux/treegrid/TreeGridColumns.js',
			path + '/jsLib/ext3/ux/treegrid/TreeGrid.js',
			path + '/utils/expansion/iconCombo.js',
			path + '/js/system/menuView.js'],
	attachView : [path + '/jsLib/ext3/ux/uploadDialog/UploadDialog.js',
			path + '/js/system/attachView.js'],

    /** *************************员工管理*************************** */
	employeeView : [path + '/js/system/employeeView.js',
                    path + '/utils/selector/kqSelector.js',],




    /** *************************维修厂基本信息*************************** */
    maintenanceInfoView : [path + '/js/api/maintenanceInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************保险公司基本信息*************************** */
    insuranceInfoView : [path + '/js/api/insuranceInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************加油站点基本信息*************************** */
    oilStationInfoView : [path + '/js/api/oilStationInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************单位车辆编制信息*************************** */
    vehicleQuotaInfoView : [path + '/js/api/vehicleQuotaInfoView.js',
        path + '/utils/selector/kqSelector.js',],


    /** *************************车辆申购审批信息*************************** */
    applyApproveInfoView : [path + '/js/api/applyApproveInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************车辆调配审批信息*************************** */
    deployApproveInfoView : [path + '/js/api/deployApproveInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************车辆报废审批信息*************************** */
    acrapApproveInfoView : [path + '/js/api/acrapApproveInfoView.js',
        path + '/utils/selector/kqSelector.js',],

    /** *************************车辆保险信息*************************** */
    vehicleInsuranceInfoView : [path + '/js/api/vehicleInsuranceInfoView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',
        path + '/utils/selector/insuranceInfoSelector.js',],



    /** *************************实物用车保障*************************** */
    vehicleSupportInfoView : [path + '/js/api/vehicleSupportInfoView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',],

    /** *************************加油记录信息*************************** */
    vehicleOilInfoView : [path + '/js/api/vehicleOilInfoView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',],

    /** *************************车辆事故信息*************************** */
    vehicleAccidentInfoView : [path + '/js/api/vehicleAccidentInfoView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',],

    /** *************************维修记录审批信息*************************** */
    vehicleMaintenanceInfoView : [path + '/js/api/vehicleMaintenanceInfoView.js',
        path + '/utils/selector/kqSelector.js',
        path + '/utils/selector/truckSelector.js',
        path + '/utils/selector/maintenanceInfoSelector.js',],


	rightView : [path + '/jsLib/ext3/ux/TreeCheckNodeUI.js',
	             path + '/js/system/rightView.js'],


    /** *************************角色菜单权限管理*************************** */
    roleView : [path + '/utils/selector/empSelector.js',
        path + '/utils/selector/kqSelector.js',
        //		path + '/jsLib/ext3/ux/TreeCheckNodeUI.js',
        path + '/jsLib/columnTreeCheck/ColumnNodeUI.js',
        path + '/jsLib/columnTreeCheck/ColumnTreeCheckNodeUI.js',

        //		path + '/jsLib/columnTreeCheck/TreeCheckNodeUI.js',

        path + '/js/system/rolePageRightWin.js',
        path + '/js/system/roleView.js'],


	userView : [path + '/utils/selector/empSelector.js',
        path + '/utils/selector/managerSelector.js',
		//		path + '/jsLib/ext3/ux/TreeCheckNodeUI.js',  		
			path + '/jsLib/columnTreeCheck/ColumnNodeUI.js',
			path + '/jsLib/columnTreeCheck/ColumnTreeCheckNodeUI.js',
			
	//		path + '/jsLib/columnTreeCheck/TreeCheckNodeUI.js',

			path + '/js/system/userPageRightWin.js',
			path + '/js/system/userView.js']

};
