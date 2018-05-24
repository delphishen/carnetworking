package com.fgwater.core.utils;

import java.io.InputStream;
import java.security.Key;
import java.sql.ResultSet;
import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.extractor.ExcelExtractor;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class ExcelUtil {

	/**
	 * 将结果集写入到工作簿的一个sheet中
	 * 
	 * @param rs
	 *            结果集
	 * @param wb
	 *            工作簿
	 * @param headers
	 *            表头
	 * @throws Exception
	 */
	public static void fillExcelData(JSONArray rs, Workbook wb, String[] headers) throws Exception {
		int rowIndex = 0; // 定义一个行索引
		Sheet sheet = wb.createSheet(); // 创建一个sheet
		Row row = sheet.createRow(rowIndex++); // 创建第一行
		for (int i = 0; i < headers.length; i++) {
			row.createCell(i).setCellValue(headers[i]); // 写入表头
		}
		// 循环写入每一行
		for(int j=0;j<rs.size();j++){
			JSONObject js = rs.getJSONObject(j);
			row = sheet.createRow(rowIndex++);
//			for (int i = 0; i < headers.length; i++) {
//
//				row.createCell(i).setCellValue(js.get("carApplyNo").toString()); // 注意jdbc中的下标是从1开始
//			}
			row.createCell(0).setCellValue(js.get("carApplyNo").toString());
			row.createCell(1).setCellValue(js.get("applyDatetime").toString());
			row.createCell(2).setCellValue(js.get("passengerName").toString());
			row.createCell(3).setCellValue(js.get("businessType").toString());
			row.createCell(4).setCellValue(js.get("privateOrPublic").toString());
			row.createCell(5).setCellValue(js.get("startLocale").toString());
			row.createCell(6).setCellValue(js.get("endLocale").toString());
			row.createCell(7).setCellValue(js.get("cost").toString());
			row.createCell(8).setCellValue(js.get("kilometres").toString());
			row.createCell(9).setCellValue(js.get("orderFrom").toString());
			row.createCell(10).setCellValue(js.get("company").toString());
			row.createCell(11).setCellValue(js.get("fleetName").toString());

			row.createCell(12).setCellValue(js.get("driverName").toString());
			row.createCell(13).setCellValue(js.get("plateNo").toString());
			row.createCell(14).setCellValue(js.get("rideDatetime").toString());
			row.createCell(15).setCellValue(js.get("endDatetime").toString());
			row.createCell(16).setCellValue(js.get("departureTime").toString());
			//row.createCell(16).setCellValue(js.get("statuesId").toString());
			String statuesId = js.get("statuesId").toString();
			if(statuesId.equals("-1")){
				row.createCell(17).setCellValue("乘客取消");
			}else  if (statuesId.equals("-2")){
				row.createCell(17).setCellValue("司机取消");
			}else  if (statuesId.equals("-3")){
				row.createCell(17).setCellValue("后台取消");
			}else  if (statuesId.equals("0")){
				row.createCell(17).setCellValue("审核未通过");
			}else  if (statuesId.equals("10")){
				row.createCell(17).setCellValue("审核中");
			}else  if (statuesId.equals("20")){
				row.createCell(17).setCellValue("审核通过(待分配)");
			}else  if (statuesId.equals("30")){
				row.createCell(17).setCellValue("已分配");
			}else  if (statuesId.equals("40")){
				row.createCell(17).setCellValue("车辆到达出发点");
			}else  if (statuesId.equals("50")){
				row.createCell(17).setCellValue("乘客已上车");
			}else  if (statuesId.equals("59")){
				row.createCell(17).setCellValue("乘客已下车");
			}else  if (statuesId.equals("60")){
				row.createCell(17).setCellValue("费用待确认");
			}else  if (statuesId.equals("70")){
				row.createCell(17).setCellValue("费用已确认");
			}else  if (statuesId.equals("80")){
				row.createCell(17).setCellValue("费用已确认");
			}else  if (statuesId.equals("90")){
				row.createCell(17).setCellValue("已评价");
			}

		}
	}

	/**
	 * 导出车辆excel信息
	 * @param rs
	 * @param wb
	 * @param headers
	 * @throws Exception
	 */

	public static void fillExcelTruck(JSONArray rs, Workbook wb, String[] headers) throws Exception {
		int rowIndex = 0; // 定义一个行索引
		Sheet sheet = wb.createSheet(); // 创建一个sheet
		Row row = sheet.createRow(rowIndex++); // 创建第一行
		for (int i = 0; i < headers.length; i++) {
			row.createCell(i).setCellValue(headers[i]); // 写入表头
		}
		// 循环写入每一行
		for(int j=0;j<rs.size();j++){
			JSONObject js = rs.getJSONObject(j);
			row = sheet.createRow(rowIndex++);
			row.createCell(0).setCellValue(js.get("fleetName").toString());
			row.createCell(1).setCellValue(js.get("company").toString());
			row.createCell(2).setCellValue(js.get("plateNo").toString());
			row.createCell(3).setCellValue(js.get("driverName").toString());
			row.createCell(4).setCellValue(js.get("modelName").toString());
			row.createCell(5).setCellValue(js.get("vehicleOwner").toString());
			row.createCell(6).setCellValue(js.get("tel").toString());
			row.createCell(7).setCellValue(js.get("model").toString());
			row.createCell(8).setCellValue(js.get("ascription").toString());

		}
	}


	/**
	 * 导出司机excel信息
	 * @param rs
	 * @param wb
	 * @param headers
	 * @throws Exception
	 */
	public static void fillExcelDriver(JSONArray rs, Workbook wb, String[] headers) throws Exception {
		int rowIndex = 0; // 定义一个行索引
		Sheet sheet = wb.createSheet(); // 创建一个sheet
		Row row = sheet.createRow(rowIndex++); // 创建第一行
		for (int i = 0; i < headers.length; i++) {
			row.createCell(i).setCellValue(headers[i]); // 写入表头
		}
		// 循环写入每一行
		for(int j=0;j<rs.size();j++){
			JSONObject js = rs.getJSONObject(j);
			row = sheet.createRow(rowIndex++);
			row.createCell(0).setCellValue(js.get("fleetName").toString());
			row.createCell(1).setCellValue(js.get("company").toString());
			row.createCell(2).setCellValue(js.get("driverName").toString());
			row.createCell(3).setCellValue(js.get("statuesId").toString());
			row.createCell(4).setCellValue(js.get("sex").toString());
			row.createCell(5).setCellValue(js.get("driverType").toString());
			row.createCell(6).setCellValue(js.get("mobile").toString());
			row.createCell(7).setCellValue(js.get("address").toString());

		}
	}

	/**
	 * 导出乘客excel信息
	 * @param rs
	 * @param wb
	 * @param headers
	 * @throws Exception
	 */
	public static void fillExcelPassenger(JSONArray rs, Workbook wb, String[] headers) throws Exception {
		int rowIndex = 0; // 定义一个行索引
		Sheet sheet = wb.createSheet(); // 创建一个sheet
		Row row = sheet.createRow(rowIndex++); // 创建第一行
		for (int i = 0; i < headers.length; i++) {
			row.createCell(i).setCellValue(headers[i]); // 写入表头
		}
		// 循环写入每一行
		for(int j=0;j<rs.size();j++){
			JSONObject js = rs.getJSONObject(j);
			row = sheet.createRow(rowIndex++);
			row.createCell(0).setCellValue(js.get("fleetName").toString());
			row.createCell(1).setCellValue(js.get("company").toString());
			row.createCell(2).setCellValue(js.get("passengerName").toString());
			row.createCell(3).setCellValue(js.get("sex").toString());
			row.createCell(4).setCellValue(js.get("mobile").toString());
			row.createCell(5).setCellValue(js.get("address").toString());

		}
	}

	/**
	 * 利用模版导出数据 1.读入模版 2.读取模版 3.写入数据
	 * 
	 * @param rs
	 * @param templateFileName
	 * @return wb
	 * @throws Exception
	 */
	public static Workbook fillExcelDataByTemplate(ResultSet rs, String templateFileName) throws Exception {
		InputStream inp=ExcelUtil.class.getResourceAsStream("/com/asiainfo/template/"+templateFileName);
		POIFSFileSystem fs=new POIFSFileSystem(inp);
		Workbook wb = new HSSFWorkbook(fs);
		Sheet sheet=wb.getSheetAt(0);
		// 获取列数
		int cellNums=sheet.getRow(0).getLastCellNum();
		int rowIndex=1;
		while(rs.next()){
			Row row=sheet.createRow(rowIndex++);
			for(int i=0;i<cellNums;i++){
				row.createCell(i).setCellValue(rs.getObject(i+1).toString());
			}
		}
		ExcelExtractor ee = new ExcelExtractor((HSSFWorkbook) wb);
		System.out.println(ee.getText());
		return wb;
	}

	/**
	 * 设置格式
	 * @param hssfCell
	 * @return
	 */
	public static String formatCell(HSSFCell hssfCell) {
		if(hssfCell==null){
			return "";
		}else{
			if(hssfCell.getCellType()==HSSFCell.CELL_TYPE_BOOLEAN){
				return String.valueOf(hssfCell.getBooleanCellValue());
			}else if(hssfCell.getCellType()==HSSFCell.CELL_TYPE_NUMERIC){
				return String.valueOf(hssfCell.getNumericCellValue());
			}else{
				return String.valueOf(hssfCell.getStringCellValue());
			}
		}
	}
}
