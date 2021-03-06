/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#ifndef _CALCULADORA_H_RPCGEN
#define _CALCULADORA_H_RPCGEN

#include <rpc/rpc.h>


#ifdef __cplusplus
extern "C" {
#endif


struct pareja_double {
	double num1;
	double num2;
};
typedef struct pareja_double pareja_double;

struct pareja_int {
	int num1;
	int num2;
};
typedef struct pareja_int pareja_int;

struct vec3 {
	double x;
	double y;
	double z;
};
typedef struct vec3 vec3;

struct pareja_vec3 {
	vec3 v1;
	vec3 v2;
};
typedef struct pareja_vec3 pareja_vec3;

struct vec2 {
	double x;
	double y;
};
typedef struct vec2 vec2;

struct pareja_vec2 {
	vec2 v1;
	vec2 v2;
};
typedef struct pareja_vec2 pareja_vec2;

struct vec2escalar {
	vec2 v;
	double escalar;
};
typedef struct vec2escalar vec2escalar;

struct vec3escalar {
	vec3 v;
	double escalar;
};
typedef struct vec3escalar vec3escalar;

#define CALCULADORA 0x20000155
#define CALCVER 1

#if defined(__STDC__) || defined(__cplusplus)
#define SUMAR 1
extern  double * sumar_1(pareja_double , CLIENT *);
extern  double * sumar_1_svc(pareja_double , struct svc_req *);
#define RESTAR 2
extern  double * restar_1(pareja_double , CLIENT *);
extern  double * restar_1_svc(pareja_double , struct svc_req *);
#define MULTIPLICAR 3
extern  double * multiplicar_1(pareja_double , CLIENT *);
extern  double * multiplicar_1_svc(pareja_double , struct svc_req *);
#define DIVIDIR 4
extern  double * dividir_1(pareja_double , CLIENT *);
extern  double * dividir_1_svc(pareja_double , struct svc_req *);
#define DIVISIONENTERA 5
extern  int * divisionentera_1(pareja_int , CLIENT *);
extern  int * divisionentera_1_svc(pareja_int , struct svc_req *);
#define MODULO 6
extern  int * modulo_1(pareja_int , CLIENT *);
extern  int * modulo_1_svc(pareja_int , struct svc_req *);
#define SUMAVEC3 7
extern  vec3 * sumavec3_1(pareja_vec3 , CLIENT *);
extern  vec3 * sumavec3_1_svc(pareja_vec3 , struct svc_req *);
#define SUMAVEC2 8
extern  vec2 * sumavec2_1(pareja_vec2 , CLIENT *);
extern  vec2 * sumavec2_1_svc(pareja_vec2 , struct svc_req *);
#define RESTAVEC3 9
extern  vec3 * restavec3_1(pareja_vec3 , CLIENT *);
extern  vec3 * restavec3_1_svc(pareja_vec3 , struct svc_req *);
#define RESTAVEC2 10
extern  vec2 * restavec2_1(pareja_vec2 , CLIENT *);
extern  vec2 * restavec2_1_svc(pareja_vec2 , struct svc_req *);
#define PESCALAR2 11
extern  vec2 * pescalar2_1(vec2escalar , CLIENT *);
extern  vec2 * pescalar2_1_svc(vec2escalar , struct svc_req *);
#define PESCALAR3 12
extern  vec3 * pescalar3_1(vec3escalar , CLIENT *);
extern  vec3 * pescalar3_1_svc(vec3escalar , struct svc_req *);
extern int calculadora_1_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
#define SUMAR 1
extern  double * sumar_1();
extern  double * sumar_1_svc();
#define RESTAR 2
extern  double * restar_1();
extern  double * restar_1_svc();
#define MULTIPLICAR 3
extern  double * multiplicar_1();
extern  double * multiplicar_1_svc();
#define DIVIDIR 4
extern  double * dividir_1();
extern  double * dividir_1_svc();
#define DIVISIONENTERA 5
extern  int * divisionentera_1();
extern  int * divisionentera_1_svc();
#define MODULO 6
extern  int * modulo_1();
extern  int * modulo_1_svc();
#define SUMAVEC3 7
extern  vec3 * sumavec3_1();
extern  vec3 * sumavec3_1_svc();
#define SUMAVEC2 8
extern  vec2 * sumavec2_1();
extern  vec2 * sumavec2_1_svc();
#define RESTAVEC3 9
extern  vec3 * restavec3_1();
extern  vec3 * restavec3_1_svc();
#define RESTAVEC2 10
extern  vec2 * restavec2_1();
extern  vec2 * restavec2_1_svc();
#define PESCALAR2 11
extern  vec2 * pescalar2_1();
extern  vec2 * pescalar2_1_svc();
#define PESCALAR3 12
extern  vec3 * pescalar3_1();
extern  vec3 * pescalar3_1_svc();
extern int calculadora_1_freeresult ();
#endif /* K&R C */

/* the xdr functions */

#if defined(__STDC__) || defined(__cplusplus)
extern  bool_t xdr_pareja_double (XDR *, pareja_double*);
extern  bool_t xdr_pareja_int (XDR *, pareja_int*);
extern  bool_t xdr_vec3 (XDR *, vec3*);
extern  bool_t xdr_pareja_vec3 (XDR *, pareja_vec3*);
extern  bool_t xdr_vec2 (XDR *, vec2*);
extern  bool_t xdr_pareja_vec2 (XDR *, pareja_vec2*);
extern  bool_t xdr_vec2escalar (XDR *, vec2escalar*);
extern  bool_t xdr_vec3escalar (XDR *, vec3escalar*);

#else /* K&R C */
extern bool_t xdr_pareja_double ();
extern bool_t xdr_pareja_int ();
extern bool_t xdr_vec3 ();
extern bool_t xdr_pareja_vec3 ();
extern bool_t xdr_vec2 ();
extern bool_t xdr_pareja_vec2 ();
extern bool_t xdr_vec2escalar ();
extern bool_t xdr_vec3escalar ();

#endif /* K&R C */

#ifdef __cplusplus
}
#endif

#endif /* !_CALCULADORA_H_RPCGEN */
