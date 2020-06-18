package config;

import java.io.Serializable;

public class ListenPortConfig implements Serializable {
    private static final long serialVersionUID = 1L;

    public ListenPortConfig(int node_listen_port) {
        this.node_listen_port = node_listen_port;
    }
    public int node_listen_port;
}
