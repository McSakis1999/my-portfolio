import { asset } from '../data/i18n';
export function GET() {
 return new Response(JSON.stringify({name:'MitsikostasTech — Thanasis Mitsikostas',short_name:'MitsikostasTech',start_url:asset(''),scope:asset(''),display:'browser',background_color:'#070f1e',theme_color:'#070f1e',icons:[192,512].map(size=>({src:asset(`icons/icon-${size}.png`),sizes:`${size}x${size}`,type:'image/png',purpose:'any'}))}),{headers:{'Content-Type':'application/manifest+json'}});
}
