from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

transport = TSocket.TSocket("localhost", 9090)
transport = TTransport.TBufferedTransport(transport)
protocol = TBinaryProtocol.TBinaryProtocol(transport)

client = Calculadora.Client(protocol)

transport.open()

print("hacemos ping al server")
client.ping()

resultado = client.suma(1, 1)
print("1 + 1 = " + str(resultado))
resultado = client.resta(1, 1)
print("1 - 1 = " + str(resultado))
resultado = client.multiplicacion(3, 4)
print("3 * 4 = ", resultado)
resultado = client.divisionEntera(3,4)
print("3 // 4 = ", resultado)
resultado = client.division(3,4)
print("3 / 4 = ", resultado)

transport.close()
