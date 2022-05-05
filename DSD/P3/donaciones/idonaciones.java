import java.rmi.RemoteException;

/**
 * Interfaz que habilita las donaciones del sistema
 */

public interface idonaciones extends Remote{
    /**
     * Metodo que permite realizar una donacion
     */
    public void donar(float cantidad) throws RemoteException;

    /**
     * Metodo que permite obtener el total de donaciones
     * */
    public float getTotal() throws RemoteException;
    
}
