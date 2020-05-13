package config;

import java.io.Serializable;
import java.util.List;

public class ActiveConfig implements Serializable {
    private static final long serialVersionUID = 1L;

    public List<String> node_active;

    public ActiveConfig(List<String> node_active) {
        this.node_active = node_active;
    }
}
