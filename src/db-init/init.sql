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
  'https://th.bing.com/th?id=OVFT.9Y5v48A6KY9QHCNOl_FXxC&pid=News&w=234&h=132&c=14&rs=2&qlt=90',
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
);