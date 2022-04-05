$:.push('gen-rb')
$:.unshift '../../lib/rb/lib'

require 'thrift'

require 'calculadora'

begin
  port = 9090

  transport = Thrift::BufferedTransport.new(Thrift::Socket.new('localhost', port))
  protocol = Thrift::BinaryProtocol.new(transport)
  client = Calculadora::Client.new(protocol)

  transport.open()

  client.ping()
  print "ping()\n"

  if ARGV.length != 3
    puts "Se necesita indicar numeros y operador con la sintaxis: programa <num1> <operador> <num2>"
    puts "Los operadores disponibles son:"
    puts "+ Sumar"
    puts "- Restar"
    puts "x Producto"
    puts "/ Division"
    exit -1
  end 

  num1 = ARGV[0].to_f
  operador = ARGV[1].to_s
  num2 = ARGV[2].to_f
  res = nil
  case operador
  when "+"
    res = client.suma num1, num2
  when "-"
    res = client.resta num1, num2
  when "x"
    res = client.multiplicacion num1, num2
  when "/"
    res = client.division num1, num2

  else
    puts "Operador no valido"
    exit -1
  end


  puts "Resultado de la operación"
  puts "#{num1} #{operador} #{num2} = #{res}"

  transport.close()

rescue Thrift::Exception => tx
  print 'Thrift::Exception: ', tx.message, "\n"
end
