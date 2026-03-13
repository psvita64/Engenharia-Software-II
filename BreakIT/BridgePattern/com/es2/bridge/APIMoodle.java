package com.es2.bridge;

import java.util.LinkedHashMap;
import java.util.Objects;

public class APIMoodle implements APIServiceInterface {

    protected LinkedHashMap<String, String> content;

    public APIMoodle() {
        this.content = new LinkedHashMap<>();
    }

    @Override
    public String getContent(String contentId) {
        if ("0".equals(contentId)) {
            StringBuilder sb = new StringBuilder();
            for (String value : content.values()) {
                sb.append(value);
            }
            return sb.toString();
        } else {
            return content.get(contentId);
        }
    }

    @Override
    public String setContent(String contentVal) {
        String key = String.valueOf(content.size());
        content.put(key, contentVal);
        return key;
    }
}