#
# Autogenerated by Thrift Compiler (0.13.0)
#
# DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
#

require 'thrift'
require 'calculadora_types'

module Calculadora
  class Client
    include ::Thrift::Client

    def ping()
      send_ping()
      recv_ping()
    end

    def send_ping()
      send_message('ping', Ping_args)
    end

    def recv_ping()
      result = receive_message(Ping_result)
      return
    end

    def suma(num1, num2)
      send_suma(num1, num2)
      return recv_suma()
    end

    def send_suma(num1, num2)
      send_message('suma', Suma_args, :num1 => num1, :num2 => num2)
    end

    def recv_suma()
      result = receive_message(Suma_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'suma failed: unknown result')
    end

    def resta(num1, num2)
      send_resta(num1, num2)
      return recv_resta()
    end

    def send_resta(num1, num2)
      send_message('resta', Resta_args, :num1 => num1, :num2 => num2)
    end

    def recv_resta()
      result = receive_message(Resta_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'resta failed: unknown result')
    end

    def multiplicacion(num1, num2)
      send_multiplicacion(num1, num2)
      return recv_multiplicacion()
    end

    def send_multiplicacion(num1, num2)
      send_message('multiplicacion', Multiplicacion_args, :num1 => num1, :num2 => num2)
    end

    def recv_multiplicacion()
      result = receive_message(Multiplicacion_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'multiplicacion failed: unknown result')
    end

    def divisionEntera(num1, num2)
      send_divisionEntera(num1, num2)
      return recv_divisionEntera()
    end

    def send_divisionEntera(num1, num2)
      send_message('divisionEntera', DivisionEntera_args, :num1 => num1, :num2 => num2)
    end

    def recv_divisionEntera()
      result = receive_message(DivisionEntera_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'divisionEntera failed: unknown result')
    end

    def division(num1, num2)
      send_division(num1, num2)
      return recv_division()
    end

    def send_division(num1, num2)
      send_message('division', Division_args, :num1 => num1, :num2 => num2)
    end

    def recv_division()
      result = receive_message(Division_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'division failed: unknown result')
    end

    def modulo(num1, num2)
      send_modulo(num1, num2)
      return recv_modulo()
    end

    def send_modulo(num1, num2)
      send_message('modulo', Modulo_args, :num1 => num1, :num2 => num2)
    end

    def recv_modulo()
      result = receive_message(Modulo_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'modulo failed: unknown result')
    end

    def sumaVectores(v1, v2)
      send_sumaVectores(v1, v2)
      return recv_sumaVectores()
    end

    def send_sumaVectores(v1, v2)
      send_message('sumaVectores', SumaVectores_args, :v1 => v1, :v2 => v2)
    end

    def recv_sumaVectores()
      result = receive_message(SumaVectores_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'sumaVectores failed: unknown result')
    end

    def restaVectores(v1, v2)
      send_restaVectores(v1, v2)
      return recv_restaVectores()
    end

    def send_restaVectores(v1, v2)
      send_message('restaVectores', RestaVectores_args, :v1 => v1, :v2 => v2)
    end

    def recv_restaVectores()
      result = receive_message(RestaVectores_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'restaVectores failed: unknown result')
    end

    def productoVectorial(v1, v2)
      send_productoVectorial(v1, v2)
      return recv_productoVectorial()
    end

    def send_productoVectorial(v1, v2)
      send_message('productoVectorial', ProductoVectorial_args, :v1 => v1, :v2 => v2)
    end

    def recv_productoVectorial()
      result = receive_message(ProductoVectorial_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'productoVectorial failed: unknown result')
    end

    def productoEscalar(v1, num2)
      send_productoEscalar(v1, num2)
      return recv_productoEscalar()
    end

    def send_productoEscalar(v1, num2)
      send_message('productoEscalar', ProductoEscalar_args, :v1 => v1, :num2 => num2)
    end

    def recv_productoEscalar()
      result = receive_message(ProductoEscalar_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'productoEscalar failed: unknown result')
    end

    def determinante(matriz)
      send_determinante(matriz)
      return recv_determinante()
    end

    def send_determinante(matriz)
      send_message('determinante', Determinante_args, :matriz => matriz)
    end

    def recv_determinante()
      result = receive_message(Determinante_result)
      return result.success unless result.success.nil?
      raise ::Thrift::ApplicationException.new(::Thrift::ApplicationException::MISSING_RESULT, 'determinante failed: unknown result')
    end

  end

  class Processor
    include ::Thrift::Processor

    def process_ping(seqid, iprot, oprot)
      args = read_args(iprot, Ping_args)
      result = Ping_result.new()
      @handler.ping()
      write_result(result, oprot, 'ping', seqid)
    end

    def process_suma(seqid, iprot, oprot)
      args = read_args(iprot, Suma_args)
      result = Suma_result.new()
      result.success = @handler.suma(args.num1, args.num2)
      write_result(result, oprot, 'suma', seqid)
    end

    def process_resta(seqid, iprot, oprot)
      args = read_args(iprot, Resta_args)
      result = Resta_result.new()
      result.success = @handler.resta(args.num1, args.num2)
      write_result(result, oprot, 'resta', seqid)
    end

    def process_multiplicacion(seqid, iprot, oprot)
      args = read_args(iprot, Multiplicacion_args)
      result = Multiplicacion_result.new()
      result.success = @handler.multiplicacion(args.num1, args.num2)
      write_result(result, oprot, 'multiplicacion', seqid)
    end

    def process_divisionEntera(seqid, iprot, oprot)
      args = read_args(iprot, DivisionEntera_args)
      result = DivisionEntera_result.new()
      result.success = @handler.divisionEntera(args.num1, args.num2)
      write_result(result, oprot, 'divisionEntera', seqid)
    end

    def process_division(seqid, iprot, oprot)
      args = read_args(iprot, Division_args)
      result = Division_result.new()
      result.success = @handler.division(args.num1, args.num2)
      write_result(result, oprot, 'division', seqid)
    end

    def process_modulo(seqid, iprot, oprot)
      args = read_args(iprot, Modulo_args)
      result = Modulo_result.new()
      result.success = @handler.modulo(args.num1, args.num2)
      write_result(result, oprot, 'modulo', seqid)
    end

    def process_sumaVectores(seqid, iprot, oprot)
      args = read_args(iprot, SumaVectores_args)
      result = SumaVectores_result.new()
      result.success = @handler.sumaVectores(args.v1, args.v2)
      write_result(result, oprot, 'sumaVectores', seqid)
    end

    def process_restaVectores(seqid, iprot, oprot)
      args = read_args(iprot, RestaVectores_args)
      result = RestaVectores_result.new()
      result.success = @handler.restaVectores(args.v1, args.v2)
      write_result(result, oprot, 'restaVectores', seqid)
    end

    def process_productoVectorial(seqid, iprot, oprot)
      args = read_args(iprot, ProductoVectorial_args)
      result = ProductoVectorial_result.new()
      result.success = @handler.productoVectorial(args.v1, args.v2)
      write_result(result, oprot, 'productoVectorial', seqid)
    end

    def process_productoEscalar(seqid, iprot, oprot)
      args = read_args(iprot, ProductoEscalar_args)
      result = ProductoEscalar_result.new()
      result.success = @handler.productoEscalar(args.v1, args.num2)
      write_result(result, oprot, 'productoEscalar', seqid)
    end

    def process_determinante(seqid, iprot, oprot)
      args = read_args(iprot, Determinante_args)
      result = Determinante_result.new()
      result.success = @handler.determinante(args.matriz)
      write_result(result, oprot, 'determinante', seqid)
    end

  end

  # HELPER FUNCTIONS AND STRUCTURES

  class Ping_args
    include ::Thrift::Struct, ::Thrift::Struct_Union

    FIELDS = {

    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Ping_result
    include ::Thrift::Struct, ::Thrift::Struct_Union

    FIELDS = {

    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Suma_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::DOUBLE, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::DOUBLE, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Suma_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::DOUBLE, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Resta_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::DOUBLE, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::DOUBLE, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Resta_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::DOUBLE, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Multiplicacion_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::DOUBLE, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::DOUBLE, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Multiplicacion_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::DOUBLE, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class DivisionEntera_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::I32, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::I32, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class DivisionEntera_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::I32, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Division_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::DOUBLE, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::DOUBLE, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Division_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::DOUBLE, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Modulo_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    NUM1 = 1
    NUM2 = 2

    FIELDS = {
      NUM1 => {:type => ::Thrift::Types::I32, :name => 'num1'},
      NUM2 => {:type => ::Thrift::Types::I32, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Modulo_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::I32, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class SumaVectores_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    V1 = 1
    V2 = 2

    FIELDS = {
      V1 => {:type => ::Thrift::Types::LIST, :name => 'v1', :element => {:type => ::Thrift::Types::DOUBLE}},
      V2 => {:type => ::Thrift::Types::LIST, :name => 'v2', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class SumaVectores_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::LIST, :name => 'success', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class RestaVectores_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    V1 = 1
    V2 = 2

    FIELDS = {
      V1 => {:type => ::Thrift::Types::LIST, :name => 'v1', :element => {:type => ::Thrift::Types::DOUBLE}},
      V2 => {:type => ::Thrift::Types::LIST, :name => 'v2', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class RestaVectores_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::LIST, :name => 'success', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class ProductoVectorial_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    V1 = 1
    V2 = 2

    FIELDS = {
      V1 => {:type => ::Thrift::Types::LIST, :name => 'v1', :element => {:type => ::Thrift::Types::DOUBLE}},
      V2 => {:type => ::Thrift::Types::LIST, :name => 'v2', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class ProductoVectorial_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::LIST, :name => 'success', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class ProductoEscalar_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    V1 = 1
    NUM2 = 2

    FIELDS = {
      V1 => {:type => ::Thrift::Types::LIST, :name => 'v1', :element => {:type => ::Thrift::Types::DOUBLE}},
      NUM2 => {:type => ::Thrift::Types::DOUBLE, :name => 'num2'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class ProductoEscalar_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::LIST, :name => 'success', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Determinante_args
    include ::Thrift::Struct, ::Thrift::Struct_Union
    MATRIZ = 1

    FIELDS = {
      MATRIZ => {:type => ::Thrift::Types::LIST, :name => 'matriz', :element => {:type => ::Thrift::Types::DOUBLE}}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

  class Determinante_result
    include ::Thrift::Struct, ::Thrift::Struct_Union
    SUCCESS = 0

    FIELDS = {
      SUCCESS => {:type => ::Thrift::Types::DOUBLE, :name => 'success'}
    }

    def struct_fields; FIELDS; end

    def validate
    end

    ::Thrift::Struct.generate_accessors self
  end

end

