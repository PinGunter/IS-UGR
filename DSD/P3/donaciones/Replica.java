import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;

public class Replica extends UnicastRemoteObject implements Ireplica {

    private int id;
    private HashMap<String, Float> clientes;
    private float total;
    private ArrayList<String> nombreReplicas;
    private ArrayList<Ireplica> replicas;
    static Registry registro = null;

    Replica(int id, ArrayList<String> replicas) throws RemoteException {
        this.id = id;
        total = 0;
        clientes = new HashMap<String, Float>();
        this.nombreReplicas = replicas;
        this.replicas = new ArrayList<Ireplica>();
        for (String nombre : nombreReplicas) {
            this.replicas.add(getReplica(nombre));
        }

        if (Replica.registro == null){
            try{
                Replica.registro = LocateRegistry.createRegistry(1099);
                Naming.rebind("replica"+id, this);
            } catch (RemoteException | MalformedURLException e) {
                System.out.println("Exception: " + e.getMessage());
            }
        } else{
            try {
                Naming.rebind("replica"+id, this);
            } catch (RemoteException | MalformedURLException e) {
                System.out.println("Exception: " + e.getMessage());
            }
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
    public void iniciarRegistro(String user) throws RemoteException {
        // Comprobar que exista en esta replica, sino, buscarlo en el resto
        // Si no existe en ninguna replica, se registra en la primera libre
        if (!usuarioRegistrado(user)) {
            Ireplica replicaUser = buscarUsuario(user);
            if (replicaUser == null) { // es decir, que no haya ninguna replica donde este registrado
                Ireplica replicaDisponible = getReplicaDisponible();
                replicaDisponible.registrarUsuario(user);
            }
        }
    }

    @Override
    public void registrarUsuario(String user) throws RemoteException {
        this.clientes.put(user, 0f);
    }

    @Override
    public void donar(String user, float cantidad) throws RemoteException {
        clientes.put(user, clientes.get(user) + cantidad);
        total += cantidad;
    }

    @Override
    public Ireplica getReplicaDisponible() throws RemoteException {
        Ireplica minima = this;
        for (Ireplica replica : replicas) {
            if (replica.getNumClientes() < minima.getNumClientes()) {
                minima = replica;
            }
        }
        return minima;
    }

    @Override
    public Ireplica getReplica(int id) throws RemoteException {
        for (Ireplica replica : replicas) {
            if (replica.getId() == id) {
                return replica;
            }
        }
        return null;
    }

    @Override
    public Ireplica buscarUsuario(String user) throws RemoteException {
        for (Ireplica rep : replicas) {
            if (rep.usuarioRegistrado(user)) {
                return rep;
            }
        }
        return null;
    }

    @Override
    public Ireplica getReplica(String nombre) throws RemoteException {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean identificarUsuario(String user) throws RemoteException {
        if (this.usuarioRegistrado(user)) {

        }
        return true;
    }

    @Override
    public int getId() throws RemoteException {
        return id;
    }

}
