package config;

import java.io.Serializable;
import java.util.List;

public class HttpRpcPortConfig implements Serializable {
  private static final long serialVersionUID = 1L;

  public int node_rpc_port;
  public int node_http_fullNodePort;

  public HttpRpcPortConfig(int node_rpc_port, int node_http_fullNodePort) {
    this.node_rpc_port = node_rpc_port;
    this.node_http_fullNodePort = node_http_fullNodePort;
  }
}
