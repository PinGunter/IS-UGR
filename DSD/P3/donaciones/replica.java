import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;

public class replica extends UnicastRemoteObject implements ireplica {

    private int id;
    private HashMap<String, Float> clientes;
    private float total;
    private ArrayList<String> nombreReplicas;
    private ArrayList<ireplica> replicas;

    replica(int id, ArrayList<String> replicas) throws RemoteException {
        this.id = id;
        total = 0;
        clientes = new HashMap<String, Float>();
        this.nombreReplicas = replicas;
        this.replicas = new ArrayList<ireplica>();
        for (String nombre : nombreReplicas){
            this.replicas.add(getReplica(nombre));
        }
    }

    @Override
    public int getNumClientes() throws RemoteException {
        return clientes.size();
    }

    @Override
    public float getTotal() throws RemoteException {
        return total;
    }

    @Override
    public boolean usuarioRegistrado(String user) throws RemoteException {
        return clientes.containsKey(user);
    }

    @Override
    public void registrarUsuario(String user) throws RemoteException {
        // Comprobar que exista en esta replica, sino, buscarlo en el resto
        // Si no existe en ninguna replica, se registra en la primera libre
        if (!usuarioRegistrado(user)) {
            ireplica replicaUser = buscarUsuario(user);
            if (replicaUser == null) { // es decir, que no haya ninguna replica donde este registrado
                ireplica replicaDisponible = getReplicaDisponible();
                replicaDisponible.registrarUsuario(user);
            }
        }
    }

    @Override
    public void donar(String user, float cantidad) throws RemoteException {
        clientes.put(user, clientes.get(user) + cantidad);
        total += cantidad;
    }

    @Override
    public ireplica getReplicaDisponible() throws RemoteException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ireplica getReplica(int id) throws RemoteException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ireplica buscarUsuario(String user) throws RemoteException {
        for (ireplica rep : replicas){
            if (rep.usuarioRegistrado(user)){
                return rep;
            }
        }
        return null;
    }

    @Override
    public ireplica getReplica(String nombre) throws RemoteException {
        // TODO Auto-generated method stub
        return null;
    }

}
