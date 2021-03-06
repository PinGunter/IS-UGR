/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calculadora.h"

bool_t
xdr_pareja_double (XDR *xdrs, pareja_double *objp)
{
	register int32_t *buf;

	 if (!xdr_double (xdrs, &objp->num1))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->num2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_pareja_int (XDR *xdrs, pareja_int *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->num1))
		 return FALSE;
	 if (!xdr_int (xdrs, &objp->num2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_vec3 (XDR *xdrs, vec3 *objp)
{
	register int32_t *buf;

	 if (!xdr_double (xdrs, &objp->x))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->y))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->z))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_pareja_vec3 (XDR *xdrs, pareja_vec3 *objp)
{
	register int32_t *buf;

	 if (!xdr_vec3 (xdrs, &objp->v1))
		 return FALSE;
	 if (!xdr_vec3 (xdrs, &objp->v2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_vec2 (XDR *xdrs, vec2 *objp)
{
	register int32_t *buf;

	 if (!xdr_double (xdrs, &objp->x))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->y))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_pareja_vec2 (XDR *xdrs, pareja_vec2 *objp)
{
	register int32_t *buf;

	 if (!xdr_vec2 (xdrs, &objp->v1))
		 return FALSE;
	 if (!xdr_vec2 (xdrs, &objp->v2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_vec2escalar (XDR *xdrs, vec2escalar *objp)
{
	register int32_t *buf;

	 if (!xdr_vec2 (xdrs, &objp->v))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->escalar))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_vec3escalar (XDR *xdrs, vec3escalar *objp)
{
	register int32_t *buf;

	 if (!xdr_vec3 (xdrs, &objp->v))
		 return FALSE;
	 if (!xdr_double (xdrs, &objp->escalar))
		 return FALSE;
	return TRUE;
}
