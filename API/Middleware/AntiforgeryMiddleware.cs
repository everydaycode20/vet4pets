using Microsoft.AspNetCore.Antiforgery;

namespace API.Middleware
{
    public class AntiforgeryMiddleware
    {
        private readonly RequestDelegate? _next;

        private readonly IAntiforgery? _antiforgery;

        public AntiforgeryMiddleware(RequestDelegate next, IAntiforgery antiforgery)
        {
            this._next = next;

            this._antiforgery = antiforgery;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (HttpMethods.IsGet(context.Request.Method) && context.Request.Path.StartsWithSegments("/"))
            {
                var tokens = _antiforgery!.GetAndStoreTokens(context);

                context.Response.Headers["X-XSRF-TOKEN"] = tokens.RequestToken;
            }

            await _next!(context);
        }
    }
}
