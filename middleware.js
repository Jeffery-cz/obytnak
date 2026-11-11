export default function middleware(req) {
  const basicAuth = req.headers.get('authorization');

  // Nastavení loginu a hesla (zde admin a heslo123)
  // Změň si heslo před nahráním na Vercel!
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === 'admin' && pwd === 'Michal88') {
      // Korektní příkaz pro Vercel: "Heslo je OK, pokračuj ve čtení index.html a zachovej HTML formát"
      return new Response(null, { 
        headers: { 'x-middleware-next': '1' } 
      });
    }
  }

  // Pokud je heslo špatné, vyskočí systémové okno prohlížeče
  return new Response('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Garvis OS Secure Area"' },
  });
}
