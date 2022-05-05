import java.rmi.RemoteException;
import java.util.ArrayList;

public class BootReplica {
    public static void main(String[] args) {
        Replica replica = null;
        try {
            replica = new Replica(Integer.valueOf(args[0]));
        } catch (RemoteException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        if (!replica.fuiCreadora && args.length == 2) {
            try {
                replica.addReplica(args[1]);
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
