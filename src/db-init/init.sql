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
INSERT INTO news (title, description, status, confidence, source, link, imageSrc) VALUES
('Estudo revela que cães entendem até 200 palavras', 'Uma nova pesquisa da Universidade de British Columbia demonstra a impressionante capacidade cognitiva dos cães.', 'Real', 98.50, 'Science Daily', 'http://example.com/link1', 'https://picsum.photos/id/237/200'),
('Chocolate agora é considerado vegetal, dizem cientistas', 'Uma reviravolta na botânica reclassificou o cacau como um membro da família das folhas verdes, surpreendendo especialistas.', 'Fake', 85.00, 'Fonte Duvidosa', 'http://example.com/link2', 'https://picsum.photos/id/1080/200'),
('Home office aumenta produtividade em 30%', 'Meta-análise de 50 estudos confirma os benefícios do trabalho remoto para empresas e funcionários.', 'Real', 92.00, 'Harvard Business Review', 'http://example.com/link3', 'https://picsum.photos/id/1076/200'),
('Descoberto novo planeta habitável no sistema vizinho', 'Astrônomos confirmam a existência de um exoplaneta com condições similares às da Terra, apelidado de "Terra 2.0".', 'Real', 99.10, 'NASA Exoplanet Archive', 'http://example.com/link4', 'https://picsum.photos/id/1015/200'),
('Água de coco pode substituir o óleo de motor', 'Uma notícia viral afirma que o fluido natural tem propriedades lubrificantes superiores aos sintéticos, mas mecânicos alertam para os riscos.', 'Fake', 75.00, 'Blog de Notícias Incríveis', 'http://example.com/link5', 'https://picsum.photos/id/102/200');