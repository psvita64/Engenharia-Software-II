package com.es2.objectpool;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ReusablePool {

    private static ReusablePool instance;

    private final List<HttpURLConnection> available;
    private final List<HttpURLConnection> inUse;

    private int maxPoolSize = 10;

    private ReusablePool() {
        available = new ArrayList<>();
        inUse = new ArrayList<>();
    }

    public static synchronized ReusablePool getInstance() {
        if (instance == null) {
            instance = new ReusablePool();
        }
        return instance;
    }

    public synchronized HttpURLConnection acquire()
            throws IOException, PoolExhaustedException {

        if (!available.isEmpty()) {
            HttpURLConnection conn = available.remove(0);
            inUse.add(conn);
            return conn;
        }

        if (inUse.size() < maxPoolSize) {
            URL url = new URL("https://www.ipv.pt");
            HttpURLConnection conn =
                    (HttpURLConnection) url.openConnection();
            inUse.add(conn);
            return conn;
        }

        throw new PoolExhaustedException();
    }

    public synchronized void release(HttpURLConnection conn)
            throws ObjectNotFoundException {

        if (!inUse.contains(conn)) {
            throw new ObjectNotFoundException();
        }

        inUse.remove(conn);
        available.add(conn);
    }

    public synchronized void resetPool() {
        available.clear();
        inUse.clear();
    }

    public synchronized void setMaxPoolSize(int size) {
        this.maxPoolSize = size;
    }
}