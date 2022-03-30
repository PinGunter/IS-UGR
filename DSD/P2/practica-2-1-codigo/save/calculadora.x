const MAX= 255; /* longitud maxima de la entrada directorio */
typedef string nametype<MAX>; /* entrada directorio */
typedef struct namenode *namelist; /* enlace en el listado */

program CALCULADORA {
	version CALCVER {
		double SUMAR(double num1, double num2) = 1;
		double RESTAR(double num1, double num2) = 2;
		double MULTIPLICAR(double num1, double num2) = 3;
		double DIVIDIR (double num1, double num2) = 4;
		double DIVISIONENTERA(int num1, int num2) = 5;
	} =1;
} = 0x20000155;
