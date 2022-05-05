import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class cliente {
    public static void main(String[] args) {
        String user;
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try{
            Registry registro = LocateRegistry.getRegistry("localhost", 1099);
            // Replica replica = (Replica) registro.lookup("replica1");

            System.out.println("Introduce el usuario: ");
            Scanner scanner = new Scanner(System.in);
            user = scanner.nextLine();
        } catch (RemoteException e){
            System.err.println("Exception: " + e.getMessage());
        }

    }
}
