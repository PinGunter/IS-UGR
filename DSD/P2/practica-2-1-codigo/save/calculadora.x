struct pareja_double{
	double num1;
	double num2;
};

struct pareja_int{
	int num1;
	int num2;
};

struct vec3{
	double x;
	double y;
	double z;
}

struct vec2{
	double x;
	double y;
}

struct vec2escalar{
	vec2 v;
	double escalar;
}

struct vec3escalar{
	vec3 v;
	double escalar;
}

program CALCULADORA {
	version CALCVER {
		double SUMAR(pareja_double) = 1;
		double RESTAR(pareja_double) = 2;
		double MULTIPLICAR(pareja_double) = 3;
		double DIVIDIR (pareja_double) = 4;
		int DIVISIONENTERA(pareja_int) = 5;
		int MODULO (pareja_int) = 6;
		vec3 SUMAVEC3(vec3) = 7;
		vec2 SUMAVEC2(vec2) = 8;
		vec3 RESTAVEC3(vec3) = 9;
		vec2 RESTAVEC2(vec2) = 10;
		double PESCALAR2(vec2escalar) = 11;
		double PESCALAR3(vec3escalar) = 12;
	} =1;
} = 0x20000155;
