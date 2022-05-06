import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class cliente {
    public static void main(String[] args) {
        String user, passwd;
        boolean sesionCorrecta = false;
        Replica replicaOriginal = null;
        Scanner scanner = new Scanner(System.in);
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try{
            Registry registro = LocateRegistry.getRegistry("localhost", 1099);
            System.out.println("Introduce la replica a la que quiere conectarse: ");
            String [] replicas = registro.list();
            for (int i = 0; i < replicas.length; i++) {
                System.out.println(i + " - " + replicas[i]);
            }
            int replica = scanner.nextInt();
            System.out.println("Conectando a replica...");
            Replica r = (Replica) registro.lookup(replicas[replica]);
            replicaOriginal = (Replica) registro.lookup(replicas[replica]);
            System.out.println("Conectado a replica " + r.getId());
            boolean salir = false;
            do{
                System.out.println("Selecciona la acción a realizar: ");
                System.out.println("1 - Registrarse");
                System.out.println("2 - Iniciar Sesión");
                System.out.println("3 - Donar");
                System.out.println("4 - Consultar el total de donaciones");
                System.out.println("5 - Salir");
                int opcion = scanner.nextInt();
                salir = opcion == 5;
                if (!salir){
                    switch (opcion){
                        case 1:
                            System.out.println("Introduce el usuario a registrar");
                            user = scanner.nextLine();
                            System.out.println("Introduce la contraseña");
                            passwd = scanner.nextLine();
                            r = (Replica) r.iniciarRegistro(user, passwd);
                            if (r != null){
                                System.out.println("Registrado correctamente en la replica " + r.getId());
                            } else {
                                System.out.println("Error al registrar, usuario ya registrado");
                                r = replicaOriginal;
                            }
                            break;
                        case 2: 
                            System.out.println("Introduce el usuario de inicio de sesión");
                            user = scanner.nextLine();
                            System.out.println("Introduce la contraseña");
                            passwd = scanner.nextLine();
                            r = (Replica) r.iniciarSesion(user, passwd);
                            if (r != null){
                                System.out.println("Inicio de sesión correcto");
                                sesionCorrecta = true;
                            } else{
                                System.out.println("Error al iniciar sesión. Usuario o contraseña incorrectos o no registrado");
                                r = replicaOriginal;
                            }
                            break;

                        case 3:
                            if (sesionCorrecta){
                                System.out.println("Introduce la cantidad a donar");
                                float cantidad = scanner.nextFloat();

                            } else{
                                System.out.println("No has iniciado sesión");
                            }


                    }
                }
            } while(!salir);
        } catch (RemoteException | NotBoundException e){
            System.err.println("Exception: " + e.getMessage());
        }

    }
}
