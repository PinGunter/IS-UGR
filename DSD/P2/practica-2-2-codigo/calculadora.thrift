service Calculadora{
   void ping(),
   double suma(1:double num1, 2:double num2),
   double resta(1:double num1, 2:double num2),
   double multiplicacion (1:double num1, 2:double num2),
   i32 divisionEntera(1:i32 num1, 2:i32 num2),
   double division(1:double num1, 2:double num2),
   i32 modulo(1:i32 num1, 2:i32 num2),
   list<double> sumaVectores(1:list<double> v1, 2:list<double> v2),
   list<double> restaVectores(1:list<double> v1, 2:list<double> v2),
   list<double> productoVectorial(1:list<double> v1, 2:list<double> v2),
   list<double> productoEscalar(1:list<double> v1, 2:double num2),
   double determinante(1:list<double> matriz)

}
