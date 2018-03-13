package com.fgwater.core.model;

import java.text.SimpleDateFormat;
import java.sql.Date;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
import java.security.Timestamp;

public   class JsonDateValueProcessor implements JsonValueProcessor {

    // 定义转换日期类型的输出格式
    private String format = "yyyy-MM-dd HH:mm:ss";

    public JsonDateValueProcessor() {

    }

    public JsonDateValueProcessor(String format) {
        this.format = format;
    }

    @Override
    public Object processArrayValue(Object arg0, JsonConfig arg1) {
        return process(arg0);
    }

    private Object process(Object arg0) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(arg0);
    }

    @Override
    public Object processObjectValue(String key, Object value,
                                     JsonConfig jsonConfig) {
        if (value instanceof Timestamp) {
            String str = new SimpleDateFormat(format).format((Timestamp) value);
            return str;
        }
        if (null != value) {
            return value.toString();
        }
        return "";
    }
}
