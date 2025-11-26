/**
 * Integration tests for /api/noticias/suggestions endpoint
 */

import '../../utils/prismaSingleton';
import { GET } from '@/app/api/noticias/suggestions/route';
import { prismaMock } from '../../utils/prismaClient';

describe('GET /api/noticias/suggestions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Basic suggestions', () => {
        it('should return suggestions based on search term', async () => {
            const suggestions = [
                { title: 'Notícia 1' },
                { title: 'Notícia 2' },
                { title: 'Notícia 3' },
            ];
            prismaMock.news.findMany.mockResolvedValue(suggestions as any);

            const request = new Request('http://localhost:3000/api/noticias/suggestions?q=notícia');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(Array.isArray(data)).toBe(true);
            expect(data.length).toBeLessThanOrEqual(10);
            expect(prismaMock.news.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        title: { contains: 'notícia', mode: 'insensitive' },
                    },
                    select: { title: true },
                    distinct: ['title'],
                    take: 10,
                })
            );
        });

        it('should return empty array when search term is empty', async () => {
            const request = new Request('http://localhost:3000/api/noticias/suggestions?q=');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data).toEqual([]);
            expect(prismaMock.news.findMany).not.toHaveBeenCalled();
        });
    });

    describe('Error handling', () => {
        it('should handle database errors gracefully', async () => {
            prismaMock.news.findMany.mockRejectedValue(new Error('Database connection failed'));

            const request = new Request('http://localhost:3000/api/noticias/suggestions?q=teste');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Não foi possível carregar sugestões');
        });
    });
});
