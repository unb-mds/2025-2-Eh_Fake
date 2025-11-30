/**
 * Integration tests for /api/noticias endpoint
 */

import '../../utils/prismaSingleton';
import { GET } from '@/app/api/noticias/route';
import { createMockNewsList, mockNewsData } from '../../utils/testData';
import { prismaMock } from '../../utils/prismaClient';

describe('GET /api/noticias', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Basic listing', () => {
        it('should return all news with default pagination', async () => {
            const mockNews = createMockNewsList(6);
            prismaMock.news.count.mockResolvedValue(6);
            prismaMock.news.findMany.mockResolvedValue(mockNews);

            const request = new Request('http://localhost:3000/api/noticias');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.news).toHaveLength(6);
            expect(data.totalItems).toBe(6);
            expect(data.totalPages).toBe(1);
            expect(data.currentPage).toBe(1);
        });

        it('should return empty array when no news exist', async () => {
            prismaMock.news.count.mockResolvedValue(0);
            prismaMock.news.findMany.mockResolvedValue([]);

            const request = new Request('http://localhost:3000/api/noticias');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.news).toHaveLength(0);
            expect(data.totalItems).toBe(0);
            expect(data.totalPages).toBe(0);
        });
    });

    describe('Pagination', () => {
        it('should paginate results correctly', async () => {
            const allNews = createMockNewsList(20);
            const page2News = allNews.slice(6, 12);

            prismaMock.news.count.mockResolvedValue(20);
            prismaMock.news.findMany.mockResolvedValue(page2News);

            const request = new Request('http://localhost:3000/api/noticias?page=2&limit=6');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.totalItems).toBe(20);
            expect(data.totalPages).toBe(4);
            expect(data.currentPage).toBe(2);
            expect(prismaMock.news.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 6,
                    take: 6,
                })
            );
        });

        it('should handle custom limit parameter', async () => {
            const mockNews = createMockNewsList(10);

            prismaMock.news.count.mockResolvedValue(10);
            prismaMock.news.findMany.mockResolvedValue(mockNews);

            const request = new Request('http://localhost:3000/api/noticias?limit=10');
            const response = await GET(request);

            expect(response.status).toBe(200);
            expect(prismaMock.news.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 10,
                })
            );
        });
    });

    describe('Search functionality', () => {
        it('should search by title', async () => {
            const searchResults = [mockNewsData.real];

            prismaMock.news.count.mockResolvedValue(1);
            prismaMock.news.findMany.mockResolvedValue(searchResults);

            const request = new Request('http://localhost:3000/api/noticias?q=verificada');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(200);
            expect(data.totalItems).toBe(1);
            expect(prismaMock.news.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        OR: [
                            { title: { contains: 'verificada', mode: 'insensitive' } },
                            { description: { contains: 'verificada', mode: 'insensitive' } },
                            { source: { contains: 'verificada', mode: 'insensitive' } },
                        ],
                    },
                })
            );
        });
    });

    describe('Error handling', () => {
        it('should handle database errors gracefully', async () => {
            prismaMock.news.count.mockRejectedValue(new Error('Database connection failed'));

            const request = new Request('http://localhost:3000/api/noticias');
            const response = await GET(request);
            const data = await response.json();

            expect(response.status).toBe(500);
            expect(data.error).toBe('Não foi possível carregar notícias');
        });
    });
});
