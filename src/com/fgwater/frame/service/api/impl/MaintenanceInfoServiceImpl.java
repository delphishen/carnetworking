package com.fgwater.frame.service.api.impl;

import com.fgwater.core.service.impl.BaseServiceImpl;
import com.fgwater.core.utils.StrUtils;
import com.fgwater.core.utils.UUIDUtils;
import com.fgwater.frame.mapper.api.MaintenanceInfoMapper;
import com.fgwater.frame.mapper.system.AttachMapper;
import com.fgwater.frame.model.api.MaintenanceInfo;
import com.fgwater.frame.model.system.Attach;
import com.fgwater.frame.model.system.Employee;
import com.fgwater.frame.service.api.MaintenanceInfoService;
import com.fgwater.frame.service.system.AttachService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.util.List;
import java.util.Map;

@Service("maintenanceInfoService")
public class MaintenanceInfoServiceImpl extends BaseServiceImpl implements MaintenanceInfoService {

	@Resource
	private MaintenanceInfoMapper maintenanceInfoMapper;


    @Override
    public boolean saveOrUpdate(MaintenanceInfo maintenanceInfo) {

        int count = 0;

        if (StrUtils.isNullOrEmpty(maintenanceInfo.getId())){
            maintenanceInfo.setId(UUIDUtils.getUUID());
            maintenanceInfoMapper.insert(maintenanceInfo);
        }else {
            maintenanceInfoMapper.updatemodel(maintenanceInfo);
        }
         return  count == 0;
    }

    @Override
    public List<Map<String, String>> query(Map<String, String> params) {
        return maintenanceInfoMapper.query(params);
    }

    @Override
    public void delete(List<MaintenanceInfo> maintenanceInfos) {

        for (MaintenanceInfo maintenanceInfo : maintenanceInfos) {
            this.maintenanceInfoMapper.deletePhysical(maintenanceInfo);
        }
    }


}
