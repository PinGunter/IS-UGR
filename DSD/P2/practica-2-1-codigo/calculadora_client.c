/*
 * This is sample code generated by rpcgen.
 * These are only templates and you can use them
 * as a guideline for developing your own functions.
 */

#include "calculadora.h"

void imprimirAyuda()
{
	printf("Sintaxis: <programa> <servidor> <num1> <operador> <num2>\nOperadores disponibles\n+ Suma\n- Resta\nx Producto\n/ División\ne División entera\n%% Modulo\n");
	printf("Para el modo avanzado (operaciones con vectores y matrices, usar la opcion -a: <programa> <servidor> -a");
}

vec3 leerVec3()
{
	printf("Introduce las 3 componentes del vector: (separadas por un salto de linea) ");
	vec3 vector;
	scanf("%lf", &vector.x);
	scanf("%lf", &vector.y);
	scanf("%lf", &vector.z);
	return vector;
}

vec2 leerVec2()
{
	printf("Introduce las 2 componentes del vector: (separadas por un salto de linea) ");
	vec2 vector;
	scanf("%lf", &vector.x);
	scanf("%lf", &vector.y);
	return vector;
}

int main(int argc, char **argv)
{
	CLIENT *clnt;
	double *result = NULL;
	int *result_int = NULL;
	pareja_double p_double;
	pareja_int p_int;
	char *host;
	char operacion;
	double num1, num2;

	if (argc != 5 && argc != 3)
	{
		printf("Error de ejecución\n");
		imprimirAyuda();
		exit(-1);
	}
	int avanzado = (strcmp(argv[2], "-a") == 0) ? 1 : 0;
	host = argv[1];
	if (avanzado == 0){
		num1 = atof(argv[2]);
		num2 = atof(argv[4]);
		operacion = argv[3][0];
	}
#ifndef DEBUG
	clnt = clnt_create(host, CALCULADORA, CALCVER, "udp");
	if (clnt == NULL)
	{
		clnt_pcreateerror(host);
		exit(1);
	}
#endif /* DEBUG */
	if (avanzado == 0)
	{
		switch (operacion)
		{
		case '+':
			p_double.num1 = num1;
			p_double.num2 = num2;
			result = sumar_1(p_double, clnt);
			break;
		case '-':
			p_double.num1 = num1;
			p_double.num2 = num2;
			result = restar_1(p_double, clnt);
			break;
		case 'x':
			p_double.num1 = num1;
			p_double.num2 = num2;
			result = multiplicar_1(p_double, clnt);
			break;
		case '/':
			p_double.num1 = num1;
			p_double.num2 = num2;
			result = dividir_1(p_double, clnt);
			break;
		case 'e':
			p_int.num1 = num1;
			p_int.num2 = num2;
			result_int = divisionentera_1(p_int, clnt);
			break;
		case '%':
			p_int.num1 = num1;
			p_int.num2 = num2;
			result_int = modulo_1(p_int, clnt);
			break;
		default:
			printf("Operador incorrecto\n");
			imprimirAyuda();
			break;
		}

		if ((result == (double *)NULL) && (result_int == (int *)NULL))
		{
			printf("Error en la llamada\n");
			exit(-1);
		}

		if (result != NULL)
		{
			printf("Resultado de %f %c %f = %f\n", num1, operacion, num2, *result);
		}
		else if (result_int != NULL)
		{
			printf("Resultado de %i %s %i = %i\n", (int)num1, argv[3], (int)num2, *result_int);
		}
	}
	else
	{
		printf("Bienvenido al modo avanzado\nSelecciona una operacion:\n1. Suma de vectores\n2. Resta de vectores\n3. Producto escalar\n");
		int eleccion;
		scanf("%i", &eleccion);
		vec3 * resultv3;
		vec2 * resultv2;
		pareja_vec2 p_v2;
		pareja_vec3 p_v3;
		int tipo_vector = 3;
		double escalar;
		vec3escalar v3e;
		vec2escalar v2e;

		do
		{
			printf("Selecciona la dimensión del vector (2 o 3): ");
			scanf("%i", &tipo_vector);
			if (tipo_vector != 2 && tipo_vector != 3)
			{
				printf("Dimensión no válida\n");
			}
		} while (tipo_vector != 2 && tipo_vector != 3);

		switch (eleccion)
		{
		case 1: 
			if (tipo_vector == 2){
				printf("Leyendo vector 1\n");
				p_v2.v1 = leerVec2();
				printf("Leyendo vector 2\n");
				p_v2.v2 = leerVec2();
				resultv2 = sumavec2_1(p_v2,clnt);
			} else{
				printf("Leyendo vector 1\n");
				p_v3.v1 = leerVec3();
				printf("Leyendo vector 2\n");
				p_v3.v2 = leerVec3();
				resultv3 = sumavec3_1(p_v3, clnt);
			}
			break;
		case 2:
			if (tipo_vector == 2){
				printf("Leyendo vector 1\n");
				p_v2.v1 = leerVec2();
				printf("Leyendo vector 2\n");
				p_v2.v2 = leerVec2();
				resultv2 = restavec2_1(p_v2,clnt);
			} else{
				printf("Leyendo vector 1\n");
				p_v3.v1 = leerVec3();
				printf("Leyendo vector 2\n");
				p_v3.v2 = leerVec3();
				resultv3 = restavec3_1(p_v3, clnt);
			}
			break;
		case 3:
			if (tipo_vector == 2){
				printf("Leyendo vector\n");
				v2e.v = leerVec2();
				printf("Introduce el escalar:\n");
				scanf("%lf", &v2e.escalar);
				resultv2 = pescalar2_1(v2e, clnt);
			} else{
				printf("Leyendo vector\n");
				v3e.v = leerVec3();
				printf("Introduce el escalar:\n");
				scanf("%lf", &v3e.escalar);
				resultv3 = pescalar3_1(v3e, clnt);
			}
			break;
		default:
			printf("Error, no es una opción válida\n");
			exit(-1);
			break;
		}

		if (tipo_vector == 2){
			printf("Resultado de la operacion con vectores: {%f, %f}\n", resultv2->x, resultv2->y);
		} else{
			printf("Resultado de la operacion con vectores: {%f, %f, %f}\n", resultv3->x, resultv3->y, resultv3->z);
		}
	}
#ifndef DEBUG
	clnt_destroy(clnt);
#endif /* DEBUG */
}
