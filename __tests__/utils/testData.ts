import { News, Status } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Helper function to create test news data
 */
export function createMockNews(overrides?: Partial<News>): News {
    const defaults: News = {
        id: 1,
        title: 'Notícia de Teste',
        description: 'Descrição de teste para notícia',
        imageSrc: 'https://example.com/image.jpg',
        imageAlt: 'Imagem de teste',
        status: Status.Real,
        confidence: new Decimal(85.5),
        source: 'Fonte Teste',
        link: 'https://example.com/noticia',
        created_at: new Date('2025-01-01T12:00:00Z'),
    };

    return { ...defaults, ...overrides };
}

/**
 * Sample test data for different scenarios
 */
export const mockNewsData = {
    real: createMockNews({
        id: 1,
        title: 'Notícia Real Verificada',
        description: 'Esta notícia foi verificada e é real',
        status: Status.Real,
        confidence: new Decimal(92.3),
        source: 'Jornal Confiável',
    }),

    fake: createMockNews({
        id: 2,
        title: 'Notícia Falsa Detectada',
        description: 'Esta notícia foi detectada como falsa',
        status: Status.Fake,
        confidence: new Decimal(15.7),
        source: 'Fonte Duvidosa',
    }),

    error: createMockNews({
        id: 3,
        title: 'Notícia com Erro de Análise',
        description: 'Não foi possível analisar esta notícia',
        status: Status.Error,
        confidence: null,
        source: null,
    }),

    highConfidence: createMockNews({
        id: 4,
        title: 'Notícia com Alta Confiança',
        description: 'Notícia verificada com alta confiança',
        status: Status.Real,
        confidence: new Decimal(98.5),
    }),

    lowConfidence: createMockNews({
        id: 5,
        title: 'Notícia com Baixa Confiança',
        description: 'Notícia com baixo nível de confiança',
        status: Status.Fake,
        confidence: new Decimal(5.2),
    }),
};

/**
 * Create an array of mock news for pagination tests
 */
export function createMockNewsList(count: number): News[] {
    return Array.from({ length: count }, (_, index) =>
        createMockNews({
            id: index + 1,
            title: `Notícia ${index + 1}`,
            description: `Descrição da notícia ${index + 1}`,
            confidence: new Decimal(Math.random() * 100),
            created_at: new Date(2025, 0, index + 1),
        })
    );
}

/**
 * Mock news list for search tests
 */
export const searchableNewsList: News[] = [
    createMockNews({
        id: 1,
        title: 'Política Nacional em Destaque',
        description: 'Discussões sobre política nacional',
        source: 'Jornal Nacional',
    }),
    createMockNews({
        id: 2,
        title: 'Economia Brasileira em Alta',
        description: 'Análise da economia do Brasil',
        source: 'Folha Econômica',
    }),
    createMockNews({
        id: 3,
        title: 'Tecnologia e Inovação',
        description: 'Novas tecnologias revolucionam o mercado',
        source: 'TechNews',
    }),
    createMockNews({
        id: 4,
        title: 'Esportes: Campeonato Nacional',
        description: 'Cobertura do campeonato nacional de futebol',
        source: 'ESPN Brasil',
    }),
];
