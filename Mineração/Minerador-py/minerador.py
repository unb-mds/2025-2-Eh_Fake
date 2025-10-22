from newsplease import NewsPlease

url = "https://g1.globo.com/mundo/noticia/2025/10/19/crime-no-louvre-coroa-de-diamantes-roubada-e-encontrada-em-rua-de-paris.ghtml"  # troque para uma URL real
article = NewsPlease.from_url(url, request_args={"timeout": 10})

print("Título:", article.title)
print("Data de publicação:", article.date_publish)
print("Autor(es):", article.authors)
print("Texto principal:", article.maintext[:300], "…")
print("URL:", article.url)
print("Idioma:", article.lang)
