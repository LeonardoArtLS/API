const apiKey = 'f66d2b791fd84ac8a1879a6c1049231f';
//f66d2b791fd84ac8a1879a6c1049231f
//61eae65de0c74ece9f8194c44fc3d064
let apiUrl;

// Função para buscar e exibir artigos
async function search() {
    let search = document.getElementById("searchInput").value;
    console.log(search);
    apiUrl = `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.statusText);
        }
        const data = await response.json();
        const articlesContainer = document.getElementById('articles-container');
        articlesContainer.innerHTML = ''; // Limpa o conteúdo anterior antes de adicionar novos artigos

        data.articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');

            articleElement.innerHTML = `
    <section>
        <article>
            <div class="group-hover:scale-125 group overflow-hidden relative text-gray-50 rounded-2xl 2xl:rounded-3xl hover:duration-700 duration-700 w-full h-96 lg:h-auto lg:aspect-square">
                <div class="w-full h-96 lg:h-auto lg:aspect-square text-gray-800">
                ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="w-[85vw] sm:w-96 h-96 lg:h-auto lg:aspect-square group-hover:blur-sm object-cover scale-125 bg-slate-400 dark:bg-zinc-800">`
                : ''}
                </div>
                <div class="absolute bg-black bg-opacity-50 lg:-bottom-24 w-full h-96 -bottom-0 lg:group-hover:h-96 lg:h-auto lg:group-hover:aspect-square p-3 flex flex-col gap-1 lg:group-hover:-bottom-0 group-hover:duration-600 duration-500">
                    <span class="text-white font-bold text-base sm:text-lg min-[1860px]:text-base Inter-Tight flex lg:hidden lg:group-hover:flex">${article.title}</span>
                    <span class="text-white font-bold sm:text-xs min-[1860px]:text-sm flex lg:hidden lg:group-hover:flex Roboto-Mono">${article.author}</span>
                    <span class="text-white font-bold sm:text-xs min-[1860px]:text-sm flex lg:hidden lg:group-hover:flex Roboto-Mono">${article.source.name}</span>
                    <span class="text-white font-bold sm:text-xs min-[1860px]:text-sm flex lg:hidden lg:group-hover:flex Roboto-Mono">${new Date(article.publishedAt).toLocaleString()}</span>
                    <p class="text-white flex lg:hidden sm:text-xs min-[1860px]:text-sm lg:group-hover:flex Roboto-Mono sm:mt-3 lg:mt-5 xl:mt-10">${article.content}</p>
                    <a href="${article.url}" target="_blank" class="bg-white text-black w-24 rounded-full Roboto-Mono text-center text-base -tracking-widest p-1 mt-auto ms-auto m-3 hover:bg-black hover:text-white shadow-sm hover:shadow-white">Leia mais</a>
                </div>
            </div>
        </article>
    </section>
            `;

            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}