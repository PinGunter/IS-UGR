import glob
import sys

from calculadora import Calculadora

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG)


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("me han hecho ping()")

    def suma(self, n1, n2):
        print("sumando " + str(n1) + " con " + str(n2))
        return n1 + n2

    def resta(self, n1, n2):
        print("restando " + str(n1) + " con " + str(n2))
        return n1 - n2
    
    def multiplicacion(self, n1, n2):
        print("multiplicando " + str(n1) + " con " +  str(n2))
        return n1 * n2  

    def divisionEntera(self, n1, n2):
        print("división entera entre " + str(n1) +  " y " +  str(n2))
        return n1 // n2
    
    def division(self, n1, n2):
        print("división (con decimales) entre " + str(n1) +  " y " +  str(n2))
        return n1 / n2

    def modulo(self, n1, n2):
        print("modulo entre {} y {}".format(n1,n2))
        return n1 % n2

    def sumaVectores(self, v1, v2):
        print("sumando", v1, "con", v2)
        vRes = v1
        for i in range(len(v2)):
            if i < len(vRes):
                vRes[i] += v2[i]
            else:
                vRes.append(v2[i])
        return vRes

    def restaVectores(self, v1, v2):
        print("restando", v1, "con", v2)
        vRes = v1
        for i in range(len(v2)):
            if i < len(vRes):
                vRes[i] -= v2[i]
            else:
                vRes.append(-v2[i])
        return vRes

    def productoVectorial(self, v1, v2):
        print("producto vectorial de ", v1, "y", v2)
        vRes = [-1,-1,-1]
        vRes[0] = v1[1]*v2[2] - v1[2]*v2[1]
        vRes[1] = v1[2]*v2[0] - v1[0]*v2[2]
        vRes[2] = v1[0]*v2[1] - v1[1]*v2[0]
        return vRes
    
    def productoEscalar(self, v1, num2):
        print("producto escalar de ", v1, "y", num2)
        vRes = []
        for i in v1:
            vRes.append(i*num2)
        return vRes

    def determinante(self, matriz):
        print("determinante de matriz")
        if len(matriz) == 1:
            return matriz[0]
        elif len(matriz) == 4:
            return matriz[0]*matriz[3] - matriz[1]*matriz[2]
        elif len(matriz) == 9:
            res =  matriz[0]*matriz[4]*matriz[8] + matriz[3]*matriz[7]*matriz[2] + matriz[1]*matriz[5]*matriz[6]
            res += -matriz[2]*matriz[4]*matriz[6] - matriz[1]*matriz[3]*matriz[8] - matriz[0]*matriz[5]*matriz[7]
            return res
            

if __name__ == "__main__":
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")
