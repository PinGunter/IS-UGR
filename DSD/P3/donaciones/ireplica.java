import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ireplica extends Remote {
    /**
     * Metodo para obtener el número de clientes registrados
     */
    public int getNumClientes() throws RemoteException;

    /**
     * Metodo para obtener el total de donaciones
     */
    public float getTotal() throws RemoteException;

    /**
     * Metodo para comprobar si un usuario existe en la replica
     */

    public boolean usuarioRegistrado(String user) throws RemoteException;


    /**
     * metodo para registrar un usuario en la replica
     */
    public void registrarUsuario(String user) throws RemoteException;

    /**
     * metodo para que un usuario done dinero
     */
    public void donar(String user, float cantidad) throws RemoteException;

    /**
     * metodo para obtener la primera replica libre
     */
    public ireplica getReplicaDisponible() throws RemoteException;

    /**
     * metodo para encontrar una replica por su id
     */
    public ireplica getReplica(int id) throws RemoteException;

    /**
     * metodo para buscar un usuario entre las replicas
     */
    public ireplica buscarUsuario(String user) throws RemoteException;

    /**
     * metodo para obtener la replica en funcion del nombre
     */
    public ireplica getReplica(String nombre) throws RemoteException;


}
