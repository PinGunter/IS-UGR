import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;

public class Replica extends UnicastRemoteObject implements Ireplica {

    private int id;
    private HashMap<String, String> clientes;
    private HashMap<String, Float> donacionesClientes;
    private float total;
    private ArrayList<String> nombreReplicas;
    private ArrayList<Ireplica> replicas;
    private Registry registro = null;
    public boolean fuiCreadora = false;
    private String clienteActual;

    Replica(int id) throws RemoteException {
        this.id = id;
        clienteActual = "";
        total = 0;
        clientes = new HashMap<String, String>();
        donacionesClientes = new HashMap<String, Float>();
        this.nombreReplicas = new ArrayList<String>();
        this.replicas = new ArrayList<Ireplica>();

        try {
            registro = LocateRegistry.createRegistry(1099);
            Naming.rebind("replica" + id, this);
            fuiCreadora = true;
        } catch (RemoteException | MalformedURLException e) {
            registro = LocateRegistry.getRegistry(1099);
            try {
                Naming.rebind("replica" + id, this);
            } catch (MalformedURLException e1) {
                System.err.println("Error creando replica");
            }
        }

    }

    @Override
    public String getStringReplicas() {
        String info = "Mis réplicas son: \n[";
        for (Ireplica replica : replicas) {
            if (replica != null) {
                try {
                    info += String.valueOf(replica.getId()) + ", ";
                } catch (RemoteException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
        info += "]";
        return info;
    }

    @Override
    public int getNumClientes() throws RemoteException {
        return donacionesClientes.size();
    }

    @Override
    public float getTotal() throws RemoteException {
        return total;
    }

    @Override
    public float getTotalGlobal() throws RemoteException {
        float suma = -1;
        if (puedeComprobarTotal()) { 
            suma = total;
            for (Ireplica replica : replicas) {
                if (replica != null) {
                    try {
                        suma += replica.getTotal();
                    } catch (RemoteException e) {
                        // TODO Auto-generated catch block
                        e.printStackTrace();
                    }
                }
            }
        }
        return suma;
    }

    @Override
    public boolean usuarioRegistrado(String user) throws RemoteException {
        return clientes.containsKey(user);
    }

    @Override
    public Ireplica iniciarRegistro(String user, String passwd) throws RemoteException {
        // Comprobar que exista en esta replica, sino, buscarlo en el resto
        // Si no existe en ninguna replica, se registra en la primera libre
        Ireplica replicaUser = null;
        if (!usuarioRegistrado(user)) {
            replicaUser = buscarUsuario(user);
            if (replicaUser == null) { // es decir, que no haya ninguna replica donde este registrado
                Ireplica replicaDisponible = getReplicaDisponible();
                System.out.println("El usuario no esta registrado, registrando en replica " + replicaDisponible.getId());
                replicaDisponible.registrarUsuario(user, passwd);
                replicaUser = replicaDisponible;
            } else { // si existe en otra replica, hay error
                replicaUser = null;
            }
        }
        return replicaUser;
    }

    @Override
    public void registrarUsuario(String user, String passwd) throws RemoteException {
        this.clientes.put(user, passwd);
        this.donacionesClientes.put(user, 0f);
        System.out.println("Registrado usuario " + user);
    }

    @Override
    public boolean donar(float cantidad) throws RemoteException {
        if (cantidad > 0f){
            donacionesClientes.put(clienteActual, donacionesClientes.get(clienteActual) + cantidad);
            total += cantidad;
            System.out.println("El usuario " + clienteActual + " ha donado " + cantidad + "€");
            return true;
        }
        return false;
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
        Ireplica r;
        try {
            r = (Ireplica) registro.lookup(nombre);
        } catch (Exception e) {
            r = null;
        }
        return r;
    }

    @Override
    public Ireplica iniciarSesion(String user, String passwd) throws RemoteException {
        Ireplica replicaUser = null;

        if (usuarioRegistrado(user)) {
            if (identificarUsuario(user, passwd)) {
                replicaUser = this;
            } else {
                replicaUser = null;
            }
        } else {
            replicaUser = buscarUsuario(user);
            System.out.println("El usuario no esta registrado en esta replica, redirigiendo a "  + (replicaUser == null ? "ninguna" : "replica " + replicaUser.getId()));
            if (replicaUser != null) {
                if (!replicaUser.identificarUsuario(user, passwd)) {
                    replicaUser = null;
                }
            }
        }

        return replicaUser;
    }

    @Override
    public boolean identificarUsuario(String user, String passwd) throws RemoteException {
        if (clientes.get(user).equals(passwd)) {
            clienteActual = user;
            System.out.println("El usuario " + clienteActual + " ha iniciado sesión");
            return true;
        }
        return false;
    }

    @Override
    public int getId() throws RemoteException {
        return id;
    }

    @Override
    public void addReplica(String nombreReplica) throws RemoteException {
        Ireplica r = getReplica(nombreReplica);
        if (!nombreReplicas.contains(nombreReplica) && !("replica" + id).equals(nombreReplica)) {
            nombreReplicas.add(nombreReplica);
            replicas.add(r);
            System.out.println("Nueva replica añadida: " + r.getId());
            System.out.println(getStringReplicas());

            if (!r.tieneReplica("replica" + id) && !("replica" + id).equals(nombreReplica)) {
                System.out.println("Auto-añadiendome a la replica anterior...");
                r.addReplica("replica" + id);
            }

            System.out.println("Propagando nueva replicas a las anteriores...");
            for (Ireplica replica : replicas) {
                replica.addReplica(nombreReplica);
            }
        }
    }

    @Override
    public boolean tieneReplica(String nombreReplica) throws RemoteException {
        return nombreReplicas.contains(nombreReplica);
    }

    @Override
    public String identificarse() throws RemoteException {
        String info = "Soy réplica " + id + " y tengo " + donacionesClientes.size() + " clientes\n";
        info += getStringReplicas();
        return info;
    }

    @Override
    public boolean puedeComprobarTotal() throws RemoteException {
        return donacionesClientes.get(clienteActual) > 0f;
    }

}
