import java.rmi.Remote;
import java.rmi.RemoteException;

public interface IClienteServidor extends Remote {
    public int getId() throws RemoteException;

    /**
     * metodo para iniciar el registro del usuario
     */

    public Ireplica iniciarRegistro(String user, String passwd) throws RemoteException;

    /**
     * metodo para iniciar sesion
     */
    public Ireplica iniciarSesion(String user, String passwd) throws RemoteException;

    /**
     * metodo para que un usuario done dinero
     */
    public boolean donar(float cantidad) throws RemoteException;

    /**
     * Metodo para obtener el total de donaciones de todas las replicas
     * 
     * @return -1 si no se puede comprobar el total
     */

    public float getTotalGlobal() throws RemoteException;
}
