package com.fgwater.core.utils;

import com.bolang.carnetworking.location.LocationHostConfig;
import com.bolang.carnetworking.location.LocationUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.extractor.ExcelExtractor;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.sql.ResultSet;

public  class GetLocationUtil {



	public   static LocationUtil getLocationUtil(){


		LocationHostConfig locationHostConfig = new LocationHostConfig();

		locationHostConfig.setHost("222.79.247.26");
		locationHostConfig.setPort("5813");

		LocationUtil locationUtil = new LocationUtil();
		locationUtil.setLocationHostConfig(locationHostConfig);
		return  locationUtil;
	}


}
