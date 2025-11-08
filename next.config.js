/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'https', hostname: 'www.estadao.com.br' },
      { protocol: 'https', hostname: 'f.i.uol.com.br' },
      { protocol: 'https', hostname: 'static.poder360.com.br' },
      { protocol: 'https', hostname: 'classic.exame.com' },
      { protocol: 'https', hostname: 'conteudo.imguol.com.br' },
      { protocol: 'https', hostname: 's2-valor.glbimg.com' },
      { protocol: 'https', hostname: 'nexo-uploads-beta.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'apublica.org' },
      { protocol: 'https', hostname: 'midias.correiobraziliense.com.br' },
      { protocol: 'https', hostname: 'uploads.agencialupa.org' },
      { protocol: 'https', hostname: 'static.aosfatos.org' },
      { protocol: 'https', hostname: 'hugogloss.uol.com.br' },
      { protocol: 'https', hostname: 'www.gov.br' },
      { protocol: 'https', hostname: 'agenciabrasil.ebc.com.br' },
      { protocol: 'https', hostname: 'noticias.r7.com' },
      { protocol: 'https', hostname: 'www.hojemais.com.br' },
      { protocol: 'https', hostname: 'informe.ensp.fiocruz.br' },
      { protocol: 'https', hostname: 'www.brasildefato.com.br' },
      { protocol: 'https', hostname: 'www.pfizer.com.br' },
      { protocol: 'https', hostname: 'incrivel.club' },
      { protocol: 'https', hostname: 'www.cuidamosjuntos.com.br' },
      { protocol: 'https', hostname: 'veja.abril.com.br' },
      { protocol: 'https', hostname: 'www.gazetadopovo.com.br' },
      { protocol: 'https', hostname: 'educamidia.org.br' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'gizbr.uol.com.br' },
      { protocol: 'https', hostname: 'olhardigital.com.br' },
      { protocol: 'https', hostname: 'tecnoblog.net' },
    ],
  },
};

module.exports = nextConfig;