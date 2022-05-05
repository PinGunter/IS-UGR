import java.rmi.NotBoundException;
import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.server.RemoteServer;

public interface Ireplica extends Remote {
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
     * metodo para iniciar el registro del usuario
     */

    public void iniciarRegistro(String user) throws RemoteException;

    /**
     * metodo para registrar un usuario en la replica
     */
    public void registrarUsuario(String user) throws RemoteException;

    /**
     * metodo para identificar a un usuario
     */

    public boolean identificarUsuario(String user) throws RemoteException;

    /**
     * metodo para que un usuario done dinero
     */
    public void donar(String user, float cantidad) throws RemoteException;

    /**
     * metodo para obtener la primera replica libre
     */
    public Ireplica getReplicaDisponible() throws RemoteException;

    /**
     * metodo para encontrar una replica por su id
     */
    public Ireplica getReplica(int id) throws RemoteException;

    /**
     * metodo para buscar un usuario entre las replicas
     */
    public Ireplica buscarUsuario(String user) throws RemoteException;

    /**
     * metodo para obtener la replica en funcion del nombre
     * @throws NotBoundException
     */
    public Ireplica getReplica(String nombre) throws RemoteException, NotBoundException;

    /**
     * metodo para obtener el id de la replica
     */
    public int getId() throws RemoteException;

    /**
     * toString
     */
    public String getStringReplicas() throws RemoteException;

    /**
     * metodo para saber si tenemos una replica
    */
    public boolean tieneReplica(String nombreReplica) throws RemoteException;

    /**
     * Metodo para añadir una replica
     */
    public void addReplica(String nombreReplica) throws RemoteException;

    /**
     * metodo para identificarse
     */

     public String identificarse() throws RemoteException;

}
