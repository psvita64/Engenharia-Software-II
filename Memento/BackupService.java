package com.es2.memento;

import java.util.ArrayList;

public class BackupService {
    Server server;
    ArrayList<Memento> mementos;

    public BackupService(Server server) {
        this.server = server;
        mementos = new ArrayList<Memento>();
    }

    public void restoreSnapshot(int snapshotNumber) throws NotExistingSnapshotException{
        if(snapshotNumber >= mementos.size() || snapshotNumber < 0){
            throw new NotExistingSnapshotException("Snapshot não existente");
        }
        Memento memento = mementos.get(snapshotNumber);
        server.restore(memento);
    }

    public void takeSnapshot(){
        mementos.add(server.backup());
    }
}
