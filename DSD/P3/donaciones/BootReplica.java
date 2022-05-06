import java.rmi.RemoteException;
import java.util.ArrayList;

public class BootReplica {
    public static void main(String[] args) {
        Replica replica = null;

        if (args.length != 1 && args.length != 0) {
            System.out.println("El uso del servidor es <BootReplica> [id]");
            System.exit(1);
        }

        try {
            if (args.length == 1) {
                replica = new Replica(Integer.valueOf(args[0]));
            } else {
                replica = new Replica(); // id automatico
            }
        } catch (RemoteException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        } catch (NumberFormatException e1) {
            System.out.println("El argumento debe ser un número");
            System.exit(1);
        }

        if (!replica.fuiCreadora) {
            try {
                replica.conectarReplicas();
            } catch (RemoteException e) {
                System.err.println("Error añadiendo replica");
            }

        }

        try {
            System.out.println(replica.identificarse());
        } catch (RemoteException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
