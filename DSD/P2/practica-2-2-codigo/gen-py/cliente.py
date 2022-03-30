from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

import sys

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)

transport.open()

print("hacemos ping al server")
client.ping()

def imprimirAyuda():
    ayuda = '''
La ejecución del programa básico consiste en <programa> <num1> <operador> <num2>
Los operadores disponibles son:
    1. + para la suma
    2. - para la resta
    3. * para el producto
    4. / para la división decimal
    5. // para la división entera
    6. % para el módulo
Se recomienda encerrar el operador entre "" para que no haya problemas

Si quiere usar la versión avanzada use <programa>  -a 
        '''
    print(ayuda)

def leerVector():
    n = int(input("Introduce la dimensión del vector:"))
    vector = []
    print("Introduce los valores del vector (separados por un salto de línea):")
    for i in range(n):
        vector.append(float(input()))
    return vector

def leerVectores(predef=-1):
    if predef == -1:
        n = int(input("Introduce la dimensión de los vectores: "))
    else:
        n = predef
        print("Introduciendo vectores de dimension ", n)
    v1 = []
    v2 = []
    print("Introduce los valores del primer vector (separados por un salto de línea):")
    for i in range(n):
        v1.append(float(input()))

    print("Introduce los valores del segundo vector (separados por un salto de línea):")
    for i in range(n):
        v2.append(float(input()))
    return v1,v2

if len(sys.argv) != 4 and not(len(sys.argv) == 2 and sys.argv[1] == "-a"):
    imprimirAyuda()
    exit(-1)

if len(sys.argv) == 2:
    modoAvanzado = True
else:
    modoAvanzado = False

if not modoAvanzado:
    num1 = int(sys.argv[1])
    num2 = int(sys.argv[3])
    operador = sys.argv[2]

    operadorValido = True
    resultado = 0
    if operador == "+":
        resultado = client.suma(num1,num2)
    elif operador == "-":
        resultado = client.resta(num1,num2)
    elif operador == "*":
        resultado = client.multiplicacion(num1,num2)
    elif operador == "/":
        resultado = client.division(num1,num2)
    elif operador == "//":
        resultado = client.divisionEntera(num1,num2)
    elif operador == "%":
        resultado = client.modulo(num1,num2)
    else:
        operadorValido = False

    print("Resultado")
    print("{} {} {} = {}".format(num1, operador, num2, resultado))

    if not operadorValido:
        print("Error. Operador no válido.")
        imprimirAyuda()
        exit(-1)
else:
    ## Modo avanzado: se pregunta al usuario por vectores y/o matrices
    print("En este modo se utilizan operaciones con vectores y matrices")
    print("Operaciones disponibles:")
    print('''
    1. Suma de vectores
    2. Resta de vectores
    3. Producto escalar
    4. Producto vectorial
    ''')
    operacion = int(input("Introduce un número [1-4] para seleccionar la operación\n"))
    if operacion >= 1 and operacion <= 4:
        res = []
        if operacion == 1:
            v1, v2 = leerVectores()
            res = client.sumaVectores(v1,v2)
        elif operacion == 2:
            v1, v2 = leerVectores()
            res = client.restaVectores(v1,v2)
        elif operacion == 3:
            v1 = leerVector()
            num = float(input("Introduce el escalar: "))
            res = client.productoEscalar(v1,num)
        elif operacion == 4:
            v1, v2 = leerVectores(3)
            res = client.productoVectorial(v1,v2)


    print("El resultado de la operación es", res)
transport.close()
