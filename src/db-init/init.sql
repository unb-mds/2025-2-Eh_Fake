-- Garante que o script pare se ocorrer um erro
\set ON_ERROR_STOP on

-- Criação de um tipo ENUM para garantir a integridade dos dados do status
CREATE TYPE news_status AS ENUM ('Fake', 'Real', 'Error');

-- Criação da tabela `news` com base na sua interface
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    imageSrc TEXT,
    imageAlt TEXT,
    status news_status DEFAULT 'Error',
    confidence NUMERIC(5, 2),
    source TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserção dos dados de exemplo para popular o banco
INSERT INTO news (
  title, 
  description, 
  imagesrc, 
  imagealt, 
  status, 
  confidence, 
  source, 
  link
) 
VALUES
(
  'Primeira Turma do STF forma unanimidade recursos de Bolsonaro, mas prisão não é imediata; entenda', 
  'Julgamento no plenário virtual vai até a sexta-feira da semana que vem. Só então é considerado concluído.',
  'https://th.bing.com/th?id=OVFT.9rPjuCF7mIfvsDFJCysArC&pid=News&w=80&h=80&c=14&rs=2&qlt=90',
  'Primeira Turma do STF forma unanimidade recursos de Bolsonaro, mas prisão não é imediata; entenda',
  'Real', 1.00, 'G1', 'https://g1.globo.com/politica/noticia/2025/11/07/primeira-turma-do-stf-forma-maioria-contra-recursos-de-bolsonaro-mas-prisao-nao-e-imediata-entenda.ghtml'
),
(
  'Inadimplência em condomínios bate recordes e empresas criam soluções para ajudar na gestão', 
  'Falta de pagamento compromete manutenção, trava melhorias e pode desvalorizar imóveis; ferramenta de IA tem ajudado síndicos e administradores com dúvidas jurídicas e financeiras',
  'https://www.estadao.com.br/resizer/v2/HXC6HWOBKNHHFH3QUSWBIJWORQ.jpg?quality=80&auth=acfed81ced51dee3ce6134c88678d0af19838e5dc91e1b3be225df7881025a8a&width=550&height=309&smart=true',
  'Inadimplência condominial atingiu 11,95% no primeiro trimestre de 2025 Foto: Taba Benedicto/Estadão',
  'Real', 1.00, 'Estadão', 'https://www.estadao.com.br/economia/negocios/inadimplencia-em-condominios-bate-recordes-e-empresas-criam-solucoes-para-ajudar-na-gestao/'
),
(
  'UE fica de fora de acordo para quadruplicar produção de combustíveis sustentáveis', 
  'Ao todo, 19 países confirmaram comprometimento na cúpula de líderes que precede a COP30, em Belém. Número é considerado promissor pelo Itamaraty; Itália e Holanda estão dentro',
  'https://f.i.uol.com.br/fotografia/2025/11/07/1762563540690e95d429c2a_1762563540_3x2_xl.jpg',
  'UE fica de fora de acordo para quadruplicar produção de combustíveis sustentáveis',
  'Real', 1.00, 'Folha de S.Paulo', 'https://www1.folha.uol.com.br/ambiente/2025/11/ue-fica-de-fora-de-acordo-para-quadruplicar-producao-de-combustiveis-sustentaveis.shtml'
),
(
  'Trump se irrita com preço de carne e manda investigar frigoríficos nos EUA', 
  'Presidente dos Estados Unidos disse que empresas estão manipulando os valores comercializados.',
  'data:image/jpeg;base64,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',
  'Trump se irrita com preço de carne e manda investigar frigoríficos nos EUA',
  'Real', 1.00, 'G1', 'https://g1.globo.com/economia/agronegocios/noticia/2025/11/07/trump-diz-que-pediu-investigacao-sobre-frigorificos-por-aumentarem-preco-da-carne-bovina.ghtml'
),
(
  'Flávio Bolsonaro chama julgamento do STF de ‘farsa’ e acusa Moraes de ‘vingança pessoal’', 
  'Senador reagiu à decisão que manteve a condenação de Jair Bolsonaro a 27 anos de prisão e afirmou que o ministro não tem ‘nenhuma justificativa’; procurado, STF e ministro não se manifestaram',
  'https://static.poder360.com.br/2020/12/flavio-bolsonaro-1.jpg',
  'Flávio Bolsonaro chama julgamento do STF de ‘farsa’ e acusa Moraes de ‘vingança pessoal’',
  'Real', 1.00, 'Estadão', 'https://www.estadao.com.br/politica/flavio-bolsonaro-chama-julgamento-do-stf-de-farsa-e-acusa-moraes-de-vinganca-pessoal-nprp/'
),
(
  'STJ julga ação que pode afetar construção em 741 mil hectares no litoral brasileiro', 
  'Corte decide na próxima terça-feira (11/11) se toda a vegetação de restinga na costa deve ser considerada Área de Preservação Permanente (APP)',
  'https://classic.exame.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-07-at-15.23.48.jpeg?ims=750x/filters:quality(85):format(webp)',
  'Vista de Florianopolis, onde teve início o processo, em 2012 (Leandro Fonseca /Exame)',
  'Real', 1.00, 'Exame', 'https://exame.com/brasil/stj-juga-acao-que-pode-afetar-construcao-em-740-mil-hectares-do-litoral-brasileiro/'
),
(
  'Após repercussão negativa, preços de comida na COP30 são reduzidos', 
  'Lojistas da COP30 reduziram preços das refeições após críticas nas redes sociais sobre valores elevados na Zona Azul. As refeições como lasanha e estrogonofe tiveram redução para R$ 45, enquanto a água passou a custar R$ 20. Preços são calculados em dólar.',
  'https://conteudo.imguol.com.br/c/noticias/8c/2025/11/07/salgados-vendidos-na-cop30-pao-de-queijo-por-r-30-1762545812479_v2_300x225.jpg.webp',
  'Lucas Borges Teixeira/UOL',
  'Real', 1.00, 'UOL', 'https://www.uol.com.br/ecoa/ultimas-noticias/2025/11/07/cop-precos-restaurantes-alta.htm'
),
(
  'Imposto sobre multinacionais e tributação de super-ricos podem gerar recursos valiosos para as ações climáticas, diz Lula', 
  'Na COP30, o presidente da República também citou os mercados regulados de carbono como importantes fontes de receita pública',
  'https://s2-valor.glbimg.com/ZdNCGo9ei5plKrcSBV-1de3SbPM=/0x0:485x643/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2025/h/l/X9jri8RYqIKAxEvZMR5g/presidente-do-brasil-luiz-inacio-da-silva-..-sessao-plenaria-geral-dos-lideres-conferencia-das-nacoes-unidas-sobre-mudancas-climaticas-cop-30.png',
  'Presidente Luiz Inácio da Silva durante sessão plenária da Cúpula de Líderes do Clima, na COP30, em Belém (PA)',
  'Real', 1.00, 'Valor Globo', 'https://valor.globo.com/brasil/cop30-amazonia/noticia/2025/11/07/imposto-sobre-multinacionais-e-tributacao-de-super-ricos-podem-gerar-recursos-valiosos-para-as-acoes-climaticas-diz-lula.ghtml'
),
(
  'Lula diz que mundo está “distante” de cumprir o Acordo de Paris', 
  'No encerramento da Cúpula de Líderes, presidente avalia que houve retrocesso no pacto climático e reforça defesa da tributação dos super-ricos e de multinacionais',
  'https://static.poder360.com.br/2025/11/Lula-COP30-Ricardo-Stuckert-Planalto-06.nov_.2025-848x477.jpg',
  'O presidente Lula em frente a banner onde tirou fotos com chefes de Estado durante a Cúpula de Líderes da COP30, em Belém (PA)',
  'Real', 1.00, 'Poder 360', 'https://www.poder360.com.br/cop30/lula-diz-que-mundo-falhou-em-cumprir-o-acordo-de-paris/'
),
(
  'Por que o Sudão vive uma crise humanitária há tanto tempo', 
  'Grupo paramilitar disse aceitar um cessar-fogo após tomar principal cidade da região de Darfur. País tem histórico de golpes e guerras civis',
  'https://nexo-uploads-beta.s3.amazonaws.com/wp-content/uploads/images/2025/11/darfur-unicef_batcheditor_fotor.webp',
  'Milhares de sudaneses em busca de refúgio em Darfur',
  'Real', 1.00, 'Nexo Jornal', 'https://www.nexojornal.com.br/expresso/2025/11/06/sudao-guerra-civil-crise-humanitaria'
),
(
  'Punitivismo não resolve: analistas criticam lei sobre crime organizado sancionada por Lula', 
  'Aprovar lei foi “bola fora” de Lula, diz Nilo Batista; analistas citam mais leis que focam nas penas e foram “inúteis”',
  'https://apublica.org/wp-content/uploads/2025/11/Capa_Punitivismo-nao-resolve-analistas-criticam-lei-sobre-crime-organizado-sancionada-por-Lula.jpg',
  'Brasília, 04/06/2024 - O presidente Luiz Inácio Lula da Silva, sanciona o projeto de Lei nº 4364/2020, que institui a política nacional de cuidado integral às pessoas com doença de alzheimer e outras demências. Foto: Rafa Neddermeyer/Agência Brasil',
  'Real', 1.00, 'A Pública', 'https://apublica.org/2025/11/analistas-criticam-punitivismo-de-lei-sobre-crime-organizado/'
),
(
  'Ibaneis sanciona lei que autoriza ocupação de becos nos lagos Sul e Norte', 
  'Governador autorizou a ocupação das áreas intersticiais entre as residências no Lago Sul e no Lago Norte. Decisão foi publicada no Diário Oficial do DF',
  'https://midias.correiobraziliense.com.br/_midias/jpg/2025/10/31/675x450/1_mj3110-03-60504041.jpg?20251031202220?20251031202220',
  'Ibaneis sanciona lei que autoriza ocupação de becos no lago -  (crédito:  Minervino Júnior/CB)',
  'Real', 1.00, 'Correio Braziliense', 'https://www.correiobraziliense.com.br/cidades-df/2025/11/7287754-ibaneis-sanciona-lei-que-autoriza-ocupacao-de-becos-nos-lagos-sul-e-norte.html'
),
(
  'Avião desce ''de lado'' durante pouso por causa do vento forte em aeroporto de SC; VÍDEO',
  'Um avião comercial realizou um pouso conhecido como ''pouso-caranguejo'' (ou crab approach) no aeroporto de Navegantes (SC) devido a ventos cruzados com rajadas de até 67 km/h. A manobra, registrada em vídeo, foi concluída com segurança.',
  'https://s2-g1.glbimg.com/kgIk9cl1iT_jX5sVOMaDMVG17OM=/0x0:1584x888/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/y/u/Wo5UZASgWp3fmJMYA0KA/aviao.png',
  'Avião desce ''de lado'' durante pouso por causa do vento forte em aeroporto de SC; VÍDEO',
  'Real', 100.00, 'G1 SC',
  'https://g1.globo.com/sc/santa-catarina/noticia/2025/11/07/aviao-desce-lado-pouso-causa-vento-forte-aeroporto-sc-video.ghtml'
),
(
  'EUA querem metais brasileiros e Lula diz que eles podem levar ferro',
  'Artigo satírico. Afirma que Trump quer metais raros do Brasil para "conduzir o calor do planeta para o espaço". Lula responde que "o único metal que vão levar é ferro", e Trump ameaça com "chumbo".',
  'https://s2-oglobo.glbimg.com/a09820xYwY5XSshtDFsRWjyKUYA=/0x0:2000x1194/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/F/X/e3hi3ISUOsB2aCAAEZPg/arte-2-.png',
  'EUA querem metais brasileiros e Lula diz que eles podem levar ferro',
  'Fake', 100.00, 'Sensacionalista',
  'https://oglobo.globo.com/blogs/humor/sensacionalista/post/2025/07/sensacionalista-eua-querem-metais-brasileiros-e-lula-diz-que-eles-podem-levar-ferro.ghtml'
),
(
  'Deputada do PL critica Galinha Pintadinha e Netflix: ‘’Fábrica de militantes do PSOL’’',
  'A deputada federal Júlia Zanatta (PL-SC) afirmou que o desenho Galinha Pintadinha e produções da Netflix têm "caráter ideológico" e funcionariam como uma "fábrica de militantes do PSOL", acusando os conteúdos de defender a transição de gênero e criticar o capitalismo.',
  'https://jpimg.com.br/uploads/2023/08/img20230707153532751med-731x450.jpg',
  'Deputada do PL critica Galinha Pintadinha e Netflix: ‘’Fábrica de militantes do PSOL’’',
  'Real', 100.00, 'Jovem Pan',
  'https://jovempan.com.br/noticias/politica/deputada-do-pl-critica-galinha-pintadinha-e-netflix-fabrica-de-militantes-do-psol.html'
),
(
  'Morre James Watson, descobridor da estrutura do DNA, aos 97 anos',
  'O cientista americano James D. Watson, co-descobridor da estrutura da dupla hélice do DNA, morreu aos 97 anos. Vencedor do Nobel, sua descoberta de 1953 com Francis Crick revolucionou a medicina e a ciência.',
  'https://www.estadao.com.br/resizer/v2/62PC6EE7NZF27NYKEDTGKVH7UM.jpg?quality=80&auth=0934b5e916473c836c3f52e99ca4dcf6ce8540705a4a0934be8f4dd840c53993&width=1200',
  'Morre James Watson, descobridor da estrutura do DNA, aos 97 anos',
  'Real', 100.00, 'Estadão',
  'https://www.estadao.com.br/ciencia/morre-james-watson-descobridor-da-estrutura-do-dna-aos-97-anos/'
),
(
  'Estudo avalia a frequência ideal de sexo para beneficiar a saúde mental; veja qual é',
  'Um estudo chinês publicado no Journal of Affective Disorders sugere que fazer sexo uma ou duas vezes por semana pode reduzir o risco de depressão. Especialistas apontam que a atividade sexual libera neurotransmissores benéficos que impactam o bem-estar psicológico.',
  'https://www.estadao.com.br/resizer/v2/H4JLCEQONFEWVKCVUHTX73KPPY.jpeg?quality=80&auth=6961699af42bdd17ec46dbccee186ca892167c4abb95f75d0bb9da1c390af997&width=1200',
  'Estudo avalia a frequência ideal de sexo para beneficiar a saúde mental; veja qual é',
  'Real', 100.00, 'Estadão',
  'https://www.estadao.com.br/saude/estudo-avalia-a-frequencia-ideal-de-sexo-para-beneficiar-a-saude-mental-veja-qual-e/'
),
(
  'STF mantém prisão de Bolsonaro e aliados após audiências de custódia',
  'Ex-presidente e outros réus do núcleo crucial do plano de golpe vão continuar presos para cumprir condenações',
  'https://www.estadao.com.br/resizer/v2/TCDXXQNTJ5FYHLT6H5VIYQKHRA.jpg?quality=80&auth=e57dc2ccf1384133e93771885e7e9b3f73f9e3dc7708c56a286dd7dbbb1f0395&width=1200',
  'STF mantém prisão de Bolsonaro e aliados após audiências de custódia',
  'Real', 100.00, 'Estadão',
  'https://www.estadao.com.br/politica/blog-do-fausto-macedo/primeira-turma-stf-julgamento-virtual-recursos-bolsonaro-condenacao-trama-golpa/'
),
(
  'Brasil lidera coalizão para mercado de carbono',
  'O Brasil anunciou na COP 30, em Belém, a liderança de uma coalizão internacional para mercados regulados de carbono. A iniciativa, que conta com a adesão da China, UE e Reino Unido, visa impor um "teto" de emissão para empresas e, no futuro, integrar os sistemas nacionais para criar um incentivo financeiro global para a descarbonização.',
  'data:image/jpeg;base64,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',
  'Brasil lidera coalizão para mercado de carbono',
  'Real', 100.00, 'G1',
  'https://g1.globo.com/politica/blog/julia-duailibi/post/2025/11/07/brasil-lidera-coalizao-para-mercado-de-carbono.ghtml'
),
(
  'Diario de Pernambuco, o mais antigo jornal em circulação no Brasil, completa 200 anos',
  'O Diario de Pernambuco, jornal mais antigo em circulação no Brasil, comemorou 200 anos. Em homenagem, uma "cápsula do tempo" lacrada em 1925 foi aberta. O veículo é considerado patrimônio cultural material do Brasil por uma lei de 2024.',
  'https://f.i.uol.com.br/fotografia/2025/11/07/1762547673690e57d969731_1762547673_3x2_lg.jpg',
  'Diario de Pernambuco, o mais antigo jornal em circulação no Brasil, completa 200 anos',
  'Real', 100.00, 'Folha de S.Paulo',
  'https://www1.folha.uol.com.br/poder/2025/11/diario-de-pernambuco-o-mais-antigo-jornal-em-circulacao-no-brasil-completa-200-anos.shtml'
),
(
  'A química Lula-Trump desandou? O motivo do desânimo sobre o tarifaço nos bastidores',
  'Apesar do presidente Lula ter entregue um documento pedindo o fim das sanções e a redução total das tarifas, a resposta dos EUA foi de que um possível acordo "está em análise" e "pode levar semanas ou meses". Segundo a reportagem, isso revela mais ansiedade do lado brasileiro do que reciprocidade, gerando um cenário de "distância calculada".',
  'data:image/jpeg;base64,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',
  'A química Lula-Trump desandou? O motivo do desânimo sobre o tarifaço nos bastidores',
  'Real', 100.00, 'Veja',
  'https://veja.abril.com.br/politica/a-quimica-entre-trump-e-lula-desandou-o-motivo-do-desanimo-sobre-o-tarifaco-nos-bastidores/'
),
(
  'EUA venderam armas ao Bope apesar de alerta de embaixada sobre ''execuções''',
  'Uma reportagem da Reuters, publicada pelo Brasil 247, afirma que o governo dos EUA aprovou a venda de fuzis de precisão ao Bope do Rio de Janeiro em 2023. A decisão teria ignorado alertas da embaixadora dos EUA e diplomatas sobre o risco das armas serem usadas em execuções.',
  'https://cdn.brasil247.com/pb-b247gcp/swp/jtjeq9/media/20220211160252_0acf39b388be03e709ca54d8fc369af8aec73d0a55139744c9094b0ef18b650a.webp',
  'EUA venderam armas ao Bope apesar de alerta de embaixada sobre ''execuções''',
  'Real', 100.00, 'Brasil 247',
  'https://www.brasil247.com/brasil/eua-venderam-armas-ao-bope-apesar-de-alerta-de-embaixada-sobre-execucoes'
),
(
  'Bolsa Família: Bets levaram 27% do valor pago em janeiro de 2025',
  'Um levantamento do TCU apontou que R$ 3,7 bilhões (27% do total) pagos pelo Bolsa Família em janeiro de 2025 foram transferidos para casas de apostas por 4,4 milhões de famílias. O próprio tribunal, no entanto, indicou "elevado risco" de fraude, já que 20% dessas famílias concentraram 80% dos depósitos, com transferências incompatíveis com a renda (uma delas de R$ 2,1 milhões).',
  'https://static.cdn.pleno.news/2024/09/Screenshot-28.png',
  'Bolsa Família: Bets levaram 27% do valor pago em janeiro de 2025',
  'Real', 100.00, 'Pleno.News',
  'https://pleno.news/brasil/bolsa-familia-bets-levaram-27-do-valor-pago-em-janeiro-de-2025.html'
),
(
  'Facções expulsam famílias de favela em estado governado pelo PT',
  'Cerca de 30 famílias foram forçadas a abandonar suas casas na comunidade do Jacarezal, em Pacatuba (CE), após ameaças de facções criminosas (CV, GDE, TCP) que disputam o território. O artigo relata um cenário de desolação, medo, e o histórico de violência no Ceará, e conclui com a frase: "Esse é retrato de um estado governador pelo PT".',
  'https://fotos.jornaldacidadeonline.com.br/uploads/fotos/650x0_1762311935_690abeff5058b.webp',
  'Facções expulsam famílias de favela em estado governado pelo PT',
  'Real', 100.00, 'Jornal da Cidade Online',
  'https://www.jornaldacidadeonline.com.br/noticias/75390/faccoes-expulsam-familias-de-favela-em-estado-governado-pelo-pt'
),
(
  'Ibovespa tem 10º recorde seguido: entenda a disparada da bolsa e como isso afeta a economia',
  'O Ibovespa, principal índice da bolsa brasileira, atingiu sua décima máxima histórica consecutiva, fechando aos 154.064 pontos. A alta, que acumula 28% em 2025, é impulsionada por cortes de juros nos EUA (que atraem capital estrangeiro) e pelo bom desempenho de ações de grandes bancos e commodities.',
  'https://s02.video.glbimg.com/x720/14080785.jpg',
  'Ibovespa tem 10º recorde seguido: entenda a disparada da bolsa e como isso afeta a economia',
  'Real', 100.00, 'G1',
  'https://g1.globo.com/economia/noticia/2025/11/07/ibovespa-tem-10o-recorde-seguido-entenda-a-disparada-da-bolsa-e-como-isso-afeta-a-economia.ghtml'
),
(
  'Brasil tem déficit na transparência de dados climáticos entre marcas de moda, aponta índice',
  'Um estudo do "Índice de Transparência da Moda Brasil" (Fashion Revolution) apontou um déficit na transparência de dados climáticos entre 60 grandes marcas de moda no país, com pontuação média de 24%. Quase metade das empresas (27) não divulgou nenhuma informação. Renner e Youcom lideraram o ranking de transparência com 76%.',
  'https://www.estadao.com.br/resizer/v2/36MUF5RXTBN5DAAXRTLPVOO2MQ.jpg?quality=80&auth=1162aa12524147406e2277c3b51ba0b13cbd62e580649d9ce9c390c5b7e6f493&width=1200',
  'Brasil tem déficit na transparência de dados climáticos entre marcas de moda, aponta índice',
  'Real', 100.00, 'Estadão',
  'https://www.estadao.com.br/economia/governanca/brasil-tem-deficit-na-transparencia-de-dados-climaticos-entre-marcas-de-moda-aponta-indice/'
),
(
  'Fóssil deste antigo caracol foi encontrado no interior da concha da mãe',
  'Um estudo publicado na revista Geodiversitas revelou a descoberta de cinco novas espécies de moluscos de água doce do Pleistoceno Inferior, em Taiwan. Um dos fósseis de caracol foi encontrado dentro da concha da própria mãe.',
  'https://s2-galileu.glbimg.com/H3czQHZ_thTJTrx0epSR8ANkB90=/0x0:933x587/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_fde5cd494fb04473a83fa5fd57ad4542/internal_photos/bs/2025/K/n/K8B6qzS6Gxo9oKcAS2hA/heufwhiweyuhrfew.jpg',
  'Fóssil deste antigo caracol foi encontrado no interior da concha da mãe',
  'Real', 100.00, 'Revista Galileu',
  'https://revistagalileu.globo.com/ciencia/noticia/2025/11/fossil-deste-antigo-caracol-foi-encontrado-no-interior-da-concha-da-mae.ghtml'
);