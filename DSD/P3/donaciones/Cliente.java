import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.Scanner;

public class Cliente {
    public static void main(String[] args) {
        String user, passwd;
        boolean sesionCorrecta = false;
        Ireplica replicaOriginal = null;
        Scanner scanner = new Scanner(System.in);
        if (System.getSecurityManager() == null) {
            System.setSecurityManager(new SecurityManager());
        }
        try {
            Registry registro = LocateRegistry.getRegistry(1099);
            System.out.println("Introduce la replica a la que quiere conectarse: ");
            String[] replicas = registro.list();
            boolean replicaValida = false;
            int replica = 0;
            while (!replicaValida) {
                for (int i = 0; i < replicas.length; i++) {
                    System.out.println(i + " - " + replicas[i]);
                }
                replica = scanner.nextInt();
                if (replica >= 0 && replica < replicas.length) {
                    replicaValida = true;
                } else {
                    System.out.println("Introduce una replica valida");
                }
            }

            System.out.println("Conectando a replica...");
            Ireplica r = (Ireplica) registro.lookup(replicas[replica]);
            replicaOriginal = (Ireplica) registro.lookup(replicas[replica]);
            System.out.println("Conectado a replica " + r.getId());
            boolean salir = false;
            do {
                System.out.println("Selecciona la acción a realizar: ");
                System.out.println("1 - Registrarse");
                System.out.println("2 - Iniciar Sesión");
                System.out.println("3 - Salir");
                int opcion = scanner.nextInt();
                scanner.nextLine();
                if (!salir) {
                    switch (opcion) {
                        case 1:
                            System.out.println("Introduce el usuario a registrar");
                            user = scanner.nextLine();
                            System.out.println("Introduce la contraseña");
                            passwd = scanner.nextLine();
                            r = (Ireplica) ((IClienteServidor) r).iniciarRegistro(user, passwd);
                            if (r != null) {
                                System.out.println("Registrado correctamente");
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
                            r = (Ireplica) ((IClienteServidor) r).iniciarSesion(user, passwd);
                            if (r != null) {
                                System.out.println("Inicio de sesión correcto");
                                sesionCorrecta = true;
                            } else {
                                System.out.println(
                                        "Error al iniciar sesión. Usuario o contraseña incorrectos o no registrado");
                                r = replicaOriginal;
                            }
                            break;

                        case 3:
                            salir = true;
                            System.out.println("Hasta la proxima!");
                            break;
                        default:
                            System.out.println("Opción incorrecta");
                            break;
                    }

                    while (sesionCorrecta) {
                        System.out.println("1 - Donar");
                        System.out.println("2 - Consultar el total de donaciones");
                        System.out.println("3 - Cerrar Sesión");
                        int opcion2 = scanner.nextInt();
                        scanner.nextLine();
                        switch (opcion2) {
                            case 1:
                                if (sesionCorrecta) {
                                    System.out.println("Introduce la cantidad a donar");
                                    float cantidad = scanner.nextFloat();
                                    scanner.nextLine();
                                    if (((IClienteServidor)r).donar(cantidad)) {
                                        System.out.println("Se han donado " + cantidad + " a la causa humanitaria");
                                    } else {
                                        System.out.println("Error al donar: las donaciones no pueden ser negativas");
                                    }
                                } else {
                                    System.out.println("No has iniciado sesión");
                                }
                                break;
                            case 2:
                                if (sesionCorrecta) {
                                    float total = ((IClienteServidor)r).getTotalGlobal();
                                    if (total != -1) {
                                        System.out.println("El total de donaciones es " + total);
                                    } else {
                                        System.out.println("No se puede comprobar el total hasta que se done primero");
                                    }
                                } else {
                                    System.out.println("No has iniciado sesión");
                                }
                                break;
                            case 3:
                                sesionCorrecta = false;
                                r = replicaOriginal;
                                break;
                            default:
                                System.out.println("Opción incorrecta");
                                break;
                        }
                    }
                }
            } while (!salir);
        } catch (RemoteException |

                NotBoundException e) {
            System.err.println("Exception: " + e.getMessage());
        }

    }
}
