package com.es2.bridge;

import java.util.HashMap;

public class APIRequestContentAggregator extends APIRequest {

    public APIRequestContentAggregator() {
        super();
    }

    @Override
    public String getContent(String serviceId, String contentId) throws ServiceNotFoundException {
        APIServiceInterface api = services.get(serviceId);
        if (api == null) {
            throw new ServiceNotFoundException();
        }
        return api.getContent("0");
    }
}