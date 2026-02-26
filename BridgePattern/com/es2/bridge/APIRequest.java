package com.es2.bridge;

import java.util.HashMap;

public class APIRequest {

    protected HashMap<String, APIServiceInterface> services;

    public APIRequest() {
        this.services = new HashMap<>();
    }

    public String addService(APIServiceInterface service) {
        String key = String.valueOf(services.size());
        services.put(key, service);
        return key;
    }

    public String getContent(String serviceId, String contentId) throws ServiceNotFoundException {
        APIServiceInterface api = services.get(serviceId);
        if (api == null) {
            throw new ServiceNotFoundException();
        }
        return api.getContent(contentId);
    }

    public String setContent(String serviceId, String content) throws ServiceNotFoundException {
        APIServiceInterface api = services.get(serviceId);
        if (api == null) {
            throw new ServiceNotFoundException();
        }
        return api.setContent(content);
    }
}